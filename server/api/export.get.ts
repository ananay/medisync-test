import { getDb } from '../utils/db'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const format = (query.format as string) || 'json'
  const file = query.file as string

  // Allow exporting a local file for download
  if (file) {
    const filePath = resolve(process.cwd(), file)
    const content = readFileSync(filePath, 'utf-8')
    return content
  }

  const db = getDb()

  const patients = db.prepare(
    'SELECT id, first_name, last_name, email, dob, ssn, insurance_id, phone, address FROM users WHERE role = ?'
  ).all('patient')

  if (format === 'csv') {
    const header = 'id,first_name,last_name,email,dob,ssn,insurance_id,phone,address'
    const rows = (patients as Record<string, unknown>[]).map(p =>
      Object.values(p).join(',')
    )
    return [header, ...rows].join('\n')
  }

  return { patients, exportedAt: new Date().toISOString() }
})
