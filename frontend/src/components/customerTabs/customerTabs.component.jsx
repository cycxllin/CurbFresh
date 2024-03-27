import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import "./CustomerTabs.styles.css";
import TabContent from "../TabContent/TabContent.component";

function CustomerTabs ( {selectedCustomer, resInfo} ) {
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
                    <Nav.Link eventKey="link-0">Restaurants</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Orders</Nav.Link>
                </Nav.Item>
            </Nav>

            {/* Render the content based on the selected tab */}
            {selectedTab === "link-3" && <TabContent resInfo={resInfo} type="Restaurants" selectedCustomer={selectedCustomer} />}
            {selectedTab === "link-4" && <TabContent resInfo={resInfo} type="Orders" selectedCustomer={selectedCustomer} />}
        </div>
    )
}

export default CustomerTabs;