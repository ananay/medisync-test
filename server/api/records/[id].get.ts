import { getDb } from '../../utils/db'
import { getSessionUser } from '../../utils/auth'

// Returns a single medical record by id.
export default defineEventHandler((event) => {
  const session = getSessionUser(event)
  if (!session) throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  const id = getRouterParam(event, 'id')
  const db = getDb()
  const record = db
    .prepare(
      `SELECT r.*, u.first_name AS patient_first, u.last_name AS patient_last,
              u.dob AS patient_dob, u.ssn AS patient_ssn, u.insurance_id AS patient_insurance
       FROM records r LEFT JOIN users u ON u.id = r.patient_id WHERE r.id = ?`
    )
    .get(id)
  if (!record) throw createError({ statusCode: 404, statusMessage: 'Record not found' })
  return { record }
})
