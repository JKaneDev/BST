class Node {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

class BST {
	set = new Set();

	constructor(array) {
		this.startIndex = 0;
		this.endIndex = array.length - 1;
		this.root = this.buildTree(array, this.startIndex, this.endIndex);
	}

	buildTree(array, startIndex, endIndex) {
		// base case: if start index is greater than end index
		if (startIndex > endIndex) return;
		// calculate middle of array
		let middle = Math.floor((startIndex + endIndex) / 2);
		// check if val is unique, return if not
		if (this.set.has(array[middle])) return;
		// add to set if val is unique
		this.set.add(array[middle]);
		// create new node
		let newNode = new Node(array[middle]);
		// recursively call create tree on left node
		newNode.left = this.buildTree(array, startIndex, middle - 1);
		// recursively call create tree on right node
		newNode.right = this.buildTree(array, middle + 1, endIndex);

		return newNode;
	}

	prettyPrint(node, prefix = '', isLeft = true) {
		if (!node) return;
		if (node.right !== null) {
			this.prettyPrint(
				node.right,
				`${prefix}${isLeft ? '│   ' : '    '}`,
				false
			);
		}
		console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.val}`);
		if (node.left !== null) {
			this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
		}
	}

	insert(val, currentNode = this.root) {
		// if root is null, create new node at root
		if (!this.root) {
			this.root = new Node(val);
			return this;
		}
		// is val less than currentNode val
		if (val < currentNode.val) {
			// if yes check for left node, if no left node, set newNode here
			if (!currentNode.left) {
				currentNode.left = new Node(val);
				return this;
			} else {
				// if there is a left node, call insert again
				return this.insert(val, currentNode.left);
			}
		}

		// is val is greater than root val
		if (val > currentNode.val) {
			// check for right node, if no right node, set newNode here
			if (!currentNode.right) {
				currentNode.right = new Node(val);
				return this;
				// else if there is a right node, call insert again
			} else {
				return this.insert(val, currentNode.right);
			}
		}
		// if val is equal to current val, return undefined to prevent duplication
		if (val === currentNode.val) return undefined;

		return this;
	}

	find(val, currentNode = this.root) {
		// if root is null, tree empty, return
		if (!this.root) return null;
		// if val === root val, return root
		if (val === currentNode.val) return currentNode;

		// if val < root val, move pointer, check left node, repeat step 2
		if (val < currentNode.val) {
			return this.find(val, currentNode.left);
		}

		// if val > root val, check right node, repeat step 2
		if (val > currentNode.val) {
			return this.find(val, currentNode.right);
		}
	}

	deleteNode(val) {
		// if !root return null
		// call deleteNodeHelper recursively on root with given val
	}

	deleteNodeHelper(node, val) {
		// if node = null, return it
		// if val < node.val: node.left = deleteNodeHHelper
		// else if val > node.valL node.right = deleteNodeHelper
		// else:
		// if !node.left return node.right
		// else if !node.right return node.left
		// else:
		// findClosestMinVal
		// assign to node val
		// call deleteNodeHelper recursively to delete duplicate node
		// return current Node
	}

	findClosestMinVal(val) {
		// while node has left child
		// left node = current node
	}

const newTree = new BST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
newTree.prettyPrint(newTree.root);
newTree.deleteNode(newTree.root, 6345);
newTree.prettyPrint(newTree.root);
newTree.deleteNode(newTree.root, 7);
newTree.prettyPrint(newTree.root);
newTree.deleteNode(newTree.root, 67);
newTree.prettyPrint(newTree.root);
newTree.deleteNode(newTree.root, 324);
newTree.prettyPrint(newTree.root);
newTree.deleteNode(newTree.root, 6345);
newTree.prettyPrint(newTree.root);
