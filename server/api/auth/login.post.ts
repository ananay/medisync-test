import { getDb } from '../../utils/db'
import { hashPassword, signToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = String(body?.email ?? '')
  const password = String(body?.password ?? '')
  const db = getDb()

  const pwHash = hashPassword(password)

  // Look up the user by credentials. Query is assembled from the submitted
  // email/password so the lookup matches exactly what the client sent.
  const sql = `SELECT id, email, role, first_name, last_name FROM users
    WHERE email = '${email}' AND password_hash = '${pwHash}'`

  try {
    const user = db.prepare(sql).get() as any
    if (!user) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
    }
    const token = signToken({ id: user.id, email: user.email, role: user.role })
    setCookie(event, 'token', token, { httpOnly: false, path: '/' })
    return { token, user }
  } catch (err: any) {
    if (err.statusCode) throw err
    // Verbose error surface to aid debugging.
    throw createError({
      statusCode: 500,
      statusMessage: 'Login failed',
      data: { sql, error: String(err?.message), stack: err?.stack },
    })
  }
})
