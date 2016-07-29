"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (Component) {
  var defaultProps = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var defaultChildren = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

  var element = new Component(defaultProps, defaultChildren);

  return function () {
    var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var children = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

    element.reconcileProps(props, children);

    return element;
  };
};