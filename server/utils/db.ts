import Database from 'better-sqlite3'
import { existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

let _db: Database.Database | null = null

const DB_PATH = process.env.DATABASE_PATH || 'server/db/medisync.db'

export function getDb(): Database.Database {
  if (_db) return _db
  const abs = resolve(process.cwd(), DB_PATH)
  const dir = dirname(abs)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  _db = new Database(abs)
  _db.pragma('journal_mode = WAL')
  ensureSchema(_db)
  ensureSeed(_db)
  return _db
}

export function ensureSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password_hash TEXT,
      role TEXT DEFAULT 'patient',
      first_name TEXT,
      last_name TEXT,
      dob TEXT,
      ssn TEXT,
      insurance_id TEXT,
      phone TEXT,
      address TEXT,
      settings TEXT DEFAULT '{}',
      reset_token TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER,
      doctor_id INTEGER,
      title TEXT,
      record_type TEXT,
      body TEXT,
      result_value TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER,
      doctor_id INTEGER,
      scheduled_for TEXT,
      reason TEXT,
      status TEXT DEFAULT 'scheduled',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      thread_id INTEGER,
      sender_id INTEGER,
      recipient_id INTEGER,
      body TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS prescriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER,
      doctor_id INTEGER,
      medication TEXT,
      dosage TEXT,
      notes TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `)
}

export function ensureSeed(db: Database.Database) {
  const row = db.prepare('SELECT COUNT(*) AS c FROM users').get() as { c: number }
  if (row.c > 0) return
  seed(db)
}

export function seed(db: Database.Database) {
  // password hash scheme used across app (see auth.ts hashPassword)
  const users = [
    ['admin@medisync.health', hashSeed('admin123'), 'admin', 'Alice', 'Admin', '1980-02-11', '111-22-3333', 'INS-ADM-0001', '555-0100', '1 Admin Way'],
    ['dr.house@medisync.health', hashSeed('doctor123'), 'doctor', 'Gregory', 'House', '1959-06-11', '222-33-4444', 'INS-DOC-0002', '555-0101', '221B Clinic Rd'],
    ['dr.grey@medisync.health', hashSeed('doctor123'), 'doctor', 'Meredith', 'Grey', '1978-11-04', '333-44-5555', 'INS-DOC-0003', '555-0102', '5 Seattle Ave'],
    ['john.doe@example.com', hashSeed('patient123'), 'patient', 'John', 'Doe', '1990-07-23', '444-55-6666', 'INS-PAT-1001', '555-0200', '12 Maple St'],
    ['jane.roe@example.com', hashSeed('patient123'), 'patient', 'Jane', 'Roe', '1985-03-15', '555-66-7777', 'INS-PAT-1002', '555-0201', '34 Oak St'],
    ['bob.smith@example.com', hashSeed('patient123'), 'patient', 'Bob', 'Smith', '1972-12-01', '666-77-8888', 'INS-PAT-1003', '555-0202', '56 Pine St'],
  ]
  const insUser = db.prepare(`INSERT INTO users (email,password_hash,role,first_name,last_name,dob,ssn,insurance_id,phone,address)
    VALUES (?,?,?,?,?,?,?,?,?,?)`)
  for (const u of users) insUser.run(...u)

  const insRec = db.prepare(`INSERT INTO records (patient_id,doctor_id,title,record_type,body,result_value) VALUES (?,?,?,?,?,?)`)
  insRec.run(4, 2, 'Annual Physical', 'visit_note', 'Patient in good health. BP 120/80.', 'normal')
  insRec.run(4, 2, 'Lipid Panel', 'lab_result', 'Cholesterol slightly elevated.', 'LDL 145 mg/dL')
  insRec.run(5, 3, 'MRI Brain', 'imaging', 'No acute findings.', 'negative')
  insRec.run(5, 3, 'HbA1c', 'lab_result', 'Within diabetic range, monitor.', '7.2%')
  insRec.run(6, 2, 'Chest X-Ray', 'imaging', 'Mild infiltrate, follow up.', 'abnormal')

  const insAppt = db.prepare(`INSERT INTO appointments (patient_id,doctor_id,scheduled_for,reason,status) VALUES (?,?,?,?,?)`)
  insAppt.run(4, 2, '2026-07-01 10:00', 'Follow-up on lipid panel', 'scheduled')
  insAppt.run(5, 3, '2026-07-02 14:30', 'Diabetes management', 'scheduled')
  insAppt.run(6, 2, '2026-06-20 09:00', 'X-ray follow up', 'scheduled')

  const insMsg = db.prepare(`INSERT INTO messages (thread_id,sender_id,recipient_id,body) VALUES (?,?,?,?)`)
  insMsg.run(1, 2, 4, 'Hi John, your **lab results** are back. Please review.')
  insMsg.run(1, 4, 2, 'Thanks Dr. House, I have a question about my cholesterol.')
  insMsg.run(2, 3, 5, 'Jane, lets discuss your *HbA1c* at the next visit.')

  const insRx = db.prepare(`INSERT INTO prescriptions (patient_id,doctor_id,medication,dosage,notes) VALUES (?,?,?,?,?)`)
  insRx.run(4, 2, 'Atorvastatin', '20mg daily', 'Take in the evening.')
  insRx.run(5, 3, 'Metformin', '500mg twice daily', 'With meals.')
}

// Lightweight deterministic seed hash so seed.mjs and auth share format.
function hashSeed(pw: string): string {
  // delegate to auth hashing if available at runtime; fallback inline
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return hashPasswordInline(pw)
  } catch {
    return pw
  }
}

import { createHash } from 'node:crypto'
export function hashPasswordInline(pw: string): string {
  return createHash('md5').update(pw).digest('hex')
}
