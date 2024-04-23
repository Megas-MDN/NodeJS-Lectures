const errorInvalidArguments = () => {
  throw new Error("Invalid arguments");
};

const sameObjects = (arr, obj) => {
  return arr.some((item) => {
    return JSON.stringify(item) === JSON.stringify(obj);
  });
};

const uniqueFilter = (arrFilter) => {
  const uniquesElements = [];

  for (let i = 0; i < arrFilter.length; i++) {
    if (!sameObjects(uniquesElements, arrFilter[i])) {
      uniquesElements.push(arrFilter[i]);
    }
  }
  return uniquesElements;
};

const customFilterUnique = (arr, callback) => {
  if (!Array.isArray(arr) || typeof callback !== "function") {
    return errorInvalidArguments();
  }
  const arrFilter = [];
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i])) {
      arrFilter.push(arr[i]);
    }
  }
  return uniqueFilter(arrFilter);
};

const chunkArray = (arr, size) => {
  if (!Array.isArray(arr) || typeof size !== "number") {
    return errorInvalidArguments();
  }
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const customShuffle = (arrOriginal) => {
  if (!Array.isArray(arrOriginal)) {
    return errorInvalidArguments();
  }
  const arr = JSON.parse(JSON.stringify(arrOriginal));

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const getArrayIntersection = (arr1, arr2) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return errorInvalidArguments();
  }
  const result = [];
  const [size, smallArray, bigArray] =
    arr1.length < arr2.length
      ? [arr1.length, arr1, arr2]
      : [arr2.length, arr2, arr1];
  for (let i = 0; i < size; i++) {
    if (smallArray.includes(bigArray[i])) {
      result.push(bigArray[i]);
    }
  }
  return result;
};

const getArrayUnion = (arr1, arr2) => {
  console.log(Array.isArray(arr1), Array.isArray(arr2));
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return errorInvalidArguments();
  }
  return uniqueFilter([...arr1, ...arr2]);
};

const measureArrayPerformance = (func, arr) => {
  const start = performance.now();
  func(arr);
  const end = performance.now();
  return end - start;
};
// -------- Testing

const obj = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Kim" },
  { id: 4, name: "Megas" },
  { id: 4, name: "Megas" },
  { id: 5, name: "Megas" },
];

const callbackFilter = (obj) => obj.name === "Megas";
console.log(customFilterUnique(obj, callbackFilter));

const arr01 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const size = 3;
console.log(chunkArray(arr01, size));

const arr02 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(customShuffle(arr02));

const arrSm = [1, 2, 3, 6];
const arrLg = [1, 2, "x", 4, 6];
console.log(getArrayIntersection(arrSm, arrLg));
console.log(getArrayUnion(arrSm, arrLg));

const arr03 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(
  measureArrayPerformance(
    (arrArgs) => customFilterUnique(arrArgs, (item) => item % 2 === 0),
    arr03,
  ),
);

console.log(
  measureArrayPerformance(
    (arrArgs) => [...new Set(arrArgs.filter((item) => item % 2 === 0))],
    arr03,
  ),
);
// ------
console.log(
  measureArrayPerformance(({ arrArgs, size }) => chunkArray(arrArgs, size), {
    arrArgs: arr03,
    size: 2,
  }),
);

console.log(
  measureArrayPerformance(
    ({ arrArgs, size }) =>
      arrArgs.reduce((acc, _item, i, arr) => {
        acc.push(arr.slice(i, i + size));
        return acc;
      }, []),
    {
      arrArgs: arr03,
      size: 3,
    },
  ),
);
