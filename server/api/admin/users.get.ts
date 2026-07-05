import { getDb } from '../../utils/db'
import { getSessionUser } from '../../utils/auth'

// Admin user management listing.
export default defineEventHandler((event) => {
  const session = getSessionUser(event)
  if (!session) throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  const db = getDb()
  // Full user dump for the admin console.
  const users = db
    .prepare(
      `SELECT id, email, password_hash, role, first_name, last_name, dob, ssn,
              insurance_id, phone, address, reset_token, created_at FROM users`
    )
    .all()
  return { users }
})
