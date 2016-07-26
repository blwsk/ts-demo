import Woof from '../src/index.js';

const {
  x
} = Woof;

const div = (props, children) => Woof.createElement('div', props, children);

class Button extends Woof.Component {
  constructor(props) {
    super(props);
  }

  shouldRender() {
    return true;
  }

  render() {
    return div({onClick: this.props.onClick}, 'Click me');
  }
}

class App extends Woof.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [{
        id: 0,
        title: 'Cannondale SuperSix Evo'
      }, {
        id: 1,
        title: 'Garmin Forerunner 635'
      }, {
        id: 2,
        title: 'Breakfast of Champions'
      }]
    };

    this.handleClick = this.handleClick.bind(this);
  }

  shouldRender() {
    return true;
  }

  handleClick(e) {
    this.setState({
      items: this.state.items.concat([{
        title: 'UtiliTea'
      }])
    });
  }

  render() {
    return (
      div({}, [
        div({}, this.state.items.map(item => div({}, item.title))),
        x(Button, {onClick: this.handleClick})
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
