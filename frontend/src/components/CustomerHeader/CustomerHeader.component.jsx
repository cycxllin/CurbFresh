import React, { useState, useEffect, createContext, useContext} from 'react';
import { useQuery } from 'react-query';
import CustomerDropdown from '../CustomerDropdown/CustomerDropdown.component';
import CartPopup from '../CartPopup/CartPopup.component';
import axios from "axios";
import "./CustomerHeader.styles.css";
import CardSubtitle from 'react-bootstrap/esm/CardSubtitle';
import { MyCartContext } from '../../Context/MyCartContext';

function CustomerHeader ({selectedCustomer}) {

    const {cart, setCart} = useContext(MyCartContext);
    const [showCartModal, setShowCartModal] = useState(false);
    const [customers, setCustomers] = useState([]);

    const toggleCartModal = () => {setShowCartModal(!showCartModal);};

    return (
        <header className="mHeader" >
            <div className="row sm-md">
                        <div className="col sm-md">
                            <h2>CurbFresh</h2>
                        </div>
                        <div className="col sm-md">
                            <h2>Enter Your Address</h2>
                        </div>
                        <div className="col sm-md">
                            <h2 onClick={toggleCartModal}> Cart</h2>
                        </div>
                    <MyCartContext.Provider value={{ cart, setCart }}>
                        <CartPopup
                                showCartModal={showCartModal}
                                toggleCartModal={toggleCartModal}
                                selectedCustomer={selectedCustomer}
                            />
                    </MyCartContext.Provider>
                        

                    </div>
        </header>
    )
}

export default CustomerHeader;