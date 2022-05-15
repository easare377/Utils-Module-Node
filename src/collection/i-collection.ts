import { ILinkNode } from "./i-link-node";

export interface ICollection<T> {
    top: ILinkNode<T> | undefined;
    bottom: ILinkNode<T> | undefined;
    size: number;
    push(val: T): number;
    pop(): ILinkNode<T>
}