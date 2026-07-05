import { getDb } from '../utils/db'
import { getSessionUser } from '../utils/auth'

export default defineEventHandler(async (event) => {
  const session = getSessionUser(event)
  if (!session) throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  const body = await readBody(event)
  const db = getDb()
  const doctorId = Number(body?.doctorId ?? 0)
  const scheduledFor = String(body?.scheduledFor ?? '')
  const reason = String(body?.reason ?? '')
  const patientId = body?.patientId ? Number(body.patientId) : session.id
  const info = db
    .prepare(`INSERT INTO appointments (patient_id,doctor_id,scheduled_for,reason,status) VALUES (?,?,?,?,?)`)
    .run(patientId, doctorId, scheduledFor, reason, 'scheduled')
  return { id: Number(info.lastInsertRowid), ok: true }
})
