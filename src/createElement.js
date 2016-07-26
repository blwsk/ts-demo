import invariant from 'invariant';
import {attributes, events} from './constants.js';

// function applyProps (node: HTMLElement, props: Object) {
function applyProps (node, props) {
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
function createElement (component, props, children) {
  if (typeof component === 'object') {
    if (component.attributes) {
      return component;
    }

    const {
      props,
      reconcileProps
    } = component;

    return reconcileProps(props);
  }
  else {
    const node = document.createElement(component);

    // mutates node
    applyProps(node, props);

    const childrenType = typeof children;

    if (childrenType === 'object') {
      if (Array.isArray(children)) {
        children.forEach(child => {
          node.appendChild(createElement(child));
        });
      }
      else {
        invariant('Expects children to be of type array | string | number.');
      }
    }
    else if (childrenType === 'string' || childrenType === 'number') {
      const castChild = children.toString();
      const textNode = document.createTextNode(castChild);

      node.appendChild(textNode);
    }

    return node;
  }
}

export default createElement;
