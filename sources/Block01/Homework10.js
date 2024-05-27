const fnToStr = (item) => {
  switch (true) {
    case item === null:
      return "null";
    case item === undefined:
      return "undefined";
    case item === NaN:
      return "NaN";
    case typeof item === "object":
      return JSON.stringify(item);
    default:
      return `${item}`;
  }
};

class customHash {
  #toStrFn; // function to convert item to string
  #table; // hash table it self
  constructor(toStrFn = fnToStr) {
    this.#toStrFn = toStrFn;
    this.#table = {};
  }

  // hash function get the key string and return the hash number
  #loseloseHash(key) {
    if (typeof key === "number") return key;
    const str = this.#toStrFn(key);
    const hash = str.split("").reduce((acc, el, i) => {
      const newAcc = acc + +el.charCodeAt() * (i % 2 === 0 ? i + 2 : 0);
      return newAcc;
    }, 0);

    // Hash number
    return hash;
  }

  // put the value in the hash table
  put(key, value) {
    if (key === null || key === undefined) return false;
    if (value === null || value === undefined) return false;
    const hashKey = this.#loseloseHash(key); // get the hash from key
    this.#table[hashKey] = value;
    return hashKey;
  }

  // insert the value in the hash table
  insert(key, value) {
    if (this.#loseloseHash(key) in this.#table) {
      if (Array.isArray(this.#table[this.#loseloseHash(key)])) {
        return this.put(key, [...this.#table[this.#loseloseHash(key)], value]);
      }
      return this.put(key, [this.#table[this.#loseloseHash(key)], value]);
    }
    return this.put(key, value);
  }

  // delete the value in the hash table
  delete(key) {
    if (!(this.#loseloseHash(key) in this.#table)) return null;
    const item = this.#table[this.#loseloseHash(key)];
    delete this.#table[this.#loseloseHash(key)];
    return item;
  }

  // get the value in the hash table
  get(key) {
    return this.#table[this.#loseloseHash(key)];
  }

  // get the table
  get table() {
    return this.#table;
  }

  // log the table
  log() {
    console.table(this.#table);
  }
}

(() => {
  const table = new customHash();

  table.insert("abc", "value1");
  table.insert("bca", "value2");

  console.log(table.get("abc")); // "value1"

  console.log(table.get("bca")); // "value2"

  table.delete("abc");
  console.log(table.get("abc")); // undefined
  console.log(table.get("bca")); // "value2"

  table.delete("bca");
  console.log(table.get("bca")); // undefined
})();

module.exports = customHash;
