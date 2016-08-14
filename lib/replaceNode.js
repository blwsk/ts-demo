'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (oldNode, newNode) {
  var parent = oldNode.parentNode;

  var isActive = document.activeElement === oldNode;

  if (parent) {
    parent.replaceChild(newNode, oldNode);
  } else {
    (0, _invariant2.default)('Attempted to replace a node not yet in the DOM.');
  }

  if (isActive) {
    newNode.focus();
    newNode.value = newNode.value;
  }
};