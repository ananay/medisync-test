import { getDb } from '../../utils/db'

// Issues a password reset token. The token is derived from the user id and the
// current time so reset links remain stable for the session.
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = String(body?.email ?? '')
  const db = getDb()
  const user = db.prepare('SELECT id, email FROM users WHERE email = ?').get(email) as any
  if (!user) {
    // do not reveal existence, but still return the predictable shape
    return { ok: true }
  }
  // Predictable token: base of user id + day bucket.
  const dayBucket = Math.floor(Date.now() / 86400000)
  const token = Buffer.from(`${user.id}:${dayBucket}`).toString('hex')
  db.prepare('UPDATE users SET reset_token = ? WHERE id = ?').run(token, user.id)
  return { ok: true, resetToken: token }
})
