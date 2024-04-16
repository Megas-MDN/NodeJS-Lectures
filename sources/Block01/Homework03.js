const log = require("../utils/log");
const products = require("../data/products"); // { id: number, name: string, price: number }[]
const students = require("../data/students"); // { id: string, name: string, grades: number[] }[]

const calcPriceAfterDiscount = (price, discount) =>
  +(price - (price * discount) / 100).toFixed(2);
const calculateDiscountedPrice = (productsList = products, discount) =>
  productsList.map((product) => ({
    ...product,
    price: calcPriceAfterDiscount(product.price, discount),
  }));

const calculateTotalPrice = (productsList = products) =>
  productsList.reduce((acc, product) => acc + product.price, 0);

//----------------------

const getFullName = (person) => {
  if (typeof person !== "object" || !person.firstName || !person.lastName) {
    throw new Error("Invalid person argument");
  }
  return `${person.firstName} ${person.lastName}`;
};

//----------------------
const wordsToArray = (words) => words.toLowerCase().split(" ");
const uniqueElements = (arrayWords) => [...new Set(arrayWords)];
const sortedUniqueWords = (uniqueWords) => [...uniqueWords].sort();

const filterUniqueWords = (words) => {
  if (typeof words !== "string") {
    throw new Error("Invalid words argument");
  }
  return sortedUniqueWords(uniqueElements(wordsToArray(words)));
};

//----------------------

const sum = (arr) => arr.reduce((acc, val) => acc + val, 0);
const avgGrades = (arrOnlyNumbers) =>
  +(sum(arrOnlyNumbers) / arrOnlyNumbers.length).toFixed(2);
const getAverageGrade = (studentsList = students) => {
  if (!Array.isArray(studentsList)) {
    throw new Error("Invalid studentsList argument");
  }
  return studentsList.map((student) => ({
    ...student,
    avgGrade: avgGrades(student.grades),
  }));
};

//----------------------

const createCounter = () => {
  let count = 0;
  return () => ++count;
};

//----------------------

const repeatFunction = (func, number) => {
  if (typeof func !== "function" || typeof number !== "number") {
    throw new Error("Invalid arguments");
  }
  if (number < 0) {
    return () => {
      while (true) {
        const stop = func();
        if (stop) break;
      }
    };
  }

  return () => {
    for (let i = 0; i < number; i++) {
      func();
    }
  };
};

//----------------------

const calculateFactorial = (number, accumulator = 1) => {
  if (number === 0) {
    return accumulator;
  } else {
    return calculateFactorial(number - 1, number * accumulator);
  }
};

//----------------------

const power = (base, exp) => {
  if (typeof base !== "number" || typeof exp !== "number") {
    throw new Error("Invalid arguments");
  }
  if (exp === 0) return 1;
  if (exp === 1) return base;
  return base * power(base, exp - 1);
};

//----------------------

const lazyMap = (arr, mappingFunction) => {
  if (!Array.isArray(arr) || typeof mappingFunction !== "function") {
    throw new Error("Invalid arguments");
  }
  let count = 0;
  return () => {
    if (count < arr.length) {
      return mappingFunction(arr[count++]);
    }
    count = 0;
    return mappingFunction(arr[count++]);
  };
};

//----------------------

const fibonacciGenerator = () => {
  let n1 = 0;
  let n2 = 1;
  return () => {
    const n3 = n1 + n2;
    n1 = n2;
    n2 = n3;
    return n1;
  };
};

//---------------------- Testing

const arrayOriginal = "x t q a t b q f f x x";
// Task 1
log(calculateDiscountedPrice(products, 10)); // [{ id: 1, name: 'Product 1', price: 9 }, { id: 2, name: 'Product 2', price: 13.5 },  { id: 3, name: 'Product 3', price: 18.9 },  { id: 4, name: 'Product 4', price: 27.9 },  { id: 5, name: 'Product 5', price: 39.6 }, { id: 6, name: 'Product 6', price: 8.91 }]
log(calculateTotalPrice(products, 10)); // 130.9

// Task 2
log(getFullName({ firstName: "John", lastName: "Doe" })); // John Doe
log(filterUniqueWords(arrayOriginal)); // [ 'a', 'b', 'f', 'q', 't', 'x' ] <-- item
log(getAverageGrade(students)); // [  { id: '1', name: 'John', grades: [ 10, 9, 5 ], avgGrade: 8 },  { id: '2', name: 'Jane', grades: [ 5, 10, 0 ], avgGrade: 5 },  { id: '3', name: 'Bob', grades: [ 7, 7, 6.5 ], avgGrade: 6.83 },  { id: '4', name: 'Alice', grades: [ 5.5, 10, 7 ], avgGrade: 7.5 },  { id: '5', name: 'Mark', grades: [ 8, 8.5, 9.8 ], avgGrade: 8.77 }]

// Task 3
const count1 = createCounter();
const count2 = createCounter();
const count3 = createCounter();
log(count1()); // 1
log(count1()); // 2
log(count2()); // 1
log(count3()); // 1
log(count3()); // 2

repeatFunction(() => console.log("Hello"), 3)(); // Hello, Hello, Hello
repeatFunction(() => {
  let stop = false;
  console.log("Hello");
  stop = Math.random() * 10 > 9 ? true : false;
  if (stop) return true;
}, -1)(); // Hello x (randomly)

// Task 4
log(calculateFactorial(10)); // 3628800 <-- item
log(power(1, 10)); // 1 <-- item
log(power(10, 10)); // 10000000000 <-- item

// Task 5
const lazyAction = lazyMap([1, 2, 3, 4, 5], (x) => x * x);
log(lazyAction()); // 1
log(lazyAction()); // 4
log(lazyAction()); // 9
log(lazyAction()); // 16
log(lazyAction()); // 25

const fiboAction = fibonacciGenerator();
log(fiboAction()); // 1
log(fiboAction()); // 1
log(fiboAction()); // 2
log(fiboAction()); // 3
log(fiboAction()); // 5
log(fiboAction()); // 8
