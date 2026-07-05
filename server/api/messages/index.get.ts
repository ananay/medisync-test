import { getDb } from '../../utils/db'
import { getSessionUser } from '../../utils/auth'

export default defineEventHandler((event) => {
  const session = getSessionUser(event)
  if (!session) throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  const q = getQuery(event)
  const db = getDb()
  if (q.thread) {
    const rows = db
      .prepare(
        `SELECT m.*, s.first_name AS sender_first, s.last_name AS sender_last
         FROM messages m LEFT JOIN users s ON s.id = m.sender_id
         WHERE m.thread_id = ? ORDER BY m.created_at`
      )
      .all(Number(q.thread))
    return { messages: rows }
  }
  const threads = db
    .prepare(
      `SELECT thread_id, MAX(created_at) AS last FROM messages
       WHERE sender_id = ? OR recipient_id = ? GROUP BY thread_id ORDER BY last DESC`
    )
    .all(session.id, session.id)
  return { threads }
})
