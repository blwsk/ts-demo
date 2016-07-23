import replaceNode from './replaceNode';

export default class Component {
  constructor(props = {}, children = []) {
    this.blocker = [];
    this.node = null;
    this.props = props;
    this.children = children;
    this.state = {};
  }

  addBlocker(newBlocker) {
    this.blocker = newBlocker;
  }

  removeBlocker() {
    this.blocker = null;
  }

  hasBlocker(givenBlocker) {
    return this.blocker === givenBlocker;
  }

  /*
    use setState in event handlers
  */
  setState(stateChange) {
    if (this.hasBlocker('RENDER')) {
      console.error('Cannot call `setState` during render()');
      return;
    }

    const newState = Object.assign({}, this.state, stateChange);

    this.reconcileState(newState);
  }

  /*
    provides condition for re rendering based on new props
  */
  shouldRender(newProps) {
    console.error('Component must implement `shouldRender` method');

    return true;
  }

  /*
    responds to setState, conditionally replacing existing DOM node

  */
  reconcileState(newState) {
    this.state = newState;

    this.addBlocker('RENDER');
    const newNode = this.render();
    this.removeBlocker();

    replaceNode(this.node, newNode);

    this.node = newNode;
  }

  reconcileProps(newProps) {
    /*
      initial render
      ...or conditionally render pending shouldRender()
    */
    const shouldUpdate = !this.props || this.shouldRender(newProps);

    this.props = newProps;

    if (shouldUpdate) {
      this.addBlocker('RENDER');
      this.node = this.render();
      this.removeBlocker();
    }

    return this.node;
  }

  render() {
    console.error('Component must implement `render` method');
  }
}
