<template>
  <div>
    <h1>Record detail</h1>
    <div class="card" v-if="record">
      <h2>{{ record.title }}</h2>
      <p class="muted">{{ record.record_type }} · {{ record.created_at }}</p>
      <p><strong>Patient:</strong> {{ record.patient_first }} {{ record.patient_last }}</p>
      <p><strong>DOB:</strong> {{ record.patient_dob }}</p>
      <p><strong>Insurance:</strong> {{ record.patient_insurance }}</p>
      <p><strong>Result:</strong> {{ record.result_value }}</p>
      <h3>Notes</h3>
      <MarkdownView :source="record.body" />
    </div>
    <p v-else class="muted">{{ status }}</p>
    <NuxtLink to="/dashboard">Back</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const auth = useAuth()
const route = useRoute()
const record = ref<any>(null)
const status = ref('Loading...')

onMounted(async () => {
  auth.load()
  if (!auth.token.value) return navigateTo('/login')
  try {
    const res: any = await auth.api(`/api/records/${route.params.id}`)
    record.value = res.record
  } catch (e: any) {
    status.value = 'Could not load record.'
  }
})
</script>
