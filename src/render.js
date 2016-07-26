import createElement from './createElement.js';

export default function (Root, parent) {
  if (typeof Root === 'object') {
    const element = createElement(Root);
    parent.appendChild(element);
  }
  else {
    console.error('Root must be of type object or function');
    return;
  }
}
