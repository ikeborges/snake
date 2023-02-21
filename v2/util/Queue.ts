class Queue<T> {
  private items: Array<T> = [];

  constructor() {}

  enqueue(item: T) {
    this.items.push(item);
  }

  dequeue() {
    return this.items.shift();
  }

  asArray() {
    return this.items;
  }
}

export default Queue;
