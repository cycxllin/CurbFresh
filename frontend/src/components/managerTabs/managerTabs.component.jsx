import React, { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import Nav from 'react-bootstrap/Nav';
import "./managerTabs.styles.css";
import TabContent from "../TabContent/TabContent.component";


//https://react-bootstrap.netlify.app/docs/components/navs/#/home

function ManagerTabs ( {selectedManager, resInfo} ) {
    //State for selected tab
    const [selectedTab, setSelectedTab] = useState("link-0");

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
            {selectedTab === "link-0" && <TabContent key={`${selectedManager}-MenuItems`} resInfo={resInfo} type="Menu Items" selectedManager={selectedManager} />}
            {selectedTab === "link-1" && <TabContent key={`${selectedManager}-Orders`} resInfo={resInfo} type="Orders" selectedManager={selectedManager} />}
            {selectedTab === "link-2" && <TabContent key={`${selectedManager}-Analytics`} resInfo={resInfo} type="Analytics" selectedManager={selectedManager} />}
        </div>
    )
}

export default ManagerTabs;
