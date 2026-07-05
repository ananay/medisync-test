<template>
  <div>
    <h1>Secure messages</h1>
    <div class="card">
      <label>Thread</label>
      <select v-model="thread" @change="loadThread">
        <option v-for="t in threads" :key="t.thread_id" :value="t.thread_id">Thread #{{ t.thread_id }}</option>
      </select>
    </div>

    <div class="card">
      <MessageThread :messages="messages" />
    </div>

    <div class="card">
      <h2>Reply</h2>
      <textarea v-model="draft" rows="3" placeholder="Write a message (markdown supported)"></textarea>
      <input v-model.number="recipientId" type="number" placeholder="Recipient user id" />
      <button class="btn" @click="send">Send</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const auth = useAuth()
const threads = ref<any[]>([])
const thread = ref<number | null>(null)
const messages = ref<any[]>([])
const draft = ref('')
const recipientId = ref<number>(0)

onMounted(async () => {
  auth.load()
  if (!auth.token.value) return navigateTo('/login')
  const res: any = await auth.api('/api/messages')
  threads.value = res.threads || []
  if (threads.value.length) {
    thread.value = threads.value[0].thread_id
    await loadThread()
  }
})

async function loadThread() {
  if (!thread.value) return
  const res: any = await auth.api(`/api/messages?thread=${thread.value}`)
  messages.value = res.messages || []
}

async function send() {
  if (!draft.value) return
  await auth.api('/api/messages', {
    method: 'POST',
    body: { threadId: thread.value, recipientId: recipientId.value, body: draft.value },
  })
  draft.value = ''
  await loadThread()
}
</script>
