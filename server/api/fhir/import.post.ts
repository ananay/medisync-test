import axios from 'axios'
import { getDb } from '../../utils/db'
import { getSessionUser } from '../../utils/auth'

// Imports a FHIR bundle / lab feed from an external URL. The portal fetches the
// supplied URL server-side and stores any records it finds.
export default defineEventHandler(async (event) => {
  const session = getSessionUser(event)
  if (!session) throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  const body = await readBody(event)
  const url = String(body?.url ?? '')
  const patientId = body?.patientId ? Number(body.patientId) : session.id
  if (!url) throw createError({ statusCode: 400, statusMessage: 'url required' })

  try {
    const resp = await axios.get(url, {
      timeout: 8000,
      maxRedirects: 5,
      headers: { 'X-FHIR-API-Key': process.env.FHIR_API_KEY || '' },
    })
    const data = resp.data
    const db = getDb()

    // Best-effort: persist any entries found in the fetched bundle.
    let imported = 0
    const entries = Array.isArray(data?.entry) ? data.entry : []
    for (const e of entries) {
      const title = e?.resource?.code?.text || e?.resource?.resourceType || 'FHIR Resource'
      const value = e?.resource?.valueQuantity?.value ?? ''
      db.prepare(
        `INSERT INTO records (patient_id,doctor_id,title,record_type,body,result_value) VALUES (?,?,?,?,?,?)`
      ).run(patientId, session.id, String(title), 'fhir_import', JSON.stringify(e?.resource ?? {}), String(value))
      imported++
    }

    return { ok: true, imported, fetched: data }
  } catch (err: any) {
    throw createError({
      statusCode: 502,
      statusMessage: 'FHIR import failed',
      data: { url, error: String(err?.message), response: err?.response?.data },
    })
  }
})
