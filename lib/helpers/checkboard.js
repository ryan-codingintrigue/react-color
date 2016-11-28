'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;
exports.get = get;

var _canvas = require('canvas');

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkboardCache = {};

function render(c1, c2, size) {
  var canvas = typeof document !== 'undefined' ? document.createElement('canvas') : new _canvas2.default();
  canvas.width = canvas.height = size * 2;
  var ctx = canvas.getContext('2d');
  if (!ctx) return null; // If no context can be found, return early.
  ctx.fillStyle = c1;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = c2;
  ctx.fillRect(0, 0, size, size);
  ctx.translate(size, size);
  ctx.fillRect(0, 0, size, size);
  return canvas.toDataURL();
}

function get(c1, c2, size) {
  var key = c1 + ',' + c2 + ', ' + size;
  var checkboard = render(c1, c2, size);

  if (checkboardCache[key]) {
    return checkboardCache[key];
  }
  checkboardCache[key] = checkboard;
  return checkboard;
}