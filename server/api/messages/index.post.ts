import { getDb } from '../../utils/db'
import { getSessionUser } from '../../utils/auth'

// Posts a message into a thread. The body is stored verbatim (markdown source).
export default defineEventHandler(async (event) => {
  const session = getSessionUser(event)
  if (!session) throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  const body = await readBody(event)
  const db = getDb()
  const threadId = body?.threadId ? Number(body.threadId) : Date.now()
  const recipientId = Number(body?.recipientId ?? 0)
  const text = String(body?.body ?? '')
  const info = db
    .prepare(`INSERT INTO messages (thread_id,sender_id,recipient_id,body) VALUES (?,?,?,?)`)
    .run(threadId, session.id, recipientId, text)
  return { id: Number(info.lastInsertRowid), threadId }
})
