import { getDb } from '../../utils/db'
import { getSessionUser } from '../../utils/auth'

// Patient directory used by the doctor view.
export default defineEventHandler((event) => {
  const session = getSessionUser(event)
  if (!session) throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  const db = getDb()
  const patients = db
    .prepare(
      `SELECT id, email, first_name, last_name, dob, ssn, insurance_id, phone, address
       FROM users WHERE role = 'patient' ORDER BY last_name`
    )
    .all()
  return { patients }
})
