import Restaurant from "../models/restaurant.model.js";

export const addRestaurantToRepository = async function (payload) {
    try {
        const addedRestaurant = new Restaurant(payload);
        const savedRestaurant = await addedRestaurant.save();
        return savedRestaurant;
    } catch (error) {
        throw Error("Error while adding restaurant");
    }
}

export const countRestaurantsInRepository = async function () {
    try {
        let count = await Restaurant.countDocuments();
        return count+1;
    } catch (error) {
        throw Error("Error while counting restaurants in database");
    }
}

export const getRestaurantsFromRepository = async function (query) {
    try{
         const restaurants = await Restaurant.find(query).sort({time: -1});
         return restaurants;
    } catch (error) {
        throw Error("Error while getting restaurant");
    }
}

export const updateRestaurantInRepository = async function (query, update) {
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
export const deleteRestaurantFromRepository = async function (query) {
    try {
        console.log(query);
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

export const getRestaurantMenuFromRepository = async function (query) {
    try {
        const menu = await Restaurant.populate("menu");
        return menu;
    } catch (error) {
        throw Error("Error while retrieving restaurant menu");
    }
}