import { readFileSync } from 'fs';
import BST from './BST.js';

const lines = readFileSync('docs/inventory.txt', { encoding: 'utf-8' }).split('\n');

const comparator = (a, b) => {
	return String(a).localeCompare(String(b));
};

let bst = new BST(comparator);

for (let i = 0; i < lines.length; i++) {
	lines[i] = JSON.parse(lines[i]);
	bst.add(lines[i]);
}

console.log(bst.root.left.left);
