import invariant from 'invariant';

export default (oldNode, newNode) => {
  const parent = oldNode.parentNode;

  if (parent) {
    parent.replaceChild(newNode, oldNode);
  }
  else {
    invariant('Attempted to replace a node not yet in the DOM.');
  }
}
