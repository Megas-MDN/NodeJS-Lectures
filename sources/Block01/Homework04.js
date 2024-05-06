const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  email: "john.doe@example.com",
  updateInfo(objInfo) {
    if (typeof objInfo !== "object")
      throw new Error("Invalid objInfo argument");
    Object.entries(objInfo).forEach(([key, value]) => {
      if (key in this) {
        const propDescriptor = Object.getOwnPropertyDescriptor(this, key);
        if (propDescriptor.writable) {
          Object.defineProperty(this, key, {
            ...propDescriptor,
            value: objInfo[key],
            writable: false,
          });
        }
      }
    });
  },
};
const updateDescriptorProperties = (obj, keys, propDescriptor) => {
  keys.forEach((key) => {
    Object.defineProperty(obj, key, propDescriptor);
  });
};

updateDescriptorProperties(person, Object.keys(person), {
  writable: false,
});

Object.defineProperty(person, "address", {
  value: {},
  enumerable: false,
  configurable: false,
});

const product = {
  name: "Laptop",
  price: 1000,
  quantity: 5,
};

updateDescriptorProperties(product, ["price", "quantity"], {
  writable: false,
  enumerable: false,
});

const getTotalPrice = (product) => {
  const price = Object.getOwnPropertyDescriptor(product, "price").value;
  const quantity = Object.getOwnPropertyDescriptor(product, "quantity").value;
  if (typeof price !== "number" || typeof quantity !== "number")
    throw new Error("Invalid product object");
  return price * quantity;
};

const deleteNonConfigurable = (obj, key) => {
  if (!(key in obj)) throw new Error(`Atribute '${key}' does not exist!`);
  const propDescriptor = Object.getOwnPropertyDescriptor(obj, key);
  if (!propDescriptor.configurable) {
    throw new Error(`Atribute '${key}' can't be deleted!`);
  }
  delete obj[key];
};

const bankAccount = {
  _balance: 1000,
  get formattedBalance() {
    return `$${this.balance}`;
  },
  set balance(value) {
    if (typeof value !== "number") throw new Error("Invalid value");
    this._balance = value;
  },
  get balance() {
    return this._balance;
  },
  transfer(account, amount) {
    const newBalance = this.balance - amount;
    if (newBalance < 0) throw new Error("Insufficient funds");
    this.balance -= amount;
    account.balance += amount;
  },
};

const isArray = (obj) => Array.isArray(obj);
const isObject = (obj) =>
  obj !== null && typeof obj === "object" && !isArray(obj);

const copyArray = (arr) => {
  const newArray = arr.map((value) => {
    if (isObject(value)) {
      return createImmutableObject(value);
    }
    if (isArray(value)) {
      return copyArray(value);
    }
    return value;
  });
  return newArray;
};

const createImmutableObject = (obj) => {
  let newObj = {};
  for (const key in obj) {
    const props = Object.getOwnPropertyDescriptor(obj, key);
    if (isObject(props.value) || isArray(props.value)) {
      if (isArray(props.value)) {
        props.value = copyArray(props.value);
      } else {
        props.value = createImmutableObject(props.value);
      }
    }
    props.writable = false;
    props.configurable = false;

    Object.defineProperty(newObj, key, props);
  }
  return newObj;
};

const observeObject = (obj, callback) => {
  if (!isObject(obj) || typeof callback !== "function")
    throw new Error("Invalid args!");
  const keys = Object.keys(obj);
  return keys.reduce((acc, key) => {
    acc[`_${key}`] = obj[key];
    Object.defineProperty(acc, key, {
      get() {
        callback({ action: "get", key, value: acc[`_${key}`] });
        return acc[`_${key}`];
      },
      set(newValue) {
        acc[`_${key}`] = newValue;
        callback({ action: "set", key, value: newValue, prev: obj[key] });
      },
    });
    return acc;
  }, {});
};

const deepCloneArray = (arr) => {
  if (isObject(arr)) return deepCloneObject(arr);
  if (!isArray(arr)) return arr;
  return arr.map((value) => {
    if (isObject(value)) {
      return deepCloneObject(value);
    }
    if (isArray(value)) {
      return deepCloneArray(value);
    }
    return value;
  });
};
const deepCloneObject = (obj) => {
  if (!isObject(obj)) return obj;
  const newObj = {};
  for (const key in obj) {
    if (isObject(obj[key])) {
      newObj[key] = deepCloneObject(obj[key]);
    } else if (isArray(obj[key])) {
      newObj[key] = deepCloneArray(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

const validateObject = (obj, schema) => {
  if (!isObject(obj) || !isObject(schema)) return false;
  for (const key in schema) {
    if (typeof obj[key] === "object") {
      const objectTypes = ["array", "object", "null"];
      if (!objectTypes.includes(schema[key])) return false;
    } else {
      if (typeof obj[key] !== schema[key]) return false;
    }
  }
  return true;
};

// ------ Testing code ------

const nestedObject = {
  id: 28802695164,
  date: "December 31, 2016",
  data: {
    totalUsers: 99,
    onlineStatus: {
      active: 67,
      data2: [1, 2, { test: [1, 2, 3] }, [5, 5]],
    },
  },
};

const student = {
  id: "1",
  name: "John",
  email: "john.doe@example.com",
  age: 30,
  grades: [10, 9, 5],
  updateInfo: function (info) {
    for (const key in info) {
      this[key] = info[key];
    }
  },
};

const schema = {
  id: "string",
  name: "string",
  email: "string",
  age: "number",
  grades: "array",
  updateInfo: "function",
};

console.log(Object.getOwnPropertyDescriptors(person));
console.log(Object.getOwnPropertyDescriptors(product));
console.log(getTotalPrice(product));

deleteNonConfigurable(product, "name");
console.log(Object.getOwnPropertyDescriptors(product));
// updateDescriptorProperties(product, ["quantity"], {
//   configurable: false,
// });
// deleteNonConfigurable(product, "quantity");
console.log(Object.getOwnPropertyDescriptors(product));

const account01 = Object.create(bankAccount);
const account02 = Object.create(bankAccount);

account01.transfer(account02, 500);
console.log(account01.formattedBalance);
console.log(account02.formattedBalance);

const obj = createImmutableObject(nestedObject);
obj.data.onlineStatus.data2[2].test = 5;
console.log(obj.data.onlineStatus.data2[2].test); // [1,2,3]
const newPerson = createImmutableObject(person);
console.log(newPerson);
newPerson.updateInfo({ firstName: "Megas" });
console.log(newPerson);

const proxy = observeObject(person, console.log);
proxy.firstName; // { action: 'get', key: 'firstName', value: 'John' }
proxy.firstName = "Megas"; // { action: 'set', key: 'firstName', value: 'Megas', prev: 'John' }

const test01 = deepCloneObject(nestedObject);
const test02 = deepCloneObject(nestedObject);

test01.data.onlineStatus.data2[2].test = "xyz";
console.log(test02.data.onlineStatus.data2[2].test); // [1,2,3]
console.log(test01.data.onlineStatus.data2[2].test); // 'xyz'

console.log(validateObject(student, schema)); // true
console.log(validateObject({}, schema)); // false
