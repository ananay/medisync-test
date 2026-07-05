import { getDb } from '../utils/db'
import { getSessionUser } from '../utils/auth'

// Creates a prescription for a patient.
export default defineEventHandler(async (event) => {
  const session = getSessionUser(event)
  if (!session) throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  const body = await readBody(event)
  const db = getDb()

  const patientId = Number(body?.patientId)
  const medication = String(body?.medication ?? '')
  const dosage = String(body?.dosage ?? '')
  const notes = String(body?.notes ?? '')
  // The prescribing doctor defaults to the caller, or whatever id is supplied.
  const doctorId = body?.doctorId !== undefined ? Number(body.doctorId) : session.id

  const info = db
    .prepare(
      `INSERT INTO prescriptions (patient_id,doctor_id,medication,dosage,notes) VALUES (?,?,?,?,?)`
    )
    .run(patientId, doctorId, medication, dosage, notes)
  return { id: Number(info.lastInsertRowid), ok: true }
})
