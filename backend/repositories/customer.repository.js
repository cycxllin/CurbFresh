import Customer from '../models/customer.model.js';

export const getCustomerByPhoneFromRepo = async (phone) => {
    try {
        const customer = await Customer.findOne({phone:phone});
        return customer;
    } catch (error) {
        throw Error(`Error while retrieving customer with phone: ${phone}`);
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

/* Does not actually fully delete a customer from the database
 * The customer is simply set as inactive and not parsed over anywhere else
*/
export const deleteCustomerFromRepository = async function (query) {
    try {
        const customer = await Customer.findOneAndUpdate(
            { ...query},
            { active: false},
            { new: true}
            ).lean();
        return customer;
    } catch (error) {
        throw Error("Error while deleting customer");
    }
}

export const updateCustomerInRepository = async function (query, update) {
    try {
        const customer = await Customer.findOneAndUpdate(
                { ...query},
                { ...update},
                { new: true}
        ).lean();
        return customer;
    } catch (error) {
        throw Error("Error while updating customer");
    }
}