const jpg = require('jpg')
const jpp = require('jpp')
const logger = document.querySelector('pre')
// const text  = document.querySelectorAll('')
const canvas = [...document.querySelectorAll('canvas')]
const ctx = canvas.map(i => i.getContext('2d'))
const input = document.querySelector('#quality')
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
  data += '\n'
  requestAnimationFrame(() => {
    if (append) logger.innerHTML += data
    else logger.innerHTML = data
  })
}
// available test data: lena, black
const lena = { file: 'lena512color', width: 512, height: 512, quality: 40 }
const black = { file: 'black', width: 64, height: 64, quality: 80 }
let { width, height, file, quality } = lena
let data
// const white = new ImageData(
//   new Uint8ClampedArray(width * height * 4).fill(0),
//   width
// )
// console.log(white)
const main = async () => {
  let a = new Uint8Array(data)
  let aa = new Uint8ClampedArray(a)
  aa = new ImageData(aa, width)
  for (let i = 0; i < 4; ++i) {
    canvas[i].width = width
    canvas[i].height = height
  }
  ctx[0].putImageData(aa, 0, 0)

  // encode use standard jpg
  let j = jpg.encode({ data: a, width, height }, quality) // jpg
  // encode use jpg + aac(adaptive arithmetic codec)
  let p0 = jpp.encode({ data: a, width, height }, quality) // jpg + aac
  // encode use jpg + aac(adaptive arithmetic codec) + predict
  let p1 = jpp.encode({ data: a, width, height }, quality * 1.1, true) // jpg + aac + predict

  j = j.data
  p0 = p0.data
  p1 = p1.data

  const pad = 18
  const p = (i = '') => i.padStart(pad, ' ')
  const f = i => i.toFixed(3).padStart(pad, ' ')
  log(p() + p('jpg') + p('jpg+aac') + p('jpg+aac+predict'))
  log(p('quality') + p(f(quality)) + p(f(quality)) + p(f(quality * 1.1)), true)
  log(
    p('size/jpg') +
      p('1') +
      p(f(p0.length / j.length)) +
      p(f(p1.length / j.length)),
    true
  )

  j = jpg.decode(j).data
  ctx[1].putImageData(new ImageData(new Uint8ClampedArray(j), width), 0, 0)

  p0 = jpp.decode(p0).data
  ctx[2].putImageData(new ImageData(new Uint8ClampedArray(p0), width), 0, 0)

  p1 = jpp.decode(p1).data
  ctx[3].putImageData(new ImageData(new Uint8ClampedArray(p1), width), 0, 0)
  // a = a.slice(0, j.length)
  let [t1, t2, t3, t4] = [a, j, p0, p1].map(rgba2rgb)
  log(
    p('psnr(db)') +
      p(f(psnr(t1, t2))) +
      p(f(psnr(t1, t3))) +
      p(f(psnr(t1, t4))),
    true
  )
}
;(async () => {
  let a = await fetch('../' + file + '.rgba')
  a = await a.arrayBuffer()
  data = a.slice(0, width * height * 4)
  main()
})()
// main()
// document.querySelector('input[type=file]').addEventListener(
//   'change',
//   e => {
//     const f = e.target.files[0]
//     const reader = new FileReader()
//     reader.onload = e => {
//       let j = jpg.decode(e.target.result)
//       if (j.data.length > 10000000) {
//         log('try smaller jpg image')
//       }
//       width = j.width
//       height = j.height
//       data = j.data
//       main()
//     }
//     reader.readAsArrayBuffer(f)
//   },
//   false
// )
input.addEventListener('keyup', e => {
  if (e.keyCode === 13) {
    if (input.value > 55) input.value = 55
    else if (input.value < 1) input.value = 1
    quality = parseInt(input.value)
    main()
  }
})
