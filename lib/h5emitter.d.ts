interface IEventHandler {
    event: string;
    fn: Function;
}
export { IEventHandler };
/**
 * @file h5emitter
 * @url https://github.com/zswang/h5emitter.git
 * event emitter function
 * @author
 *   zswang (http://weibo.com/zswang)
 * @version 3.0.0
 * @date 2017-11-01
 * @license MIT
 */
/**
 * 创建事件对象
 '''<example>'''
 * @example base
  ```js
  var emitter = new h5emitter.Emitter();
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
declare class Emitter {
    /**
     * 事件列表
     */
    private callbacks;
    /**
     * 事件绑定
     *
     * @param event 事件名
     * @param fn 回调函数
     * @return 返回事件实例
     */
    on(event: string, fn: Function): Emitter;
    /**
     * 取消事件绑定
     *
     * @param event 事件名
     * @param fn 回调函数
     * @return返回事件实例
     */
    off(event: string, fn: Function): Emitter;
    /**
     * 事件绑定，只触发一次
     *
     * @param event 事件名
     * @param fn 回调函数
     * @return 返回事件实例
     */
    once(event: string, fn: Function): Emitter;
    /**
     * 触发事件
     *
     * @param event 事件名
     * @param fn 回调函数
     * @return 返回事件实例
     */
    emit(event: string, ...argv: any[]): Emitter;
}
export { Emitter };
