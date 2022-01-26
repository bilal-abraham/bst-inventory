import { readFileSync, writeFileSync } from 'fs';
import BST from './BST.js';

const comparatorFunction = (a, b) => String(a).localeCompare(String(b));

let lines = readFileSync('data/inventory.txt', { encoding: 'utf-8' }).split('\n');

let bst = new BST(comparatorFunction);

for (let i = 0; i < lines.length; i++) {
	lines[i] = JSON.parse(lines[i]);
	lines[i].cost = parseInt(lines[i].cost.replace('$', ''));
	bst.add(lines[i]);
}

const inOrderLines = bst.inOrder();

const groupBy = (arr, key) =>
	arr.reduce(
		(p, c, _, __, group = c[key]) => ((p[group] || (p[group] = [])).push(c), p),
		{}
	);

const reducedLines = inOrderLines.reduce((p, c) => {
	if (!p[c.name]) {
		p[c.name] = { ...c, count: 1 };
		return p;
	}
	p[c.name].stock += c.stock;
	p[c.name].cost += c.cost;
	p[c.name].count += 1;
	return p;
}, {});

const result = Object.keys(reducedLines).map((x) => {
	const item = reducedLines[x];
	return {
		name: item.name,
		stock: item.stock,
		cost: Math.round(100 * (item.cost / item.count)) / 100,
	};
});

for (const line of result) {
	writeFileSync('data/storeData.txt', JSON.stringify(line) + '\n', {
		flag: 'a+',
	});
}
