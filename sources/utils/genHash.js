const bigStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const randomChar = () => bigStr[Math.floor(Math.random() * bigStr.length)];

const rondomize = (num = 14) => {
  let str = "";
  for (let i = 1; i <= num; i++) {
    str = randomChar();
  }
  return str;
};

const genHash = (num = 16) => {
  const time = new Date().getTime().toString().split("").map(Number);

  return Array(num)
    .fill(3)
    .reduce((acc, curr, i) => {
      return acc + rondomize(time[i] || curr);
    }, "");
};

module.exports = genHash;
