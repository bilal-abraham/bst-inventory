export default class BST {
	static Node = class {
		constructor(data) {
			this.data = data;
			this.left = null;
			this.right = null;
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
		throw '**** Comparator Not Set ****';
	};

	constructor(comparator) {
		this.root = null;
		this.#comparator = comparator;
	}

	/**
	 * adds a node to the bst
	 * @param {Item} data the JSON item that is passed in
	 */
	add(data) {
		const node = new BST.Node(data);
		/**
		 * correctly places node in question in the BST using the comparator
		 * @param {BST.Node} currNode pivot node being analyzed
		 * @param {BST.Node} newNode node to be inserted
		 */
		const addHelper = (currNode, newNode) => {
			if (this.#comparator(currNode.data, newNode.data) === 1) {
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

	/**
	 * removes a node from the bst
	 * @param {Item} data
	 */
	remove(data) {
		const removeHelper = (node, data) => {
			if (!node) return null;
			if (this.#comparator(data, node.data) === 0) {
				if (!node.left && !node.right) return null;
				if (!node.left) return node.right;
				if (!node.right) return node.left;
				let tmp = node.right;
				while (!tmp.left) {
					tmp = tmp.left;
				}
				node.data = tmp.data;
				node.right = removeHelper(node.right, tmp.data);
			} else if (this.#comparator(data, node.data) === -1) {
				node.left = removeHelper(node.left, data);
				return node;
			} else {
				node.right = removeHelper(node.right, data);
				return node;
			}
		};
		this.root = removeHelper(this.root, data);
		return data;
	}

	/**
	 * does an inOrder traversal of the BST then
	 * @returns {Array} rtnList of the inOrder traversal of the BST
	 */
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
