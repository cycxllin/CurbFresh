import { addRestaurantToRepo, countRestaurantsInRepo, getRestaurantsFromRepository } from "../repositories/restaurant.repository.js";

export const addRestaurant = async (req, res, next) => {
    const { body } = req;
    try {
        const restCount = await countRestaurantsInRepo();
        const restaurant = { _id: restCount, ...body};
        console.log(restaurant);
        const addedRestaurant = await addRestaurantToRepo(restaurant);

        if (addedRestaurant) {
            return res.status(200).json({
                status: 200,
                message: 'added restaurant sucessfully',
                data: addedRestaurant
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error adding restaurant`,
            });
        }
    } catch (error) {
        res.status(500).send(`failed to add restaurant`);
    }
}

/* Get a SINGLE restaurant */
export const getRestaurant = async function (req, res) {
    try {
        const restaurant = await getRestaurantsFromRepository({_id: req.params});
        if (restaurant) {
            return res.status(200).json({
                status: 200,
                message: 'found restaurant sucessfully',
                data: restaurant
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error finding restaurant`,
            });
        }
    }catch (err) {
        res.status(500).send(`failed to get restaurant ${req.params}`);
    }
}

/* Get a LIST of Restaurants */
export const getRestaurants = async function (req, res) {
    try {
        const restaurant = await getRestaurantsFromRepository({});
        if (restaurant) {
            return res.status(200).json({
                status: 200,
                message: 'found restaurants sucessfully',
                data: restaurant
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error finding restaurants`,
            });
        }
    }catch (err) {
        res.status(500).send(`failed to get restaurants`);
    }
}