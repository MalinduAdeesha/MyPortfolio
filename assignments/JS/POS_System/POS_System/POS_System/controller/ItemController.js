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

// document.getElementById('btnClearI').addEventListener('click', () => {
//     new Item();
//
//     console.log("clicked");
// })
//
// const data2 = "POS_Item";
//
// function loadItems() {
//     let pre_data = localStorage.getItem(data2);
//     let item_arr = JSON.parse(pre_data);
//     item_arr.map((result, index) => {
//         var row = "<tr>" +
//             "<td>"+ result.item_code +"</td>" +
//             "<td>"+ result.item_name +"</td>" +
//             "<td>"+ result.item_price +"</td>" +
//             "<td>"+ result.item_qty +"</td>" +
//             "</tr>";
//         $('#itemTBody').append(row);
//     })
// }
//
// $('#btnSaveI').on('click', () => {
//
//     var item_code = $('#inputItemCode').val();
//     var item_name = $('#inputItemName').val();
//     var item_price = $('#inputItemPrice').val();
//     var item_qty = $('#inputItemQty').val();
//
//     let pre_data = localStorage.getItem(data2);
//
//     let item_arr2 = [];
//
//     if (pre_data) {
//         item_arr2 = JSON.parse(pre_data);
//     }
//
//     var obj = {
//         item_code: item_code,
//         item_name: item_name,
//         item_price: item_price,
//         item_qty: item_qty
//     }
//
//     item_arr2.push(obj);
//     localStorage.setItem(data2, JSON.stringify(item_arr2));
//
//     $('#itemTBody tr').remove();
//     loadItems();
//
// })
//
// $('#itemTBody tr').remove();
// loadItems();
//
$('#itemTBody').on('click', "tr", (event) => {
    $('#inputItemCode').val($(event.target).closest('tr').find('td').eq(0).text());
    $('#inputItemName').val($(event.target).closest('tr').find('td').eq(1).text());
    $('#inputItemPrice').val($(event.target).closest('tr').find('td').eq(2).text());
    $('#inputItemQty').val($(event.target).closest('tr').find('td').eq(3).text());
})
//
// $('#btnUpdateI').on('click', () => {
//     let item_code = $('#inputItemCode').val();
//
//     let pre_data = localStorage.getItem(data2);
//     let item_arr = JSON.parse(pre_data);
//
//     let index = item_arr.findIndex(e => e.item_code === item_code);
//
//     if (index > -1) {
//         item_arr[index].item_name = $('#inputItemName').val();
//         item_arr[index].item_price = $('#inputItemPrice').val();
//         item_arr[index].item_qty = $('#inputItemQty').val();
//     } else {
//         alert("Not found the item..!");
//     }
//
//     localStorage.setItem(data2, JSON.stringify(item_arr));
//     $('#itemTBody tr').remove();
//     loadItems();
// })
//
// $('#btnDeleteI').on('click', () => {
//     let item_code = $('#inputItemCode').val();
//
//     let pre_data = localStorage.getItem(data2);
//     let item_arr = JSON.parse(pre_data);
//
//     let index = item_arr.findIndex(e => e.item_code === item_code);
//
//     item_arr.splice(index);
//
//     localStorage.setItem(data2, JSON.stringify(item_arr));
//     $('#itemTBody tr').remove();
//     loadItems();
// })