"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (Element, props, children) {
  return new Element({ props: props, children: children });
};