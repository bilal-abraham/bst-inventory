import { readFileSync, writeFileSync } from 'fs';
import BST from './BST.js';

const comparatorFunction = (a, b) => String(a).localeCompare(String(b));

let lines = readFileSync('docs/inventory.txt', { encoding: 'utf-8' }).split('\n');

let bst = new BST(comparatorFunction);

for (let i = 0; i < lines.length; i++) {
	lines[i] = JSON.parse(lines[i]);
	bst.add(lines[i]);
}

let inOrderLines = bst.inOrder();

for (const line of inOrderLines)
	writeFileSync('docs/storeData.txt', JSON.stringify(line) + '\n', {
		flag: 'a+',
	});
