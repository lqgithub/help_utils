// (function(root, factory) {
//     if (typeof define === 'function' && define.amd) {
//       // AMD
//       define([], factory);
//     } else if (typeof exports === 'object') {
//       // Node, CommonJS
//       module.exports = factory();
//     } else {
//       // 浏览器全局变量(root 即 window)
//       root.IndexedDB = factory();
//     }(this, function() {}));