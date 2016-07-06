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

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var components_ts_1 = __webpack_require__(1);
	var render_ts_1 = __webpack_require__(4);
	var store_ts_1 = __webpack_require__(5);
	var MessageViewer = function (message) {
	    return components_ts_1.div({}, "Message: " + message);
	};
	var MessageChanger = function (onClick) {
	    return components_ts_1.button({ onClick: onClick }, "Click");
	};
	var App = (function (_super) {
	    __extends(App, _super);
	    function App(props) {
	        _super.call(this, props);
	        this.changeMessage = this.changeMessage.bind(this);
	    }
	    App.prototype.changeMessage = function (e) {
	        this.props.dispatch({
	            type: 'CHANGE_MESSAGE',
	            payload: 'What is up'
	        });
	    };
	    App.prototype.render = function () {
	        return components_ts_1.div({ className: 'app' }, [
	            MessageViewer(this.props.message),
	            MessageChanger(this.changeMessage)
	        ]);
	    };
	    return App;
	}(components_ts_1.Branch));
	var initialState = {
	    message: 'hi'
	};
	function reducer(state, action) {
	    if (state === void 0) { state = initialState; }
	    if (action.type === 'CHANGE_MESSAGE') {
	        return Object.assign({}, state, { message: action.payload });
	    }
	    return state;
	}
	var store = store_ts_1.createStore(initialState, reducer);
	var renderer = render_ts_1.render(store, render_ts_1.translateToElement);
	renderer(App, document.getElementById('root'));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var utils_ts_1 = __webpack_require__(2);
	var constants_ts_1 = __webpack_require__(3);
	function createElementType(tag) {
	    return function (props, children) {
	        return {
	            type: constants_ts_1.elements.LEAF,
	            uid: utils_ts_1.uniqueId(),
	            tag: tag,
	            props: props,
	            children: children
	        };
	    };
	}
	exports.div = createElementType(constants_ts_1.elements.DIV);
	exports.span = createElementType(constants_ts_1.elements.SPAN);
	exports.button = createElementType(constants_ts_1.elements.BUTTON);
	var Branch = (function () {
	    function Branch(props, children) {
	        this.type = constants_ts_1.elements.BRANCH;
	        this.uid = utils_ts_1.uniqueId();
	        this.tag = constants_ts_1.elements.DIV;
	        this.props = props;
	        this.children = children;
	    }
	    Branch.prototype.shouldRender = function () {
	        return true;
	    };
	    Branch.prototype.render = function () {
	        return exports.div(this.props, this.children);
	    };
	    return Branch;
	}());
	exports.Branch = Branch;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
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
	exports.uniqueId = uniqueIdGenerator();


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	exports.elements = {
	    BRANCH: 'BRANCH',
	    LEAF: 'LEAF',
	    DIV: 'div',
	    SPAN: 'span',
	    BUTTON: 'button'
	};
	exports.attributes = {
	    className: 'class',
	    id: 'id',
	    key: 'key'
	};
	exports.events = {
	    onClick: 'click',
	    onChange: 'change'
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var constants_ts_1 = __webpack_require__(3);
	function attachAttributes(uid, node, props) {
	    var keys = Object.keys(props);
	    node.setAttribute('id', uid.toString());
	    keys.forEach(function (key) {
	        if (Object.keys(constants_ts_1.attributes).indexOf(key) >= 0) {
	            node.setAttribute(constants_ts_1.attributes[key], props[key]);
	        }
	    });
	}
	function attachEventListeners(uid, node, props) {
	    var keys = Object.keys(props);
	    keys.forEach(function (key) {
	        if (Object.keys(constants_ts_1.events).indexOf(key) >= 0) {
	            node.addEventListener(constants_ts_1.events[key], props[key]);
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
	    var uid = el.uid, tag = el.tag, props = el.props, children = el.children;
	    var node = document.createElement(tag);
	    attachAttributes(uid, node, props);
	    attachEventListeners(uid, node, props);
	    switch (typeof children) {
	        case 'undefined':
	            break;
	        case 'string':
	        case 'number':
	            node.appendChild(document.createTextNode(children));
	            break;
	        default:
	            var translatedChildren = children.map(translateToElement);
	            translatedChildren.forEach(function (child) { return node.appendChild(child); });
	            break;
	    }
	    return node;
	}
	exports.translateToElement = translateToElement;
	function render(store, translator) {
	    var cachedChild = null;
	    return function (el, node) {
	        store.register(function (state) {
	            state['dispatch'] = store.dispatch;
	            var translated = translator(el, state);
	            if (cachedChild) {
	                node.replaceChild(translated, cachedChild);
	            }
	            else {
	                cachedChild = translated;
	                node.appendChild(cachedChild);
	            }
	        });
	    };
	}
	exports.render = render;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	var Store = (function () {
	    function Store(state, reducer) {
	        this.state = state;
	        this.reducer = reducer;
	        this.subscribers = [];
	        // this sucks
	        this.dispatch = this.dispatch.bind(this);
	        this.getState = this.getState.bind(this);
	        this.register = this.register.bind(this);
	        this.notifySubscribers = this.notifySubscribers.bind(this);
	    }
	    Store.prototype.dispatch = function (action) {
	        if (typeof action === 'function') {
	            action(this.dispatch, this.getState);
	        }
	        else {
	            this.state = this.reducer(this.state, action);
	            this.notifySubscribers();
	        }
	    };
	    Store.prototype.getState = function () {
	        return this.state;
	    };
	    Store.prototype.register = function (func) {
	        func(this.state);
	        this.subscribers.push(func);
	    };
	    Store.prototype.notifySubscribers = function () {
	        var _this = this;
	        this.subscribers.forEach(function (func) { return func(_this.state); });
	    };
	    return Store;
	}());
	exports.Store = Store;
	function createStore(state, reducer) {
	    return new Store(state, reducer);
	}
	exports.createStore = createStore;


/***/ }
/******/ ]);