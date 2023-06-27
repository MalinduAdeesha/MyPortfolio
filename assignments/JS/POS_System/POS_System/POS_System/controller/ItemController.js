import Item from "../model/Item.js";
import {deleteItemDB, getItemDB, saveItemDB, updateItemDB} from "../DB/db.js";

const data2 = "POS_Item";

let validate = "";

export class ItemController {

    constructor() {
        $('#btnSaveI').click(this.handleSaveItem.bind(this));
        $('#btnUpdateI').click(this.handleUpdateItem.bind(this));
        $('#btnDeleteI').click(this.handleDeleteItem.bind(this));
        this.handleLoadItem();
    }

    handleSaveItemValidation() {
        var item_code = $('#inputItemCode').val();
        var item_name = $('#inputItemName').val();
        var item_price = $('#inputItemPrice').val();
        var item_qty = $('#inputItemQty').val();

        const regexNumber = /^\d+$/;

        (!regexNumber.test(item_code)) ?
            alert('Invalid Id.!') :
            (!item_name) ?
                alert('Invalid Name.') :
                (!regexNumber.test(item_price)) ?
                    alert('Invalid Price.') :
                    (!regexNumber.test(item_qty)) ?
                        alert('Invalid Qty.') :
                        this.validate = true;

    }

    handleLoadItem() {
        let item_arr = getItemDB();

        item_arr.map((result, index) => {
            var row = "<tr>" +
                "<td>"+ result._item_code +"</td>" +
                "<td>"+ result._item_name +"</td>" +
                "<td>"+ result._item_price +"</td>" +
                "<td>"+ result._item_qty +"</td>" +
                "</tr>";
            $('#itemTBody').append(row);
        })}

    handleSaveItem() {
        this.handleSaveItemValidation();

        if (this.validate) {

            var item_code = $('#inputItemCode').val();
            var item_name = $('#inputItemName').val();
            var item_price = $('#inputItemPrice').val();
            var item_qty = $('#inputItemQty').val();

            let item = new Item(item_code, item_name, item_price, item_qty);

            saveItemDB(item);

            $('#itemTBody tr').remove();
            this.handleLoadItem();
            this.validate = false;

            this.clearField();
        }
    }

    handleUpdateItem() {
        this.handleSaveItemValidation();

        if (this.validate) {

            let item_code = $('#inputItemCode').val();

            updateItemDB(item_code);


            $('#itemTBody tr').remove();
            this.handleLoadItem();
            this.validate = false;

            this.clearField();
        }
    }

    handleDeleteItem() {
        this.handleSaveItemValidation();

        if (this.validate) {

            let item_code = $('#inputItemCode').val();

            deleteItemDB(item_code);

            $('#itemTBody tr').remove();
            this.handleLoadItem();
            this.validate = false;

            this.clearField();
        }
    }

    clearField() {
        $('#inputItemCode').val("");
        $('#inputItemName').val("");
        $('#inputItemPrice').val("");
        $('#inputItemQty').val("");
    }

}

new ItemController();
$('#itemTBody').on('click', "tr", (event) => {
    $('#inputItemCode').val($(event.target).closest('tr').find('td').eq(0).text());
    $('#inputItemName').val($(event.target).closest('tr').find('td').eq(1).text());
    $('#inputItemPrice').val($(event.target).closest('tr').find('td').eq(2).text());
    $('#inputItemQty').val($(event.target).closest('tr').find('td').eq(3).text());
})