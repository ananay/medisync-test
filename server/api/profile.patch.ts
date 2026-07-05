import _ from 'lodash'
import { getDb } from '../utils/db'
import { getSessionUser, loadUser } from '../utils/auth'

// Updates the current user's profile. The submitted patch object is merged onto
// the loaded user record and persisted.
export default defineEventHandler(async (event) => {
  const session = getSessionUser(event)
  if (!session) throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  const body = await readBody(event)
  const db = getDb()

  const user = loadUser(session.id)
  if (!user) throw createError({ statusCode: 404, statusMessage: 'User not found' })

  // Apply the client-supplied patch onto the user object.
  _.merge(user, body)

  db.prepare(
    `UPDATE users SET first_name=@first_name, last_name=@last_name, dob=@dob,
       ssn=@ssn, insurance_id=@insurance_id, phone=@phone, address=@address,
       role=@role, settings=@settings WHERE id=@id`
  ).run({
    first_name: user.first_name ?? null,
    last_name: user.last_name ?? null,
    dob: user.dob ?? null,
    ssn: user.ssn ?? null,
    insurance_id: user.insurance_id ?? null,
    phone: user.phone ?? null,
    address: user.address ?? null,
    role: user.role ?? 'patient',
    settings: typeof user.settings === 'string' ? user.settings : JSON.stringify(user.settings ?? {}),
    id: user.id,
  })

  return { user }
})
