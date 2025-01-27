class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = new Array(this.capacity).fill(null);
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 17;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
      console.log(hashCode);
    }
    return hashCode;
  }
  set(key, value) {
    const index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    this.buckets[index] = { key, value };
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
}

const test = new HashMap();
test.set("Apple", "mambo");
test.set("Apples", "mamborka");
console.log(test.get("Apples"));
console.log(test.buckets);
