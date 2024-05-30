// Regex types of data
const jsonRgx = /^\{("\w+":\s{0,1}("[\d+\w+\s+.+?]+"|.+?),?\s?)+\}$/gi;

const objectRgx = /\{(?:[^{}]+|\{(?:[^}{]+|\{[^}{]*\})*\})*\}/;
const arrayRgx = /\[.*?\]/;
const nullRgx = /\bnull\b/;
const stringRgx = /"[^"]+"/;
const booleanRgx = /\btrue\b|\bfalse\b/;
const numberRgx = /\d+/;
const quoteRgx = /^"|"$/g;

// Tokenize JSON string for each type
const defineTypeRgx = new RegExp(
  `(?<object>${objectRgx.source})|(?<string>${stringRgx.source})|(?<number>${numberRgx.source})|(?<null>${nullRgx.source})|(?<boolean>${booleanRgx.source})|(?<array>${arrayRgx.source})|(?<other>[a-z,0-9]+?(?=(,)))`,
);

// Convert JSON string to JavaScript object
function myJSONParse(jsonStr) {
  const isValid = jsonStr.match(jsonRgx)?.length;

  if (!isValid) {
    throw new Error(`${jsonStr}" is not an JSON string!`);
  }

  const result = {}; // JSON object parsed
  const jsonKeyValuesRegexp = new RegExp(
    `((?<key>"\\w+"):\\s*(${defineTypeRgx.source}))`,
    "gi",
  );
  let flagStep;
  while ((flagStep = jsonKeyValuesRegexp.exec(jsonStr))) {
    let { key, ...groups } = flagStep.groups;

    const keyWithoutQuotes = key.replace(quoteRgx, ""); // replace quotes
    result[keyWithoutQuotes] = parseItems(groups);
  }
  return result;
}

// Parse each item in array string to correct types
const parseArray = (items = []) =>
  items.map((item) => parseItems(item.match(defineTypeRgx).groups));

// Parse each item in object to correct types
const parseItems = (values) => {
  const types = ["string", "object", "array", "number", "boolean", "null"];
  const [value, currentData] = Object.entries(values).find(([key, data]) => {
    return data !== undefined;
  });

  if (!types.includes(value)) {
    throw new Error(`Error to stringfy this ${currentData}`);
  }

  // switch case true for different types
  switch (true) {
    case value === "object":
      return myJSONParse(currentData);

    case value === "array":
      return parseArray(currentData.replace(/^\[|\]$/, "").split(","));

    case value === "number":
      return Number(currentData);

    case value === "string":
      return currentData.replace(quoteRgx, "");

    case value === "boolean":
      return currentData === "true";

    case value === "null":
      return null;

    default:
      return undefined;
  }
};

const jsonString =
  '{"name": "foo", "lastNAme": "bar", "score": [10, 20, 30], "adress": {"city": "New York"}, "age": 30, "isActive": true}';
const jsonObject = myJSONParse(jsonString);

console.log(jsonObject); // Should output the parsed JavaScript object.

const badJson = '{"foo": bar';
try {
  myJSONParse(badJson);
} catch (error) {
  console.log(error.message); // Expected output: '{"foo": bar is not an JSON string!'
}
