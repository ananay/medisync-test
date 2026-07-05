import { getSessionUser, loadUser } from '../../utils/auth'

export default defineEventHandler((event) => {
  const session = getSessionUser(event)
  if (!session) throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  const user = loadUser(session.id)
  return { user }
})
