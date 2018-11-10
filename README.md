### node port

```sh
yarn install
node test.js
```

### browser port

[live demo](https://tkkcc.github.io/jpp/docs)

```sh
# generate from node
browserify -r ./jpg:jpg -r ./jpp:jpp -o docs/bundle.js
```

### credit

[jpeg-js](https://github.com/eugeneware/jpeg-js)

[h264 intra prediction](https://github.com/mbebenita/Broadway/blob/master/Decoder/src/h264bsd_intra_prediction.c)

[adaptive arithmetic codec](https://github.com/tkkcc/aac)