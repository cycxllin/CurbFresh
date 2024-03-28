import { getOrdersFromRepo } from "../repositories/order.repository.js";
import { getItemsByListFromRepo } from '../repositories/item.repository.js';

export const getRestaurantSaleInfo = async function (req, res) {
    try{

    } catch (error) {
        res.status(400).send(`failed to get sale info for restaurant ${id}`);
    }
}

/* returns list of busiest hours (0000-2300) in given date range
   returns 404 error if no orders in given range
   example for req body construction:
   {
    "user": ["M1", "R1"],

    "query":    {
        "from": "2024-02-27",
        "to": "2024-03-27"
      }
    }
*/
export const getRestaurantBusiestTime = async function (req, res) {
    try {
        const orders = await getOrdersInRange(req);

        if (orders.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'No orders in date range',
            });
        }

        // construct dictionary of times and number of orders
        let times = {};

        for (const order of orders) {
            let time = Number(order.pickupTime.slice(0,2));

            if (time in times) {
                times[time] += 1;
            } else {
                times[time] = 1;
            }
        }

        // get busiest times
        let busiest = [];
        const numOrders = Math.max(...Object.values(times));
        console.log(times);

        for (const t in times) {
            if (times[t] === numOrders) {
                busiest.push(t.concat('00'));
            }
        }

        if (busiest.length !== 0) {
            return res.status(200).json({
                status: 200,
                message: 'found busiest times',
                data: busiest
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error finding busiest times`,
            });
        }

    } catch (error) {
        res.status(500).send(`failed to get busiest times for restaurant ${req.params.id}`);
    }
}

/* returns most popular item in given date range
   returns 404 error if no orders in given range
   example for req body construction:
   {
    "user": ["M1", "R1"],

    "query":    {
        "from": "2024-02-27",
        "to": "2024-03-27"
      }
    }
*/
export const getRestaurantMenuPopularity = async function (req, res, next) {
    try{
        const orders = await getOrdersInRange(req);

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

        let popularItemsIds = [];
        const numOrders = Math.max(...Object.values(itemDict));
        console.log(itemDict);

        for (const i in itemDict) {
            if (itemDict[i] === numOrders) {
                popularItemsIds.push(i);
            }
        }
        
        const popularItems = await getItemsByListFromRepo(popularItemsIds);

        if (popularItems.length !== 0) {
            return res.status(200).json({
                status: 200,
                message: 'found most popular items',
                data: popularItems
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error finding most popular items`,
            });
        }


    } catch (error) {
        res.status(500).send(`failed to get most popular items for restaurant ${req.params.id}`);
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

// gets completed orders only
const getOrdersInRange = async (req) => {
    try{
        const dates = parseDates(req.body.query.from, req.body.query.to)
        const query = {
            $and: [
                {restID: req.params.id},
                {orderStatus: 'completed'},
                {created: {
                    $gte: new Date(dates.from), 
                    $lte: new Date(dates.to)
                }}
            ]};
        
        const orders = await getOrdersFromRepo(query);

        return orders;
    } catch (error) {
        throw Error(error.message);
    }
}