interface Emitter {
  on(event: string, fn: Function)
  off(event: string, fn: Function)
  once(event: string, fn: Function)
  emit(event: string, ...agrv)
}

interface EventHandler {
  event: string
  fn: Function
}

/*<function name="createEmitter">*/
/*<jdists encoding="ejs" data="../../package.json">*/
/**
 * @file <%- name %>
 <% if (typeof repository != 'undefined') { %>
 * @url <%- repository.url %>
 <% } %>
 * <%- description %>
 * @author
     <% (author instanceof Array ? author : [author]).forEach(function (item) { %>
 *   <%- item.name %> (<%- item.url %>)
     <% }); %>
 * @version <%- version %>
     <% var now = new Date() %>
 * @date <%- [
      now.getFullYear(),
      now.getMonth() + 101,
      now.getDate() + 100
    ].join('-').replace(/-1/g, '-') %>
 * @license <%- license %>
 */
/*</jdists>*/

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
function createEmitter(): Emitter {
  /**
   * 事件对象实例
   *
   * @type {Object}
   */
  let instance: Emitter;

  /**
   * 事件列表
   */
  let callbacks: EventHandler[] = []

  /**
   * 事件绑定
   *
   * @param event 事件名
   * @param fn 回调函数
   * @return 返回事件实例
   */
  function on(event: string, fn: Function): Emitter {
    callbacks.push({
      event: event,
      fn: fn,
    })
    return instance
  }

  /**
   * 取消事件绑定
   *
   * @param event 事件名
   * @param fn 回调函数
   * @return返回事件实例
   */
  function off(event: string, fn: Function): Emitter {
    callbacks = callbacks.filter((item) => {
      return !(item.event === event && item.fn === fn)
    })
    return instance
  }

  /**
   * 事件绑定，只触发一次
   *
   * @param event 事件名
   * @param fn 回调函数
   * @return 返回事件实例
   */
  function once(event: string, fn: Function): Emitter {
    function handler() {
      off(event, handler)
      fn.apply(instance, arguments)
    }

    on(event, handler)
    return instance
  }

  /**
   * 触发事件
   *
   * @param event 事件名
   * @param fn 回调函数
   * @return 返回事件实例
   */
  function emit(event: string, ...argv): Emitter {
    callbacks.filter((item) => {
      return item.event === event
    }).forEach(function (item) {
      item.fn.apply(instance, argv)
    });
    return instance;
  }

  instance = {
    emit: emit,
    on: on,
    off: off,
    once: once,
  }

  return instance
} /*</function>*/

export {
  createEmitter
}