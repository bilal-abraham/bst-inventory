export default class BST {
	static Node = class {
		constructor(data) {
			this.data = data;
			this.left = null;
			this.right = null;
		}

		getData() {
			return this.data;
		}
	};

	#root = null;

	/**
	 * if the newNode (b) is "less" than the pivot (a) === -1
	 * @param {BST.Node} a pivot node being analyzed
	 * @param {BST.Node} b newNode to be instered
	 * @returns -1 => a < b || 0 => a === b || 1 => a > b
	 */
	#comparator = (a, b) => {
		throw 'Comparator not set';
	};

	constructor(comparator) {
		this.root = null;
		this.#comparator = comparator;
	}

	/**
	 * adds a node to the binary search tree
	 * @param {Object} data the JSON item that is passed in
	 */
	add(data) {
		const node = new BST.Node(data);
		// root is null then node will be added to the tree and made root.
		if (this.root === null) this.root = node;
		// find the correct position in the tree and add the node
		else this.addNode(this.root, node);
	}

	/**
	 * insterts a node into the BST
	 * @param {BST.Node} currNode pivot node being analyzed
	 * @param {BST.Node} newNode node to be instered
	 */
	addNode(currNode, newNode) {
		// if the data is less than the node data move left of the tree
		if (this.#comparator(currNode.getData().name, newNode.getData().name) === 1) {
			// if left is null insert node here
			if (currNode.left === null) currNode.left = newNode;
			// if left is not null recur until null is found
			else this.addNode(currNode.left, newNode);
		}
		// if the data is more than the node data move right of the tree
		else {
			// if right is null insert node here
			if (currNode.right === null) currNode.right = newNode;
			// if right is not null recur until null is found
			else this.addNode(currNode.right, newNode);
		}
	}

	remove(data) {}
	inOrder() {}

	// Private Methods -- new to ECMA2022
	#removeNode(node) {}
	#findNode(data) {}
}
