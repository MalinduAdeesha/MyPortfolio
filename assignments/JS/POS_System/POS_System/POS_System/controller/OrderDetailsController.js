import OrderDetails from "../model/OrderDetails.js";
import {
    changeItemQty,
    deleteOrderDB,
    getCustomerDB,
    getItemDB,
    getOrderDetailsDB,
    loadCustomerDetails,
    loadItemCodeDetails,
    saveOrderDetailsDB
} from "../DB/db.js";


export class OrderDetailsController {
    constructor() {
        $('#btnDeleteOrder').click(this.handleDeleteOrder.bind(this));
        $('#btnPurchase').click(this.handleSaveOrderDetails.bind(this));
        // $('#btnAddToCart').click(this.handleSaveToCart.bind(this));
        $('#selectItemCode').change(this.handleLoadItemDetails.bind(this));
        $('#selectCustomerID').change(this.handleLoadCustomerDetails.bind(this));
        this.handleLoadCustomerID();
        this.handleLoadItemCode();
        this.handleLoadOrderDetails();
    }

    handleLoadCustomerID() {
        let customer_arr = getCustomerDB();

        const selectElement = document.getElementById('selectCustomerID');
        customer_arr.forEach((data) => {
            const optionElement = document.createElement('option');
            optionElement.text = data._customer_id;
            selectElement.add(optionElement);
        });
    }

    handleLoadItemCode() {
        let item_arr = getItemDB();

        const selectElement = document.getElementById('selectItemCode');
        item_arr.forEach((data) => {
            const optionElement = document.createElement('option');
            optionElement.text = data._item_code;
            selectElement.add(optionElement);
        });
    }

    handleLoadCustomerDetails() {
        const selectElement = document.getElementById('selectCustomerID');
        const customer_id = selectElement.options[selectElement.selectedIndex].text;

        loadCustomerDetails(customer_id);
    }

    handleLoadItemDetails() {
        const selectElement = document.getElementById('selectItemCode');
        const item_code = selectElement.options[selectElement.selectedIndex].text;

        loadItemCodeDetails(item_code);
    }

    handleLoadOrderDetails() {
        let orderDetails_arr = getOrderDetailsDB();

        orderDetails_arr.map((result, index) => {
            var row = "<tr>" +
                "<td>"+ result._customer_id +"</td>" +
                "<td>"+ result._item_code +"</td>" +
                "<td>"+ result._item_name +"</td>" +
                "<td>"+ result._item_price +"</td>" +
                "<td>"+ result._qty +"</td>" +
                "<td>"+ result._total +"</td>" +
                "</tr>";

            $('#placeOrderTBody').append(row);
        })
    }

    handleSaveOrderDetails() {
        const selectElement1 = document.getElementById('selectCustomerID');
        const customer_id = selectElement1.options[selectElement1.selectedIndex].text;

        const selectElement2 = document.getElementById('selectItemCode');
        const item_code = selectElement2.options[selectElement2.selectedIndex].text;

        var item_name = $('#inputItemName2').val();
        var item_price = $('#inputItemPrice2').val();
        var item_qty = $('#inputItemQty2').val();
        var total = item_price * item_qty;

        let orderDetails = new OrderDetails(customer_id, item_code, item_name, item_price, item_qty, total);

        saveOrderDetailsDB(orderDetails);
        changeItemQty(item_code, item_qty);

        $('#placeOrderTBody tr').remove();
        this.handleLoadOrderDetails();

        this.clearAll();
    }

    handleDeleteOrder() {
        const selectElement1 = document.getElementById('selectCustomerID');
        const customer_id = selectElement1.options[selectElement1.selectedIndex].text;

        deleteOrderDB(customer_id);

        $('#placeOrderTBody tr').remove();
        this.handleLoadOrderDetails();

        this.clearAll();
    }

    clearAll() {
        $('#selectCustomerID').val('');
        $('#inputCustomerName2').val('');
        $('#inputCustomerAddress2').val('');
        $('#inputCustomerContact2').val('');

        $('#selectItemCode').val('');
        $('#inputItemName2').val('');
        $('#inputItemPrice2').val('');
        $('#inputItemQty2').val('');
        $('#inputItemQty3').val('');
    }
}

new OrderDetailsController();

$('#placeOrderTBody').on('click', 'td', (event) => {
    $('#selectCustomerID').val($(event.target).closest('tr').find('td').eq(0).text());
    $('#selectItemCode').val($(event.target).closest('tr').find('td').eq(1).text());
    $('#inputItemName2').val($(event.target).closest('tr').find('td').eq(2).text());
    $('#inputItemPrice2').val($(event.target).closest('tr').find('td').eq(3).text());
    $('#inputItemQty2').val($(event.target).closest('tr').find('td').eq(4).text());
})