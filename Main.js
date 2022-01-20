import { readFileSync, writeFileSync } from 'fs';
import BST from './BST.js';

const comparatorFunction = (a, b) => String(a).localeCompare(String(b));

let lines = readFileSync('docs/inventory.txt', { encoding: 'utf-8' }).split('\n');

let bst = new BST(comparatorFunction);

for (let i = 0; i < lines.length; i++) {
	lines[i] = JSON.parse(lines[i]);
	bst.add(lines[i]);
}

const content = 'Some MORE content';

try {
	writeFileSync('docs/storeData.txt', content + '\n', { flag: 'a+' });
} catch (err) {
	console.error(err);
}

console.log(bst.root);
