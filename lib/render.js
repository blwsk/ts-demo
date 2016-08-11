'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = function (Root, parent) {
  var element = (0, _createElement2.default)(Root);

  switch (typeof element === 'undefined' ? 'undefined' : _typeof(element)) {
    case 'object':
      parent.appendChild(element);
      break;

    case 'function':
      parent.appendChild(element());
      break;

    default:
      (0, _invariant2.default)('Root must be of type object or function');
      break;
  }
};

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _createElement = require('./createElement.js');

var _createElement2 = _interopRequireDefault(_createElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }