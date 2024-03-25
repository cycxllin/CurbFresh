import React, { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import Nav from 'react-bootstrap/Nav';
import "./ManagerTabs.styles.css";
import TabContent from "../TabContent/TabContent.component";


//https://react-bootstrap.netlify.app/docs/components/navs/#/home

/*const fetchMenuItems = async (menuIDs) => {
    const IdString = menuIDs.join(',');
    //console.log(IdString);
    const url = `http://localhost:65500/items/list?menu=${IdString}`;
    //console.log(url);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch menu items");
    }
    return response.json();
}*/

function ManagerTabs ( {selectedManager, resInfo} ) {
    //State for selected tab
    const [selectedTab, setSelectedTab] = useState("link-0");
    //const [menu, setMenuItems] = useState([]);

    //Query for menuItems
    /*const {data: menuItems, isLoading, isError, refetch } = useQuery(
        'menuItems',
         () => fetchMenuItems(resInfo.menu)
        ,{
        enabled: !!selectedManager, //Run only if selectedManager is not null,
        cacheTime: Infinity,
        refetchOnWindowFocus: true, // Ensure refetch on window focus
    });

    useEffect(() =>{
        if (isLoading) {
            console.log("Loading");
            setMenuItems([])}
        if (isError) {console.log("Error");}
        if (menuItems && selectedManager) {
            console.log("Change!");
            refetch();
            //console.log("type: " + typeof menuItems.data);
            setMenuItems(menuItems.data);
            //console.log("Menu? " + menu );
        }
    }, [menuItems, selectedManager]);*/

    //Query for Restaurant Orders

    //Query for analytics
    
    //fxn for tab selection
    const handleSelect = (selectedKey) => {
        setSelectedTab(selectedKey);
    }


    return (
        <div>
            {/* Render the tabs */}
            <Nav fill variant="tabs" activeKey={selectedTab} onSelect={handleSelect}>
                <Nav.Item>
                    <Nav.Link eventKey="link-0">Menu Items</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Orders</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Analytics</Nav.Link>
                </Nav.Item>
            </Nav>

            {/* Render the content based on the selected tab */}
            {selectedTab === "link-0" && <TabContent  key={`${selectedManager}-MenuItems`} resInfo={resInfo} type="Menu Items" selectedManager={selectedManager} /*content={menu}*/ />}
            {selectedTab === "link-1" && <TabContent  key={`${selectedManager}-Orders`} resInfo={resInfo} type="Orders" selectedManager={selectedManager} /*TODOcontent={orders}*//>}
            {selectedTab === "link-2" && <TabContent  key={`${selectedManager}-Analytics`} resInfo={resInfo} type="Analytics" selectedManager={selectedManager} /*content={analytics}TODO*//>} 
        </div>
    )
}

export default ManagerTabs;