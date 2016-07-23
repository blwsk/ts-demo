// @flow

import {uniqueId} from './utils.js';
import {elements} from './constants.js';

function createElementType(tag): Function {
  return function(props = {}, children) {
    return {
      type: elements.LEAF,
      uid: uniqueId(),
      tag,
      props,
      children
    };
  }
}

export const div = createElementType(elements.DIV);
export const span = createElementType(elements.SPAN);
export const button = createElementType(elements.BUTTON);
export const input = createElementType(elements.INPUT);
export const h1 = createElementType(elements.H1);
export const hr = createElementType(elements.HR);

export class Branch {
  type: string;

  constructor(props: Object, children: Object) {
    this.type = elements.BRANCH;
    this.uid = uniqueId();

    this.tag = elements.DIV;
    this.props = props;
    this.children = children;
  }

  shouldRender(): boolean {
    return true;
  }

  render(): Object {
    return div(this.props, this.children);
  }
}
