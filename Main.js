import { readFileSync, writeFileSync, createWriteStream } from 'fs';
import BST from './BST.js';
import Item from './Item.js';

let lines = readFileSync('data/inventory.txt', { encoding: 'utf-8' }).split('\n');

const comparatorFunction = (a, b) => String(a.name).localeCompare(String(b.name));

let bst = new BST(comparatorFunction);

for (let i = 0; i < lines.length; i++) {
	lines[i] = JSON.parse(lines[i]);
	lines[i].cost = parseInt(lines[i].cost.replace('$', ''));
	let element = new Item(lines[i].name);
	element.stock = lines[i].stock;
	element.cost = lines[i].cost;
	bst.add(element);
	let removed = bst.remove(element);
	let isDuplicate = false;
	let duplicate;
	for (const node of bst.inOrder()) {
		if (removed.name === node.name) {
			isDuplicate = true;
			duplicate = node;
			break;
		}
	}
	if (!isDuplicate) bst.add(removed);
	// else {
	// 	duplicate.stock = duplicate.stock + removed.stock;
	// 	duplicate.cost = Math.round(100 * ((duplicate.stock + removed.stock) / 2)) / 100;
	// }
}
console.log(bst);

let rl = createWriteStream('data/storeData.txt');
let inOrderList = bst.inOrder();
rl.once('open', (fd) => {
	rl.write('Number of Unique Items: ' + inOrderList.length);
	rl.write('\n');
	for (const node of inOrderList) {
		writeFileSync('data/storeData.txt', JSON.stringify(node) + '\n', {
			flag: 'a+',
		});
	}
});

// const reducedLines = inOrderLines.reduce((p, c) => {
// 	if (!p[c.name]) {
// 		p[c.name] = { ...c, count: 1 };
// 		return p;
// 	}
// 	p[c.name].stock += c.stock;
// 	p[c.name].cost += c.cost;
// 	p[c.name].count += 1;
// 	return p;
// }, {});

// const result = Object.keys(reducedLines).map((x) => {
// 	const item = reducedLines[x];
// 	return {
// 		name: item.name,
// 		stock: item.stock,
// 		cost: Math.round(100 * (item.cost / item.count)) / 100,
// 	};
// });
