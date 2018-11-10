const v = (data, top) => {
  if (!top) return
  for (let i = 0; i < 8; ++i)
    for (let j = 0; j < 8; ++j) data[i * 8 + j] = top[j]
}

const h = (data, left) => {
  if (!left) return

  for (let i = 0; i < 8; ++i)
    for (let j = 0; j < 8; ++j) data[i * 8 + j] = left[i]
}

const dc = (data, top, left) => {
  let v
  if (top && left) {
    v = (top.reduce((a, c) => a + c) + left.reduce((a, c) => a + c) + 8) >> 4
  } else if (top) {
    v = (top.reduce((a, c) => a + c) + 4) >> 3
  } else if (left) {
    v = (left.reduce((a, c) => a + c) + 4) >> 3
  } else 
    v=0
  for (let i = 0; i < 64; ++i) data[i] = v
}

const ddl = (data, top) => {
  if (!top) return

  data[0] = (top[0] + 2 * top[1] + top[2] + 2) >> 2
  data[1] = (top[1] + 2 * top[2] + top[3] + 2) >> 2
  data[2] = (top[2] + 2 * top[3] + top[4] + 2) >> 2
  data[3] = (top[3] + 2 * top[4] + top[5] + 2) >> 2
  data[4] = (top[4] + 2 * top[5] + top[6] + 2) >> 2
  data[5] = (top[5] + 2 * top[6] + top[7] + 2) >> 2
  data[6] = (top[6] + 2 * top[7] + top[8] + 2) >> 2
  data[7] = (top[7] + 2 * top[8] + top[9] + 2) >> 2

  data[15] = (top[8] + 2 * top[9] + top[10] + 2) >> 2
  data[23] = (top[9] + 2 * top[10] + top[11] + 2) >> 2
  data[31] = (top[10] + 2 * top[11] + top[12] + 2) >> 2
  data[39] = (top[11] + 2 * top[12] + top[13] + 2) >> 2
  data[47] = (top[12] + 2 * top[13] + top[14] + 2) >> 2
  data[55] = (top[13] + 2 * top[14] + top[15] + 2) >> 2
  data[63] = (top[14] + 3 * top[15] + 2) >> 2
  for (let i = 6; i >= 0; --i)
    for (let j = 0; j < 7; ++j) data[i * 8 + j] = data[(i - 1) * 8 + j + 1]
}

const ddr = (data, top, left, corner) => {
  if (!top || !left || !corner) return

  data[0] = (top[0] + 2 * corner + left[0] + 2) >> 2
  data[1] = (corner + 2 * top[0] + top[1] + 2) >> 2
  data[2] = (top[0] + 2 * top[1] + top[2] + 2) >> 2
  data[3] = (top[1] + 2 * top[2] + top[3] + 2) >> 2
  data[4] = (top[2] + 2 * top[3] + top[4] + 2) >> 2
  data[5] = (top[3] + 2 * top[4] + top[5] + 2) >> 2
  data[6] = (top[4] + 2 * top[5] + top[6] + 2) >> 2
  data[7] = (top[5] + 2 * top[6] + top[7] + 2) >> 2

  data[8] = (corner + 2 * left[0] + left[1] + 2) >> 2
  data[16] = (left[0] + 2 * left[1] + left[2] + 2) >> 2
  data[24] = (left[1] + 2 * left[2] + left[3] + 2) >> 2
  data[32] = (left[2] + 2 * left[3] + left[4] + 2) >> 2
  data[40] = (left[3] + 2 * left[4] + left[5] + 2) >> 2
  data[48] = (left[4] + 2 * left[5] + left[6] + 2) >> 2
  data[56] = (left[5] + 2 * left[6] + left[7] + 2) >> 2
  for (let i = 1; i < 8; ++i)
    for (let j = 1; j < 8; ++j) data[i * 8 + j] = data[(i - 1) * 8 + j - 1]
}

