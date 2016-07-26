export default (oldNode, newNode) => {
  const parent = oldNode.parentNode;

  if (parent) {
    parent.replaceChild(newNode, oldNode);
  }
  else {
    console.error('Attempted to replace a node not yet in the DOM.');
  }
}
