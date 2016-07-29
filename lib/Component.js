'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _replaceNode = require('./replaceNode.js');

var _replaceNode2 = _interopRequireDefault(_replaceNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function () {
  function Component(_ref) {
    var props = _ref.props;
    var children = _ref.children;

    _classCallCheck(this, Component);

    this.blocker = [];
    this.node = null;
    this.props = props;
    this.children = children;
    this.state = {};

    this.addBlocker = this.addBlocker.bind(this);
    this.removeBlocker = this.removeBlocker.bind(this);
    this.hasBlocker = this.hasBlocker.bind(this);

    this.setState = this.setState.bind(this);
    this.shouldRender = this.shouldRender.bind(this);
    this.reconcileState = this.reconcileState.bind(this);
    this.reconcileProps = this.reconcileProps.bind(this);
    this.render = this.render.bind(this);
  }

  _createClass(Component, [{
    key: 'addBlocker',
    value: function addBlocker(newBlocker) {
      this.blocker = newBlocker;
    }
  }, {
    key: 'removeBlocker',
    value: function removeBlocker() {
      this.blocker = null;
    }
  }, {
    key: 'hasBlocker',
    value: function hasBlocker(givenBlocker) {
      return this.blocker === givenBlocker;
    }

    /*
      use setState in event handlers
    */

  }, {
    key: 'setState',
    value: function setState(stateChange) {
      if (this.hasBlocker('RENDER')) {
        (0, _invariant2.default)(!this.hasBlocker('RENDER'), 'Cannot call `setState` during render()');
        return;
      }

      var newState = Object.assign({}, this.state, stateChange);

      this.reconcileState(newState);
    }

    /*
      provides condition for re rendering based on new props
    */

  }, {
    key: 'shouldRender',
    value: function shouldRender(newProps) {
      (0, _invariant2.default)('Component must implement `shouldRender` method');

      return true;
    }

    /*
      responds to setState, conditionally replacing existing DOM node
     */

  }, {
    key: 'reconcileState',
    value: function reconcileState(newState) {
      this.state = newState;

      this.addBlocker('RENDER');
      var newNode = this.render();
      this.removeBlocker();

      (0, _replaceNode2.default)(this.node, newNode);

      this.node = newNode;
    }
  }, {
    key: 'reconcileProps',
    value: function reconcileProps(newProps, newChildren) {
      /*
        initial render
        ...or conditionally render pending shouldRender()
      */
      var shouldUpdate = !this.props || this.shouldRender(newProps);

      this.props = newProps;
      this.children = newChildren;

      if (shouldUpdate) {
        this.addBlocker('RENDER');
        this.node = this.render();
        this.removeBlocker();
      }

      return this.node;
    }
  }, {
    key: 'render',
    value: function render() {
      (0, _invariant2.default)('Component must implement `render` method');
    }
  }]);

  return Component;
}();

exports.default = Component;