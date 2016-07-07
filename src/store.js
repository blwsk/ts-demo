// @flow

export class Store {
  constructor(state, reducer) {
    this.state = state;
    this.reducer = reducer;
    this.subscribers = [];

    // this sucks
    this.dispatch = this.dispatch.bind(this);
    this.getState = this.getState.bind(this);
    this.register = this.register.bind(this);
    this.notifySubscribers = this.notifySubscribers.bind(this);
  }

  dispatch(action) {
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

  register(func) {
    func(this.state);

    this.subscribers.push(func);
  }

  notifySubscribers() {
    this.subscribers.forEach(func => func(this.state));
  }
}

export function createStore(state, reducer) {
  return new Store(state, reducer);
}
