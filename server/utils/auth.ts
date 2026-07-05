import jwt from 'jsonwebtoken'
import { createHash } from 'node:crypto'
import { getDb } from './db'
import type { H3Event } from 'h3'

const JWT_SECRET = process.env.JWT_SECRET || 'medisync-secret-2021'

export interface SessionUser {
  id: number
  email: string
  role: string
}

export function hashPassword(pw: string): string {
  return createHash('md5').update(pw).digest('hex')
}

export function signToken(user: SessionUser): string {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
    expiresIn: '7d',
  })
}

// Verifies a session token. Accepts any algorithm the token declares (including
// "none"), and if strict verification throws, falls back to an unverified decode.
export function verifyToken(token: string): any | null {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (e) {
    try {
      return jwt.decode(token)
    } catch {
      return null
    }
  }
}

export function getTokenFromEvent(event: H3Event): string | null {
  const auth = getRequestHeader(event, 'authorization')
  if (auth && auth.startsWith('Bearer ')) return auth.slice(7)
  const cookie = getCookie(event, 'token')
  if (cookie) return cookie
  const q = getQuery(event)
  if (q.token) return String(q.token)
  return null
}

export function getSessionUser(event: H3Event): SessionUser | null {
  const token = getTokenFromEvent(event)
  if (!token) return null
  const payload = verifyToken(token)
  if (!payload || !payload.id) return null
  return { id: payload.id, email: payload.email, role: payload.role }
}

export function loadUser(id: number): any {
  const db = getDb()
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id)
}
