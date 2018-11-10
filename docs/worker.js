const jpg = require('jpg')
const jpp = require('jpp')
const f=[jpg.encode,jpp.encode,jpp.encode_predict,jpg.decode,jpp.decode]
onmessage = function(e) {
  // encode use standard jpg
  // let j = jpg.encode({ data: a, width, height }, quality) // jpg
  // encode use jpg + aac(adaptive arithmetic codec)
  // let p0 = jpp.encode({ data: a, width, height }, quality) // jpg + aac
  // encode use jpg + aac(adaptive arithmetic codec) + predict
  // let p1 = jpp.encode({ data: a, width, height }, quality * 1.1, true) // jpg + aac + predict
  const [ type,...data ] = e.data
  const result = f[type](...data)
  postMessage({ type, 'data':result })
}
