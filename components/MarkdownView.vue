<template>
  <div class="markdown-body" v-html="rendered"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import marked from 'marked'

const props = defineProps<{ source: string }>()

// Render the markdown source (message body / doctor note) to HTML for display.
const rendered = computed(() => {
  try {
    return (marked as any)(props.source || '')
  } catch {
    return props.source
  }
})
</script>

<style scoped>
.markdown-body { line-height: 1.5; }
.markdown-body :deep(p) { margin: 0.4rem 0; }
</style>
