// @flow

function render ({
  tag,
  props,
  children
}, node = null) {
  const element = document.createElement(tag);

  let children;

  switch (typeof children) {
    case 'object':
      element.appendChild(render(children));
      break;

    case 'string':
      element.appendChild(document.createTextNode(children));
      break;

    case 'number':
      element.appendChild(document.createTextNode(children));
      break;
  }

  if (node) {
    document.appendChild(element);
    return;
  }

  return element;
}

const OurElement = {
  tag: 'div',
  props: {},
  children: [{
    tag: 'span',
    props: {},
    children: 'Kevin '
  }, {
    tag: 'span',
    props: {},
    children: 81314531
  }]
};

render(OurElement, document.querySelector('#root'));
