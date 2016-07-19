
class Component {
  constructor(props, children) {
    this.type = 'component';
    
    this.props = props;
    this.children = children;

    this.node = null;
  }

  mapStateToProps() {
    return (state, dispatch) => {
      return Object.assign({}, state, {dispatch});
    }
  }

  updateProps(props) {
    this.props = props;
  }

  updateNode(node) {
    this.node = node;
  }

  getNode() {
    return this.node;
  }

  shouldRender(newProps) {
    if (!this.node) {
      return false;
    }
    else if (newProps.toString() === this.props.toString()) {
      return false;
    }

    return true;
  }

  render() {
    return;
  }
}

function translateToDOM(element, store) {

}
