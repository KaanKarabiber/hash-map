class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.size = 0;
    this.buckets = new Array(this.capacity).fill(null);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 17;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }
  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null);

    this.size = 0;
    for (let i = 0; i < oldBuckets.length; i++) {
      if (oldBuckets[i] !== null) {
        const { key, value } = oldBuckets[i];
        this.set(key, value);
      }
    }
  }

  set(key, value) {
    const index = this.hash(key);

    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[index];
    if (bucket && bucket.key === key) {
      bucket.value = value;
      return;
    }

    this.buckets[index] = { key, value };
    this.size++;
  }

  get(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    const bucket = this.buckets[index];

    if (bucket && bucket.key === key) {
      return bucket.value;
    }

    return undefined;
  }

  has(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    const bucket = this.buckets[index];
    if (bucket && bucket.key === key) return true;
    else return false;
  }

  remove(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (this.buckets[index] && this.buckets[index].key === key) {
      this.buckets[index] = null;
      this.size--;
      return true;
    } else return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets.forEach((_, index) => {
      this.buckets[index] = null;
    });
    this.size = 0;
  }

  keys() {
    const keyArray = [];
    this.buckets.forEach((element) => {
      if (element !== null) {
        keyArray.push(element.key);
      }
    });
    return keyArray;
  }

  values() {
    const valueArray = [];
    this.buckets.forEach((element) => {
      if (element !== null) {
        valueArray.push(element.value);
      }
    });
    return valueArray;
  }

  entries() {
    const entries = [];
    this.buckets.forEach((element) => {
      if (element !== null) {
        entries.push(element);
      }
    });
    return entries;
  }
}
const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("lion", "grey");
test.set("moon", "silver");
console.log(test.buckets);

test.set("lion", "purpess");
test.set("moon", "qwerty");
console.log(test.buckets);

console.log("get", test.get("lion"));
console.log("has", test.has("dog"));
console.log("removed", test.remove("dog"));
console.log("length", test.length());
console.log("keys", test.keys());
console.log("values", test.values());
console.log("entries", test.entries());
