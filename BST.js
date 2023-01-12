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

	delete(currentNode = this.root, val) {
		// if currentNode is null, return null
		if (!currentNode) return null;
		// compare val with currentNode val
		// if val < currentNode val: recursively call delete on currentNode.left
		if (val < currentNode.val) {
			currentNode.left = this.delete(currentNode.left, val);
		}
		// if val > currentNode.val: recursively call delete on currentNode.right
		if (val > currentNode.val) {
			currentNode.right = this.delete(currentNode.right, val);
		}
		// if val === currentNode.val:
		else {
			// check if node has no left child, if so: return right child
			if (!currentNode.left) {
				return currentNode.right;
			}

			// check if node has no right child, if so: return left child
			else if (!currentNode.right) {
				return currentNode.left;
			}
		}
		// if node has two children: find min val node of it's right subtree
		// replace currentNode.val with closestVal.val
		currentNode.val = this.findClosestVal(currentNode.right);
		// recursively call delete on right child node with the closestVal.val
		currentNode.right = this.delete(currentNode.right, currentNode.val);
		// return root of tree
		return currentNode;
	}

	findClosestVal(node) {
		let currentNode = node;
		// while node has left child
		while (currentNode.left) {
			// set node to be left child
			currentNode = currentNode.left;
		}
		return currentNode.val;
	}
}

const newTree = new BST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
newTree.prettyPrint(newTree.root);
// newTree.delete(newTree.root, 7);
