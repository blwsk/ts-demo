import {attributes, events} from './constants.ts';

function applyProps (node: HTMLElement, props: Object) {
  const propKeys = Object.keys(props);

  const attributeProps = propKeys
    .filter(key => {
      return Object.keys(attributes).indexOf(key) > -1;
    });

  const eventProps = propKeys
    .filter(key => {
      return Object.keys(events).indexOf(key) > -1;
    });

  attributeProps
    .forEach(attr => {
      node.setAttribute(attributes[attr], props[attr]);
    });

  eventProps
    .forEach(e => {
      node.addEventListener(events[e], props[e]);
    });
}

type Component = {
  shouldRender: ((Object) => boolean);
  reconcileProps: ((Object) => HTMLElement);
}

type ElementArgs = {
  identifier: string | Component;
  props: Object;
  children: Array<ElementArgs> | string | number;
};

function createElement ({identifier, props, children}: ElementArgs): HTMLElement {
  if (typeof identifier === 'object') {
    return identifier.reconcileProps(props);
  }

  const node: HTMLElement = document.createElement(identifier);

  // mutates node
  applyProps(node, props);

  const childrenType: string = typeof children;

  if (childrenType === 'object') {
    if (Array.isArray(children)) {
      children.forEach(child => {
        node.appendChild(createElement(child));
      });
    }
    else {
      console.error('Expects children to be of type array | string | number.');
    }
  }
  else if (childrenType === 'string' || childrenType === 'number') {
    const castChild = children.toString();
    const textNode = document.createTextNode(castChild);

    node.appendChild(textNode);
  }

  return node;
}

export default createElement;
