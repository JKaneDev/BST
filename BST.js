class Node {
	constructor() {
		this.val = null;
		this.left = null;
		this.right = null;
	}
}

class BST {
	constructor(array) {
		this.root = null;
		this.startIndex = 0;
		this.endIndex = array.length - 1;

		this.buildTree(array, this.startIndex, this.endIndex);
	}

	buildTree(array, startIndex, endIndex) {
		// base case: if start index is greater than end index
		// calculate middle of array
		// create new node
		// recursively call create tree on left node
		// recursively call create tree on right node
	}
}
