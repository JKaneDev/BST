# BST

This is a javascript file that creates a binary search tree (BST) class. It has several key features, including:

- Creating a new BST by passing in an array of numbers. The array is first sorted to ensure that the tree is balanced and any duplicate values are removed.
- The ability to insert new values into the tree by calling the insert(val) method on a BST instance.
- The ability to search for a specific value in the tree by calling the find(val) method on a BST instance.
- The ability to delete a specific node from the tree by calling the deleteNode(val) method on a BST instance.
- A prettyPrint() method which helps to visualize the tree structure on the console.
- The ability to get a list of values from the tree in level order, in order, pre order and post order.
- The ability to check if the tree is balanced or not, and if not, the ability to re-balance it.

- To run this file using node, you can create a new javascript file and import the BST class using the following line of code:

Copy code

```js
const BST = require('./BST');
```

You can then create a new instance of the BST class by passing in an array of numbers, and call any of the class methods on the instance as needed.
