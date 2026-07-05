<template>
  <div>
    <h1>Lab uploads</h1>
    <div class="card">
      <h2>Upload lab file</h2>
      <label>Filename</label>
      <input v-model="filename" placeholder="cbc-2026.txt" />
      <label>Contents</label>
      <textarea v-model="content" rows="4"></textarea>
      <button class="btn" @click="upload">Upload</button>
      <p v-if="uploadMsg" class="muted">{{ uploadMsg }}</p>
    </div>

    <div class="card">
      <h2>Import lab XML</h2>
      <textarea v-model="xml" rows="6" placeholder="<lab><title>CBC</title><value>normal</value></lab>"></textarea>
      <button class="btn" @click="uploadXml">Import XML</button>
      <p v-if="xmlMsg" class="muted">{{ xmlMsg }}</p>
    </div>

    <div class="card">
      <h2>Read uploaded file</h2>
      <input v-model="readName" placeholder="cbc-2026.txt" />
      <button class="btn secondary" @click="readFile">Read</button>
      <pre v-if="fileContent">{{ fileContent }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const auth = useAuth()
const filename = ref('')
const content = ref('')
const uploadMsg = ref('')
const xml = ref('')
const xmlMsg = ref('')
const readName = ref('')
const fileContent = ref('')

onMounted(() => {
  auth.load()
  if (!auth.token.value) return navigateTo('/login')
})

async function upload() {
  try {
    const res: any = await auth.api('/api/labs/upload', {
      method: 'POST',
      body: { filename: filename.value, content: content.value, encoding: 'utf8' },
    })
    uploadMsg.value = 'Uploaded to ' + res.url
  } catch (e: any) {
    uploadMsg.value = 'Failed: ' + (e?.data?.statusMessage || e?.message)
  }
}

async function uploadXml() {
  try {
    const res: any = await auth.api('/api/labs/upload-xml', { method: 'POST', body: { xml: xml.value } })
    xmlMsg.value = 'Imported. ' + JSON.stringify(res.parsed)
  } catch (e: any) {
    xmlMsg.value = 'Failed: ' + (e?.data?.statusMessage || e?.message)
  }
}

async function readFile() {
  try {
    const res: any = await auth.api(`/api/labs/file?name=${encodeURIComponent(readName.value)}`)
    fileContent.value = typeof res === 'string' ? res : JSON.stringify(res)
  } catch (e: any) {
    fileContent.value = 'Failed: ' + (e?.data?.statusMessage || e?.message)
  }
}
</script>
