import { getOrdersForAnalyticsFromRepo, getOrdersStatusFromRepo } from "../repositories/order.repository.js";
import { getItemsByListFromRepo } from '../repositories/item.repository.js';

/* returns list of objects of x: days, y: total sales
        EXCEPT last 4 entries
            total: total sales
            popular: list of popular items
            busiest: list of busiest times
            status: object containing statuses and the number of orders with that
                status
   returns 404 error if no orders
   example for req body construction:
   {
    "user": ["M1", "R1"],

    "query":    {
        "month": "2024-02"
      }
    }
*/
export const getRestaurantAnalytics = async function (req, res) {
    try{
        
        const year = Number(req.headers.query.slice(0,4));
        const month = Number(req.headers.query.slice(-2));
        const restID = req.params.id;

        const orders = await getOrdersInMonth(year, month, restID, 'completed');
        const allOrders = await getOrdersInMonth(year, month, restID, 'all');

        if (allOrders.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'No orders in date range',
            });
        } 

        let dailySales = getRestaurantSales(orders, year, month);

        const popularItems = await getRestaurantMenuPopularity(orders);
        dailySales.push({'popular': popularItems});


        const busiest = getRestaurantBusiestTime(orders);
        dailySales.push({'busiest': busiest});

        const status = getRestaurantOrderStatus(allOrders);
        dailySales.push({'status': status});



        if (dailySales) {
            return res.status(200).json({
                status: 200,
                message: 'found sales info',
                data: dailySales
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `Error finding sales info`,
            });
        }

    } catch (error) {
        res.status(400).send(`failed to get sales info for restaurant ${req.params.id}`);
    }
}

/* returns list objects of days with total sales, last object is the monthly total when given list of orders
*/
export const getRestaurantSales = function (orders, year, month) {
    try{
        let days = getDaysInMonth(year, month);
        let total = Array(days.length).fill(0.0);

        for (const order of orders) {
            let day = order.created.toISOString().slice(8,10);
            let price = order.price;

            total[day-1] += price;
        }

        let dailySales = days.map((a,i) => {
            return {'x': a, 'y': total[i]}
        });

        const monthlyTotal = total.reduce((partialSum, a) => partialSum + a, 0);
        dailySales.push({'total': monthlyTotal});

        return dailySales;

    } catch (error) {
        throw Error(error.message);
    }
}

/* returns object of order statuses when given list of orders
*/
export const getRestaurantOrderStatus = (orders) => {
    try{
        const status = {
            "placed": 0, 
            "in progress": 0, 
            "awaiting pickup": 0, 
            "completed": 0, 
            "canceled": 0
        };

        for (const order of orders) {
            status[order.orderStatus] += 1;
        }

        return status;

    } catch (error) {
        throw Error(error.message);
    }
}

/* returns list of busiest hours (0000-2300) when given list of orders
*/
export const getRestaurantBusiestTime = function (orders) {
    try {
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

        for (const t in times) {
            if (times[t] === numOrders) {
                busiest.push(t.concat('00'));
            }
        }

        return busiest;

    } catch (error) {
        throw Error(error.message);
    }
}

/* returns most popular item when given list of orders
*/
export const getRestaurantMenuPopularity = async function (orders) {
    try{
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

        for (const i in itemDict) {
            if (itemDict[i] === numOrders) {
                popularItemsIds.push(i);
            }
        }
        
        const popularItems = await getItemsByListFromRepo(popularItemsIds);

        return popularItems;

    } catch (error) {
        throw Error(error.message);
    }
}

const getOrdersInMonth = async (year, month, restID, status) => {
    try{
        let query = {                
            $and: [
                {restID: restID},
                {$expr: { 
                    $and: [{$eq: [ {$month: "$created"}, month]},
                            {$eq: [ {$year: "$created"}, year]}
                        ] 
                    }},
                {orderStatus: 'completed'}
        ]}
        let orders = [];

        if (status === 'completed') {
            // need created, items, price, pickuptime
            orders = await getOrdersForAnalyticsFromRepo(query);

        } else {
            // only need the order status of each order, remove completed from query
            query.$and.pop();
            orders = await getOrdersStatusFromRepo(query);
        }
        
        return orders;

    } catch (error) {
        throw Error(error.message);
    }
}

// gets completed orders only
const getDaysInMonth = (year, month) => {
    try{
        const date = new Date(year, month, 0); // gets last day of requested month
        const days = date.getDate(); // number of days in month as date is the last day of the month

        let daysList = [];

        for (let i = 1; i < days+1; i++) {
            let day = new Date(year, month-1, i); // month is an index in Date constructor hence -1
            daysList.push(day.toISOString().slice(0,10));
        }
        return daysList;

    } catch (error) {
        throw Error(error.message);
    }
}