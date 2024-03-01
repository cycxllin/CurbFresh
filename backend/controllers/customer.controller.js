import Customer from '../models/customer.model.js'
import { getCustomerByPhoneFromRepo } from "../repositories/customer.repository";

export const getCustomerByPhone = async (req, res, next) => {
    try {
        const phone = Number(req.params.phone);
        const customer = await getCustomerByPhoneFromRepo(id);

        if (customer) {
            return res.status(200).json({
                status: 200,
                message: 'retrieved customer sucessfully',
                data: student
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `No customer with phone ${phone} found`,
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};

export const addCustomer = async (req, res, next) => {
    try {
        //generate sequential custID
        const customerID = 0; //placeholder --> chanfge ot generate sequential id
        const customer = {
            _id: customerID,
            ...req.body
        };
    
        const addedCustomer = await addCustomer(customer);

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
        res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};