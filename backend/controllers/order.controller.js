import { getItemFromRepo, getItemByIdFromRepo } from "../repositories/item.repository.js";
import { addOrderToRepo, countOrdersInRepo, getOrdersFromRepo, updateOrderInRepo, 
    deleteOrderFromRepo, addItemToOrderInRepo, getOrdersByRestIdFromRepo} from "../repositories/order.repository.js";
import { getRestaurantFromRepo } from '../repositories/restaurant.repository.js';

export const createOrder = async function (req, res) {
    try {
        let body = req.body.query;

        //check restaurant is open
        const restaurant = await getRestaurantFromRepo({_id: body.restID});

        if (!checkOpen(restaurant)) {
            return res.status(409).json({
                status: 409,
                message: `Restaurant is closed`,
            });
        }

        // restaurant is open so continue to create order
        const orderCount = await countOrdersInRepo();

        body.price = await calculateTotal(body.items);

        if (!checkPickupTime(body.pickupTime)) {
            return res.status(500).json({
                status: 500,
                message: `Pickup time must be ASAP or 4 digit 24hr time`,
            });
        }

        const order = { 
            _id: `O${orderCount}`, 
            ...body, 
            orderStatus: 'placed',
            active: true, 
            created: new Date()
        };
        const addedOrder = await addOrderToRepo(order);

        if (addedOrder) {
            return res.status(200).json({
                status: 200,
                message: 'created order sucessfully',
                data: addedOrder
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error creating order`,
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: `failed to create order due to ${error}`
        });
    }
}

/* GET a list of ALL active orders */
export const getOrders = async function (req, res) {
    try {
        const orders = await getOrdersFromRepo({active: true});
        
        if (orders) {
            return res.status(200).json({
                status: 200,
                message: 'found orders sucessfully',
                data: orders
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error finding orders`,
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: `failed to find order due to ${error}`
        });
    }
}

/*GET a single Order (active or non-active) */
export const getOrderById = async function (req, res) {
    try {
        const order = await getOrdersFromRepo({_id: req.params.id});
        if (order) {
            return res.status(200).json({
                status: 200,
                message: 'found order sucessfully',
                data: order
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error finding order`,
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: `failed to get order due to ${error}`
        });
    }
}

/* GET a list of orders from a single restaurant*/
export const getOrdersFromRestaurantID = async function (req, res) {
    try {
        const restaurantOrders = await getOrdersFromRepo({restID: req.params.id});
        if (restaurantOrders) {
            return res.status(200).json({
                status: 200,
                message: 'found orders from restaurant sucessfully',
                data: restaurantOrders
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error finding orders from restaurant`,
            });
        }
    } catch {
        return res.status(500).json({
            status: 500,
            message: `failed to get order from restaurant due to ${error}`
        });
    }
}

/* GET a list of orders from a single customer*/
export const getOrdersFromCustomerID = async function (req, res) {
    try {
        const customersOrders = await getOrdersFromRepo({custId: req.params.id});
        if (customersOrders) {
            return res.status(200).json({
                status: 200,
                message: 'found orders from customer sucessfully',
                data: customersOrders
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error finding orders from customer`,
            });
        }
    } catch {
        return res.status(500).json({
            status: 500,
            message: `failed to get orders for customer due to ${error}`
        });
    }
}

/* Updates an orders */
export const updateOrder = async function (req, res) {
    try {
        const id = req.params.id;
        let body = req.body.query;
        
        body.price = await calculateTotal(body.items);
        
        if (!checkPickupTime(body.pickupTime)) {
            return res.status(500).json({
                status: 500,
                message: `Pickup time must be ASAP or 4 digit 24hr time`,
            });
        }

        const order = await updateOrderInRepo({_id: id}, body);
        if (order) {
            return res.status(200).json({
                status: 200,
                message: 'updated order sucessfully',
                data: order
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error updating orders`,
            });
        }
    } catch (error) {
        res.status(500).send(`failed to update order status`);
    }
}

/* DO NOT USE use update order instead 
Adds an item to an order */
export const addItemToOrder = async function (req, res) {
    try {
        const orderId = req.params.orderID;
        const item = await getItemFromRepo({_id: req.params.itemID});
        const updatedOrder = await addItemToOrderInRepo(orderId, item[0]._id);
        if (updatedOrder) {
            return res.status(200).json({
                status: 200,
                message: 'updated order sucessfully',
                data: updatedOrder
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error updating orders`,
            });
        }
    } catch (error) {
        res.status(500).send(`failed to add item to order`);
    }
}

/* 
    Does not fully delete, only sets to inactive
*/
export const  deleteOrder = async function (req, res) {
    try {
        const { id } = req.params;
        const order = await deleteOrderFromRepo({_id: id});
        if (order) {
            return res.status(204).json({
                status: 204,
                message: 'deleted order sucessfully',
                data: order
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error deleting order`,
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: `failed to delete order due to ${error}`
        });
    }
}

const calculateTotal = async (items) => {
    try{
        let total = 0;

        for (const i of items) {
            const item = await getItemByIdFromRepo(i.item);
            total += item.price * i.quantity;
        }
        return total;

    } catch (error) {
        throw Error(`error calculating total`);
    }
}

const checkPickupTime = (str) => {
    try{
        if (str.toLowerCase() === 'asap') {
            return true;
        } else {
            const reg = new RegExp('^[0-9][0-9][0-9][0-9]$');
            return reg.test(str);
        }

    } catch (error) {
        throw Error(`error checking pickup time`);
    }
}

const checkOpen = (restaurant) => {
    try{
        const startHour = Number(restaurant.hours.slice(0,2));
        const endHour = Number(restaurant.hours.slice(5,7));
        const startMin = Number(restaurant.hours.slice(2,4)); 
        const endMin = Number(restaurant.hours.slice(-2));
    
        const date = new Date();
        const hour = date.getHours();
        const min = date.getMinutes();

        if (hour === startHour){
            if (min >= startMin) {
                return true;
            } else {
                return false;
            }
        } else if (hour === endHour){
            if (min <= endMin) {
                return true;
            } else {
                return false;
            }
        }

        return hour > startHour && hour < endHour;

    } catch (error) {
        throw Error(`error checking if restaurant is open ${error.message}`);
    }
}