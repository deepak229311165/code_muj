const mongoose = require('mongoose');
const Problem = require('./models/Problem');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/codemuj', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleProblems = [
  {
    title: "Binary Search Implementation",
    description: "Implement a binary search algorithm to find an element in a sorted array. The function should return the index of the element if found, or -1 if not found.",
    category: "Algorithms",
    difficulty: "Medium",
    timeEstimate: "30 mins",
    testCases: [
      {
        input: "[1, 2, 3, 4, 5], 3",
        output: "2"
      },
      {
        input: "[1, 2, 3, 4, 5], 6",
        output: "-1"
      }
    ],
    solution: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}`
  },
  {
    title: "Fibonacci Sequence",
    description: "Write a function to generate the nth number in the Fibonacci sequence. The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, starting from 0 and 1.",
    category: "Mathematics",
    difficulty: "Easy",
    timeEstimate: "20 mins",
    testCases: [
      {
        input: "5",
        output: "5"
      },
      {
        input: "10",
        output: "55"
      }
    ],
    solution: `function fibonacci(n) {
  if (n <= 1) return n;
  
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  
  return b;
}`
  },
  {
    title: "Palindrome Checker",
    description: "Write a function that checks if a given string is a palindrome. A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward.",
    category: "Algorithms",
    difficulty: "Easy",
    timeEstimate: "15 mins",
    testCases: [
      {
        input: "'racecar'",
        output: "true"
      },
      {
        input: "'hello'",
        output: "false"
      }
    ],
    solution: `function isPalindrome(str) {
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleanStr === cleanStr.split('').reverse().join('');
}`
  },
  {
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    category: "Algorithms",
    difficulty: "Medium",
    timeEstimate: "25 mins",
    testCases: [
      {
        input: "[2, 7, 11, 15], 9",
        output: "[0, 1]"
      },
      {
        input: "[3, 2, 4], 6",
        output: "[1, 2]"
      }
    ],
    solution: `function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  
  return [];
}`
  },
  {
    title: "Merge Sort Implementation",
    description: "Implement the merge sort algorithm to sort an array of integers in ascending order. Merge sort is a divide-and-conquer algorithm that works by recursively breaking down a problem into two or more sub-problems of the same or related type.",
    category: "Algorithms",
    difficulty: "Hard",
    timeEstimate: "45 mins",
    testCases: [
      {
        input: "[5, 2, 9, 1, 5, 6]",
        output: "[1, 2, 5, 5, 6, 9]"
      },
      {
        input: "[3, 1, 4, 1, 5, 9, 2, 6]",
        output: "[1, 1, 2, 3, 4, 5, 6, 9]"
      }
    ],
    solution: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}`
  }
];

const seedDatabase = async () => {
  try {
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 8);
    const admin = new User({
      username: 'admin',
      email: 'admin@codemuj.com',
      password: adminPassword,
      role: 'admin'
    });
    await admin.save();

    // Add problems
    for (const problem of sampleProblems) {
      const newProblem = new Problem({
        ...problem,
        createdBy: admin._id
      });
      await newProblem.save();
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 