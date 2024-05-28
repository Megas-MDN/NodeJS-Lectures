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
    result[keyWithoutQuotes] = stringfyItems(groups);
  }
  return result;
}

// Turn each item in Array to strings
const stringfyArray = (items = []) =>
  items.map((item) => stringfyItems(item.match(defineTypeRgx).groups));

// Turn each item in Json object to strings
const stringfyItems = (values) => {
  const types = ["string", "object", "array", "number", "boolean", "null"];
  const [value, currentData] = Object.entries(values).find(([key, data]) => {
    return data !== undefined;
  });

  if (!types.includes(value)) {
    throw new Error(`Error to stringfy this ${currentData}`);
  }
  let result;

  // switch case true for different types
  switch (true) {
    case value === "object":
      result = myJSONParse(currentData);
      break;

    case value === "array":
      result = stringfyArray(currentData.replace(/^\[|\]$/, "").split(","));
      break;

    case value === "number":
      result = Number(currentData);
      break;

    case value === "string":
      result = currentData.replace(quoteRgx, "");
      break;

    case value === "boolean":
      result = currentData === "true";
      break;

    case value === "null":
      result = null;
      break;

    default:
      result = undefined;
      break;
  }

  return result;
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
