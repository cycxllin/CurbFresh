import { getItemsByListFromRepo } from "../repositories/item.repository.js";

/*
    Checks to see if the manager object is allowed to act on the target object
    Manager and target must have restID field
*/ 
export const checkValidManager = (req, res, next) => {
    try {
        console.log(req.body);

        const manager = req.body.user;
        const target = req.body.query;  

        console.log(manager);
        console.log(target);

        if (manager.length === 2 && manager[0].includes('M') && manager[1] === target.restID) {
            return next();
        } else {
            return res
            .status(404)
            .json({
              status: 404,
              message: "You are not authorized to perform this action",
            });
        }
    } catch (error) {
        throw Error(error);
    }
};

/*
    Checks to see if the customer object is allowed to act on the target object
    Target must have custID field
*/ 
export const checkValidCustomer = (req, res, next) => {
    try {
        const customer = req.body.user;
        const target = req.body.query;

        if (customer[0].includes('C') && customer[0] === target.custID) {
            return next();
        } else {
            return res
            .status(404)
            .json({
              status: 404,
              message: "You are not authorized to perform this action",
            });
        }
    } catch (error) {
        throw Error(error);
    }
};

/*
    Checks to see if the user is allowed to act on the order 
    Used for when either customer or manager can potentially act on order
*/ 
export const checkValidUser = async (req, res, next) => {
    try {
        const order = req.body.query;

        if (!order.orderStatus || order.orderStatus === 'placed') {
            // order is being placed OR not yet seen by manager so customer can change it
            checkValidCustomer(req, res, next);
        } else {
            checkValidManager(req, res, next);
        }
    } catch (error) {
        throw Error(error);
    }
};

/*
    Checks to see if items in order are from the right restaurant
*/ 
export const checkValidItems = async (req, res, next) => {
    try {
        const target = req.body.query;

        //build item list from items dictionary in order
        const orderItems = [];
        for (const i of target.items) {
            orderItems.push(i.item);
        }
        const items = await getItemsByListFromRepo(orderItems)

        for (const item of items) {
            if (item.restID !== target.restID) {
                return res
                .status(404)
                .json({
                  status: 404,
                  message: `Item ${item._id} is not from restaurant ${target.restID}`,
                });
            }
        }
        // here if all items are from the correct restaurant
        return next();
    } catch (error) {
        throw Error(error);
    }
};