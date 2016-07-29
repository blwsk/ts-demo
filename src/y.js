export default function (Component, defaultProps = {}, defaultChildren = []) {
  const element = new Component(defaultProps, defaultChildren);

  return function (props = {}, children = []) {
    element.reconcileProps(props, children);

    return element;
  }
}
