import { Parser } from 'xml2js'
import { getDb } from '../../utils/db'
import { getSessionUser } from '../../utils/auth'

function parseXml(xml: string): Promise<any> {
  const parser = new Parser({ explicitArray: false, explicitChildren: false })
  return new Promise((resolve, reject) => {
    parser.parseString(xml, (err: any, result: any) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

// Imports lab results supplied as an XML document (HL7/FHIR XML style).
export default defineEventHandler(async (event) => {
  const session = getSessionUser(event)
  if (!session) throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  const body = await readBody(event)
  const xml = typeof body === 'string' ? body : String(body?.xml ?? '')
  if (!xml) throw createError({ statusCode: 400, statusMessage: 'xml required' })

  try {
    const parsed = await parseXml(xml)

    const db = getDb()
    const lab = parsed?.lab || parsed?.Observation || {}
    const patientId = lab?.patientId ? Number(lab.patientId) : session.id
    const title = lab?.title || lab?.code || 'Imported Lab'
    const value = lab?.value || lab?.result || ''

    db.prepare(
      `INSERT INTO records (patient_id,doctor_id,title,record_type,body,result_value) VALUES (?,?,?,?,?,?)`
    ).run(patientId, session.id, String(title), 'lab_result', JSON.stringify(parsed), String(value))

    return { ok: true, parsed }
  } catch (err: any) {
    throw createError({
      statusCode: 400,
      statusMessage: 'XML parse failed',
      data: { error: String(err?.message), stack: err?.stack },
    })
  }
})
