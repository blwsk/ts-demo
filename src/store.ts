export interface Action {
  type: string;
  payload: any;
}

export class Store {
  state: Object;
  reducer: ((Object, Action) => Object);
  subscribers: Array<Function>;

  constructor(state: Object, reducer: ((Object, Action) => Object)) {
    this.state = state;
    this.reducer = reducer;
    this.subscribers = [];

    // this sucks
    this.dispatch = this.dispatch.bind(this);
    this.getState = this.getState.bind(this);
    this.register = this.register.bind(this);
    this.notifySubscribers = this.notifySubscribers.bind(this);
  }

  dispatch(action: any) {
    if (typeof action === 'function') {
      action(this.dispatch, this.getState);
    }
    else {
      this.state = this.reducer(this.state, action);
      this.notifySubscribers();
    }
  }

  getState() {
    return this.state;
  }

  register(func: Function) {
    func(this.state);

    this.subscribers.push(func);
  }

  notifySubscribers() {
    this.subscribers.forEach(func => func(this.state));
  }
}

export function createStore<Store>(state: Object, reducer: ((Object, Action) => Object)) {
  return new Store(state, reducer);
}
