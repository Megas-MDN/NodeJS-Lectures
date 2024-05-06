const promiseAll = (arrPromises) => {
  return new Promise((resolve, reject) => {
    const results = [];
    let count = 0;
    for (let i = 0; i < arrPromises.length; i++) {
      arrPromises[i]
        .then((result) => {
          results[i] = result;
          count++;
          if (count === arrPromises.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
};

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("X");
//     // reject(new Error("X---X"));
//   }, 1000);
// });
// const promises = [promise, Promise.resolve(2), Promise.resolve(3)];

// promiseAll(promises)
//   .then((results) => {
//     console.log("All promises resolved:", results); // Expected: [1, 2, 3]
//   })
//   .catch((error) => {
//     console.error("At least one promise rejected:", error);
//   });

const promiseAllSettled = (arrPromises) => {
  return new Promise((resolve) => {
    const results = [];
    let count = 0;
    for (let i = 0; i < arrPromises.length; i++) {
      arrPromises[i]
        .then((result) => {
          results[i] = { status: "fulfilled", value: result };
          count++;
          if (count === arrPromises.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          results[i] = { status: "rejected", reason: error };
          count++;
          if (count === arrPromises.length) {
            resolve(results);
          }
        });
    }
  });
};

// const promises = [
//   Promise.resolve(1),
//   Promise.reject("Error occurred"),
//   Promise.resolve(3),
// ];

// promiseAllSettled(promises).then((results) => {
//   console.log("All promises settled:", results);
//   // Expected: [{ status: 'fulfilled', value: 1 },
//   //            { status: 'rejected', reason: 'Error occurred' },
//   //            { status: 'fulfilled', value: 3 }]
// });

const chainPromises = (funcs) =>
  new Promise((resolve) => {
    let result = Promise.resolve();
    for (let i = 0; i < funcs.length; i += 1) {
      result = result.then(funcs[i]).catch((err) => {
        throw new Error(err);
      });
    }
    resolve(result);
  });

function asyncFunction1() {
  return Promise.resolve("Result from asyncFunction1");
}

function asyncFunction2(data) {
  return Promise.resolve(data + " - Result from asyncFunction2");
}

function asyncFunction3(data) {
  return Promise.resolve(data + " - Result from asyncFunction3");
}

const functionsArray = [asyncFunction1, asyncFunction2, asyncFunction3];

// chainPromises(functionsArray)
//   .then((result) => {
//     console.log("Chained promise result:", result);
//     // Expected: "Result from asyncFunction1 - Result from asyncFunction2 - Result from asyncFunction3"
//   })
//   .catch((error) => {
//     console.error("Chained promise error:", error);
//   });

const promisify =
  (func) =>
  (...args) =>
    new Promise((resolve, reject) =>
      func(...args, (err, result) => {
        result ? resolve(result) : reject(err);
      }),
    );

function callbackStyleFunction(value, callback) {
  setTimeout(() => {
    if (value > 0) {
      callback(null, value * 2);
    } else {
      callback("Invalid value", null);
    }
  }, 1000);
}

const promisedFunction = promisify(callbackStyleFunction);

promisedFunction(3)
  .then((result) => {
    console.log("Promised function result:", result); // Expected: 6
  })
  .catch((error) => {
    console.error("Promised function error:", error);
  });
