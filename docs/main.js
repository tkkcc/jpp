
const logger = document.querySelector('pre')
const ctx = document.querySelector('canvas').getContext('2d')
const worker= new Worker('worker.js')
const psnr = (a, b) => {
  if (a.length !== b.length) return
  let sum = 0
  for (let i = 0; i < a.length; ++i) {
    sum += (a[i] - b[i]) ** 2
  }
  return 10 * Math.log10((255 * 255 * a.length) / sum)
}
const rgba2rgb = i => i.filter((_, i) => i % 4 !== 3)
const log = (data, append = false) => {
  requestAnimationFrame(() => {
    if (append) logger.innerHTML += data
    else logger.innerHTML = data
  })
}
// available test data: lena, black
const lena = { file: 'lena512color', width: 512, height: 501, quality: 40 }
const black = { file: 'black', width: 64, height: 64, quality: 80 }
const { width, height, file, quality } = lena
const main = async () => {
  let a = await fetch('../' + file + '.rgba')
  a = await a.arrayBuffer()
  a = new Uint8Array(a)
  // encode use standard jpg
  worker.postMessage(0,{ data: a, width, height }, quality)
  // encode use jpg + aac(adaptive arithmetic codec)
  worker.postMessage(1,{ data: a, width, height }, quality)
  // encode use jpg + aac(adaptive arithmetic codec) + predict
  worker.postMessage(2,{ data: a, width, height }, quality*1.1)
  worker.onmessage=e => {
    const { type, data } = e
    
    // j = j.data
    // p0 = p0.data
    // p1 = p1.data
  }

  return

  // fs.writeFileSync('lena512color.jpg', b.data)
  const pad = 18
  const p = (i = '') => i.padStart(pad, ' ')
  const f = i => i.toFixed(2).padStart(pad, ' ')
  log(p() + p('jpg') + p('jpg+aac') + p('jpg+aac+predict'))
  log(
    p('size/jpg') +
      p('1') +
      p(f(p0.length / j.length)) +
      p(f(p1.length / j.length)),
    true
  )

  j = jpg.decode(j).data
  p0 = jpp.decode(p0).data
  p1 = jpp.decode(p1).data
  a = a.slice(0, j.length)
  let [t1, t2, t3, t4] = [a, j, p0, p1].map(rgba2rgb)
  log(
    p('psnr(db)') +
      p(f(psnr(t1, t2))) +
      p(f(psnr(t1, t3))) +
      p(f(psnr(t1, t4))),
    true
  )
  a = new Uint8ClampedArray(p1)
  a = createImageData(a, width)
  ctx.putImageData(a, 0, 0)
  // ctx.putImageData(a, 0, 1080)
}
main()