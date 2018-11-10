const jpg = require('jpg')
const jpp = require('jpp')

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
const prefix= 'https://raw.githubusercontent.com/tkkcc/jpp/master/lena512color.rgba'
const lena = { file: 'lena512color', width: 512, height: 501, quality: 40 }
const black = { file: 'black', width: 64, height: 64, quality: 80 }
const { width, height, file, quality } = lena
const main = async ()=>{
	
	let a = await fetch('index.html').then(i=>i.arrayBuffer())
	console.log(a)
}
main()
// reader.readAsArrayBuffer('https://facebook.github.io/react-native/movies.json')
if (window.Worker) {
  var myWorker = new Worker('worker.js')
  // first.onchange = function() {
  //   myWorker.postMessage([first.value,second.value]); // Sending message as an array to the worker
  //   console.log('Main (first.onchange): Message posted to worker');
  // }

  // second.onchange = function() {
  //   myWorker.postMessage([first.value,second.value]);
  //   console.log('Main (second.onchange): Message posted to worker');
  // }

  // myWorker.onmessage = function(e) {
  // 	result.textContent = e.data;
  // 	console.log('Main (myWorker.onmessage): Message received from worker');
  // }
} else {
	document.write('browser don\'t support worker')
}
// const reader = new FileReader();
// reader.onload = () => {
// 	console.log('onload')
// }
