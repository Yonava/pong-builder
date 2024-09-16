import { ref, onMounted, type Ref } from 'vue';
import type { Ball, BallSettings, Barrier, Mode, CanvasEvent, Color } from './types';
import { borderCollision, barrierCollision } from './collision';

export function usePong(canvas: Ref<HTMLCanvasElement>) {
  const balls = ref<Ball[]>([])
  const barriers = ref<Barrier[]>([])
  const previewBarrier = ref<Barrier | null>(null)

  const ballSettings = ref<BallSettings>({
    radius: 50,
    color: 'green',
    speed: 5
  })

  const addBall = (x: number, y: number) => {
    balls.value.push({
      x,
      y,
      dx: (Math.random() > 0.5 ? 1 : -1) * ballSettings.value.speed,
      dy: (Math.random() > 0.5 ? 1 : -1) * ballSettings.value.speed,
      radius: ballSettings.value.radius,
      color: ballSettings.value.color
    })
  }

  const addBarrier = (barrier: Barrier) => {
    // validate the barrier

    // invalid dimensions
    if (barrier.topLeft.x > barrier.bottomRight.x || barrier.topLeft.y > barrier.bottomRight.y) {
      return
    }

    const MIN_SURFACE_AREA = 100
    const width = barrier.bottomRight.x - barrier.topLeft.x
    const height = barrier.bottomRight.y - barrier.topLeft.y
    const surfaceArea = width * height

    // too small
    if (surfaceArea < MIN_SURFACE_AREA) {
      return
    }

    barriers.value.push(barrier)
  }

  const reset = () => {
    balls.value = []
    barriers.value = []
  }

  const drawBall = (ball: Ball, ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
    ctx.fillStyle = ball.color
    ctx.fill()
    ctx.closePath()
  }

  const drawBarrier = (barrier: Barrier, color: Color, ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    ctx.rect(barrier.topLeft.x, barrier.topLeft.y, barrier.bottomRight.x - barrier.topLeft.x, barrier.bottomRight.y - barrier.topLeft.y)
    ctx.fillStyle = color
    ctx.fill()
    ctx.closePath()
  }

  const updateBallPositions = () => {
    balls.value.forEach(ball => {
      ball.x += ball.dx
      ball.y += ball.dy

      borderCollision(ball, canvas.value)
      barrierCollision(ball, barriers.value)
    })
  }

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

    updateBallPositions()

    balls.value.forEach(ball => {
      drawBall(ball, ctx)
    })

    barriers.value.forEach(barrier => {
      drawBarrier(barrier, 'blue', ctx)
    })

    if (previewBarrier.value) {
      drawBarrier(previewBarrier.value, 'green', ctx)
    }

    requestAnimationFrame(() => draw(ctx))
  }

  onMounted(() => {
    const ctx = canvas.value.getContext('2d')
    if (!ctx) return
    draw(ctx)
  })

  return {
    addBall,
    addBarrier,
    previewBarrier,
    reset,
    ballSettings
  }
}