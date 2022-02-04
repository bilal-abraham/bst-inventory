/**
 * sweep to remove items in the bst with negative stock or price
 * @param {BST} bst
 */
export const checkNegativeStock = (bst) => {
	for (const line of bst.inOrder()) {
		if (line.stock < 0) bst.remove(line);
		if (line.cost < 0) bst.remove(line);
	}
};
