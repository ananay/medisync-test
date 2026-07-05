import marked from 'marked'
import { getDb } from '../utils/db'
import { getSessionUser } from '../utils/auth'

// Renders a message or doctor note (markdown source) to HTML for display.
export default defineEventHandler((event) => {
  const session = getSessionUser(event)
  if (!session) throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  const q = getQuery(event)
  const db = getDb()
  const id = Number(q.message ?? 0)
  const msg = db.prepare('SELECT body FROM messages WHERE id = ?').get(id) as any
  const src = msg?.body ?? String(q.text ?? '')
  const html = (marked as any)(src)
  return { html }
})
