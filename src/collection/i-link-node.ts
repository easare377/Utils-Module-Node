export interface ILinkNode<T> {
    value: T | undefined;
    next: ILinkNode<T> | undefined;
}
