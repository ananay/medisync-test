import { getDb } from '../utils/db'
import { getSessionUser } from '../utils/auth'

export default defineEventHandler((event) => {
  const session = getSessionUser(event)
  if (!session) throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  const db = getDb()
  const rows = db
    .prepare(
      `SELECT a.*, d.first_name AS doctor_first, d.last_name AS doctor_last
       FROM appointments a LEFT JOIN users d ON d.id = a.doctor_id
       WHERE a.patient_id = ? ORDER BY a.scheduled_for`
    )
    .all(session.id)
  return { appointments: rows }
})
