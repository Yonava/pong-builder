<script lang="ts" setup>
import { ref, onMounted } from 'vue'
const canvas = ref<HTMLCanvasElement | null>(null)
const balls = ref<Ball[]>([{ x: 100, y: 500, dx: 5, dy: 5 }])
const barriers = ref<Barrier[]>([{ topLeft: { x: 400, y: 200 }, bottomRight: { x: 400 + 100, y: 200 + 100 } }])

type Ball = {
  x: number
  y: number
  dx: number
  dy: number
}

type Barrier = {
  topLeft: { x: number, y: number }
  bottomRight: { x: number, y: number }
}

// put a circle in the center of the canvas
const draw = () => {
  // clear the canvas
  const ctx = canvas.value?.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, canvas.value!.width, canvas.value!.height)
  drawBarriers(barriers.value, canvas.value!)
  handleBalls(balls.value, barriers.value, canvas.value!)
}

const drawBarriers = (barriers: Barrier[], canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  barriers.forEach(barrier => {
    ctx.beginPath()
    ctx.rect(barrier.topLeft.x, barrier.topLeft.y, barrier.bottomRight.x - barrier.topLeft.x, barrier.bottomRight.y - barrier.topLeft.y)
    ctx.fillStyle = 'blue'
    ctx.fill()
    ctx.closePath()
  })
}

const handleBalls = (balls: Ball[], barriers: Barrier[], canvas: HTMLCanvasElement) => {
  const ballRadius = 30
  balls.forEach(ball => {
    ball.x += ball.dx
    ball.y += ball.dy

    // check collision with border of canvas
    if ((ball.x - ballRadius) < 0 || (ball.x + ballRadius) > canvas.width) {
      ball.dx = -ball.dx
    }
    if ((ball.y - ballRadius) < 0 || (ball.y + ballRadius) > canvas.height) {
      ball.dy = -ball.dy
    }

    const withinRange = (value: number, range: number[]) => {
      return value >= range[0] && value <= range[1]
    }

    const isPointInBox = (point: number[], box: number[][]) => {
      const rangeOfAllowableX = [box[0][0] - ballRadius, box[1][0] + ballRadius]
      const rangeOfAllowableY = [box[0][1] - ballRadius, box[1][1] + ballRadius]
      const collidingX = withinRange(point[0], rangeOfAllowableX)
      const collidingY = withinRange(point[1], rangeOfAllowableY)
      return collidingX && collidingY
    }

    const buffer = 7
    const ballLocation = [ball.x, ball.y]

    // check collision with barriers
    for (const barrier of barriers) {

      // check for the 8 ways collision can happen
      const nw = [
        [barrier.topLeft.x, barrier.topLeft.y],
        [barrier.topLeft.x + buffer, barrier.topLeft.y + buffer]
      ]

      const ne = [
        [barrier.bottomRight.x - buffer, barrier.topLeft.y],
        [barrier.bottomRight.x, barrier.topLeft.y + buffer]
      ]

      const se = [
        [barrier.bottomRight.x - buffer, barrier.bottomRight.y - buffer],
        [barrier.bottomRight.x, barrier.bottomRight.y]
      ]

      const sw = [
        [barrier.topLeft.x, barrier.bottomRight.y - buffer],
        [barrier.topLeft.x + buffer, barrier.bottomRight.y]
      ]

      const n = [
        [barrier.topLeft.x + buffer, barrier.topLeft.y],
        [barrier.bottomRight.x - buffer, barrier.topLeft.y + buffer]
      ]

      const s = [
        [barrier.topLeft.x + buffer, barrier.bottomRight.y - buffer],
        [barrier.bottomRight.x - buffer, barrier.bottomRight.y]
      ]

      const e = [
        [barrier.bottomRight.x - buffer, barrier.topLeft.y + buffer],
        [barrier.bottomRight.x, barrier.bottomRight.y - buffer]
      ]

      const w = [
        [barrier.topLeft.x, barrier.topLeft.y + buffer],
        [barrier.topLeft.x + buffer, barrier.bottomRight.y - buffer]
      ]

      if (isPointInBox(ballLocation, n)) {
        ball.dy = -ball.dy
        console.log('n')
        break
      }

      if (isPointInBox(ballLocation, s)) {
        ball.dy = -ball.dy
        console.log('s')
        break
      }

      if (isPointInBox(ballLocation, e)) {
        ball.dx = -ball.dx
        console.log('e')
        break
      }

      if (isPointInBox(ballLocation, w)) {
        ball.dx = -ball.dx
        console.log('w')
        break
      }

      if (isPointInBox(ballLocation, nw)) {
        ball.dx = -ball.dx
        ball.dy = -ball.dy
        console.log('nw')
        break
      }

      if (isPointInBox(ballLocation, ne)) {
        ball.dx = -ball.dx
        ball.dy = -ball.dy
        console.log('ne')
        break
      }

      if (isPointInBox(ballLocation, se)) {
        ball.dx = -ball.dx
        ball.dy = -ball.dy
        console.log('se')
        break
      }

      if (isPointInBox(ballLocation, sw)) {
        ball.dx = -ball.dx
        ball.dy = -ball.dy
        console.log('sw')
        break
      }
    }
  })

  const ctx = canvas.getContext('2d')
  if (!ctx) return
  balls.forEach(ball => {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, 30, 0, Math.PI * 2)
    ctx.fillStyle = 'red'
    ctx.fill()
    ctx.closePath()
  })
}

setInterval(draw, 1)
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>