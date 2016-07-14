'use strict';

class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push (val) {
    // move the tail
    if (this.tail) {
      this.tail.next = new Node(val);
      this.tail = this.tail.next;

      // create the tail
    } else if (!this.tail) {
      this.tail = new Node(val);
      if (!this.head) this.head = this.tail;
    }
    this.length++;
    return this.length;
  }

  pop (val) {
    if (!this.head) return null;
    let result = this.head.value;
    this.head = this.head.next;
    this.length--;
    if (!this.length) this.tail = this.head;
    return result;
  }

  size () {
    return this.length;
  }

  toArray () {
    let a = [];
    let current = this.head;
    while (current) {
      a.push(current.value);
      current = current.next;
    }
    return a;
  }

  toString () {
    let str = 'HEAD : ';
    let array = this.toArray();
    let count = array.length;
    for (let i = 0; i < count; i++) {
      str += JSON.stringify(array[i]) + (i == count-1 ? '' : ' < ');
    }
    return str + ' : TAIL';
  }
}

module.exports = Queue;
