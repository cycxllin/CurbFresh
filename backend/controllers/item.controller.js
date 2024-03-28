import {getItemByIdFromRepo, addItemToRepo, deleteItemFromRepo, updateItemInRepo, 
    getItemsFromRepo,getItemsByRestIDFromRepo, countItemsInRepo, getItemsByListFromRepo, getItemFromRepo} from "../repositories/item.repository.js";
import { addItemToRestaurantMenuRepo, removeItemFromRestaurantMenuRepo} from "../repositories/restaurant.repository.js";

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


// checks for old items containing the new item name (case insensitive)
// if old item found and was inactive, reactivates the item and updates info
// if old item found and active, rejects request and sends back the old item
export const addItem = async (req, res) => {
    try {
        const body = req.body.query;
        let item = {};
        let addedItem = {};
        
        // check to see if there is an item that contains the case insensitive name
        const checkOldQuery = {
            $and: [
                {restID: body.restID},
                {name: {$regex : `${body.name}`, $options : 'i'}}
        ]}

        const old = await getItemFromRepo(checkOldQuery);

        if (old) {
            if (old.active === false) {
                item = {...body, active: true, soldOut: false};
                addedItem = await updateItemInRepo({_id: old.id}, item);
            } else {
                // item is still active, reject add and send old item
                return res.status(500).json({
                    status: 500,
                    message: `Item ${body.name} already exists`,
                    data: old
                });
            }
        } else {
            // no old item
            const itemCount = await countItemsInRepo();
            item = { _id: `I${itemCount}`, ...body, active: true, soldOut: false};
    
            addedItem = await addItemToRepo(item);
        }

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
        const item = await deleteItemFromRepo({_id: id});

        if (item){
            await removeItemFromRestaurantMenuRepo(item);
            return res.status(200).json({
                status: 200,
                message: `deleted item ${id} successfully`,
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
    const body = req.body.query;
    
    try {
        const item = await updateItemInRepo({_id: id}, body);
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

// get all items, ignores active state
export const getItemsByrestID = async (req, res) => {
    try {
        const r_id = req.params.restID;
        const items = await getItemsByRestIDFromRepo(r_id);
        if (items) {
            return res.status(200).json({
                status: 200,
                message: 'found items by restaurant ID sucessfully',
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

// get all items by list
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
