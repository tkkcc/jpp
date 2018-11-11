const fs = require('fs')
const jpg = require('./jpg')
const jpp = require('./jpp')
const psnr = (a, b) => {
  if (a.length !== b.length) return
  let sum = 0
  for (let i = 0; i < a.length; ++i) {
    sum += (a[i] - b[i]) ** 2
  }
  return 10 * Math.log10((255 * 255 * a.length) / sum)
}
const rgba2rgb = i => i.filter((_, i) => i % 4 !== 3)

// available test data: lena, black
const lena = { file: 'lena512color', width: 512, height: 512, quality: 12 }
const black = { file: 'black', width: 64, height: 64, quality: 80 }
// choose lenna
const { width, height, file, quality } = lena
if (file === black.file)
  fs.writeFileSync(file + '.rgba', new Uint8Array(width * height * 4).fill(0))
// choose test data

// load data rgbargbargba...
let a = fs.readFileSync(file + '.rgba')
// encode use standard jpg
let j = jpg.encode({ data: a, width, height }, quality) // jpg
// encode use jpg + aac(adaptive arithmetic codec)
let p0 = jpp.encode({ data: a, width, height }, quality) // jpg + aac
// encode use jpg + aac(adaptive arithmetic codec) + predict
let p1 = jpp.encode({ data: a, width, height }, quality*1.7, true) // jpg + aac + predict
// write to disk
fs.writeFileSync(file + '.jpg', j.data)
fs.writeFileSync(file + '_aac.jpp', p0.data)
fs.writeFileSync(file + '_aac_predict.jpp', p1.data)

// read from disk, same as x.data
j = fs.readFileSync(file + '.jpg')
p0 = fs.readFileSync(file + '_aac.jpp')
p1 = fs.readFileSync(file + '_aac_predict.jpp')

// return
// fs.writeFileSync('lena512color.jpg', b.data)
const pad = 18
const p = (i = '') => i.padStart(pad, ' ')
const f = i => i.toFixed(3).padStart(pad, ' ')
console.log(p() + p('jpg') + p('jpg+aac') + p('jpg+aac+predict'))
console.log(
  p('size/jpg') +
    p('1') +
    p(f(p0.length / j.length)) +
    p(f(p1.length / j.length))
)

j = jpg.decode(j).data
p0 = jpp.decode(p0).data
p1 = jpp.decode(p1).data
a = a.slice(0, j.length)
let [t1, t2, t3, t4] = [a, j, p0, p1].map(rgba2rgb)
console.log(
  p('psnr(db)') + p(f(psnr(t1, t2))) + p(f(psnr(t1, t3))) + p(f(psnr(t1, t4)))
)

// p1 = jpp.encode({ data: a, width, height }, quality-10, true).data
// p1 = jpp.decode(p1).data

// show in html format, need canvas dependency
try {
  const { createImageData, createCanvas, loadImage } = require('canvas')
  const canvas = createCanvas(1920, 1080 * 10)
  const ctx = canvas.getContext('2d')
  a = new Uint8ClampedArray(p1)
  a = createImageData(a, width)
  ctx.putImageData(a, 0, 0)
  ctx.putImageData(a, 0, 1080)
  fs.writeFileSync('test.html', '<img src="' + canvas.toDataURL() + '" />')
  console.log('open test.html in browser')
} catch (e) {
  // console.log('run `npm install` to generate html')
}
