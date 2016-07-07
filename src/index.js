// @flow

import {div, span, button, input, h1, hr, Branch} from './components.js';
import {render, translateToElement} from './render.js';
import {createStore, Action} from './store.js';

class Header extends Branch {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      div({}, [
        h1({}, `Count: ${this.props.count}`),
        hr()
      ])
    );
  }
}

class App extends Branch {
  props: Object;

  constructor(props, children) {
    super(props, children);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  handleIncrement(e) {
    this.props.dispatch((dispatch, getState) => {
      setTimeout(() => {
        dispatch({type: 'INCREMENT'});
      }, 2000);
      dispatch({type: 'DECREMENT'});
    });
  }

  handleDecrement(e) {
    this.props.dispatch({type: 'DECREMENT'});
  }

  render() {
    return (
      div({className: 'app'}, [
        Header.bind(null, {count: this.props.count}),
        button({onClick: this.handleIncrement}, `Up`),
        button({onClick: this.handleDecrement}, `Down`)
      ])
    );
  }
}

const initialState = {
  count: 0
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      state = Object.assign({}, state, {count: state.count + 1});
      break;
    case 'DECREMENT':
      state = Object.assign({}, state, {count: state.count - 1});
      break;
    default:
      break;
  }

  return state;
}

const store = createStore(initialState, reducer);

const renderer = render(store, translateToElement);

renderer(App, document.getElementById('root'));
