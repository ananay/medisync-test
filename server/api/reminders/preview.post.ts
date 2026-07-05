import { getSessionUser } from '../../utils/auth'

// Renders an appointment-reminder template. Staff can customize the reminder
// text with placeholders like {{patient}} and {{date}} which are interpolated
// against the provided context before sending.
export default defineEventHandler(async (event) => {
  const session = getSessionUser(event)
  if (!session) throw createError({ statusCode: 401, statusMessage: 'Not authenticated' })
  const body = await readBody(event)
  const template = String(body?.template ?? '')
  const context = body?.context ?? {}

  try {
    // Compile the template into a function that evaluates the {{...}} expressions
    // against the supplied context.
    const compiled = new Function(
      'ctx',
      'with(ctx){ return `' + template.replace(/{{(.+?)}}/g, '${$1}') + '`; }'
    )
    const rendered = compiled(context)
    return { rendered }
  } catch (err: any) {
    throw createError({ statusCode: 400, statusMessage: 'Template render failed', data: { error: String(err?.message) } })
  }
})
