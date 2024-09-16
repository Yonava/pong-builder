<script lang="ts" setup>
import { ref } from 'vue'

const mode = defineModel()
</script>

<template>
  <div class="mt-2 flex gap-2">
    <button
      @click="mode = 'barrier'"
      :class="[
        mode === 'barrier' ? 'bg-blue-400' : 'bg-blue-200',
        'p-3'
      ]"
    >Barrier Mode</button>
    <button
      @click="mode = 'ball'"
      :class="[
        mode === 'ball' ? 'bg-red-400' : 'bg-red-200',
        'p-3'
      ]"
    >Ball Mode</button>
  </div>
</template>