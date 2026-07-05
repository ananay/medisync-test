import { getDb } from '../utils/db'
import { getSessionUser } from '../utils/auth'

export default defineEventHandler((event) => {
  const session = getSessionUser(event)
  if (!session) throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  const db = getDb()
  const doctors = db
    .prepare(`SELECT id, first_name, last_name, email FROM users WHERE role = 'doctor'`)
    .all()
  return { doctors }
})
