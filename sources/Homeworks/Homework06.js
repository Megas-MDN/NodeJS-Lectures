const translations = {
  en: {
    greet: "Hello",
    intro: "Welcome to our website",
  },
  fr: {
    greet: "Bonjour",
    intro: "Bienvenue sur notre site web",
  },
};

const localize = (_strings, ...keys) => {
  let textArray = [];
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    textArray.push(translations[language][key]);
  }
  return textArray.join("\n");
};

const language = "en"; // "fr"; // Change to "en" for English
const greeting = "greet";
const introduction = "intro";

const localizedGreeting = localize`${greeting}`;
const localizedIntroduction = localize`${introduction}`;

// console.log(localizedGreeting); // Expected: "Bonjour" (for language "fr")
// console.log(localizedIntroduction); // Expected: "Bienvenue sur notre site web" (for language "fr")

const highlightKeywords = (text, keywords) => {
  let highlighted = text;
  for (let i = 0; i < keywords.length; i++) {
    const key = keywords[i];
    highlighted = highlighted.replace(
      "${" + `${i}` + "}",
      `<span class='highlight'>${key}</span>`,
    );
  }

  return highlighted;
};

const keywords = ["JavaScript", "template", "tagged"];
const template =
  "Learn ${0} tagged templates to create custom ${1} literals for ${2} manipulation.";

const highlighted = highlightKeywords(template, keywords);

// const Expected =
//   "Learn <span class='highlight'>JavaScript</span> tagged templates to create custom <span class='highlight'>template</span> literals for <span class='highlight'>tagged</span> manipulation.";
// console.log(highlighted === Expected);
const multiline = (str, ...args) => {
  const lines = str[0].trim().split("\n");
  let result = "";
  for (let i = 0; i < lines.length; i++) {
    result += `${i + 1}  ${lines[i]}\n`;
  }
  return result.trim();
};
const code = multiline`  
function add(a, b) {  
      return a + b; 
}  
`;
// console.log(code);
const document = {
  getElementById() {
    return {
      addEventListener(_, callback) {
        callback({ target: { value: "Testy" } });
      },
    };
  },
};
debounce = (func, delay) => {
  let timer;
  return (params) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(params), delay);
  };
};

function debouncedSearch(query) {
  // Perform search operation with the query
  console.log("Searching for:", query);
}

const debouncedSearchHandler = debounce(debouncedSearch, 3000);

const inputElement = document.getElementById("search-input");

// inputElement.addEventListener("input", (event) => {
//   debouncedSearchHandler(event.target.value);
// });

const throttle = (func, interval) => {
  let timer;
  return (params) => {
    if (timer) return;
    timer = setTimeout(() => {
      func(params);
      timer = null;
    }, interval);
  };
};

function onScroll(event) {
  // Handle scroll event
  console.log("Scroll event:", event);
}

const throttledScrollHandler = throttle(onScroll, 1000);

const window = {
  addEventListener(_, callback) {
    callback({ target: "My Custom target" });
  },
};
// window.addEventListener("scroll", throttledScrollHandler);
// window.addEventListener("scroll", throttledScrollHandler); // skip
// setTimeout(() => {
//   window.addEventListener("scroll", throttledScrollHandler); // run
// }, 1500);

const curry = (func, arity) => {
  return (...args) => {
    if (args.length >= arity) {
      return func(...args);
    } else {
      return (...nextArgs) => curry(func, arity)(...args, ...nextArgs);
    }
  };
};

function multiply(a, b, c) {
  return a * b * c;
}

const curriedMultiply = curry(multiply, 3);

const step1 = curriedMultiply(2); // Returns a curried function
const step2 = step1(3); // Returns a curried function
const result = step2(4); // Returns the final result: 2 * 3 * 4 = 24

// console.log("Result:", result); // Expected: 24
