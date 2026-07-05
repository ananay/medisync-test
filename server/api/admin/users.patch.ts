import { getDb } from '../../utils/db'
import { getSessionUser } from '../../utils/auth'

// Admin endpoint to change a user's role.
export default defineEventHandler(async (event) => {
  const session = getSessionUser(event)
  if (!session) throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  const body = await readBody(event)
  const db = getDb()
  const id = Number(body?.id)
  const role = String(body?.role ?? 'patient')
  db.prepare('UPDATE users SET role = ? WHERE id = ?').run(role, id)
  return { ok: true }
})
