var numArr = [1, 2, 5, 7, 9, 6, 4, 3, 8];

function reverse(numArr) {
  numArr.reverse();
  return numArr;
}

function reverseSecond(numArr) {
  var reversedArr = [];
  for (var i = numArr.length - 1; i >= 0; i--) {
    reversedArr.push(numArr[i]);
  }
  return reversedArr;
}

function reverseThird(numArr) {
  var start = 0;
  var end = numArr.length - 1;

  while (start < end) {
    var temp = numArr[start];
    numArr[start] = numArr[end];
    numArr[end] = temp;

    start++;
    end--;
  }

  return numArr;
}

console.log(reverse(numArr));
console.log(reverseSecond(numArr));
console.log(reverseThird(numArr));
