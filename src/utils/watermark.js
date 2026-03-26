export default function watermark({
  container = document.body,
  width = '250px',
  height = '120px',
  textAlign = 'left',
  textBaseline = 'Middle',
  font = "12px 'Vedana'",
  fillStyle = 'rgba(134, 144, 156, 0.1)',
  content = '',
  rotate = -10 * Math.PI / 180,
  zIndex = 19999
} = {}) {
  const canvas = document.createElement('canvas')
  canvas.setAttribute('width', width)
  canvas.setAttribute('height', height)
  const ctx = canvas.getContext('2d')
  ctx.textAlign = textAlign
  ctx.textBaseline = textBaseline
  ctx.font = font
  ctx.fillStyle = fillStyle
  ctx.rotate(rotate)
  ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2)
  const base64Url = canvas.toDataURL()
  const watermarkDiv = document.createElement('div')
  watermarkDiv.setAttribute('style', `
		position:fixed;
		top:0;
		left:0;
		width:100%;
		height:100%;
		z-index:${zIndex};
		pointer-events:none;
		background-repeat:repeat;
		background-image:url('${base64Url}')`)
  container.style.position = 'relative'
  container.insertBefore(watermarkDiv, container.firstChild)
}
