import {getItemByName, addItemToRepo, deleteItemFromRepo, updateItemInRepo, getItemsFromRepo, getItemsByRestID} from "../repositories/item.repository.js";

export const getItemByName = async (req, res) => {
    try {
        const name = req.params.name;
        const item = await getItemByName(name);

        if (item){
            return res.status().json({
                status: 200,
                message: "retrieved the item successfully",
                data: item,
            });
        } else {
            return res.status().json({
                status: 404,
                message: `No item with the name ${name} was found`,
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
        const { body } = req;

        let item = await getItemByName(body.name);
        let addedItem = {};

        //The item exists already
        if (item) {
            return res.status(400).json({
                status: 400,
                message: `Item with the name ${body.name} already exists`
            });
        } else {
            item = {
                ...body,
                active: true
            };
        }

     addedItem = await addItemToRepo(item);

     if (addedItem) {
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

//Would items have cascading errors similar to customer and restaurant?
export const deleteItem = async (req, res) => {
    
};

export const updateItem = async (req, res) => {
    const { name } = req.params;
    const { body } = req;
    try {
        const item = await updateItemInRepo({name: name}, body);
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