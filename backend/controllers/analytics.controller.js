import { getOrdersFromRepo } from "../repositories/order.repository.js";
import { getItemByIdFromRepo } from '../repositories/item.repository.js';

export const getRestaurantSaleInfo = async function (req, res) {
    try{

    } catch (error) {
        res.status(400).send(`failed to get sale info for restaurant ${id}`);
    }
}

export const getRestaurantBusiestTime = async function (req, res) {
    try {

        const dates = parseDates(req.body.query.from, req.body.query.to)
        const query = {
            $and: [
                {restID: req.params.id},
                {created: {
                    $gte: new Date(dates.from), 
                    $lte: new Date(dates.to)
                }}
            ]};
        
        const orders = await getOrdersFromRepo(query);

        if (orders.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'No orders in date range',
            });
        }

    } catch (error) {
        res.status(400).send(`failed to get busiest time for restaurant ${id}`);
    }
}

/* returns most popular item in given date range
   returns 404 error if no orders in given range
   example for req body construction:
   {
    "user": ["M1", "R1"],

    "query":    {
        "from": "2024-02-27",
        "to": "2024-01-27"
      }
    }
*/
export const getRestaurantMenuPopularity = async function (req, res, next) {
    try{
        const dates = parseDates(req.body.query.from, req.body.query.to)
        const query = {
            $and: [
                {restID: req.params.id},
                {created: {
                    $gte: new Date(dates.from), 
                    $lte: new Date(dates.to)
                }}
            ]};
        
        const orders = await getOrdersFromRepo(query);

        if (orders.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'No orders in date range',
            });
        }
        
        // construct dictionary of items and quantities
        let itemDict = {};

        for (const order of orders) {
            for (const item of order.items) {
                if (item.item in itemDict) {
                    itemDict[item.item] += item.quantity;
                } else {
                    itemDict[item.item] = item.quantity;
                }
            }
        }

        const popularItemId = Object.keys(itemDict).reduce(
            function(a, b){ return itemDict[a] > itemDict[b] ? a : b }
            );

        const popularItem = await getItemByIdFromRepo(popularItemId);

        if (popularItem) {
            return res.status(200).json({
                status: 200,
                message: 'found most popular item',
                data: popularItem
            });
        } else {
            return res.status(400).json({
                status: 400,
                message: `Error creating order`,
            });
        }


    } catch (error) {
        res.status(400).send(`failed to get most popular item: ${error.message}`);
    }
}

const parseDates = (from, to) => {
    try{
        if (!from || !to) {
            throw Error('Both from and to dates are required');
        };

        const fromDate = new Date(from);
        let toDate = new Date(to);

        if (fromDate > toDate) {
            throw Error('From date must be equal or smaller than to date');
        }
        // increment to date to account for time
        toDate.setDate(toDate.getDate() + 1);

        return {from: fromDate, to: toDate};
    } catch (error) {
        throw Error(error.message);
    }
}