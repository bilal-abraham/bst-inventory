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
		const removeHelper = (parent, remove) => {
			let isLeftChild = true;
			if (parent.right === remove) {
				isLeftChild = false;
			}
			let pointHere = remove.left;
			if (remove.left === null) {
				pointHere = remove.right;
			}
			if (isLeftChild) {
				parent.left = pointHere;
			} else {
				parent.right = pointHere;
			}
			return remove.data;
		};
		let p = null;
		let r = this.root;
		while (r !== null) {
			if (this.#comparator(r.data, data) < 0) {
				p = r;
				r = r.right;
			} else if (this.#comparator(r.data, data) > 0) {
				p = r;
				r = r.left;
			} else {
				if (p === null && r.left !== null && r.left !== null) {
					let rightLeftChild = r.left;
					let parentRightLeftChild = r;
					while (rightLeftChild.right !== null) {
						parentRightLeftChild = rightLeftChild;
						rightLeftChild = rightLeftChild.right;
					}
					let t = r.data;
					r.data = rightLeftChild.data;
					rightLeftChild.data = t;
					return removeHelper(parentRightLeftChild, rightLeftChild);
				} else {
					if (r.left !== null && r.right !== null) {
						let rp = r;
						let removeOne = rp.left;
						while (removeOne.right !== null) {
							rp = removeOne;
							removeOne = removeOne.right;
						}
						let t = r.data;
						r.data = removeOne.data;
						removeOne.data = t;
						return removeHelper(rp, removeOne);
					} else {
						return removeHelper(p, r);
					}
				}
			}
		}
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
