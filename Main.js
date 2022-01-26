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

console.log(inOrderLines);

const groupBy = (arr, key) =>
	arr.reduce(
		(p, c, _, __, group = c[key]) => ((p[group] || (p[group] = [])).push(c), p),
		{}
	);

// let output = groupBy(inOrderLines, 'name');zxsx
// console.log(output);

const reduced = inOrderLines.reduce((p, c) => {
	if (!p[c.name]) {
		p[c.name] = { ...c, count: 1 };
		return p;
	}
	p[c.name].stock += c.stock;
	p[c.name].cost += c.cost;
	p[c.name].count += 1;
	return p;
}, {});

const result = Object.keys(reduced).map((x) => {
	const item = reduced[x];
	return {
		name: item.name,
		stock: item.stock,
		cost: item.cost / item.count,
	};
});

for (const line of result)
	writeFileSync('data/storeData.txt', JSON.stringify(line) + '\n', {
		flag: 'a+',
	});
