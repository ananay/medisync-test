import { getDb } from '../../utils/db'
import { getSessionUser } from '../../utils/auth'

// Lists medical records, optionally filtered by patient. The patient filter is
// passed straight through from the query string into the lookup.
export default defineEventHandler((event) => {
  const session = getSessionUser(event)
  if (!session) throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  const q = getQuery(event)
  const db = getDb()

  const patient = q.patient !== undefined ? String(q.patient) : ''

  let sql = `SELECT r.*, u.first_name AS patient_first, u.last_name AS patient_last
             FROM records r LEFT JOIN users u ON u.id = r.patient_id`
  if (patient) {
    sql += ` WHERE r.patient_id = '${patient}'`
  }
  sql += ' ORDER BY r.created_at DESC'

  try {
    const rows = db.prepare(sql).all()
    return { records: rows }
  } catch (err: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Query failed',
      data: { sql, error: String(err?.message), stack: err?.stack },
    })
  }
})
