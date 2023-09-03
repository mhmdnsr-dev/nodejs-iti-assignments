"use strict";

// 1)
/**
 * Function that takes the age in years and returns the age in days..
 * @param {number | string} age A number or string that can evaluate to an integer
 * @returns number
 */
const AgeInDays = (age, t) => {
  // Only any values ​​that can evaluate to an integer are accepted
  if (Number.isNaN(+age)) return;
  return age * 365;
};

console.log(AgeInDays(22));
console.log(AgeInDays("12"));
console.log(AgeInDays("ok"));

// 2)
/**
 * Function that takes an array of numbers and returns the smallest number in the set
 * @param  {...number} nums - Array of numbers
 * @returns number
 */
const smallerNum = (...nums) => {
  if (!nums.length) return;
  let smallerNum = nums[0];
  for (const num of nums) num < smallerNum && (smallerNum = num);
  return smallerNum;
};
console.log(smallerNum(1, -22, -3, 4));
console.log(smallerNum());

// 3)
/**
 * Function that takes an array and return it with its digits in descending order.
 * @param  {...number} nums -non-negative number
 * @returns array[]
 */
const descOrder = (...nums) => {
  if (!nums.length) return;
  // Bubble sort algorithm
  for (let i = 0; i < nums.length; i++)
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] < nums[j]) {
        // swapping
        let temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
      }
    }
  // Eliminate any negative number
  while (nums[nums.length - 1] < 0) nums.length--;
  return nums;
};
console.log(descOrder(1, 2, -88, -99, 5, 33, 0, 66, 3, 4));

// 4)
/**
 * what is the output of
 */
console.log([] == []); //==> false    Different reference (addess) value for each
console.log({} == {}); //==> false    Different reference (addess) value for each

/**
 * what is the output of
 */
function main() {
  console.log("A");
  setTimeout(function print() {
    console.log("B");
  }, 0);
  console.log("C");
}
main(); // ==> "A" > "C" > "B"  callback in setTimeout run in the next eventloop cycle (when the stack is empty except "Global Execution Context" )

/**
 * what is the output of
 */
var num = 8;
var num = 10;
console.log(num); // ===>"10" var can re-declare without any errors

/**
 * what is the output of
 */
function sayHi() {
  console.log(name);
  console.log(age);
  var name = "Ayush";
  let age = 21;
}
sayHi(); // ==> "undefined"  > ref error can't acsses to "age" before init
// var declaration is hoisted, not its initialization, therefore will return "undefined" when try access it before is declared
// let declaration is hoisted and It remains in a "temporary dead zone" (TDZ) therefore will return "ref error" when try access it before is declared
