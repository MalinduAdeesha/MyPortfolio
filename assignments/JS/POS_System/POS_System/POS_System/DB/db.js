const data = "POS_Customer";
const data2 = "POS_Item";
const data3 = "POS_OrderDetails";

export function saveCustomerDB(new_customer) {
    let pre_data = localStorage.getItem(data);

    let customer_arr2 = [];

    if (pre_data) {
        customer_arr2 = JSON.parse(pre_data);
    }

    customer_arr2.push(new_customer);
    localStorage.setItem(data, JSON.stringify(customer_arr2));
}

export function getCustomerDB() {
    let pre_data = localStorage.getItem(data);

    let customer_arr2 = [];

    if (pre_data) {
        customer_arr2 = JSON.parse(pre_data);
    }

    return customer_arr2;
}

export function updateCustomerDB(customer_id) {
    let pre_data = localStorage.getItem(data);
    let customer_arr = JSON.parse(pre_data);

    let findIndex = customer_arr.findIndex(e => e._customer_id === customer_id);

    if (findIndex>-1) {
        customer_arr[findIndex]._customer_name = $('#inputCustomerName').val();
        customer_arr[findIndex]._customer_address = $('#inputCustomerAddress').val();
        customer_arr[findIndex]._customer_contactNumber = $('#inputCustomerContact').val();
    } else {
        alert("Customer not found..!");
    }

    localStorage.setItem(data, JSON.stringify(customer_arr));
}

export function deleteCustomerDB(customer_id) {
    let pre_data = localStorage.getItem(data);
    let customer_arr = JSON.parse(pre_data);

    let index = customer_arr.findIndex(e => e._customer_id === customer_id);

    customer_arr.splice(index);

    localStorage.setItem(data, JSON.stringify(customer_arr));
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function getItemDB() {
    let pre_data = localStorage.getItem(data2);

    let item_arr = [];

    if (pre_data) {
        item_arr = JSON.parse(pre_data);
    }

    return item_arr;
}

export function saveItemDB(new_item) {
    let pre_data = localStorage.getItem(data2);

    let item_arr = [];

    if (pre_data) {
        item_arr = JSON.parse(pre_data);
    }

    item_arr.push(new_item);
    localStorage.setItem(data2, JSON.stringify(item_arr));
}

export function updateItemDB(item_code) {
    let pre_data = localStorage.getItem(data2);
    let item_arr = JSON.parse(pre_data);

    let index = item_arr.findIndex(e => e._item_code === item_code);

    if (index > -1) {
        item_arr[index]._item_name = $('#inputItemName').val();
        item_arr[index]._item_price = $('#inputItemPrice').val();
        item_arr[index]._item_qty = $('#inputItemQty').val();
    } else {
        alert("Not found the item..!");
    }

    localStorage.setItem(data2, JSON.stringify(item_arr));
}

export function deleteItemDB(item_code) {

    let pre_data = localStorage.getItem(data2);
    let item_arr = JSON.parse(pre_data);

    let index = item_arr.findIndex(e => e._item_code === item_code);

    item_arr.splice(index);

    localStorage.setItem(data2, JSON.stringify(item_arr));
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function loadCustomerDetails(customer_id) {
    let pre_data = localStorage.getItem(data);
    let customer_arr = JSON.parse(pre_data);

    let findIndex = customer_arr.findIndex(e => e._customer_id === customer_id);

    if (findIndex>-1) {
        $('#inputCustomerName2').val(customer_arr[findIndex]._customer_name);
        $('#inputCustomerAddress2').val(customer_arr[findIndex]._customer_address);
        $('#inputCustomerContact2').val(customer_arr[findIndex]._customer_contactNumber);
    } else {
        alert("Customer not found..!");
    }
}

export function loadItemCodeDetails(item_code) {
    let pre_data = localStorage.getItem(data2);
    let item_arr = JSON.parse(pre_data);

    let findIndex = item_arr.findIndex(e => e._item_code === item_code);

    if (findIndex>-1) {
        $('#inputItemName2').val(item_arr[findIndex]._item_name);
        $('#inputItemPrice2').val(item_arr[findIndex]._item_price);
        $('#inputItemQty3').val(item_arr[findIndex]._item_qty);
    } else {
        alert("Item not Found");
    }
}

export function saveOrderDetailsDB(orderDetails) {
    let pre_data = localStorage.getItem(data3);

    let orderDetails_arr = [];

    if (pre_data) {
        orderDetails_arr = JSON.parse(pre_data);
    }

    orderDetails_arr.push(orderDetails);
    localStorage.setItem(data3, JSON.stringify(orderDetails_arr));
}

export function getOrderDetailsDB() {
    let pre_data = localStorage.getItem(data3);

    let orderDetails_arr = [];

    if (pre_data) {
        orderDetails_arr = JSON.parse(pre_data);
    }

    return orderDetails_arr;
}

export function changeItemQty(item_code ,item_qty) {
    let pre_data = localStorage.getItem(data2);
    let item_arr = JSON.parse(pre_data);

    let index = item_arr.findIndex(e => e._item_code === item_code);

    if (index > -1) {
        let oldQty = item_arr[index]._item_qty;
        item_arr[index]._item_qty = oldQty - item_qty;

    } else {
        alert("Not found the item..!");
    }

    localStorage.setItem(data2, JSON.stringify(item_arr));
}

export function deleteOrderDB(customer_id) {
    let pre_data = localStorage.getItem(data3);
    let orders_arr = JSON.parse(pre_data);

    let index = orders_arr.findIndex(e => e._customer_id === customer_id);

    orders_arr.splice(index);

    localStorage.setItem(data3, JSON.stringify(orders_arr));
}