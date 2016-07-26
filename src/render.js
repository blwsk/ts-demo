import invariant from 'invariant';
import createElement from './createElement.js';

export default function (Root, parent) {
  if (typeof Root === 'object') {
    const element = createElement(Root);
    parent.appendChild(element);
  }
  else {
    invariant('Root must be of type object or function');
  }
}
