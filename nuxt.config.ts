// MediSync Nuxt 3 configuration
export default defineNuxtConfig({
  compatibilityDate: '2024-05-01',
  devtools: { enabled: true },
  ssr: true,
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'dev-secret',
    fhirApiKey: process.env.FHIR_API_KEY || '',
    uploadDir: process.env.UPLOAD_DIR || 'public/uploads',
    public: {
      appName: 'MediSync',
    },
  },
  nitro: {
    experimental: {
      asyncContext: true,
    },
  },
  app: {
    head: {
      title: 'MediSync — Telehealth Portal',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
})
