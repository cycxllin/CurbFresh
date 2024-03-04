import { getCustomerByPhoneFromRepo, addCustomerToRepo, updateCustomerInRepository, deleteCustomerFromRepository } from "../repositories/customer.repository.js";

export const getCustomerByPhone = async (req, res, next) => {
    try {
        const phone = req.params.phone;
        const customer = await getCustomerByPhoneFromRepo(phone);

        if (customer) {
            return res.status(204).json({
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

export const addCustomer = async (req, res, next) => {
    try {
        let customer = {};

        if (req.body.email) {
            customer = {
                ...req.body,
                active: true
            };
        } else {
            customer = {
                email: '',
                ...req.body,
                active: true
            };
        }

        const addedCustomer = await addCustomerToRepo(customer);

        if (addedCustomer) {
            return res.status(204).json({
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
            return res.status(204).json({
                status: 204,
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