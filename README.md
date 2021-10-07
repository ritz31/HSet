# Introduction
HSet is a light weight extension of native Javascript Sets, which gives the full benefit and features of using sets excluding the negatives and including a few additional features.

You can use HSet in your everyday projects just like using a set in Javascript, with the same property names and functions, resulting in a flat learning curve.

Note: HSet only stores Strings and Numbers.

# Installation

```
npm i hset
```

```
// import HSet into your project
import HSet from "hset"; // es6+
const HSet = require("hset"); // es5

// create a new hset
const hset = new HSet();
```

# Adding items
```
// add one item
hset.add("apple"); // returns ["apple"]

// add multiple items
hset.add("mango","grapes"); // returns ["mango", "grapes"]
```
You can add a maximum of 2^32 - 1 = 4,294,967,295 items at a time.

This is equivalent to the max length of an Array in Javascript.

You can also add an entire array into HSet using the spread operator

```
// example array
const arr = ["pea", "orange", "peach", "coconut"];

// adding the array to the HSet
hset.add(...arr) // returns ["pea", "orange", "peach", "coconut"];
```

# Deleting items
```
// delete one item
hset.delete("apple") // returns true

// delete multiple items
hset.delete("pea", "banana"); // returns true

```

The delete function will return *true* on successful deletion of at least one item, and will return *false* when non of the items in the argument could be deleted.

Delete items in an Array using the spread operator

```
// example array
const arr2 = ["coconut", "olive"];

// delete the items in the array from HSet
hset.delete(...arr2); // returns true
```

# Has items
```
// check if an item exists in the HSet
hset.has("mango") // returns ["mango"]

// check if a list of items exist in the HSet
hset.has("mango", "orange", "pea") // returns ["mango","orange"]
```

The has function returns the items that exist in the HSet.

If non of the items exist in the HSet, then the has function will return an empty array.

Execute condition statements using the has function.

```
if (hset.has("mango"))
    console.log("HSet contains mango!");

// logs -> "HSet contains mango!"
```

# Has not items
```
// check if an item doesn't exist in the HSet
hset.hasNot("mango"); // returns []

// check if a list of items exist in the HSet
hset.hasNot("mango", "orange", "peas"); // returns ["peas"]
```

The hasNot function is the opposite of the has function. It returns the items that don't exist in the HSet.

```
if (hset.hasNot("mango"))
    console.log("HSet doesn't contain mango!")

// logs -> "HSet doesn't contain mango!"
```

# Size of HSet
```
hset.size // returns 4
```

hset.size returns the number of items in the HSet

# Values of the HSet
```
hset.values() // returns ["mango", "grapes", "orange", "peach"]
```

The values function returns all the items of an HSet in an Array.

# Clear HSet
```
hset.clear() // returns undefined

hset.values() // returns []

hset.size // returns 0
```

Clear HSet clears all data.