function addNumbers() {
  var args = Array.from(arguments);

  if (args.length === 0) {
    throw new Error("Please provide at least one argument.");
  }

  var sum = 0;
  for (const arg of args) {
    if (typeof arg !== "number") {
      throw new Error("All arguments must be numbers.");
    }
    sum += arg;
  }

  return sum;
}

console.log(addNumbers(1, 4, 5));

try {
  console.log(addNumbers("two", 2));
} catch (error) {
  console.error(error.message);
}

try {
  console.log(addNumbers());
} catch (error) {
  console.error(error.message);
}
