import Customer from '../models/customer.model.js';

export const getCustomerByPhoneFromRepo = async (phone) => {
    try {
        const customer = await Customer.findOne(phone);
        return customer;
    } catch (error) {
        throw Error(`Error while retrieving customer with phone: ${phone.phone}`);
    }
};

export const addCustomerToRepo = async (customer) => {
    try {
        const addedCustomer = new Customer(customer);
        const savedCustomer = await addedCustomer.save();
        return savedCustomer;
        } catch (error) {
        throw Error("Error while adding customer");
        }
};