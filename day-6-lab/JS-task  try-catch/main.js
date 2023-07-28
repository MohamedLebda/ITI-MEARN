function addNumbers(num) {
  if (!num) {
    throw new Error("Please provide at least one argument.");
  }

  if (typeof num !== "number") {
    throw new Error("All arguments must be numbers.");
  }

  return num + 10;
}

console.log(addNumbers(2));

try {
  console.log(addNumbers("two"));
} catch (error) {
  console.error(error.message);
}

try {
  console.log(addNumbers());
} catch (error) {
  console.error(error.message);
}
