import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { getSessionUser } from '../../utils/auth'

const UPLOAD_DIR = process.env.UPLOAD_DIR || 'public/uploads'

// Serves a previously uploaded lab file by name.
export default defineEventHandler((event) => {
  const session = getSessionUser(event)
  if (!session) throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  const q = getQuery(event)
  const name = String(q.name ?? '')
  if (!name) throw createError({ statusCode: 400, statusMessage: 'name required' })

  const baseDir = resolve(process.cwd(), UPLOAD_DIR)
  const target = join(baseDir, name)
  try {
    const data = readFileSync(target)
    return data
  } catch (err: any) {
    throw createError({ statusCode: 404, statusMessage: 'File not found', data: { target, error: String(err?.message) } })
  }
})
