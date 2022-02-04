import { createWriteStream, writeFileSync } from 'fs';

export const writeFile = (inOrderList) => {
	let rl = createWriteStream('data/storeData.txt');
	rl.once('open', () => {
		rl.write('Number of Unique Items: ' + inOrderList.length + '\n');
		for (const node of inOrderList) {
			writeFileSync('data/storeData.txt', JSON.stringify(node) + '\n', {
				flag: 'a+',
			});
		}
	});
};
