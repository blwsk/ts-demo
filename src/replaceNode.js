export default (oldNode, newNode) => {
  const parent = oldNode.parentNode;

  if (parent) {
    parent.replaceChild(oldNode, newNode);
  }
  else {
    console.error('Attempted to replace a node not yet in the DOM.');
  }
}
