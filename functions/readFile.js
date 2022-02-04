import { readFileSync } from 'fs';
import Item from '../Item.js';

/**
 * reads from input.txt and adds items accordingly to bst
 * @param {BST} bst
 */
export const readFile = (bst) => {
	readFileSync('data/inventory.txt', { encoding: 'utf-8' })
		.split('\n')
		.forEach((line) => {
			if (line) {
				line = JSON.parse(line);
				line.cost = parseFloat(line.cost.replace('$', ''));
				let element = new Item(line.name);
				element.stock = line.stock;
				element.cost = line.cost;
				let removedDuplicate = bst.remove(element);
				if (removedDuplicate) {
					element.stock = removedDuplicate.stock + element.stock;
					element.cost =
						Math.round(((removedDuplicate.cost + line.cost) / 2) * 100) / 100;
				}
				bst.add(element);
			}
		});
};
