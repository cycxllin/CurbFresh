import { getCustomerByPhoneFromRepo, addCustomerToRepo, updateCustomerInRepository, 
    deleteCustomerFromRepository, getCustomersFromRepository } from "../repositories/customer.repository.js";

export const getCustomerByPhone = async (req, res, next) => {
    try {
        const phone = req.params.phone;
        const customer = await getCustomerByPhoneFromRepo(phone);

        if (customer) {
            return res.status(200).json({
                status: 200,
                message: 'retrieved customer sucessfully',
                data: customer
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `No customer with phone ${phone} found`,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};

//checks if customer was previously deleted, updates if customer exists
export const addCustomer = async (req, res, next) => {
    try {
        const { body } = req;

        let customer = await getCustomerByPhoneFromRepo(body.phone);
        let addedCustomer = {};

        if (customer) {
            // customer exists and was previously deleted
            if (customer.active === false) {
                            // set active and update info
            customer = {
                ...body,
                active: true
            };

            addedCustomer = await updateCustomerInRepository({phone: body.phone}, customer);
            }
            else {
                // customer exists but is still active so reject adding
                return res.status(400).json({
                    status: 400,
                    message: `Customer with phone ${body.phone} already exists`
                });
            }


        } else {
            if (req.body.email) {
                customer = {
                    ...body,
                    active: true
                };
            } else {
                customer = {
                    email: '',
                    ...body,
                    active: true
                };
            }
    
         addedCustomer = await addCustomerToRepo(customer);
        }

        if (addedCustomer) {
            return res.status(200).json({
                status: 200,
                message: 'added customer sucessfully',
                data: addedCustomer
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error adding customer`,
            });
        }
        
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};

/* Delete a customer 
 * Only sets active: false rather than fully deleting
*/
export const deleteCustomer = async function (req, res) {
    const { phone } = req.params;
    try {
        const customer = await deleteCustomerFromRepository({phone: phone});

        if (customer){
            return res.status(200).json({
                status: 200,
                message: `deleted customer successfully`,
                data: customer
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error deleting customer`
            });
        }
    } catch (error) {
        res.status(500).send(`failed to delete customer ${phone}`);
    }
}

/* Edit Customer Information */
export const updateCustomer = async function (req, res) {
    const { phone } = req.params;
    const { body } = req;
    try {
        const customer = await updateCustomerInRepository({phone: phone}, body);
        if (customer){
            return res.status(200).json({
                status: 200,
                message: `updated customer successfully`,
                data: customer
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error updating customer`
            });
        }
    } catch (error) {
        res.status(500).send(`failed to update customer`);
    }
}

/* Get a LIST of active Customers */
export const getCustomers = async function (req, res) {
    try {
        const customers = await getCustomersFromRepository({active: true});
        if (customers) {
            return res.status(200).json({
                status: 200,
                message: 'found customers sucessfully',
                data: customers
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error finding customers`,
            });
        }
    }catch (error) {
        res.status(500).send(`failed to get customers`);
    }
}