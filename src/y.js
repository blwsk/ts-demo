export default function (Component, defaultProps) {
  const element = new Component(defaultProps);

  return function (props, children) {
    element.reconcileProps(props, children);

    return element;
  }
}
