import { getItemFromRepo } from "../repositories/item.repository.js";
import { addOrderToRepo, countOrdersInRepo, getOrdersFromRepo, updateOrderInRepo, 
    deleteOrderFromRepo, addItemToOrderInRepo, getOrdersByRestIdFromRepo} from "../repositories/order.repository.js";

export const createOrder = async function (req, res) {
    try {
        const body = req.body.query;
        const orderCount = await countOrdersInRepo();
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
        //console.log(req.params.id);
        const restaurantOrders = await getOrdersByRestIdFromRepo(req.params.id);
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
        const body = req.body.query;

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
        console.log(item[0]._id);
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
        console.log(error);
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

//TODO After menu and order have been implemented 
export const getRestaurantSaleInfo = async function (req, res) {
    try{

    } catch (error) {
        res.status(500).send(`failed to get sale info for restaurant ${id}`);
    }
}

export const getRestaurantBusiestTime = async function (req, res) {
    try {

    } catch (error) {
        res.status(500).send(`failed to get busiest time for restaurant ${id}`);
    }
}

export const getRestaurantMenuPopularity = async function (req, res) {
    try{

    } catch (error) {
        res.status.send(`failed to get popular menu list`);
    }
}