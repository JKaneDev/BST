class Node {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

class BST {
	constructor(array) {
		this.startIndex = 0;
		this.endIndex = array.length - 1;
		this.root = this.buildTree(array, this.startIndex, this.endIndex);
	}

	buildTree(array, startIndex, endIndex) {
		// base case: if start index is greater than end index
		if (startIndex > endIndex) return null;
		// calculate middle of array
		let middle = Math.floor((startIndex + endIndex) / 2);
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
}

const newTree = new BST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
newTree.prettyPrint(newTree.root);
