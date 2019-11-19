class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}

function defaultToString(item) {
  if (item === null) {
    return 'NULL';
  } if (item === undefined) {
    return 'UNDEFINED';
  } if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}
//载入之前我们写好的Linkedlist
class Node {
constructor(element, next) {
this.element = element;
this.next = next;
}
}

function defaultEquals(a, b) {
return a === b;
}

class LinkedList {
constructor(equalsFn = defaultEquals) {
this.equalsFn = equalsFn;
this.count = 0;
this.head = undefined;
}

push(element){
const node = new Node(element);
let current;
if (this.head == null){
this.head = node;
} else {
current = this.head;
while (current.next != null) {
current = current.next;
}
current.next = node;
}
this.count++;
}

getElementAt(index) {
if (index >= 0 && index <= this.count) {
let node = this.head;
for (let i = 0; i < index && node != null; i++) {
node = node.next;
}
return node;
}
return undefined;
}

insert(element, index) {
if (index >= 0 && index <= this.count) {
const node = new Node(element);
if (index ==0 ) {
const current = this.head;
node.next = current;
this.head = node;
} else {
const previous = this.getElementAt(index - 1);
node.next = previous.next;
previous.next = node;
}
this.count++;
return true;
}
return false;
}

removeAt(index) {
if (index >= 0 && index < this.count) {
let current = this.head;
if (index == 0) {
this.head = current.next; 
}else {
const previous = this.getElementAt(index - 1);
current = previous.next;
previous.next = current;

}
this.count--;
return current.element;
}
return undefined;
}

remove(element) {
const index = this.indexOf(element);
return this.removeAt(index);
}

indexOf(element) {
let current = this.head;
for (let i = 0; i < this.count && current != null; i++) {
if (this.equalsFn(element, current.element)) {
return i;
}
current = current.next;
} 
return -1;
}

isEmpty() {
return this.size() === 0;
}

size() {
return this.count;
}

getHead() {
return this.head;
}

clear() {
this.head = undefined;
this.count = 0;
}

toString() {
if (this.head == null) {
return '';
}
let objString = `${this.head.element}`;
let current = this.head.next;
for (let i = 1; i < this.size() && current != null; i++) {
objString = `${objString},${current.element}`;
current = current.next;
}
return objString;
}
}

//分离链接
class HashTableSeparateChaining {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }

  loseloseHashCode(key) {
    if (typeof key === 'number') {
      return key;
    }
    const tableKey = this.toStrFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
    return hash % 37;
  }

  hashCode(key) {
    return this.loseloseHashCode(key);
  }

  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key);
      if (this.table[position] == null) {
        this.table[position] = new LinkedList();
      }
      this.table[position].push(new ValuePair(key, value));
      return true;
    }
    return false;
  }

  get(key) {
    const position = this.hashCode(key);
    const linkedList = this.table[position];
    if (linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      while (current != null) {
        if (current.element.key === key) {
          return current.element.value;
        }
        current = current.next;
      }
    }
    return undefined;
  }

  remove(key) {
    const position = this.hashCode(key);
    const linkedList = this.table[position];
    if (linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      while (current != null) {
        if (current.element.key === key) {
          linkedList.remove(current.element);
          if (linkedList.isEmpty()) {
            delete this.table[position];
          }
          return true;
        }
        current = current.next;
      }
    }
    return false;
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    let count = 0;
    Object.values(this.table).forEach(linkedList => {
      count += linkedList.size();
    });
    return count;
  }

  clear() {
    this.table = {};
  }

  getTable() {
    return this.table;
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const keys = Object.keys(this.table);
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this.table[
        keys[i]
      ].toString()}}`;
    }
    return objString;
  }
}

const hashTable = new HashTableSeparateChaining();

hashTable.put('Ygritte', 'ygritte@email.com');
hashTable.put('Jonathan', 'jonathan@email.com');
hashTable.put('Jamie', 'jamie@email.com');
hashTable.put('Jack', 'jack@email.com');
hashTable.put('Jasmine', 'jasmine@email.com');
hashTable.put('Jake', 'jake@email.com');
hashTable.put('Nathan', 'nathan@email.com');
hashTable.put('Athelstan', 'athelstan@email.com');
hashTable.put('Sue', 'sue@email.com');
hashTable.put('Aethelwulf', 'aethelwulf@email.com');
hashTable.put('Sargeras', 'sargeras@email.com');

console.log('**** Printing Hash **** ');

console.log(hashTable.toString());
