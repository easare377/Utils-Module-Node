import { ILinkNode } from '../i-link-node';
import { StackNode } from './stack-node';

// export interface Stack<T> {
//     size: number;
//     top: StackNode<T> | undefined;
//     bottom: StackNode<T> | undefined;

//     push(val: T): number;

//     pop(): StackNode<T> | undefined;
// }

export default class Stack<T = string> {
    private _size: number
    private top: ILinkNode<T> | undefined;
    private bottom: ILinkNode<T> | undefined;


    constructor() {
        this._size = 0;
        this.top = undefined;
        this.bottom = undefined;
    }

    get size(): number {
        return this._size;
    }

    push(val: T): number {
        const node = new StackNode(val);
        if (this._size === 0) {
            this.top = node;
            this.bottom = node;
        } else {
            const currentTop = this.top;
            this.top = node;
            this.top.next = currentTop;
        }

        this._size += 1;
        return this.size;
    }

    pop(): ILinkNode<T> {
        if (this._size === 0) {
            throw new Error("Stack is empty!");
        }
        const nodeToBeRemove = this.top as ILinkNode<T>;
        this.top = nodeToBeRemove.next;
        this._size--;
        nodeToBeRemove.next = undefined;
        return nodeToBeRemove;
        // return undefined;
    }


}
