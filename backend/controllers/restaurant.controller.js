import { addRestaurantToRepo, countRestaurantsInRepo, getRestaurantsFromRepository, updateRestaurantInRepository, deleteRestaurantFromRepository } from "../repositories/restaurant.repository.js";

export const addRestaurant = async (req, res, next) => {
    const { body } = req;
    try {
        const restCount = await countRestaurantsInRepo();
        const restaurant = { id: restCount, ...body, active: true};
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

/* Get a SINGLE restaurant 
 * Can still GET a restaurant if it is inactive
*/
export const getRestaurant = async function (req, res) {
    try {
        const restaurant = await getRestaurantsFromRepository({id: req.params});
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
    }catch (error) {
        res.status(500).send(`failed to get restaurant ${req.params}`);
    }
}

/* Get a LIST of active Restaurants */
export const getRestaurants = async function (req, res) {
    try {
        const restaurants = await getRestaurantsFromRepository({active: true});
        if (restaurants) {
            return res.status(200).json({
                status: 200,
                message: 'found restaurants sucessfully',
                data: restaurants
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error finding restaurants`,
            });
        }
    }catch (error) {
        res.status(500).send(`failed to get restaurants`);
    }
}

/* Edit Restaurant Information */
export const updateRestaurant = async function (req, res) {
    const { id } = req.params;
    const { body } = req;
    try {
        const restaurant = await updateRestaurantInRepository({_id: id}, body);
        if (restaurant){
            return res.status(200).json({
                status: 200,
                message: `updated restaurant successfully`,
                data: restaurant
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error updating restaurant`
            });
        }
    } catch (error) {
        res.status(500).send(`failed to update restaurant`);
    }
}

/* Delete a restaurant 
 * Only sets active: false rather than fully deleting
*/
export const deleteRestaurant = async function (req, res) {
    const { id } = req.params;
    try {
        const restaurant = await deleteRestaurantFromRepository({id: id});
        if (restaurant){
            return res.status(204).json({
                status: 204,
                message: `deleted restaurant successfully`,
                data: restaurant
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error deleting restaurant`
            });
        }
    } catch (error) {
        res.status(500).send(`failed to delete restaurant ${id}`);
    }
}


//TODO After menu and order have been implemented
export const getRestaurantSaleInfo = async function (req, res) {
    try{

    } catch (error) {
        res.status(500).send(`failed to get sale info for restaurant ${id}`);
    }
}

export const getRestaurantBusiestTime = async function (req, res) {
    try {

    } catch (error) {
        res.status(500).send(`failed to get busiest time for restaurant ${id}`);
    }
}

export const getRestaurantMenuPopularity = async function (req, res) {
    try{

    } catch (error) {
        res.status.send(`failed to get popular menu list`);
    }
}