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
  #toStrFn;
  #table;
  constructor(toStrFn = fnToStr) {
    this.#toStrFn = toStrFn;
    this.#table = {};
  }

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

  put(key, value) {
    if (key === null || key === undefined) return false;
    if (value === null || value === undefined) return false;
    const hashKey = this.#loseloseHash(key);
    this.#table[hashKey] = value;
    return hashKey;
  }

  insert(key, value) {
    if (this.#loseloseHash(key) in this.#table) {
      if (Array.isArray(this.#table[this.#loseloseHash(key)])) {
        return this.put(key, [...this.#table[this.#loseloseHash(key)], value]);
      }
      return this.put(key, [this.#table[this.#loseloseHash(key)], value]);
    }
    return this.put(key, value);
  }

  delete(key) {
    if (!(this.#loseloseHash(key) in this.#table)) return null;
    const item = this.#table[this.#loseloseHash(key)];
    delete this.#table[this.#loseloseHash(key)];
    return item;
  }

  get(key) {
    return this.#table[this.#toStrFn(key)];
  }

  get table() {
    return this.#table;
  }

  log() {
    console.table(this.#table);
  }
}

(() => {
  const table = new customHash();
  table.insert("key", "test@test.com");
  table.insert("abc", "other@test.com");
  table.insert("key", "xxxtest@xxx.com");
  table.insert("key", "000teste@101.com");
  console.log(table.table, "<---");
  table.delete("key");
  console.log(table.table, "<---");
})();

module.exports = customHash;