const vr = (data, top, left, corner) => {
  if (!top || !left || !corner) return

  data[0] = (corner + top[0] + 1) >> 1
  data[1] = (top[0] + top[1] + 1) >> 1
  data[2] = (top[1] + top[2] + 1) >> 1
  data[3] = (top[2] + top[3] + 1) >> 1
  data[4] = (top[3] + top[4] + 1) >> 1
  data[5] = (top[4] + top[5] + 1) >> 1
  data[6] = (top[5] + top[6] + 1) >> 1
  data[7] = (top[6] + top[7] + 1) >> 1

  data[8] = (top[0] + 2 * corner + left[0] + 2) >> 2
  data[9] = (corner + 2 * top[0] + top[1] + 2) >> 2
  data[10] = (top[0] + 2 * top[1] + top[2] + 2) >> 2
  data[11] = (top[1] + 2 * top[2] + top[3] + 2) >> 2
  data[12] = (top[2] + 2 * top[3] + top[4] + 2) >> 2
  data[13] = (top[3] + 2 * top[4] + top[5] + 2) >> 2
  data[14] = (top[4] + 2 * top[5] + top[6] + 2) >> 2
  data[15] = (top[5] + 2 * top[6] + top[7] + 2) >> 2

  data[16] = (left[1] + 2 * left[0] + corner + 2) >> 2
  data[24] = (left[2] + 2 * left[1] + left[0] + 2) >> 2
  data[32] = (left[3] + 2 * left[2] + left[1] + 2) >> 2
  data[40] = (left[4] + 2 * left[3] + left[2] + 2) >> 2
  data[48] = (left[5] + 2 * left[4] + left[3] + 2) >> 2
  data[56] = (left[6] + 2 * left[5] + left[4] + 2) >> 2

  for (let i = 2; i < 8; ++i)
    for (let j = 1; j < 8; ++j) data[i * 8 + j] = data[(i - 2) * 8 + j - 1]
}

const hd = (data, top, left, corner) => {
  if (!top || !left || !corner) return

  data[0] = (corner + left[0] + 1) >> 1
  data[1] = (top[0] + 2 * corner + left[0] + 2) >> 2
  data[2] = (top[1] + 2 * top[0] + corner + 2) >> 2
  data[3] = (top[2] + 2 * top[1] + top[0] + 2) >> 2
  data[4] = (top[3] + 2 * top[2] + top[1] + 2) >> 2
  data[5] = (top[4] + 2 * top[3] + top[2] + 2) >> 2
  data[6] = (top[5] + 2 * top[4] + top[3] + 2) >> 2
  data[7] = (top[6] + 2 * top[5] + top[4] + 2) >> 2

  data[8] = (left[0] + left[1] + 1) >> 1
  data[9] = (corner + 2 * left[0] + left[1] + 2) >> 2
  data[16] = (left[1] + left[2] + 1) >> 1
  data[17] = (left[0] + 2 * left[1] + left[2] + 2) >> 2
  data[24] = (left[2] + left[3] + 1) >> 1
  data[25] = (left[1] + 2 * left[2] + left[3] + 2) >> 2
  data[32] = (left[3] + left[4] + 1) >> 1
  data[33] = (left[2] + 2 * left[3] + left[4] + 2) >> 2
  data[40] = (left[4] + left[5] + 1) >> 1
  data[41] = (left[3] + 2 * left[4] + left[5] + 2) >> 2
  data[48] = (left[5] + left[6] + 1) >> 1
  data[49] = (left[4] + 2 * left[5] + left[6] + 2) >> 2
  data[56] = (left[6] + left[7] + 1) >> 1
  data[57] = (left[5] + 2 * left[6] + left[7] + 2) >> 2

  for (let i = 1; i < 8; ++i)
    for (let j = 2; j < 8; ++j) data[i * 8 + j] = data[(i - 1) * 8 + j - 2]
}

