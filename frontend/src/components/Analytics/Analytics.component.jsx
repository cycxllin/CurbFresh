import React, { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import axios from "axios";
//import Button from 'react-bootstrap/Button';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CanvasJSReact from '@canvasjs/react-charts';
import "./Analytics.styles.css";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const fetchResAnalytics = async (resID, selectedManager, date) => {
    if (resID === undefined) { return;}
    
    try {
        const url = `http://localhost:65500/analytics/${resID}`;
        console.log("Seeing date: " + date);
        const response = await axios.get(url, {headers: 
            {user: [[selectedManager[0]], [selectedManager[1]]],
            query: date}
        });
        if (response.status === 200) {
            console.log("successfully receieved analytics");
            return response.data;
        }
    }catch (error) {
        if (error.response.status === 404) {
            console.log("HELLO!");
            alert("No analytics during date range");
            return;
            //console.log(error.response.message);
        }
    }
}


function Analytics ( { selectedManager, resInfo }){
    const [analytics, setAnalytics] = useState({});
    const [date, setDate] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [earnings, setEarnings] = useState(0);
    const [popularItem, setPopularItem] = useState({});
    const [busyTimes, setBusyTimes] = useState([]);
    const [orders, setOrders] = useState({"status": {
        "placed": 0,
        "in progress": 0,
        "awaiting pickup": 0,
        "completed": 0,
        "canceled": 0,
    }});

    //Change in whatever is inputted
    const handleChange = (newDate) => {
        setDate(dayjs(newDate).format("YYYY-MM"));
        //console.log("date? " + date)
      };

    //Get Analytics data
    const {data: resLytics, isLoading, isError, refetch} = useQuery({
        queryKey: ['resLytics', date],
        queryFn: () => fetchResAnalytics(resInfo._id, selectedManager, date),
        enabled: !!date,
        staleTime: 1000, //1sec
        cacheTime: Infinity
    });

    useEffect(() =>{
        if (resLytics && date){
            //console.log("resLy" + resLytics);
            setAnalytics(resLytics)
        }
    }, [resLytics, date])

    //let chartData =[] , earnings, popularItem, busyTimes, orders, options;
    //let options;
    useEffect(() => {
        if (resLytics && analytics){
            refetch();
            //console.log("Analytics?" + analytics.data);
            const length = analytics.data.length;
            //Make data readable by chart
            const transformedData = resLytics.data.slice(0, length - 4).map(item => ({
                x: new Date(item.x), // Assuming item.date is the date property in your chartData object
                y: item.y // Assuming item.value is the numerical value property in your chartData object
            }));
            setChartData(transformedData);
            
            // setChartData(analytics.data.slice(0, length-4));
            //console.log("Chart Data: " + chartData);

            //earnings = analytics.data[length-4];
            setEarnings(analytics.data[length-4]);
            //console.log("Total :" + earnings.total);

            //popularItem = analytics.data[length-3];
            setPopularItem(analytics.data[length-3]);
            //console.log("Popular Item: " + popularItem.popular);

            //busyTimes = analytics.data[length-2];
            setBusyTimes(analytics.data[length-2]);
            //console.log("Busy times: " + busyTimes);

            //orders = analytics.data[length-1];
            setOrders(analytics.data[length-1]);
            //console.log("Orders: " + orders.status.placed);
            

        }
    }, [analytics])

    const options = {
        animationEnabled: true,
            theme: "light2",
            title:{
                text: "Monthly Revenue"
            },
            axisX:{
                valueFormatString: "DD MMM",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                }
            },
            axisY: {
                title: "Total sales",
                valueFormatString: "$##0.00",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true,
                    labelFormatter: function(e) {
                        return "$" + CanvasJS.formatNumber(e.value, "##0.00");
                    }
                }
            },
            data: [{
                type: "area",
                xValueFormatString: "DD MMM",
                yValueFormatString: "$##0.00",
                dataPoints: chartData,
            }]
    };

    if (isLoading) {
        return <p>Loading...</p>}
    if (isError) {return console.log(isError);}
    if (resInfo === null || selectedManager === null){
        return <p>Select Manager to view restaurant info!</p> 
    }
    return (
        <div >
            <h3>Select a month to view analytics:</h3>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker id="dP"
                defaultValue={dayjs("2024-01")}
                label={'"year" and "month"'} 
                value={dayjs(date)}
                views={['month', 'year']}
                format="YYYY-MM"
                onChange={handleChange}/>
            </LocalizationProvider>
            <CanvasJSChart options={options} />
            <div className="analytics-grid">
                <div className='analytics-grid-item'>
                    <h2>Total Earnings:</h2>
                    <br/>
                    <br/>
                    <p>${earnings.total}</p>
                </div>
                <div className='analytics-grid-item'>
                    <h2>Most Popular Menu Item(s):</h2>
                    <br/> 
                    <br/>
                    {popularItem.popular && popularItem.popular.map((item, index) => (
                        <p key={index}>{item.name}</p>
                    ))}
                </div>
                <div className='analytics-grid-item'>
                    <h2>Busiest Pickup Time(s)</h2>
                    <br/>
                    <br/>
                    {busyTimes.busiest && busyTimes.busiest.map((time, index) => (
                        <p key={index}>{time}</p>
                    ))}
                </div>
                <div className='analytics-grid-item' id="orderSum">
                    <h2>Order Summary:</h2>
                    <p>Placed: {orders.status["placed"]} 
                    <br/>
                    In Progress:     {orders.status["in progress"]} 
                    <br/>
                    Awaiting Pickup: {orders.status["awaiting pickup"]}  
                    <br/>
                    Completed:       {orders.status["completed"]} 
                    <br/>
                    Canceled:        {orders.status["canceled"]}</p>

                </div>
            </div>
            
        </div>
    )
}

export default Analytics;