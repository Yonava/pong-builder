import type { Ball, Barrier } from './types';

export const borderCollision = (ball: Ball, canvas: HTMLCanvasElement) => {
  if ((ball.x - ball.radius) < 0 || (ball.x + ball.radius) > canvas.width) {
    ball.dx = -ball.dx
  }

  if ((ball.y - ball.radius) < 0 || (ball.y + ball.radius) > canvas.height) {
    ball.dy = -ball.dy
  }
}

export const barrierCollision = (ball: Ball, barriers: Barrier[], buffer = 7) => {
  const withinRange = (value: number, range: number[]) => {
    return value >= range[0] && value <= range[1]
  }

  const isPointInBox = (point: number[], box: number[][]) => {
    const rangeOfAllowableX = [box[0][0] - ball.radius, box[1][0] + ball.radius]
    const rangeOfAllowableY = [box[0][1] - ball.radius, box[1][1] + ball.radius]
    const collidingX = withinRange(point[0], rangeOfAllowableX)
    const collidingY = withinRange(point[1], rangeOfAllowableY)
    return collidingX && collidingY
  }

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
      break
    }

    if (isPointInBox(ballLocation, s)) {
      ball.dy = -ball.dy
      break
    }

    if (isPointInBox(ballLocation, e)) {
      ball.dx = -ball.dx
      break
    }

    if (isPointInBox(ballLocation, w)) {
      ball.dx = -ball.dx
      break
    }

    if (isPointInBox(ballLocation, nw)) {
      ball.dx = -ball.dx
      ball.dy = -ball.dy
      break
    }

    if (isPointInBox(ballLocation, ne)) {
      ball.dx = -ball.dx
      ball.dy = -ball.dy
      break
    }

    if (isPointInBox(ballLocation, se)) {
      ball.dx = -ball.dx
      ball.dy = -ball.dy
      break
    }

    if (isPointInBox(ballLocation, sw)) {
      ball.dx = -ball.dx
      ball.dy = -ball.dy
      break
    }
  }
}