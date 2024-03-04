import Restaurant from "../models/restaurant.model.js";

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

export const deleteRestaurantFromRepository = async function (query) {
    try {
        console.log(query);
        const restaurant = await Restaurant.findOneAndDelete({ ...query });
        return restaurant;
    } catch (error) {
        throw Error("Error while deleting restaurant");
    }
}