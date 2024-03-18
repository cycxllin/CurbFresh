import {getItemByIdFromRepo, addItemToRepo, deleteItemFromRepo, updateItemInRepo, 
    getItemsFromRepo, countItemsInRepo, getItemsByListFromRepo} from "../repositories/item.repository.js";
import { addItemToRestaurantMenuRepo, removeItemFromRestaurantMenuRepo} from "../repositories/restaurant.repository.js";
import { checkValidManager } from "../middleware/middleware.js";

export const getItemById = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await getItemByIdFromRepo(id);

        if (item){
            return res.status(200).json({
                status: 200,
                message: "retrieved the item successfully",
                data: item,
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `No item with the name ${id} was found`,
            });
        }

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};

export const addItem = async (req, res) => {
    try {
        const manager = req.body.user;
        const body = req.body.query;

        if (!checkValidManager(manager, body)) {
            throw Error('You are not authorized to perform this action');
        }
        
        const itemCount = await countItemsInRepo();
        const item = { _id: `I${itemCount}`, ...body, active: true, soldOut: false};

        const addedItem = await addItemToRepo(item);

        if (addedItem) {
            await addItemToRestaurantMenuRepo(item);
            return res.status(200).json({
                status: 200,
                message: 'added item sucessfully',
                data: addedItem
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error adding item ${body.name}`,
            });
        }

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};

//Item Active status set to false to ensure there are no cascading errors
export const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const manager = req.body.user;
        const body = req.body.query;
    
        if (!checkValidManager(manager, body)) {
            throw Error('You are not authorized to perform this action');
        }
        const item = await deleteItemFromRepo({_id: id});

        if (item){
            await removeItemFromRestaurantMenuRepo(item);
            return res.status(204).json({
                status: 204,
                message: `deleted item successfully`,
                data: item
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error deleting item`
            });
        }
    } catch (error) {
        res.status(500).send(`failed to delete item ${id}`);
    }
};

export const updateItem = async (req, res) => {
    const { id } = req.params;
    const manager = req.body.user;
    const body = req.body.query;

    if (!checkValidManager(manager, body)) {
        throw Error('You are not authorized to perform this action');
    }

    try {
        const item = await 
        updateItemInRepo({_id: id}, body);
        if (item){
            return res.status(200).json({
                status: 200,
                message: `updated item successfully`,
                data: item
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error updating item`
            });
        }
    } catch (error) {
        res.status(500).send(`failed to update item`);
    }
};

// get all items, ignores active state
export const getItems = async (req, res) => {
    try {
        const items = await getItemsFromRepo();
        if (items) {
            return res.status(200).json({
                status: 200,
                message: 'found items sucessfully',
                data: items
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error finding items`,
            });
        }
    }catch (error) {
        res.status(500).send(`failed to get items`);
    }
};

// get all items by list, ignores active state 
// send list in query url like: localhost:65500/items/list?menu=I2,I3
export const getItemsByList = async (req, res) => {
    try {
        const menuString = req.query.menu;
        const menu = menuString.split(",");

        const items = await getItemsByListFromRepo(menu);
        if (items) {
            return res.status(200).json({
                status: 200,
                message: 'found items sucessfully',
                data: items
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error finding items`,
            });
        }
    }catch (error) {
        res.status(500).send(`failed to get items`);
    }
};
