import Restaurant from "../models/restaurant.model.js";

export const getRestaurantFromRepo = async function (query) {
    try{
         const restaurant = await Restaurant.findOne(query);
         return restaurant;
    } catch (error) {
        throw Error("Error while getting restaurant");
    }
}

export const addRestaurantToRepo = async function (payload) {
    try {
        const addedRestaurant = new Restaurant(payload);
        const savedRestaurant = await addedRestaurant.save();
        return savedRestaurant;
    } catch (error) {
        throw Error("Error while adding restaurant");
    }
}

export const countRestaurantsInRepo = async function () {
    try {
        let count = await Restaurant.countDocuments();
        return count+1;
    } catch (error) {
        throw Error("Error while counting restaurants in database");
    }
}

export const getRestaurantsFromRepo = async function (query) {
    try{
         const restaurants = await Restaurant.find(query).sort({time: -1});
         return restaurants;
    } catch (error) {
        throw Error("Error while getting restaurant");
    }
}

export const updateRestaurantInRepo = async function (query, update) {
    try {
        const restaurant = await Restaurant.findOneAndUpdate(
                { ...query},
                { ...update},
                { new: true}
        ).lean();
        return restaurant;
    } catch (error) {
        throw Error("Error while updating restaurant");
    }
}

/* Does not actually fully delete a restaurant from the database
 * The restaurant is simply set as inactive and not parsed over anywhere else
*/
export const deleteRestaurantFromRepo = async function (query) {
    try {
        const restaurant = await Restaurant.findOneAndUpdate(
            { ...query},
            { active: false},
            { new: true}
            ).lean();
        return restaurant;
    } catch (error) {
        throw Error("Error while deleting restaurant");
    }
}

export const getRestaurantMenuFromRepo = async function (query) {
    try {
        const menu = await Restaurant.populate("menu");
        return menu;
    } catch (error) {
        throw Error("Error while retrieving restaurant menu");
    }
}

export const addItemToRestaurantMenuRepo = async function (query) {
    try {
        const updatedRestaurantMenu = await Restaurant.findByIdAndUpdate(
            { _id: query.restID },
            { $push: {menu: query._id} },
            { new: true}
            );
            return updatedRestaurantMenu;
    } catch (error) {
        throw Error("Error while adding item to restaurant menu");
    }
}

export const removeItemFromRestaurantMenuRepo = async function (query) {
    try {
        const updatedRestaurantMenu = await Restaurant.findByIdAndUpdate(
            { _id: query.restID },
            { $pull: {menu: query._id} },
            { new: true}
            );
            return updatedRestaurantMenu;
    } catch (error) {
        throw Error("Error while adding item to restaurant menu");
    }
}