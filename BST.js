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
		if (node == null) return null;
		// recursively call inorder on node.left
		this.inOrder(node.left, operation);
		// call operation on nodes from left to root
		operation(node.val);
		// recursively call inorder on node.right
		this.inOrder(node.right, operation);
	}

	preOrder(node = this.root, operation) {
		if (!node) return;
		operation(node.val);
		this.inOrder(node.left);
		this.inOrder(node.right);
	}

	postOrder(node = this.root, operation) {
		if (!node) return;
		this.inOrder(node.left);
		this.inOrder(node.right);
		operation(node.val);
	}

	height(node) {
		// if node has no children
		if (!node) return 0;
		// if node has children: check height of left subtree
		let leftHeight = this.height(node.left);
		// repeat for right subtree
		let rightHeight = this.height(node.right);
		// compare left height to right height: take greater value
		// add one to value to account for starting node
		return Math.max(leftHeight, rightHeight) + 1;
	}

	depth(node = this.root, target, depth = 0) {
		if (!node) return -1;
		// initialize depth count
		// if node val = target val return depth
		if (node.val === target) return depth;
		// if target val < node val: recursively call depth on left node
		else if (target < node.val) {
			return this.depth(node.left, target, depth + 1);
		}
		// if target val > node val: recursively call depth on right node
		else {
			return this.depth(node.right, target, depth + 1);
		}
	}

	isBalanced(node = this.root) {
		if (!node) return;
		// check height of left subtree with height function
		let leftHeight = this.height(node.left);
		// check height of right subtree with height function
		let rightHeight = this.height(node.right);
		// if difference > 1 return false
		if (leftHeight - rightHeight > 1) return false;
		// return recursive isBalanced calls for left and right to traverse the whole tree
		return this.isBalanced(node.left) && this.isBalanced(node.right);
	}

	reBalance(node = this.root) {
		if (!node) return;
		let array = [];
		this.inOrder(node, array.push(node.val));
		return this.buildTree(array);
	}

	getRandomNumbers(howMany) {
		let numbers = [];
		for (let i = 0; i < howMany; i++) {
			numbers.push(Math.floor(Math.random() * 100));
		}
		return numbers;
	}

	driverScript() {
		// get random numbers array and generate tree
		// check if array is balanced
		// log levelOrdered tree
		// log preOrdered tree
		// log postOrdered tree
		// log inOrder tree
		// unbalance tree
		// confirm tree is unbalanced
		// balance tree with reBalance
		// confirm tree is balanced
		// log again in levelOrder, preOrder, postOrder and inOrder
	}
}
