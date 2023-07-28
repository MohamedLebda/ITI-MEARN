function onlyTwoParams() {
  if (arguments.length !== 2) {
    throw new Error("Exactly two parameters are required.");
  }

  return "two parameters entered";
}

console.log(onlyTwoParams(1, 2));
console.log(onlyTwoParams(1, 2, 3));
