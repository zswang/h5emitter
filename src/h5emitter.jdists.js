(function (exportName) {
  /*<jdists encoding="fndep" import="./js/Emitter.js" depend="Emitter" />*/

  var exports = {
      Emitter: Emitter
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