import invariant from 'invariant';
import replaceNode from './replaceNode.js';

export default class Component {
  constructor({props, children}) {
    this.blocker = [];
    this.node = null;
    this.props = props;
    this.children = children;
    this.state = {};

    this.addBlocker = this.addBlocker.bind(this);
    this.removeBlocker = this.removeBlocker.bind(this);
    this.hasBlocker = this.hasBlocker.bind(this);

    this.setState = this.setState.bind(this);
    this.shouldRender = this.shouldRender.bind(this);
    this.reconcileState = this.reconcileState.bind(this);
    this.reconcileProps = this.reconcileProps.bind(this);
    this.render = this.render.bind(this);
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
      invariant(
        !this.hasBlocker('RENDER'),
        'Cannot call `setState` during render()'
      );
      return;
    }

    const newState = Object.assign({}, this.state, stateChange);

    this.reconcileState(newState);
  }

  /*
    provides condition for re rendering based on new props
  */
  shouldRender(newProps) {
    invariant('Component must implement `shouldRender` method');

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

  reconcileProps(newProps, newChildren) {
    /*
      initial render
      ...or conditionally render pending shouldRender()
    */
    const shouldUpdate = !this.props || this.shouldRender(newProps);

    this.props = newProps;
    this.children = newChildren;

    if (shouldUpdate) {
      this.addBlocker('RENDER');
      this.node = this.render();
      this.removeBlocker();
    }

    return this.node;
  }

  render() {
    invariant('Component must implement `render` method');
  }
}
