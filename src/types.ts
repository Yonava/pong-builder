export type Color = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange'

export type BallSettings = {
  speed: number
  radius: number
  color: Color
}

export type Ball = {
  x: number
  y: number
  dx: number
  dy: number
  color: Color
  radius: number
}

export type Barrier = {
  topLeft: { x: number, y: number }
  bottomRight: { x: number, y: number }
}