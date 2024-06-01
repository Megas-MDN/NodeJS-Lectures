const {
  addValues,
  stringifyValue,
  invertBoolean,
  convertToNumber,
  coerceToType,
} = require("./Homework02");

function testAddValues() {
  try {
    console.log(addValues(5, 3)); // Should print 8
    console.log(addValues("Hello", " World")); // Should print 'Hello World'
    console.log(addValues(true, false)); // Should print true
    console.log(addValues(false, false)); // Should print false
    console.log(addValues(10, " apples")); // Should print '10 apples'
    // Adding objects is not supported, should throw an error
    console.log(addValues({}, {}));
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Test function for stringifyValue
function testStringValue() {
  try {
    console.log(stringifyValue(123)); // Should print '123'
    console.log(stringifyValue(true)); // Should print 'true'
    console.log(stringifyValue([1, 2, 3])); // Should print '[1,2,3]'
    console.log(stringifyValue({ name: "John", age: 30 })); // Should print '{"name":"John","age":30}'
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Test function for invertBoolean
function testInvertBoolean() {
  try {
    console.log(invertBoolean(true)); // Should print false
    console.log(invertBoolean(false)); // Should print true
    // Trying to invert a number, should throw an error.
    console.log(invertBoolean(0));
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Test function for convertToNumber
function testConvertToNumber() {
  try {
    console.log(convertToNumber("10")); // Should print 10
    console.log(convertToNumber("3.14")); // Should print 3.14
    console.log(convertToNumber(true)); // Should print 1
    // Trying to convert a non-numeric string, should throw an error
    console.log(convertToNumber("abc"));
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Test function for coerceToType
function testCoerceToType() {
  try {
    console.log(coerceToType("10", "number")); // Should print 10 (string converted to number)
    console.log(coerceToType("true", "boolean")); // Should print true (string converted to boolean)
    console.log(coerceToType(42, "string")); // Should print '42' (number converted to string)
    // Trying to convert to an unsupported type, should throw an error
    console.log(coerceToType([], "number"));
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Execute the tests
testAddValues();
testStringValue();
testInvertBoolean();
testConvertToNumber();
testCoerceToType();
