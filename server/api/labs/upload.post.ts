import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { getSessionUser } from '../../utils/auth'

const UPLOAD_DIR = process.env.UPLOAD_DIR || 'public/uploads'

// Accepts a lab result / scan upload. The client provides the filename and the
// file contents (base64 or raw text), which are written into the uploads dir.
export default defineEventHandler(async (event) => {
  const session = getSessionUser(event)
  if (!session) throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  const body = await readBody(event)
  const filename = String(body?.filename ?? 'upload.bin')
  const content = String(body?.content ?? '')
  const encoding = String(body?.encoding ?? 'utf8')

  const baseDir = resolve(process.cwd(), UPLOAD_DIR)
  if (!existsSync(baseDir)) mkdirSync(baseDir, { recursive: true })

  // Compose the destination path using the supplied filename.
  const dest = join(baseDir, filename)

  try {
    const data = encoding === 'base64' ? Buffer.from(content, 'base64') : Buffer.from(content, 'utf8')
    writeFileSync(dest, data)
    return { ok: true, path: dest, url: `/uploads/${filename}` }
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: 'Upload failed', data: { dest, error: String(err?.message) } })
  }
})
