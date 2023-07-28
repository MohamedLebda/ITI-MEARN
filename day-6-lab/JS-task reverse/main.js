function reverse() {
  var argsArray = Array.from(arguments);
  var reversedArray = argsArray.reverse();

  return reversedArray;
}

function reverseTwo() {
  const reversedArray = [];
  for (let i = arguments.length - 1; i >= 0; i--) {
    reversedArray.push(arguments[i]);
  }
  return reversedArray;
}

console.log(reverse(1, 5, 6, 8, 2, 3));
console.log(reverseTwo(1, 5, 6, 8, 2, 3));
