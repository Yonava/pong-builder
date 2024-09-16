<script setup lang="ts">
import PongCanvas from './components/PongCanvas.vue'
</script>

<template>
  <div class="flex justify-center m-8 flex-col items-center">
    <h1 class="text-4xl font-bold my-4">
      Pong Builder - CS320
    </h1>
    <div>
      <PongCanvas height="600" width="1000" />
    </div>
  </div>
</template>

<style scoped>

</style>
