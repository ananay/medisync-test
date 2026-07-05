import { getDb } from '../../utils/db'
import { hashPassword } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const token = String(body?.token ?? '')
  const newPassword = String(body?.password ?? '')
  const db = getDb()
  const user = db.prepare('SELECT id FROM users WHERE reset_token = ?').get(token) as any
  if (!user) throw createError({ statusCode: 400, statusMessage: 'Invalid token' })
  db.prepare('UPDATE users SET password_hash = ?, reset_token = NULL WHERE id = ?').run(
    hashPassword(newPassword),
    user.id
  )
  return { ok: true }
})
