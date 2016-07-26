/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _components = __webpack_require__(1);

	var _render = __webpack_require__(4);

	var _store = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Header = function (_Branch) {
	  _inherits(Header, _Branch);

	  function Header(props) {
	    _classCallCheck(this, Header);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Header).call(this, props));
	  }

	  _createClass(Header, [{
	    key: 'render',
	    value: function render() {
	      return (0, _components.div)({}, [(0, _components.h1)({}, 'Count: ' + this.props.count), (0, _components.hr)()]);
	    }
	  }]);

	  return Header;
	}(_components.Branch);

	var App = function (_Branch2) {
	  _inherits(App, _Branch2);

	  function App(props, children) {
	    _classCallCheck(this, App);

	    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props, children));

	    _this2.handleIncrement = _this2.handleIncrement.bind(_this2);
	    _this2.handleDecrement = _this2.handleDecrement.bind(_this2);
	    return _this2;
	  }

	  _createClass(App, [{
	    key: 'handleIncrement',
	    value: function handleIncrement(e) {
	      this.props.dispatch(function (dispatch, getState) {
	        setTimeout(function () {
	          dispatch({ type: 'INCREMENT' });
	        }, 2000);
	        dispatch({ type: 'DECREMENT' });
	      });
	    }
	  }, {
	    key: 'handleDecrement',
	    value: function handleDecrement(e) {
	      this.props.dispatch({ type: 'DECREMENT' });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return (0, _components.div)({ className: 'app' }, [Header.bind(null, { count: this.props.count }), (0, _components.button)({ onClick: this.handleIncrement }, 'Up'), (0, _components.button)({ onClick: this.handleDecrement }, 'Down')]);
	    }
	  }]);

	  return App;
	}(_components.Branch);

	var initialState = {
	  count: 0
	};

	function reducer() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case 'INCREMENT':
	      state = Object.assign({}, state, { count: state.count + 1 });
	      break;
	    case 'DECREMENT':
	      state = Object.assign({}, state, { count: state.count - 1 });
	      break;
	    default:
	      break;
	  }

	  return state;
	}

	var store = (0, _store.createStore)(initialState, reducer);

	var renderer = (0, _render.render)(store, _render.translateToElement);

	renderer(App, document.getElementById('root'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Branch = exports.hr = exports.h1 = exports.input = exports.button = exports.span = exports.div = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(2);

	var _constants = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function createElementType(tag) {
	  return function () {
	    var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var children = arguments[1];

	    return {
	      type: _constants.elements.LEAF,
	      uid: (0, _utils.uniqueId)(),
	      tag: tag,
	      props: props,
	      children: children
	    };
	  };
	}

	var div = exports.div = createElementType(_constants.elements.DIV);
	var span = exports.span = createElementType(_constants.elements.SPAN);
	var button = exports.button = createElementType(_constants.elements.BUTTON);
	var input = exports.input = createElementType(_constants.elements.INPUT);
	var h1 = exports.h1 = createElementType(_constants.elements.H1);
	var hr = exports.hr = createElementType(_constants.elements.HR);

	var Branch = exports.Branch = function () {
	  function Branch(props, children) {
	    _classCallCheck(this, Branch);

	    this.type = _constants.elements.BRANCH;
	    this.uid = (0, _utils.uniqueId)();

	    this.tag = _constants.elements.DIV;
	    this.props = props;
	    this.children = children;
	  }

	  _createClass(Branch, [{
	    key: 'shouldRender',
	    value: function shouldRender() {
	      return true;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return div(this.props, this.children);
	    }
	  }]);

	  return Branch;
	}();

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});


	function uniqueIdGenerator() {
	  var current = 0;

	  return function (key) {
	    current += 1;

	    if (key) {
	      return key + "." + current;
	    }

	    return "" + current;
	  };
	}

	var uniqueId = exports.uniqueId = uniqueIdGenerator();

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var elements = exports.elements = {
	  BRANCH: 'BRANCH',
	  LEAF: 'LEAF',

	  DIV: 'div',
	  SPAN: 'span',
	  BUTTON: 'button',
	  INPUT: 'input',
	  H1: 'h1',
	  HR: 'hr'
	};

	var attributes = exports.attributes = {
	  className: 'class',
	  id: 'id',
	  key: 'key',
	  value: 'value'
	};

	var events = exports.events = {
	  onClick: 'click',
	  onChange: 'change',
	  onInput: 'input'
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.translateToElement = translateToElement;
	exports.render = render;

	var _components = __webpack_require__(1);

	var _constants = __webpack_require__(3);

	var _store = __webpack_require__(5);

	function attachAttributes(uid, node, props) {
	  var keys = Object.keys(props);

	  node.setAttribute('id', uid.toString());

	  keys.forEach(function (key) {
	    if (Object.keys(_constants.attributes).indexOf(key) >= 0) {
	      node.setAttribute(_constants.attributes[key], props[key]);
	    }
	  });
	}

	function attachEventListeners(uid, node, props) {
	  var keys = Object.keys(props);

	  keys.forEach(function (key) {
	    if (Object.keys(_constants.events).indexOf(key) >= 0) {
	      node.addEventListener(_constants.events[key], props[key]);
	    }
	  });
	}

	function translateToElement(el, state) {
	  if (typeof el === 'function') {
	    var component = new el(state);

	    if (component.shouldRender()) {
	      return translateToElement(component.render());
	    }
	  }

	  var uid = el.uid;
	  var tag = el.tag;
	  var props = el.props;
	  var children = el.children;


	  var node = document.createElement(tag);

	  attachAttributes(uid, node, props);
	  attachEventListeners(uid, node, props);

	  switch (typeof children === 'undefined' ? 'undefined' : _typeof(children)) {
	    case 'undefined':
	      break;

	    case 'string':
	    case 'number':
	      node.appendChild(document.createTextNode(children));
	      break;

	    default:
	      var translatedChildren = children.map(translateToElement);
	      translatedChildren.forEach(function (child) {
	        return node.appendChild(child);
	      });
	      break;
	  }

	  return node;
	}

	function render(store, translator) {
	  var cachedChild = null;

	  return function (el, node) {
	    store.register(function (state) {
	      console.log(state);
	      state = Object.assign({}, state, { dispatch: store.dispatch });

	      var translated = translator(el, state);

	      if (cachedChild) {
	        node.replaceChild(translated, cachedChild);
	      } else {
	        node.appendChild(translated);
	      }

	      cachedChild = translated;
	    });
	  };
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.createStore = createStore;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Store = exports.Store = function () {
	  function Store(state, reducer) {
	    _classCallCheck(this, Store);

	    this.state = state;
	    this.reducer = reducer;
	    this.subscribers = [];

	    // this sucks
	    this.dispatch = this.dispatch.bind(this);
	    this.getState = this.getState.bind(this);
	    this.register = this.register.bind(this);
	    this.notifySubscribers = this.notifySubscribers.bind(this);
	  }

	  _createClass(Store, [{
	    key: 'dispatch',
	    value: function dispatch(action) {
	      if (typeof action === 'function') {
	        action(this.dispatch, this.getState);
	      } else {
	        this.state = this.reducer(this.state, action);
	        this.notifySubscribers();
	      }
	    }
	  }, {
	    key: 'getState',
	    value: function getState() {
	      return this.state;
	    }
	  }, {
	    key: 'register',
	    value: function register(func) {
	      func(this.state);

	      this.subscribers.push(func);
	    }
	  }, {
	    key: 'notifySubscribers',
	    value: function notifySubscribers() {
	      var _this = this;

	      this.subscribers.forEach(function (func) {
	        return func(_this.state);
	      });
	    }
	  }]);

	  return Store;
	}();

	function createStore(state, reducer) {
	  return new Store(state, reducer);
	}

/***/ }
/******/ ]);