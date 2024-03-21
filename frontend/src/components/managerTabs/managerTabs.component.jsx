import React from 'react';
import Nav from 'react-bootstrap/Nav';
import "./managerTabs.styles.css";
import CardList from "../cardList/cardList.component";


//https://react-bootstrap.netlify.app/docs/components/navs/#/home

function managerTabs () {

    return (
        <Nav fill variant="tabs" defaultActiveKey="link-0">
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
    )
}

export default managerTabs;