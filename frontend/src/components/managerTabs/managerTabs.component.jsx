import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import "./managerTabs.styles.css";
import TabContent from "../TabContent/TabContent.component";


//https://react-bootstrap.netlify.app/docs/components/navs/#/home

function ManagerTabs ( {selectedManager} ) {
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
            {selectedTab === "link-0" && <TabContent type="Menu Items" selectedManager={selectedManager} />}
            {selectedTab === "link-1" && <TabContent type="Orders" selectedManager={selectedManager} />}
            {selectedTab === "link-2" && <TabContent type="Analytics" selectedManager={selectedManager} />}
        </div>
    )
}

export default ManagerTabs;