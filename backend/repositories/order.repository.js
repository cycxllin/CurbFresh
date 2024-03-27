import Order from "../models/order.model.js";

export const countOrdersInRepo = async function () {
    try {
        let count = await Order.countDocuments();
        return count+1;
    } catch (error) {
        throw Error("Error while counting orders in database")
    }
}

export const addOrderToRepo = async function (payload) {
    try {
        const addedOrder = new Order(payload);
        const savedOrder = await addedOrder.save();
        return savedOrder;
    } catch (error) {
        throw Error("Error while adding order");
    }
}

export const getOrdersFromRepo = async function (query) {
    try {
        const orders = await Order.find(query).sort({time: -1});
        return orders;
    } catch (error) {
        throw Error("Error while getting orders");
    }
}

export const getOrdersByRestIdFromRepo = async function (id) {
    try {
        const orders = await Order.find({restID: id}).sort({time: -1});
        return orders;
    } catch (error) {
        throw Error("Error while getting orders");
    }
}

export const updateOrderInRepo = async function (query, update) {
    try {
        const order = await Order.findOneAndUpdate(
            { ...query},
            { ...update},
            { new: true}
        ).lean();
        return order
    } catch (error) {
        throw Error("Error while updating order");
    }
}

// do not use; use updateOrderInRepo
export const addItemToOrderInRepo = async function (query, payload) {
    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { _id: query},
            { $push: {items: payload}},
            { new: true, useFindAndModify: false},
        ).lean();
        return updatedOrder;
    } catch (error) {
        console.log(error);
        throw Error("Error while adding item to order");
    }
}

export const deleteOrderFromRepo = async function (query) {
    try {
        const order = await Order.findOneAndUpdate(
            { ...query},
            { active: false},
            {new: true}
        ).lean();
        return order;
    } catch (error) {
        throw Error("Error while deleting order");
    }
}