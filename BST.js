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
	 * measures < & > based on comparator function passed in
	 * @param {BST.Node} a pivot node being analyzed
	 * @param {BST.Node} b newNode to be inserted
	 * @returns -1 => a < b || 0 => a === b || 1 => a > b
	 */
	#comparator = (a, b) => {
		throw 'Comparator Not Set';
	};
	constructor(comparator) {
		this.root = null;
		this.#comparator = comparator;
	}
	/**
	 * adds a node to the binary search tree
	 * @param {JSON} data the JSON item that is passed in
	 */
	add(data) {
		const node = new BST.Node(data);
		/**
		 * correctly places node in question in the BST using the comparator func of the class
		 * @param {BST.Node} currNode pivot node being analyzed
		 * @param {BST.Node} newNode node to be inserted
		 */
		const addHelper = (currNode, newNode) => {
			if (this.#comparator(currNode.getData().name, newNode.getData().name) === 1) {
				if (currNode.left === null) currNode.left = newNode;
				else addHelper(currNode.left, newNode);
			} else {
				if (currNode.right === null) currNode.right = newNode;
				else addHelper(currNode.right, newNode);
			}
		};
		if (this.root === null) this.root = node;
		else addHelper(this.root, node);
	}
	inOrder() {
		const rtnList = [];
		const inOrderHelper = (node) => {
			if (node?.left) inOrderHelper(node.left);
			if (node) rtnList.push(node.data);
			if (node?.right) inOrderHelper(node.right);
		};
		inOrderHelper(this.root);
		return rtnList;
	}
}
