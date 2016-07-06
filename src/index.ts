import {Element} from './interfaces.ts';
import {div, span, button, Branch} from './components.ts';
import {render, translateToElement} from './render.ts';
import {createStore, Action} from './store.ts';

const MessageViewer: ((string) => Element) = (message: string) => {
  return div({}, `Message: ${message}`);
}

const MessageChanger: ((Function) => Element) = (onClick: Function) => {
  return button({onClick}, `Click`);
}

interface StateInterface {
  message: string;
  dispatch: Function;
}

class App extends Branch {
  props: StateInterface;

  constructor(props: StateInterface) {
    super(props);
    this.changeMessage = this.changeMessage.bind(this);
  }

  changeMessage(e: Event) {
    this.props.dispatch({
      type: 'CHANGE_MESSAGE',
      payload: 'What is up'
    });
  }

  render() {
    return div({className: 'app'}, [
      MessageViewer(this.props.message),
      MessageChanger(this.changeMessage)
    ]);
  }
}

const initialState: Object = {
  message: 'hi'
};

function reducer<Object>(state: any = initialState, action: Action) {
  if (action.type === 'CHANGE_MESSAGE') {
    return Object.assign({}, state, {message: action.payload});
  }

  return state;
}

const store = createStore(initialState, reducer);

const renderer: Function = render(store, translateToElement);

renderer(App, document.getElementById('root'));
