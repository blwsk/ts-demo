import invariant from 'invariant';

export default (oldNode, newNode) => {
  const parent = oldNode.parentNode;

  const isActive = document.activeElement === oldNode;

  if (parent) {
    parent.replaceChild(newNode, oldNode);
  }
  else {
    invariant('Attempted to replace a node not yet in the DOM.');
  }

  if (isActive) {
    newNode.focus();
    newNode.value = newNode.value;
  }
}
