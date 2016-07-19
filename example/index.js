import {createStore} from '../src/lib/store.js';
import {div, span, button} from '../src/lib/components.js';

const initialState = {
  count: 0
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return Object.assign({}, state, {count: state.count + 1});
      break;
    case 'DECREMENT':
      return Object.assign({}, state, {count: state.count - 1});
      break;
    default:
      return state;
      break;
  }
}

const store = createStore(initialState, reducer);

const {
  dispatch,
  getState
} = store;

const App = div({}, [
  span({className: 'kevin'}, 'Kevin '),
  span({className: 'bielawski'}, 'Bielawski')
]);

function translateToDOM(elementTree, state) {
  if (typeof elementTree === 'function') {
    const el = new elementTree();
    const {
      mapStateToProps
    } = el;

    const props = mapStateToProps(state);

    el.updateProps(props);

    if (el.shouldRender() || el.getNode() === null) {
      const renderedElement = el.render();

      const {
        updatedTree,
        translatedNode
      } = translateToDOM(renderedElement, state);

      el.setNode(translatedNode);

      return {
        updatedTree,
        translatedNode
      };
    }
    else {
      return {
        updatedTree: ,
        translatedNode: 
      };
    }
  }

  const {
    tag,
    props,
    children
  } = elementTree;
}

const render = (element, $root) => {
  let cache = null;

  const doRender = state => {
    const {
      updatedTree,
      translatedNode
    } = translateToDOM(cache, state);

    cache = updatedTree;

    if ($root.childNodes.length > 0) {
      $root.childNodes.forEach(child => $root.removeChild(child));
    }

    $root.appendChild(translatedNode);
  }

  store.register(doRender);
}

render(App, document.getElementById('root'));
