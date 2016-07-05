import {Element} from './interfaces.ts';
import {uniqueId} from './utils.ts';
import {elements} from './constants.ts';

function createElementType<Function>(tag: string) {
  return function<Element>(props: Object, children: any) {
    return {
      type: elements.LEAF,
      tag,
      props,
      children
    };
  }
}

export const div: Function = createElementType(elements.DIV);
export const span: Function = createElementType(elements.SPAN);
export const button: Function = createElementType(elements.BUTTON);

export class Branch {
  type: string;
  uid: number;

  tag: string;
  props: Object;
  children: any;

  constructor(props: any, children?: any) {
    this.type = elements.BRANCH;
    this.uid = uniqueId();

    this.tag = elements.DIV;
    this.props = props;
    this.children = children;
  }

  shouldRender() {
    return true;
  }

  render() {
    return div(this.props, this.children);
  }
}
