export default class Item {
	#name = ''; // cannot be null
	#stock = 0;
	#price = 0.0; // cannot be negative

	constructor(name = '') {
		if (!name) name = '';
		this.name = name;
		this.stock = 0;
		this.price = 0.0;
	}
	setStock(newStock) {
		this.stock = newStock;
	}
	getStock() {
		return this.stock;
	}
	setPrice(newPrice) {
		if (newPrice < 0) return false;
		this.price = newPrice;
		return true;
	}
}
