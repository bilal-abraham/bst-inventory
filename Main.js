import BST from './BST.js';
import { readFile } from './functions/ReadFile.js';
import { writeFile } from './functions/WriteFile.js';

const comparatorFunction = (a, b) => String(a.name).localeCompare(String(b.name));

const bst = new BST(comparatorFunction);

readFile(bst);

let inOrderList = bst.inOrder();

writeFile(inOrderList);
