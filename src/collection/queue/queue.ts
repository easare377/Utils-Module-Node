import { IQueue } from './iqueue';
import { LinkNode } from "./queue-node";


export default class Queue<T> {
    private _size = 0;
    private top: LinkNode<T> | undefined;
    private bottom: LinkNode<T> | undefined;

    get size(): number {
        return this._size;
    }

    push(value: T): void {
        if (this._size === 0) {
            this.top = new LinkNode(value);
            this.bottom = this.top;
        } else {
            const currentNode = this.bottom;
            if (currentNode === undefined) {
                throw new Error("undefined");
            }
            currentNode.next = new LinkNode(value);
            this.bottom = currentNode.next;
        }
        this._size++;
    }

    pop(): T {
        if (this._size === 0) {
            throw new Error("Queue is empty!");
        }
        const currentNode = this.top;
        if (currentNode === undefined) {
            throw new Error("undefined");
        }
        this.top = currentNode.next;
        this._size--;
        if (currentNode.value === undefined) {
            throw new Error("undefined");
        }
        return currentNode.value;
    }
}
