import Customer from '../models/customer.model.js';

export const getCustomerByPhoneFromRepo = async (phone) => {
    try {
        const customer = await Customer.findOne({phone:phone});
        return customer;
    } catch (error) {
        throw Error(`Error while retrieving customer with phone: ${phone}`);
    }
};

export const addCustomerToRepo = async (payload) => {
    try {
        const addedCustomer = new Customer(payload);
        const savedCustomer = await addedCustomer.save();
        return savedCustomer;
        } catch (error) {
        throw Error("Error while adding customer");
        }
};

export const countCustomersInRepo = async function () {
    try {
        let count = await Customer.countDocuments();
        return count+1;
    } catch (error) {
        throw Error("Error while counting customers in database");
    }
}

/* Does not actually fully delete a customer from the database
 * The customer is simply set as inactive and not parsed over anywhere else
*/
export const deleteCustomerFromRepo = async function (query) {
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

export const updateCustomerInRepo = async function (query, update) {
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

export const getCustomersFromRepo = async function (query) {
    try{
         const customers = await Customer.find().sort({time: -1});
         return customers;
    } catch (error) {
        throw Error("Error while getting customers");
    }
}