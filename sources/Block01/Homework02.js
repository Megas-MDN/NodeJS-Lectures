const log = (i, label = "<-- item") => console.log(i, label);

const addValues = (value1, value2) => {
  const allowedTypes = ["boolean", "number", "string"];
  const type1 = typeof value1;
  const type2 = typeof value2;
  if (!allowedTypes.includes(type1)) {
    throw new Error(`Type ${type1} is not allowed`);
  }
  if (!allowedTypes.includes(type2)) {
    throw new Error(`Type ${type2} is not allowed`);
  }
  return value1 + value2;
};

const stringifyValue = (value) => {
  if (typeof value === "object") return JSON.stringify(value, null, 2);

  return String(value);
};

const invertBoolean = (value) => {
  if (typeof value !== "boolean") {
    throw new Error(`Type ${typeof value} is not allowed`);
  }
  return !value;
};

const convertToNumber = (value) => {
  if (typeof value === "string") {
    return parseFloat(value);
  }
  const notAllowedTypes = ["object", "function", "undefined", "symbol"];
  if (notAllowedTypes.includes(typeof value)) {
    throw new Error(`Type ${typeof value} is not allowed`);
  }
  return +value;
};

const coerceToType = (value, type) => {
  if (!type) throw new Error(`Type is not sended`);

  switch (true) {
    case type === "number":
      return convertToNumber(value);
    case type === "boolean":
      return invertBoolean(value);
    case type === "string":
      return stringifyValue(value);
    case type === "boolean":
      return Boolean(value);
    case type === "symbol":
      return Symbol(value);
    case type === "object":
      try {
        return JSON.parse(value);
      } catch (error) {
        throw new Error(`Type ${typeof value} can not be converted to object`);
      }
    default:
      throw new Error(`Type ${type} is not allowed`);
  }
};

module.exports = {
  addValues,
  stringifyValue,
  invertBoolean,
  convertToNumber,
  coerceToType,
};
