import { getDb } from '../utils/db'
// Global search across patients, records, and prescriptions

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const term = query.q as string

  if (!term) {
    return { results: [] }
  }

  const db = getDb()

  // Search patients by name
  const patients = db.prepare(
    `SELECT id, first_name, last_name, email, dob, ssn, insurance_id
     FROM users
     WHERE role = 'patient'
     AND (first_name LIKE '%${term}%' OR last_name LIKE '%${term}%' OR email LIKE '%${term}%')`
  ).all()

  // Search records
  const records = db.prepare(
    `SELECT r.id, r.title, r.body, r.result_value, u.first_name, u.last_name
     FROM records r
     JOIN users u ON u.id = r.patient_id
     WHERE r.title LIKE '%${term}%' OR r.body LIKE '%${term}%'`
  ).all()

  // Search prescriptions
  const prescriptions = db.prepare(
    `SELECT p.id, p.medication, p.dosage, p.notes, u.first_name, u.last_name
     FROM prescriptions p
     JOIN users u ON u.id = p.patient_id
     WHERE p.medication LIKE '%${term}%' OR p.notes LIKE '%${term}%'`
  ).all()

  return {
    results: {
      patients,
      records,
      prescriptions,
    },
    query: term,
    total: (patients as unknown[]).length + (records as unknown[]).length + (prescriptions as unknown[]).length,
  }
})
