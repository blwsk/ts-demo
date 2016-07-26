import createElement from './createElement.js';
import Component from './Component.js';
import render from './render.js';
import x from './x.js';

const div = (props, children) => createElement('div', props, children);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {message: 'Hi'};

    this.renderLastName = this.renderLastName.bind(this);
  }

  shouldRender() {
    return true;
  }

  renderLastName() {
    return (
      div({
        onClick: () => this.setState({message: 'Hello'})
      }, this.state.message)
    );
  }

  render() {
    return (
      div({}, [
        div({
          onClick: () => {alert(this.props.firstName)}
        }, this.props.firstName),
        this.renderLastName()
      ])
    );
  }
}

render(x(
  App,
  {
    firstName: 'Kevin',
    lastName: 'Bielawski'
  }
), document.querySelector('#root'));
