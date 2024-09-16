<script lang="ts" setup>
import { ref } from 'vue'
import { usePong } from '../pong'

const canvas = ref<HTMLCanvasElement>()
const mousedownTime = ref(0)

// @ts-ignore
const { addBall, addBarrier, previewBarrier, reset, ballSettings } = usePong(canvas)

const canvasMouseDown = ({ offsetX: x, offsetY: y}: MouseEvent) => {
  mousedownTime.value = Date.now()
  previewBarrier.value = {
    topLeft: { x, y },
    bottomRight: { x, y }
  }
}

const canvasMouseUp = ({ offsetX: x, offsetY: y}: MouseEvent) => {
  if (Date.now() - mousedownTime.value < 250) addBall(x, y)
  if (!previewBarrier.value) return
  addBarrier(previewBarrier.value)
  previewBarrier.value = null
}

const canvasMouseMove = ({ offsetX: x, offsetY: y}: MouseEvent) => {
  if (!previewBarrier.value) return
  previewBarrier.value.bottomRight = { x, y }
}

const props = defineProps<{
  height: string
  width: string
}>()
</script>

<template>
  <div class="bg-blue-50 border-black border-2">
    <canvas
      :height="props.height"
      :width="props.width"
      @mousedown="canvasMouseDown"
      @mousemove="canvasMouseMove"
      @mouseup="canvasMouseUp"
      ref="canvas"
    ></canvas>
  </div>
  <div class="flex gap-12 mt-4">
    <button @click="reset" class="bg-blue-200 px-4 hover:bg-blue-300">Reset</button>
    <div>
      <p>Ball Speed: {{ ballSettings.speed }}</p>
      <input type="range" min="1" max="10" v-model.number="ballSettings.speed" />
    </div>
    <div>
      <p>Ball Radius: {{ ballSettings.radius }}</p>
      <input type="range" min="1" max="100" v-model.number="ballSettings.radius" />
    </div>
    <div>
      <p>Ball Color: {{ ballSettings.color }}</p>
      <input type="color" v-model="ballSettings.color" />
    </div>
  </div>
</template>