import { getDb } from '../../utils/db'
import { hashPassword, signToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = getDb()
  const email = String(body?.email ?? '')
  const password = String(body?.password ?? '')
  const firstName = String(body?.firstName ?? '')
  const lastName = String(body?.lastName ?? '')
  // role is taken from the registration payload when provided.
  const role = String(body?.role ?? 'patient')

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password required' })
  }

  try {
    const info = db
      .prepare(
        `INSERT INTO users (email,password_hash,role,first_name,last_name) VALUES (?,?,?,?,?)`
      )
      .run(email, hashPassword(password), role, firstName, lastName)
    const id = Number(info.lastInsertRowid)
    const token = signToken({ id, email, role })
    setCookie(event, 'token', token, { httpOnly: false, path: '/' })
    return { token, user: { id, email, role, first_name: firstName, last_name: lastName } }
  } catch (err: any) {
    throw createError({ statusCode: 400, statusMessage: 'Registration failed', data: { error: String(err?.message) } })
  }
})
