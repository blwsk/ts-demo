import Woof, {y} from '../src/index.js';

const div = (props, children) => Woof.createElement('div', props, children);
const input = (props, children) => Woof.createElement('input', props, children);

class _OnButton extends Woof.Component {
  render() {
    return div(this.props, 'On');
  }
}

class _OffButton extends Woof.Component {
  render() {
    return div(this.props, 'Off');
  }
}

class _InputBox extends Woof.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };

    this.handleInput = this.handleInput.bind(this);
  }
  handleInput(e) {
    this.setState({
      message: e.target.value
    });
  }
  render() {
    return input({
      id: 'hello',
      value: this.state.message,
      onInput: this.handleInput
    });
  }
}

const OnButton = y(_OnButton);
const OffButton = y(_OffButton);
const InputBox = y(_InputBox);

class Button extends Woof.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return div({onClick: this.props.onClick}, this.props.message);
  }
}

const ButtonClass1 = y(Button);
const ButtonClass2 = y(Button);

class Ship extends Woof.Component {
  constructor(props) {
    super(props);

    this.state = {on: false};
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(e) {
    this.setState({
      on: !this.state.on
    });
  }

  render() {
    const {
      on
    } = this.state;

    const onClick = this.handleToggle;

    if (on) {
      return OnButton({onClick});
    }

    return OffButton({onClick});
  }
}

const ShipClass = y(Ship);

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
        ButtonClass1({onClick: this.handleClick, message: 'Hi'}),
        ButtonClass2({onClick: this.handleClick, message: 'Hello'}),
        InputBox(),
        ShipClass()
      ])
    );
  }
}

const AppClass = y(App);

Woof.render((
  AppClass()
), document.querySelector('#root'));
