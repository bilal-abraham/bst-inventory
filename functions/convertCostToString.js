/**
 * converts cost to string and add a '$' to match input
 * @param {BST} bst
 */
export const convertCostToString = (bst) => {
	for (const line of bst.inOrder()) {
		line.cost = '$' + line.cost.toString();
	}
};
