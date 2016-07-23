// @flow

import {Branch} from './components.js';
import {attributes, events} from './constants.js';
import {Store} from './store.js';

function attachAttributes(uid, node, props) {
  const keys = Object.keys(props);

  node.setAttribute('id', uid.toString());

  keys.forEach(key => {
    if (Object.keys(attributes).indexOf(key) >= 0) {
      node.setAttribute(attributes[key], props[key]);
    }
  });
}

function attachEventListeners(uid, node, props) {
  const keys = Object.keys(props);

  keys.forEach(key => {
    if (Object.keys(events).indexOf(key) >= 0) {
      node.addEventListener(events[key], props[key]);
    }
  });
}

export function translateToElement(el, state) {
  if (typeof el === 'function') {
    const component = new el(state);

    if (component.shouldRender()) {
      return translateToElement(component.render());
    }
  }

  const {
    uid,
    tag,
    props,
    children
  } = el;

  const node = document.createElement(tag);

  attachAttributes(uid, node, props);
  attachEventListeners(uid, node, props);

  switch (typeof children) {
    case 'undefined':
      break;

    case 'string':
    case 'number':
      node.appendChild(
        document.createTextNode(children)
      );
      break;

    default:
      const translatedChildren = children.map(translateToElement);
      translatedChildren.forEach(child => node.appendChild(child));
      break;
  }

  return node;
}

export function render(store, translator) {
  let cachedChild = null;

  return function (el, node) {
    store.register(state => {
      console.log(state);
      state = Object.assign({}, state, {dispatch: store.dispatch});

      const translated = translator(el, state);

      if (cachedChild) {
        node.replaceChild(translated, cachedChild);
      }
      else {
        node.appendChild(translated);
      }

      cachedChild = translated;
    });
  }
}
