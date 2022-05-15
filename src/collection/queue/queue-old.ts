// import { IQueue } from './iqueue';
// import {Utils} from '../../utils';

// export class QueueOld<T> implements IQueue<T> {
//   private _array: T[];
//   private _head: number = 0;
//   private _tail: number = 0;
//   private _size: number = 0;
//   private _version: number = 0;

//   private _syncRoot: object;
//   private readonly _MinimumGrow = 4;
//   private readonly _ShrinkThreshold = 32;
//   private readonly _GrowFactor = 200;  // double each time
//   private readonly _DefaultCapacity = 4;
//   // static  _emptyArray = Array<T>(0);

//   constructor(capacity?: number){
//     if(capacity === null){
//       capacity = 4;
//     }
//     this._array = Array<T>(capacity);
//   }

//   enqueue(item: T): void {
//     if(this._size === this._array.length){
//       let newCapacity = this._array.length * this._GrowFactor / 100;
//       if(newCapacity < this._array.length + this._MinimumGrow){
//         newCapacity = this._array.length + this._MinimumGrow;
//       }
//       this.setCapacity(newCapacity);
//     }
//     this._array[this._tail] = item;
//     this._tail = (this._tail + 1) % this._array.length;
//     this._size++;
//     this._version++;
//   }

//   dequeue(): T {
//     const removed: T = this._array[this._head];
//     this._array[this._head] = null;
//     this._head = (this._head + 1)% this._array.length;
//     this._size--;
//     this._version++;
//     return removed;
//   }

//   peek(): T {
//     return this._array[this._head];
//   }

//   size(): number {
//     return this._size;
//   }

//   clear(): void {
//     if(this._head < this._tail){

//     }
//   }

//   // copyTo(array: T[], arrayIndex: number): void {
//   //
//   // }

//   // toArray(): T[]{
//   //
//   // }
//   private setCapacity(capacity: number): void{
//     const newArray: T[] = new Array<T>(capacity);
//     if(this._size > 0){
//       if(this._head < this._tail){
//         Utils.copyArray<T>(this._array, this._head, newArray, 0, this._size);
//       }else{
//         Utils.copyArray<T>(this._array, this._head, newArray, 0, this._array.length - this._head);
//         Utils.copyArray<T>(this._array, 0, newArray, this._array.length - this._head, this._tail);
//       }
//     }
//     this._array = newArray;
//     this._head = 0;
//     this._tail = (this._size === capacity) ? 0 : this._size;
//     this._version++;
//   }


// }
