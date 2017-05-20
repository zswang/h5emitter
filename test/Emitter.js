
global.h5emitter = require('../h5emitter.js');
      

describe("src/ts/Emitter.ts", function () {
  var assert = require('should');
  var util = require('util');
  var examplejs_printLines;
  function examplejs_print() {
    examplejs_printLines.push(util.format.apply(util, arguments));
  }
  
  

  it("base", function () {
    examplejs_printLines = [];
  var emitter = new h5emitter.Emitter();
  emitter.on('click', function (data) {
    examplejs_print('on', data);
  });
  emitter.once('click', function (data) {
    examplejs_print('once', data);
  });
  function bee(data) {
    examplejs_print('bee', data);
  }
  emitter.on('click', bee);
  emitter.on('click2', function (data) {
    examplejs_print('on', data);
  });
  emitter.emit('click2', 'hello 1');
  assert.equal(examplejs_printLines.join("\n"), "on hello 1"); examplejs_printLines = [];
  emitter.emit('click', 'hello 1');
  assert.equal(examplejs_printLines.join("\n"), "on hello 1\nonce hello 1\nbee hello 1"); examplejs_printLines = [];
  emitter.emit('click', 'hello 2');
  assert.equal(examplejs_printLines.join("\n"), "on hello 2\nbee hello 2"); examplejs_printLines = [];
  emitter.off('click', bee);
  emitter.emit('click', 'hello 3');
  assert.equal(examplejs_printLines.join("\n"), "on hello 3"); examplejs_printLines = [];
  });
          
});
         