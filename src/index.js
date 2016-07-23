import Component from './Component.js';
import render from './render.js';
import x from './x.js';

class App extends Component {
  constructor(props) {
    super(props);
  }

  shouldRender() {
    return true;
  }

  render() {
    return (
      div({}, [
        div({}, this.props.name),
        div({}, this.props)
      ])
    );
  }
}

render(x(
  App,
  {name: 'Kevin'},
  ['Bielawski']
), document.querySelector('#root'));
