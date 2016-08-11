import invariant from 'invariant';
import createElement from './createElement.js';

export default function (Root, parent) {
  const element = createElement(Root);

  switch (typeof element) {
    case 'object':
      parent.appendChild(element);
      break;

    case 'function':
      parent.appendChild(element());
      break;

    default:
      invariant('Root must be of type object or function');
      break;
  }
}
