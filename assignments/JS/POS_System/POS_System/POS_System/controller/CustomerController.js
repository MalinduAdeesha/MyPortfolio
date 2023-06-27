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

        this.handleSaveCustomerValidation();

        if (this.validate) {

            var customer_id = $('#inputCustomerId').val();
            var customer_name = $('#inputCustomerName').val();
            var customer_address = $('#inputCustomerAddress').val();
            var customer_contact = $('#inputCustomerContact').val();


            let new_customer = new Customer(customer_id, customer_name, customer_address, customer_contact);

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

$('#customerTBody').on('click', 'td', (event) => {
    $('#inputCustomerId').val($(event.target).closest('tr').find('td').eq(0).text());
    $('#inputCustomerName').val($(event.target).closest('tr').find('td').eq(1).text());
    $('#inputCustomerAddress').val($(event.target).closest('tr').find('td').eq(2).text());
    $('#inputCustomerContact').val($(event.target).closest('tr').find('td').eq(3).text());
})