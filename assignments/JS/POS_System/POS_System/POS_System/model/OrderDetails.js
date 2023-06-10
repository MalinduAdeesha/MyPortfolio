export default class OrderDetails{

    constructor(item_code, customer_id, item_name, item_price, qty, total) {
        this._item_code = item_code;
        this._customer_id = customer_id;
        this._item_name = item_name;
        this._item_price = item_price;
        this._qty = qty;
        this._total = total;
    }

    get item_code() {
        return this._item_code;
    }

    set item_code(item_code) {
        this._item_code = item_code;
    }

    get customer_id() {
        return this._customer_id;
    }

    set customer_id(customer_id) {
        this._customer_id = customer_id;
    }

    get item_name() {
        return this._item_name;
    }

    set item_name(item_name) {
        this._item_name = item_name;
    }

    get item_price() {
        return this._item_price;
    }

    set item_price(item_price) {
        this._item_price = item_price;
    }

    get qty() {
        return this._qty;
    }

    set qty(qty) {
        this._qty = qty;
    }

}