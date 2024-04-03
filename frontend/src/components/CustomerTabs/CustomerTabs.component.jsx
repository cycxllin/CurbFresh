import React, { useState, useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import "./CustomerTabs.styles.css";
import TabContent from "../TabContent/TabContent.component";
import { MyCartContext } from '../../Context/MyCartContext';

function CustomerTabs ( {selectedCustomer, resInfo} ) {
    //State for selected tab
    const [selectedTab, setSelectedTab] = useState("link-0");
    const {cart, setCart} = useContext(MyCartContext);


    //fxn for tab selection
    const handleSelect = (selectedKey) => {
        setSelectedTab(selectedKey);
    }

    return (
        <div>
            {/* Render the tabs */}
            <Nav fill variant="tabs" activeKey={selectedTab} onSelect={handleSelect}>
                <Nav.Item>
                    <Nav.Link eventKey="link-3">Restaurants</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-4">Orders</Nav.Link>
                </Nav.Item>
            </Nav>

            {/* Render the content based on the selected tab */}
            <MyCartContext.Provider value={{ cart, setCart }}>
                {selectedTab === "link-3" && <TabContent resInfo={resInfo} type="Restaurants" selectedCustomer={selectedCustomer} />}
            </MyCartContext.Provider>
            {selectedTab === "link-4" && <TabContent resInfo={selectedCustomer} type="CustOrders" selectedManager={selectedCustomer} />}
        </div>
    )
}

export default CustomerTabs;