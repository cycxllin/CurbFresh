import Item from '../models/item.model.js';

export const getItemByNameFromRepo = async (name) => {
    try {
        const item = await Item.findOne({name:name});
        return item;
    } catch (error) {
        throw Error(`Error while retrieving the item called: ${name}`);
    }
};

export const addItemToRepo = async (payload) => {
    try {
        const addedItem = new Item(payload);
        const savedItem = await addedItem.save();
        return savedItem;
        } catch (error) {
        throw Error("Error while adding the item");
        }
};

export const deleteItemFromRepo = async (query) => {
    try {
        const item = await Item.findOneAndUpdate(
            { ...query},
            { active: false},
            { new: true}
            ).lean();
        return item;
    } catch (error) {
        throw Error("Error while deleting an item");
    }
};

export const updateItemInRepo = async (query, update) => {
    try {
        const item = await Item.findOneAndUpdate(
                { ...query},
                { ...update},
                { new: true}
        ).lean();
        return item;
    } catch (error) {  
        throw Error("Error while updating an item");
    }
};

export const getItemsFromRepo = async (query) => {
    try{
        const items = await Item.find().sort({time: -1});
        return items;
   } catch (error) {
       throw Error("Error while getting items from repository");
   }
};

export const getItemFromRepo = async (query) => {
    try{
        const item = await Item.find(query);
        return item;
   } catch (error) {
       throw Error("Error while getting items from repository");
   }
};

export const getItemsByRestID = async (restID) => {
    try{
        const items = await Item.find(restID).sort({time: -1});
        return items;
   } catch (error) {
       throw Error("Error while getting items with ID " + restID);
   }
};