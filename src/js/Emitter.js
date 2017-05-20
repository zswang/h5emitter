"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*<function name="Emitter">*/
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
var Emitter = (function () {
    function Emitter() {
        /**
         * 事件列表
         */
        this.callbacks = [];
    }
    /**
     * 事件绑定
     *
     * @param event 事件名
     * @param fn 回调函数
     * @return 返回事件实例
     */
    Emitter.prototype.on = function (event, fn) {
        this.callbacks.push({
            event: event,
            fn: fn,
        });
        return this;
    };
    /**
     * 取消事件绑定
     *
     * @param event 事件名
     * @param fn 回调函数
     * @return返回事件实例
     */
    Emitter.prototype.off = function (event, fn) {
        this.callbacks = this.callbacks.filter(function (item) {
            return !(item.event === event && item.fn === fn);
        });
        return this;
    };
    /**
     * 事件绑定，只触发一次
     *
     * @param event 事件名
     * @param fn 回调函数
     * @return 返回事件实例
     */
    Emitter.prototype.once = function (event, fn) {
        function handler() {
            this.off(event, handler);
            fn.apply(this, arguments);
        }
        this.on(event, handler);
        return this;
    };
    /**
     * 触发事件
     *
     * @param event 事件名
     * @param fn 回调函数
     * @return 返回事件实例
     */
    Emitter.prototype.emit = function (event) {
        var _this = this;
        var argv = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            argv[_i - 1] = arguments[_i];
        }
        this.callbacks.filter(function (item) {
            return item.event === event;
        }).forEach(function (item) {
            item.fn.apply(_this, argv);
        });
        return this;
    };
    return Emitter;
}()); /*</function>*/
exports.Emitter = Emitter;
