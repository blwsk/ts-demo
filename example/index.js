import Woof from '../src/index.js';

const {
  x
} = Woof;

const div = (props, children) => Woof.createElement('div', props, children);

class App extends Woof.Component {
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

Woof.render(x(
  App,
  {
    firstName: 'Kevin',
    lastName: 'Bielawski'
  }
), document.querySelector('#root'));
