import { ILinkNode } from "../i-link-node";

export interface StackNode<T> {
  value: T | undefined;
  next: StackNode<T> | undefined;
}

export class StackNode<T> implements ILinkNode<T> {
  constructor(val: T) {
    this.value = val;
    this.next = undefined;
  }
}
