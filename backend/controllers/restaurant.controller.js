import { addRestaurantToRepo, countRestaurantsInRepo, getRestaurantsFromRepo, getRestaurantMenuFromRepo, updateRestaurantInRepo, deleteRestaurantFromRepo } from "../repositories/restaurant.repository.js";

export const addRestaurant = async (req, res, next) => {
    const { body } = req;
    try {
        const restCount = await countRestaurantsInRepo();
        const restaurant = { _id: `R${restCount}`, ...body, active: true};

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
        const restaurant = await getRestaurantsFromRepo({id: req.params});
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
        const restaurants = await getRestaurantsFromRepo({active: true});
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
        const restaurant = await updateRestaurantInRepo({id: id}, body); 
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
        const restaurant = await deleteRestaurantFromRepo({id: id});
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

export const  getRestaurantMenu = async function (req, res) {
    try {
        const restaurant = await getRestaurantsFromRepo({ id: req.params});
        const resMenu = await getRestaurantMenuFromRepo({id: restaurant.id});
        if (resMenu){
            return res.status(200).json({
                status: 200,
                message: `Retrieved restaurant menu successfully`,
                data: resMenu
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error retrieving restaurant menu`
            });
        }
    } catch (error) {
        res.status(500).send(`failed to get restaurant menu`);
    }
}

