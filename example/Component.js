class Component {
  constructor(props = {}, children = []) {
    this.element = null;
    this.props = props;
    this.children = children;
    this.state = {};
  }

  setState(nextState) {
    this.state = Object.assign({}, this.state, nextState);
    this._update(null, this.state);
  }

  shouldRender(newProps, newState) {
    if (!newProps && !newState) {
      return false;
    }

    return newProps !== this.props
      && newState !== this.state;
  }

  _consume(newProps, newState) {
    if (newProps) {
      this.props = newProps;
    }

    if (newState) {
      this.state = nextState;
    }
  }

  _update(newProps, newState) {
    if (!this.element) {
      this.element = this.render();
    }
    else if (this.shouldRender(newProps, newState)) {
      this.element = this.render();
    }

    this._consume(newProps, newState);

    return this.element;
  }

  render() {
    console.error('Component must implement `render` method');
  }
}

class App extends Component {
  constructor(props, children) {
    super(props, children);
  }

  render() {

  }
}
