import {Element} from './interfaces.ts';
import {div, span, button, Branch} from './components.ts';
import {render, translateToElement} from './render.ts';

const MessageViewer: ((string) => Element) = (message: string) => {
  return div({}, `Message: ${message}`);
}

const MessageChanger: ((Function) => Element) = (onClick: Function) => {
  return button({onClick}, `Click`);
}

interface StateInterface {
  message: string;
}

class App extends Branch {
  props: StateInterface;

  constructor(props: StateInterface) {
    super(props);
  }

  changeMessage(e: Event) {
    console.log(e);
  }

  render() {
    return div({className: 'app'}, [
      MessageViewer(this.props.message),
      MessageChanger(this.changeMessage)
    ]);
  }
}

const state: Object = {
  message: 'hi'
};

const renderer: Function = render(state, translateToElement);

renderer(App, document.getElementById('root'));
