import Item from '../models/item.model.js';

export const getItemByIdFromRepo = async (id) => {
    try {
        const item = await Item.findOne({_id:id});
        return item;
    } catch (error) {
        throw Error(`Error while retrieving the item ${id}`);
    }
};

export const addItemToRepo = async (payload) => {
    try {
        const addedItem = new Item(payload);
        const savedItem = await addedItem.save();
        return savedItem;
        } catch (error) {
            throw Error("Error while adding the item: " + error);
        }
};

export const countItemsInRepo = async function () {
    try {
        let count = await Item.countDocuments();
        return count+1;
    } catch (error) {
        throw Error("Error while counting items in database");
    }
}

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
        const items = await Item.find(query).sort({time: -1});
        return items;
   } catch (error) {
       throw Error("Error while getting items from repository");
   }
};

export const getItemFromRepo = async (query) => {
    try{
        const item = await Item.findOne(query);
        return item;
   } catch (error) {
       throw Error("Error while getting item from repository");
   }
};

// gets all items by restaurant including inactive ones
export const getItemsByRestIDFromRepo = async (restID) => {
    try{
        const items = await Item.find(restID).sort({time: -1});
        return items;
   } catch (error) {
       throw Error("Error while getting items for restaurant " + restID);
   }
};

// gets all items by list
export const getItemsByListFromRepo = async (list) => {
    try{
        const items = await Item.find({
            $and:[
                {_id:{$in: list}},
                {active: true}
        ]
    }).sort({time: -1});
        return items;
   } catch (error) {
       throw Error("Error while getting items");
   }
};