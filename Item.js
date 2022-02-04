export default class Item {
	name = '';
	stock = 0;
	cost = 0.0;
	constructor(name) {
		if (!name) name = '';
		this.name = name;
		this.stock = 0;
		this.cost = 0.0;
	}
	/**
	 * @param {String} _name
	 */
	set name(_name) {
		if (_name) this.name = _name;
		else this.name = '';
	}
	get name() {
		return this.name;
	}
	/**
	 * @param {Number} _stock
	 */
	set stock(_stock) {
		this.stock = _stock;
	}
	get stock() {
		return this.stock;
	}
	/**
	 * @param {Number} _cost
	 */
	set cost(_cost) {
		this.cost = _cost;
	}
	get cost() {
		return this.cost;
	}
}
