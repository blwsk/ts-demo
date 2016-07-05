interface Element {
  tag: string;
  props: Object;
  children: any;
}

interface AppProps {
  message: string;
  onClick: Function;
}

function createElementType<Function>(tag: string) {
  return function<Element>(props: Object, children: any) {
    return {
      tag,
      props,
      children
    };
  }
}

const div: Function = createElementType('div');
const span: Function = createElementType('span');
const button: Function = createElementType('button');

function render<Function>(state: Object, translator: ((el: Element) => HTMLElement)) {
  let cachedChild: any = null;

  return function (el: Element, node: HTMLElement) {
    const translated: HTMLElement = translator(el);

    if (cachedChild) {
      node.replaceChild(translated, cachedChild);
    }
    else {
      cachedChild = translated;
      node.appendChild(cachedChild);
    }
  }
}

function translateToElement<HTMLElement>(el: Element) {
  const {
    tag,
    props,
    children
  } = el;

  const node: any = document.createElement(tag);

  switch (typeof children) {
    case 'string':
    case 'number':
      node.appendChild(
        document.createTextNode(children)
      );
      break;

    default:
      const translatedChildren: Array<HTMLElement> = children.map(translateToElement);
      translatedChildren.forEach(child => node.appendChild(child));
      break;
  }

  return node;
}

function App<Element>(props: AppProps) {
  const {
    message,
    onClick
  } = props;

  return (
    div({}, [
      button({onClick}, 'Click me'),
      span({}, `Message: ${message}`)
    ])
  );
}

render({}, translateToElement)((
  App({
    message: 'Hello',
    onClick: (e: Event) => {
      console.log(e);
    }
  })
), document.getElementById('root'));
