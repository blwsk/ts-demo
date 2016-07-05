import {Element} from './interfaces.ts';
import {Branch} from './components.ts';
import {attributes} from './constants.ts';

function attachProps(node: HTMLElement, props: Object) {
  const keys = Object.keys(props);

  keys.forEach(key => {
    if (Object.keys(attributes).indexOf(key) >= 0) {
      node.setAttribute(attributes[key], props[key]);
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
    tag,
    props,
    children
  } = el;

  const node: any = document.createElement(tag);

  attachProps(node, props);

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

export function render<Function>(state: Object, translator: ((el: Element, state: Object) => HTMLElement)) {
  let cachedChild: any = null;

  return function (el: Element, node: HTMLElement) {
    const translated: HTMLElement = translator(el, state);

    if (cachedChild) {
      node.replaceChild(translated, cachedChild);
    }
    else {
      cachedChild = translated;
      node.appendChild(cachedChild);
    }
  }
}
