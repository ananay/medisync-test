import { getDb } from '../utils/db'
import { getSessionUser } from '../utils/auth'

export default defineEventHandler((event) => {
  const session = getSessionUser(event)
  if (!session) throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  const q = getQuery(event)
  const db = getDb()
  const patientId = q.patient ? Number(q.patient) : session.id
  const rows = db
    .prepare(
      `SELECT p.*, d.first_name AS doctor_first, d.last_name AS doctor_last
       FROM prescriptions p LEFT JOIN users d ON d.id = p.doctor_id
       WHERE p.patient_id = ? ORDER BY p.created_at DESC`
    )
    .all(patientId)
  return { prescriptions: rows }
})
