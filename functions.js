import { readFileSync, writeFileSync } from 'fs';

export const getInventory = () =>
	readFileSync('docs/inventory.txt', { encoding: 'utf-8' }).split('\n');

export const comparatorFunction = (a, b) => String(a).localeCompare(String(b));
