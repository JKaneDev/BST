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
		if (startIndex > endIndex) return null;
		// calculate middle of array
		let middle = startIndex + endIndex / 2;
		// create new node
		let newNode = new Node(array[middle]);
		// recursively call create tree on left node
		newNode.left = createTree(array, start, middle - 1);
		// recursively call create tree on right node
		newNode.right = createTree(array, middle + 1, end);

		return this;
	}
}
