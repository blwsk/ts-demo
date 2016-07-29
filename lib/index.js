'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.y = exports.x = exports.render = exports.Component = exports.createElement = undefined;

var _createElement2 = require('./createElement.js');

var _createElement3 = _interopRequireDefault(_createElement2);

var _Component2 = require('./Component.js');

var _Component3 = _interopRequireDefault(_Component2);

var _render2 = require('./render.js');

var _render3 = _interopRequireDefault(_render2);

var _x2 = require('./x.js');

var _x3 = _interopRequireDefault(_x2);

var _y2 = require('./y.js');

var _y3 = _interopRequireDefault(_y2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createElement = exports.createElement = _createElement3.default;
var Component = exports.Component = _Component3.default;
var render = exports.render = _render3.default;
var x = exports.x = _x3.default;
var y = exports.y = _y3.default;

exports.default = {
  createElement: _createElement3.default,
  Component: _Component3.default,
  render: _render3.default,
  x: _x3.default,
  y: _y3.default
};