(function (exportName) {
  /*<function name="createEmitter">*/
/**
 * 创建事件对象
 '''<example>'''
 * @example base
  ```js
  var emitter = h5emitter.createEmitter();
  emitter.on('click', function (data) {
    console.log('on', data);
  });
  emitter.once('click', function (data) {
    console.log('once', data);
  });
  function bee(data) {
    console.log('bee', data);
  }
  emitter.on('click', bee);
  emitter.on('click2', function (data) {
    console.log('on', data);
  });
  emitter.emit('click2', 'hello 1');
  // > on hello 1
  emitter.emit('click', 'hello 1');
  // > on hello 1
  // > once hello 1
  // > bee hello 1
  emitter.emit('click', 'hello 2');
  // > on hello 2
  // > bee hello 2
  emitter.off('click', bee);
  emitter.emit('click', 'hello 3');
  // > on hello 3
  ```
 '''</example>'''
 */
function createEmitter() {
    /**
     * 事件对象实例
     *
     * @type {Object}
     */
    var instance;
    /**
     * 事件列表
     */
    var callbacks = [];
    /**
     * 事件绑定
     *
     * @param event 事件名
     * @param fn 回调函数
     * @return 返回事件实例
     */
    function on(event, fn) {
        callbacks.push({
            event: event,
            fn: fn,
        });
        return instance;
    }
    /**
     * 取消事件绑定
     *
     * @param event 事件名
     * @param fn 回调函数
     * @return返回事件实例
     */
    function off(event, fn) {
        callbacks = callbacks.filter(function (item) {
            return !(item.event === event && item.fn === fn);
        });
        return instance;
    }
    /**
     * 事件绑定，只触发一次
     *
     * @param event 事件名
     * @param fn 回调函数
     * @return 返回事件实例
     */
    function once(event, fn) {
        function handler() {
            off(event, handler);
            fn.apply(instance, arguments);
        }
        on(event, handler);
        return instance;
    }
    /**
     * 触发事件
     *
     * @param event 事件名
     * @param fn 回调函数
     * @return 返回事件实例
     */
    function emit(event) {
        var argv = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            argv[_i - 1] = arguments[_i];
        }
        callbacks.filter(function (item) {
            return item.event === event;
        }).forEach(function (item) {
            item.fn.apply(instance, argv);
        });
        return instance;
    }
    instance = {
        emit: emit,
        on: on,
        off: off,
        once: once,
    };
    return instance;
} /*</function>*/
  var exports = {
      createEmitter: createEmitter
  };
  /* istanbul ignore next */
  if (typeof define === 'function') {
    if (define.amd || define.cmd) {
      define(function() {
        return exports;
      });
    }
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = exports;
  } else {
    window[exportName] = exports;
  }
})('h5emitter');