import { readFileSync, writeFileSync } from 'fs';
import BST from './BST.js';

const comparatorFunction = (a, b) => String(a).localeCompare(String(b));

let lines = readFileSync('data/inventory.txt', { encoding: 'utf-8' }).split('\n');

let bst = new BST(comparatorFunction);

for (let i = 0; i < lines.length; i++) {
	lines[i] = JSON.parse(lines[i]);
	bst.add(lines[i]);
}

const inOrderLines = bst.inOrder();

const groupBy = (arr, key) =>
	arr.reduce(
		(p, c, _, __, group = c[key]) => ((p[group] || (p[group] = [])).push(c), p),
		{}
	);

console.log(groupBy(inOrderLines, 'name'));

// let output = groupBy(inOrderLines);

// for (const line of output)
// 	writeFileSync('data/storeData.txt', JSON.stringify(line) + '\n', {
// 		flag: 'a+',
// 	});
