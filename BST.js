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
		// removes duplicates by creating a new set, sorts array to ensure balanced BST
		const sortedArray = [...new Set(array)].sort((a, b) => a - b);
		console.log(sortedArray);
		this.root = this.buildTree(sortedArray);
	}

	buildTree(array) {
		if (array.length === 0) return null;

		let middle = Math.floor(array.length / 2);

		let root = new Node(array[middle]);

		root.left = this.buildTree(array.slice(0, middle));
		root.right = this.buildTree(array.slice(middle + 1));

		return root;
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
		if (!this.currentNode) return null;
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
		if (!this.root) return null;
		// if (!this.find(val)) return this.root;
		this.root = this.deleteNodeHelper(this.root, val);
	}

	deleteNodeHelper(node, val) {
		if (!node) return node;
		if (val < node.val) node.left = this.deleteNodeHelper(node.left, val);
		else if (val > node.val)
			node.right = this.deleteNodeHelper(node.right, val);
		else {
			if (!node.left) return node.right;
			else if (!node.right) return node.left;
			else {
				let closestMinVal = this.findClosestMinVal(val);
				node.val = closestMinVal.val;
				node.right = this.deleteNodeHelper(node.right, closestMinVal.val);
			}
		}

		return node;
	}

	findClosestMinVal(node) {
		while (node.left) {
			node = node.left;
		}
		return node;
	}

	levelOrder(node = this.root, operation) {
		if (node == null) return node;

		let operand;
		let queue = [];
		queue.push(root);
		// while queue is not empty
		while (queue.length > 0) {
			// if node.left: add to queue
			if (node.left) queue.push(node.left);
			// if node.right: add to queue
			if (node.right) queue.push(node.right);
			// dequeue first element from queue, store in operand
			operand = queue.pop();
			// perform given operation on operand
			operation(operand);
		}
	}

	inOrder(node = this.root, operation) {
		// if !node return null
		// recursively call inorder on node.left
		// call operation on nodes from left to root
		// recursively call inorder on node.right
	}
}

const newTree = new BST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
newTree.prettyPrint(newTree.root);
newTree.deleteNode(1);
newTree.prettyPrint(newTree.root);
