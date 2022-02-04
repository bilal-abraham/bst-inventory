import BST from './BST.js';
import { checkNegativeStock } from './functions/checkNegativeStock.js';
import { convertCostToString } from './functions/convertCostToString.js';
import { readFile } from './functions/ReadFile.js';
import { writeFile } from './functions/WriteFile.js';

const comparatorFunction = (a, b) => String(a.name).localeCompare(String(b.name));

const bst = new BST(comparatorFunction);

readFile(bst);
checkNegativeStock(bst);
convertCostToString(bst);
writeFile(bst.inOrder());
