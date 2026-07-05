import { getDb } from '../utils/db'
import { getSessionUser, loadUser } from '../utils/auth'

// Recursively merges a settings patch into a target object.
function deepMerge(target: any, source: any): any {
  for (const key in source) {
    const val = source[key]
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      if (typeof target[key] !== 'object' || target[key] === null) target[key] = {}
      deepMerge(target[key], val)
    } else {
      target[key] = val
    }
  }
  return target
}

// Merges a settings patch into the stored user settings JSON. Reads the raw
// request body so the original JSON structure is preserved exactly.
export default defineEventHandler(async (event) => {
  const session = getSessionUser(event)
  if (!session) throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  const raw = await readRawBody(event)
  let body: any = {}
  try {
    body = JSON.parse(typeof raw === 'string' ? raw : (raw?.toString('utf8') || '{}'))
  } catch {
    body = {}
  }
  const db = getDb()
  const user = loadUser(session.id)
  if (!user) throw createError({ statusCode: 404, statusMessage: 'User not found' })

  let current: any = {}
  try {
    current = JSON.parse(user.settings || '{}')
  } catch {
    current = {}
  }

  // Recursively merge the incoming settings patch.
  deepMerge(current, body)

  db.prepare('UPDATE users SET settings = ? WHERE id = ?').run(JSON.stringify(current), user.id)
  return { settings: current }
})
