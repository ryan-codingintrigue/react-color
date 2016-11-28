import serverCanvas from 'canvas'

const checkboardCache = {}

export function render(c1, c2, size) {
  const canvas = typeof document !== 'undefined' ?
    document.createElement('canvas') :
    new serverCanvas
  canvas.width = canvas.height = size * 2
  const ctx = canvas.getContext('2d')
  if (!ctx) return null // If no context can be found, return early.
  ctx.fillStyle = c1
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = c2
  ctx.fillRect(0, 0, size, size)
  ctx.translate(size, size)
  ctx.fillRect(0, 0, size, size)
  return canvas.toDataURL()
}

export function get(c1, c2, size) {
  const key = `${ c1 },${ c2 }, ${ size }`
  const checkboard = render(c1, c2, size)

  if (checkboardCache[key]) {
    return checkboardCache[key]
  }
  checkboardCache[key] = checkboard
  return checkboard
}
