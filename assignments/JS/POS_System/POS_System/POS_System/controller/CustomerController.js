import Customer from "../model/Customer.js";
import {deleteCustomerDB, saveCustomerDB, updateCustomerDB} from "../DB/db.js";
import {getCustomerDB} from "../DB/db.js";

const data = "POS_Customer";

let validate = "";

export class CustomerController {
    constructor() {
        $('#btnSaveC').click(this.handleSaveCustomer.bind(this));
        $('#btnUpdateC').click(this.handleUpdateCustomer.bind(this));
        $('#btnDeleteC').click(this.handleDeleteCustomer.bind(this));
        this.handleLoadCustomer();
    }

    handleSaveCustomerValidation() {
        var customer_id = $('#inputCustomerId').val();
        var customer_name = $('#inputCustomerName').val();
        var customer_address = $('#inputCustomerAddress').val();
        var customer_contact = $('#inputCustomerContact').val();

        const regexNumber = /^\d+$/;
        // if (!regexNumber.test(customer_id)) {
        //     alert('Invalid Id.!');
        // } else if (!customer_name) {
        //     alert('Invalid Name.');
        // } else if (!customer_address) {
        //     alert('Invalid Address.');
        // } else if (!regexNumber.test(customer_contact)) {
        //     alert('Invalid Contact Number.');
        // } else {
        //     this.handleSaveCustomer();
        // }

        (!regexNumber.test(customer_id)) ?
            alert('Invalid Id.!') :
            (!customer_name) ?
                alert('Invalid Name.') :
                (!customer_address) ?
                    alert('Invalid Address.') :
                    (!regexNumber.test(customer_contact)) ?
                        alert('Invalid Contact Number.') :
                        this.validate = true;

    }

    handleLoadCustomer() {
        // let pre_data = localStorage.getItem(data);
        // let customer_arr = JSON.parse(pre_data);
        let customer_arr = getCustomerDB();

        customer_arr.map((result, index) => {
            var row = "<tr>" +
                "<td>"+ result._customer_id +"</td>" +
                "<td>"+ result._customer_name +"</td>" +
                "<td>"+ result._customer_address +"</td>" +
                "<td>"+ result._customer_contactNumber +"</td>" +
                "</tr>";
            $('#customerTBody').append(row);
        })
    }

    handleSaveCustomer() {
        // if (this.handleSaveCustomerValidation) {

        this.handleSaveCustomerValidation();

        if (this.validate) {

            var customer_id = $('#inputCustomerId').val();
            var customer_name = $('#inputCustomerName').val();
            var customer_address = $('#inputCustomerAddress').val();
            var customer_contact = $('#inputCustomerContact').val();

            // let pre_data = localStorage.getItem(data);
            //
            // let customer_arr2 = [];
            //
            // if (pre_data) {
            //     customer_arr2 = JSON.parse(pre_data);
            // }

            // var obj = {
            //     customer_id: customer_id,
            //     customer_name: customer_name,
            //     customer_address: customer_address,
            //     customer_contact: customer_contact
            // }

            let new_customer = new Customer(customer_id, customer_name, customer_address, customer_contact);

            // customer_arr2.push(new_customer);
            // localStorage.setItem(data, JSON.stringify(customer_arr2));

            saveCustomerDB(new_customer);

            $('#customerTBody tr').remove();
            this.handleLoadCustomer();

            this.validate = false;

            this.clearField();

        }

    }

    handleUpdateCustomer() {

        let customer_id = $('#inputCustomerId').val();

        updateCustomerDB(customer_id);

        $('#customerTBody tr').remove();
        this.handleLoadCustomer();

        this.clearField();

        // console.log("Handle update Customer");

    }

    handleDeleteCustomer() {
        this.handleSaveCustomerValidation();

        if (this.validate) {

            let customer_id = $('#inputCustomerId').val();

            deleteCustomerDB(customer_id);

            $('#customerTBody tr').remove();
            this.handleLoadCustomer();

            this.validate = false;
            this.clearField();
        }
    }

    clearField() {
        $('#inputCustomerId').val("");
        $('#inputCustomerName').val("");
        $('#inputCustomerAddress').val("");
        $('#inputCustomerContact').val("");
    }


}

new CustomerController();

// document.getElementById('btnClearC').addEventListener('click', () => {
//     new Customer();
//
//     console.log("clicked");
// })
//
// const data = "POS_Customer";
//
// function loadData() {
//     let pre_data = localStorage.getItem(data);
//     let customer_arr = JSON.parse(pre_data);
//     customer_arr.map((result, index) => {
//         var row = "<tr>" +
//             "<td>"+ result.customer_id +"</td>" +
//             "<td>"+ result.customer_name +"</td>" +
//             "<td>"+ result.customer_address +"</td>" +
//             "<td>"+ result.customer_contact +"</td>" +
//             "</tr>";
//         $('#customerTBody').append(row);
//     })
// }
//
// $('#btnSaveC').on('click', () => {
//
//     var customer_id = $('#inputCustomerId').val();
//     var customer_name = $('#inputCustomerName').val();
//     var customer_address = $('#inputCustomerAddress').val();
//     var customer_contact = $('#inputCustomerContact').val();
//
//     let pre_data = localStorage.getItem(data);
//
//     let customer_arr2 = [];
//
//     if (pre_data) {
//         customer_arr2 = JSON.parse(pre_data);
//     }
//
//     var obj = {
//         customer_id: customer_id,
//         customer_name: customer_name,
//         customer_address: customer_address,
//         customer_contact: customer_contact
//     }
//
//     customer_arr2.push(obj);
//     localStorage.setItem(data, JSON.stringify(customer_arr2));
//
//     $('#customerTBody tr').remove();
//     loadData();
//
// })
//
// $('#customerTBody tr').remove();
// loadData();
//
$('#customerTBody').on('click', 'td', (event) => {
    $('#inputCustomerId').val($(event.target).closest('tr').find('td').eq(0).text());
    $('#inputCustomerName').val($(event.target).closest('tr').find('td').eq(1).text());
    $('#inputCustomerAddress').val($(event.target).closest('tr').find('td').eq(2).text());
    $('#inputCustomerContact').val($(event.target).closest('tr').find('td').eq(3).text());
})
//
// $('#btnUpdateC').on('click', () => {
//     let customer_id = $('#inputCustomerId').val();
//
//     let pre_data = localStorage.getItem(data);
//     let customer_arr = JSON.parse(pre_data);
//
//     let index = customer_arr.findIndex(e => e.customer_id === customer_id);
//
//     if (index>-1) {
//         customer_arr[index].customer_name = $('#inputCustomerName').val();
//         customer_arr[index].customer_address = $('#inputCustomerAddress').val();
//         customer_arr[index].customer_contact = $('#inputCustomerContact').val();
//     } else {
//         alert("Not Found the customer..!");
//     }
//
//     localStorage.setItem(data, JSON.stringify(customer_arr));
//     $('#customerTBody tr').remove();
//     loadData();
// })
//
// $('#btnDeleteC').on('click', () => {
//     let customer_id = $('#inputCustomerId').val();
//
//     let pre_data = localStorage.getItem(data);
//     let customer_arr = JSON.parse(pre_data);
//
//     let index = customer_arr.findIndex(e => e.customer_id === customer_id);
//
//     customer_arr.splice(index);
//
//     localStorage.setItem(data, JSON.stringify(customer_arr));
//     $('#customerTBody tr').remove();
//     loadData();
// })