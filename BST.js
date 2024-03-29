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

	levelOrder(node = this.root, callback) {
		if (!node) return;

		let queue = [node];
		let levelOrdered = [];
		// while queue is not empty
		while (queue.length > 0) {
			// dequeue first element
			let currentNode = queue.shift();
			// check for given callback
			if (callback) callback(currentNode.val);
			// if no callback provided: add to levelOrder list
			else levelOrdered.push(currentNode.val);
			// if currentNode has left child: add to queue
			if (currentNode.left) queue.push(currentNode.left);
			// if currentNode has right child: add to queue
			if (currentNode.right) queue.push(currentNode.right);
			// return level ordered array
		}
		return levelOrdered;
	}

	inOrder(node = this.root, callback, inOrderArray = []) {
		if (!node) return null;
		this.inOrder(node.left, callback, inOrderArray);
		callback ? callback(node.val) : inOrderArray.push(node.val);
		this.inOrder(node.right, callback, inOrderArray);

		return inOrderArray;
	}

	preOrder(node = this.root, callback, preOrderArray = []) {
		if (!node) return;
		callback ? callback(node.val) : preOrderArray.push(node.val);
		this.inOrder(node.left, callback, preOrderArray);
		this.inOrder(node.right, callback, preOrderArray);

		return preOrderArray;
	}

	postOrder(node = this.root, callback, postOrderArray = []) {
		if (!node) return;
		this.inOrder(node.left, callback, postOrderArray);
		this.inOrder(node.right, callback, postOrderArray);
		callback ? callback(node.val) : postOrderArray.push(node.val);

		return postOrderArray;
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
		if (!node) return true;
		// check height of left subtree with height function
		let leftHeight = this.height(node.left);
		// check height of right subtree with height function
		let rightHeight = this.height(node.right);
		// if difference > 1 return false
		if (Math.abs(leftHeight - rightHeight) > 1) return false;
		// return recursive isBalanced calls for left and right to traverse the whole tree
		return this.isBalanced(node.left) && this.isBalanced(node.right);
	}

	reBalance(node = this.root) {
		if (!node) return;
		let balancedList = this.inOrder();
		this.root = this.buildTree(balancedList);
	}
}

// generate random numbers
const randomNumbers = (size) => {
	return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
};

// create new BST
const tree = new BST(randomNumbers(12));

console.log('Is this tree balanced?', tree.isBalanced());
console.log('Level Order: ');
console.log(tree.levelOrder());
console.log('In Order: ');
console.log(tree.inOrder());
console.log('Pre Order: ');
console.log(tree.preOrder());
console.log('Post Order: ');
console.log(tree.postOrder());

// Unbalance Tree
const numbers = [243, 293, 555, 276, 283];
numbers.forEach((number) => tree.insert(number));

console.log('Is this tree balanced?', tree.isBalanced());
tree.reBalance();
console.log('Is this tree balanced?', tree.isBalanced());

console.log('Level Order: ');
console.log(tree.levelOrder());
console.log('In Order: ');
console.log(tree.inOrder());
console.log('Pre Order: ');
console.log(tree.preOrder());
console.log('Post Order: ');
console.log(tree.postOrder());
