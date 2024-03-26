String.prototype.plus = function (str) {
  let acc = 0;
  let result = '';
  let str1 = this.toString();
  let str2 = str.toString();

  while (str1.length < str2.length) {
    str1 = '0' + str1;
  }
  while (str2.length < str1.length) {
    str2 = '0' + str2;
  }

  for (let i = str1.length - 1; i >= 0; i--) {
    const num1 = parseInt(str1[i]);
    const num2 = parseInt(str2[i]);
    const sum = num1 + num2 + acc;
    result = (sum % 10) + result;
    acc = sum >= 10 ? 1 : 0;
  }

  if (acc === 1) {
    result = '1' + result;
  }

  return result;
};

String.prototype.minus = function (str) {
  let acc = 0;
  let result = '';
  let str1 = this.toString();
  let str2 = str.toString();

  if (
    str2.length > str1.length ||
    (str2.length === str1.length && str2[0] > str1[0])
  ) {
    throw new Error('The second number must be less than the first');
  }

  while (str2.length < str1.length) {
    str2 = '0' + str2;
  }

  for (let i = str1.length - 1; i >= 0; i--) {
    let digit1 = parseInt(str1[i]);
    let digit2 = parseInt(str2[i]) + acc;

    if (digit1 < digit2) {
      digit1 += 10;
      acc = 1;
    } else {
      acc = 0;
    }

    result = digit1 - digit2 + result;
  }

  result = result.replace(/^0+/, ''); // remove left zeros

  return result || '0';
};

String.prototype.multiply = function (str) {
  let result = '0';
  let str1 = this.toString();
  let str2 = str.toString();

  for (let i = str2.length - 1; i >= 0; i--) {
    let acc = 0;
    let temp = '';

    for (let j = str1.length - 1; j >= 0; j--) {
      const product = parseInt(str1[j]) * parseInt(str2[i]) + acc;
      temp = (product % 10) + temp;
      acc = Math.floor(product / 10);
    }

    if (acc > 0) {
      temp = acc + temp;
    }

    temp += '0'.repeat(str.length - 1 - i);

    result = result.toString().plus(temp);
  }

  return result;
};

String.prototype.divide = function (str) {
  let str1 = this.toString();
  let str2 = str.toString();
  let quotient = '';
  let div = '';

  if (str2 == '0') {
    throw new Error('Division by zero is not allowed');
  }

  if (
    str1.length < str2.length ||
    (str1.length == str2.length && str1[0] < str2[0])
  ) {
    return '0';
  }

  for (let i = 0; i < str1.length; i++) {
    div += str1[i];

    if (parseInt(div) >= parseInt(str2)) {
      let count = 0;

      while (parseInt(div) >= parseInt(str2)) {
        div = div.minus(str2);
        count++;
      }

      quotient += count;
      continue;
    }
    quotient += '0';
  }

  return quotient.replace(/^0+/, ''); // remove left zeros;
};

// Testing
const numTest1 = '9999999996666666664444444444443333333333333111111111000009';
const numTest2 = '1';
const numTest3 = '100';
const numTest4 = '14054800656087860898000000000045445055405010847145454500';

const expectedSum =
  '9999999996666666664444444444443333333333333111111111000010';
const expectedSubtraction =
  '9999999996666666664444444444443333333333333111111111000008';

const expectedMultiply =
  '999999999666666666444444444444333333333333311111111100000900';

const expectedDivision =
  '140548006560878608980000000000454450554050108471454545';

console.log('Sum: ', numTest1.plus(numTest2) == expectedSum);
console.log('Subtraction: ', numTest1.minus(numTest2) == expectedSubtraction);
console.log('Multiply: ', numTest1.multiply(numTest3) == expectedMultiply);
console.log('Divide by one: ', numTest1.divide(numTest2) == numTest1);
console.log('Divide zero by any: ', '0'.divide(numTest2) == '0');
console.log('Divide 2: ', numTest4.divide(numTest3) == expectedDivision);

try {
  '0'.minus(numTest2);
} catch (error) {
  console.log('Faild subtraction:', error.message);
}
try {
  '1105151500510540504044040545405455450450450'.divide('0');
} catch (error) {
  console.log('Faild division:', error.message);
}
