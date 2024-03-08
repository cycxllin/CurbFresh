import { getItemFromRepo } from "../repositories/item.repository.js";
import { addOrderToRepo, countOrdersInRepo, getOrdersFromRepo, updateOrderInRepo, deleteOrderFromRepo, addItemToOrderInRepo} from "../repositories/order.repository.js";

export const createOrder = async function (req, res) {
    try {
        const { body } = req;
        const orderCount = await countOrdersInRepo();
        const order = { id: orderCount, ...body, active: true};
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
        res.status(500).send(`failed to create order`, error);
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
        res.status(500).send(`failed to get all orders`);
    }
}

/*GET a single Order (active or non-active) */
export const getOrderById = async function (req, res) {
    try {
        const order = await getOrdersFromRepo({id: req.params.id});
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
        res.status(500).send(`failed to get order ${req.params.id}`);
    }
}

/* GET a list of orders from a single restaurant*/
export const getOrdersFromRestaurantID = async function (req, res) {
    try {
        const restaurantOrders = await getOrdersFromRepo({restId: req.params});
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
        res.status(500).send(`failed to get orders from restaurant ${req.params}`);
    }
}

/* Updates an orders status */
export const updateOrderStatus = async function (req, res) {
    try {
        const { id } = req.params;
        const { body } = req;
        const order = await updateOrderInRepo({id: id}, body);
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

/* Adds an item to an order */
export const addItemToOrder = async function (req, res) {
    try {
        const orderId = req.params.orderID;
        const item = await getItemFromRepo({id: req.params.itemID});
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

/* Does not fully delete?
 ATTN: WE NEED TO CONSIDER ITEM COUNTS IF ORDER IN PROGRESS BUT CANCELLED??
*/
export const  deleteOrder = async function (req, res) {
    try {
        const { id } = req.params;
        const order = await deleteOrderFromRepo({id: id});
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
        res.status(500).send(`failed to delete order ${id}`);
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