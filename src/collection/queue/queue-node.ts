import { ILinkNode } from "../i-link-node";

export class LinkNode<T> implements ILinkNode<T>{
    next: ILinkNode<T> | undefined;
    value: T | undefined;
    constructor(value: T) {
        this.value = value;
        this.next = undefined;
    }
}
