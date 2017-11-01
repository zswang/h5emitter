h5emitter
-----------

# [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coverage-image]][coverage-url]

emitter event function.

## Install 安装

```sh
$ npm install --save h5emitter
```

## Usage 使用方法

### 绑定和触发事件 bind and trigger events

```js
var emitter = new h5emitter.Emitter()

emitter.on('update', function (value) {
  console.log(value)
})

emitter.emit('update', 'hello')
```

## License

MIT © [zswang](http://weibo.com/zswang)

[npm-url]: https://npmjs.org/package/h5emitter
[npm-image]: https://badge.fury.io/js/h5emitter.svg
[travis-url]: https://travis-ci.org/zswang/h5emitter
[travis-image]: https://travis-ci.org/zswang/h5emitter.svg?branch=master
[coverage-url]: https://coveralls.io/github/zswang/h5emitter?branch=master
[coverage-image]: https://coveralls.io/repos/zswang/h5emitter/badge.svg?branch=master&service=github