const vl = (data, top) => {
  if (!top) return

  data[0] = (top[0] + top[1] + 1) >> 1
  data[1] = (top[1] + top[2] + 1) >> 1
  data[2] = (top[2] + top[3] + 1) >> 1
  data[3] = (top[3] + top[4] + 1) >> 1
  data[4] = (top[4] + top[5] + 1) >> 1
  data[5] = (top[5] + top[6] + 1) >> 1
  data[6] = (top[6] + top[7] + 1) >> 1
  data[7] = (top[7] + top[8] + 1) >> 1

  data[8] = (top[0] + 2 * top[1] + top[2] + 2) >> 2
  data[9] = (top[1] + 2 * top[2] + top[3] + 2) >> 2
  data[10] = (top[2] + 2 * top[3] + top[4] + 2) >> 2
  data[11] = (top[3] + 2 * top[4] + top[5] + 2) >> 2
  data[12] = (top[4] + 2 * top[5] + top[6] + 2) >> 2
  data[13] = (top[5] + 2 * top[6] + top[7] + 2) >> 2
  data[14] = (top[6] + 2 * top[7] + top[8] + 2) >> 2
  data[15] = (top[7] + 2 * top[8] + top[9] + 2) >> 2

  data[23] = (top[8] + top[9] + 1) >> 1
  data[31] = (top[8] + 2 * top[9] + top[10] + 2) >> 2
  data[39] = (top[9] + top[10] + 1) >> 1
  data[47] = (top[9] + 2 * top[10] + top[11] + 2) >> 2
  data[55] = (top[10] + top[11] + 1) >> 1
  data[63] = (top[10] + 2 * top[11] + top[12] + 2) >> 2

  for (let i = 2; i < 8; ++i)
    for (let j = 6; j >= 0; --j) data[i * 8 + j] = data[(i - 2) * 8 + j + 1]
}

const hu = (data, left) => {
  if (!left) return

  data[0] = (left[0] + left[1] + 1) >> 1
  data[1] = (left[0] + 2 * left[1] + left[2] + 2) >> 2
  data[8] = (left[1] + left[2] + 1) >> 1
  data[9] = (left[1] + 2 * left[2] + left[3] + 2) >> 2
  data[16] = (left[2] + left[3] + 1) >> 1
  data[17] = (left[2] + 2 * left[3] + left[4] + 2) >> 2
  data[24] = (left[3] + left[4] + 1) >> 1
  data[25] = (left[3] + 2 * left[4] + left[5] + 2) >> 2
  data[32] = (left[4] + left[5] + 1) >> 1
  data[33] = (left[4] + 2 * left[5] + left[6] + 2) >> 2
  data[40] = (left[5] + left[6] + 1) >> 1
  data[41] = (left[5] + 2 * left[6] + left[7] + 2) >> 2

  data[48] = (left[6] + left[7] + 1) >> 1
  data[49] = (left[6] + 3 * left[7] + 2) >> 2
  data[56] = data[57] = data[58] = data[59] = data[60] = data[61] = data[62] = data[63] =
    left[7]

  for (let i = 6; i >= 0; --i)
    for (let j = 2; j < 8; ++j) data[i * 8 + j] = data[(i + 1) * 8 + j - 2]
}

function predict(data, blocks, row, mode, yuv, inverse = false,step=3) {
  // const t = new Int16Array(64)
  const t = Array(64)
  const index = blocks.length + yuv
  // const step = 3 // [y,u,v,y,u,v...]
  let left, top, corner

  // not left
  if (index % row >= step)
    left = [7, 15, 23, 31, 39, 47, 55, 63].map(i => blocks[index - step][i])
  // not top and not right
  if (index >= row && (index % row) + step < row) {
    let a = blocks[index - row].slice(56)
    let b = blocks[index - row + step].slice(56)
    top = new Int16Array(16)
    top.set(a)
    top.set(b, 8)
  }
  // not top and not left
  if (index % row >= step && index >= row) {
    corner = blocks[index - row - step][63]
  }

  switch (mode) {
    case 0:
      v(t, top)
      break
    case 1:
      h(t, left)
      break
    case 2:
      dc(t, top, left)
      break
    case 3:
      ddl(t, top)
      break
    case 4:
      ddr(t, top, left, corner)
      break
    case 5:
      vr(t, top, left, corner)
      break
    case 6:
      hd(t, top, left, corner)
      break
    case 7:
      vl(t, top)
      break
    case 8:
      hu(t, left)
      break
  }
  // mode not available
  if (t[0]===undefined) return
  if (inverse) for (let i = 0; i < 64; ++i) t[i] = data[i] + t[i]
  else for (let i = 0; i < 64; ++i) t[i] = data[i] - t[i]
  return t
}
module.exports = predict
