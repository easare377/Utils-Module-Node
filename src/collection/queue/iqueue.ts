export interface IQueue<T> {
  enqueue(item: T): void;
  dequeue(): T;
  peek():T;
  size(): number;
  clear(): void;
  //copyTo(array: T[], arrayIndex: number): void;
}
