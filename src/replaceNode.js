import invariant from 'invariant';

function getActiveId() {
  if (document.activeElement) {
    return document.activeElement.id;
  }
} 

export default (oldNode, newNode) => {
  const parent = oldNode.parentNode;

  const activeId = getActiveId();

  if (parent) {
    parent.replaceChild(newNode, oldNode);
  }
  else {
    invariant('Attempted to replace a node not yet in the DOM.');
  }

  if (activeId) {
    const activeElement = document.querySelector(`#${activeId}`);

    if (activeElement) {
      activeElement.focus();
      activeElement.value = activeElement.value;
    }
  }
}
