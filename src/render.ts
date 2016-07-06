import {Element} from './interfaces.ts';
import {Branch} from './components.ts';
import {attributes, events} from './constants.ts';
import {Store} from './store.ts';

function attachAttributes(uid: number, node: HTMLElement, props: Object) {
  const keys = Object.keys(props);

  node.setAttribute('id', uid.toString());

  keys.forEach(key => {
    if (Object.keys(attributes).indexOf(key) >= 0) {
      node.setAttribute(attributes[key], props[key]);
    }
  });
}


function attachEventListeners(uid: number, node: HTMLElement, props: Object) {
  const keys = Object.keys(props);

  keys.forEach(key => {
    if (Object.keys(events).indexOf(key) >= 0) {
      node.addEventListener(events[key], props[key]);
    }
  });
}

export function translateToElement<HTMLElement>(el: any, state?: Object) {
  if (typeof el === 'function') {
    const component: Branch = new el(state);

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

  const node: any = document.createElement(tag);

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
      const translatedChildren: Array<HTMLElement> = children.map(translateToElement);
      translatedChildren.forEach(child => node.appendChild(child));
      break;
  }

  return node;
}

export function render<Function>(store: Store, translator: ((el: Element, state: Object) => HTMLElement)) {
  let cachedChild: any = null;

  return function (el: Element, node: HTMLElement) {
    store.register((state: Object) => {
      state['dispatch'] = store.dispatch;
      const translated: HTMLElement = translator(el, state);

      if (cachedChild) {
        node.replaceChild(translated, cachedChild);
      }
      else {
        cachedChild = translated;
        node.appendChild(cachedChild);
      }
    });
  }
}
