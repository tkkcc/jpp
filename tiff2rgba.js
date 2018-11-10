// convert lena512color.tiff to rgba and jpg
var fs = require('fs')
var jpeg = require('./jpg')
var UTIF = require('utif')
var a = fs.readFileSync('lena512color.tiff')
var ifds = UTIF.decode(a)
UTIF.decodeImages(a, ifds)
a = UTIF.toRGBA8(ifds[0])
fs.writeFileSync('lena512color.rgba', a)
a = {
  data: a,
  width: 512,
  height: 512
}
a = jpeg.encode(a, 100)
fs.writeFileSync('lena512color.jpg', a.data)
