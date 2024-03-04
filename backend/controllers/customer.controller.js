import Customer from '../models/customer.model.js'
import { getCustomerByPhoneFromRepo, addCustomerToRepo } from "../repositories/customer.repository.js";

export const getCustomerByPhone = async (req, res, next) => {
    try {
        const phone = (req.params);
        console.log("first: " + phone);
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
    
        const addedCustomer = await addCustomerToRepo(customer);

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