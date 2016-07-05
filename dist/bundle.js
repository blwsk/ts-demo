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
/***/ function(module, exports) {

	function createElementType(tag) {
	    return function (props, children) {
	        return {
	            tag: tag,
	            props: props,
	            children: children
	        };
	    };
	}
	var div = createElementType('div');
	var span = createElementType('span');
	var button = createElementType('button');
	function render(state, translator) {
	    var cachedChild = null;
	    return function (el, node) {
	        var translated = translator(el);
	        if (cachedChild) {
	            node.replaceChild(translated, cachedChild);
	        }
	        else {
	            cachedChild = translated;
	            node.appendChild(cachedChild);
	        }
	    };
	}
	function translateToElement(el) {
	    var tag = el.tag, props = el.props, children = el.children;
	    var node = document.createElement(tag);
	    switch (typeof children) {
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
	function App(props) {
	    var message = props.message, onClick = props.onClick;
	    return (div({}, [
	        button({ onClick: onClick }, 'Click me'),
	        span({}, "Message: " + message)
	    ]));
	}
	render({}, translateToElement)((App({
	    message: 'Hello',
	    onClick: function (e) {
	        console.log(e);
	    }
	})), document.getElementById('root'));


/***/ }
/******/ ]);