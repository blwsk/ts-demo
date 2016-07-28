'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _constants = require('./constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// function applyProps (node: HTMLElement, props: Object) {
function applyProps(node, props) {
  var propKeys = Object.keys(props);

  var attributeProps = propKeys.filter(function (key) {
    return Object.keys(_constants.attributes).indexOf(key) > -1;
  });

  var eventProps = propKeys.filter(function (key) {
    return Object.keys(_constants.events).indexOf(key) > -1;
  });

  attributeProps.forEach(function (attr) {
    node.setAttribute(_constants.attributes[attr], props[attr]);
  });

  eventProps.forEach(function (e) {
    node.addEventListener(_constants.events[e], props[e]);
  });
}

/*
type Component = {
  shouldRender: ((Object) => boolean);
  reconcileProps: ((Object) => HTMLElement);
}
*/

/*
type ElementArgs = {
  identifier: string | Component;
  props: Object;
  children: Array<ElementArgs> | string | number;
};
*/

// function createElement ({identifier, props, children}: ElementArgs): HTMLElement {
function createElement(component, props, children) {
  if ((typeof component === 'undefined' ? 'undefined' : _typeof(component)) === 'object') {
    if (component.attributes) {
      return component;
    }

    var _props = component.props;
    var reconcileProps = component.reconcileProps;


    return reconcileProps(_props);
  } else {
    var _ret = function () {
      var node = document.createElement(component);

      // mutates node
      applyProps(node, props);

      var childrenType = typeof children === 'undefined' ? 'undefined' : _typeof(children);

      if (childrenType === 'object') {
        if (Array.isArray(children)) {
          children.forEach(function (child) {
            node.appendChild(createElement(child));
          });
        } else {
          (0, _invariant2.default)('Expects children to be of type array | string | number.');
        }
      } else if (childrenType === 'string' || childrenType === 'number') {
        var castChild = children.toString();
        var textNode = document.createTextNode(castChild);

        node.appendChild(textNode);
      }

      return {
        v: node
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }
}

exports.default = createElement;