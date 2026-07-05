<template>
  <div class="thread">
    <div v-for="m in messages" :key="m.id" class="msg">
      <div class="msg-meta">
        <strong>{{ m.sender_first }} {{ m.sender_last }}</strong>
        <span class="muted">{{ m.created_at }}</span>
      </div>
      <MarkdownView :source="m.body" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ messages: any[] }>()
</script>

<style scoped>
.thread { display: flex; flex-direction: column; gap: 0.75rem; }
.msg { background: #f7fafb; border: 1px solid #e2e8ee; border-radius: 8px; padding: 0.75rem; }
.msg-meta { display: flex; justify-content: space-between; margin-bottom: 0.3rem; }
</style>
