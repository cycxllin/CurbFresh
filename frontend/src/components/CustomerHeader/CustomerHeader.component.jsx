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

    if (cart.length === 0) {
        return (
            <header className="cHeader" >
                <div class="container-fluid">
                    <div class="container">
                    <div className="row sm-md">
                            <div className="col-6 sm-md">
                                <h2>CurbFresh</h2>
                            </div>
                            <div className="col-6 sm-md">
                                <h2 onClick={toggleCartModal}><svg xmlns="http://www.w3.org/2000/svg" width="3vw" height="3vw" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                            </svg> Cart</h2>
                            </div>
                        <MyCartContext.Provider value={{ cart, setCart }}>
                            <CartPopup
                                    showCartModal={showCartModal}
                                    toggleCartModal={toggleCartModal}
                                    selectedCustomer={selectedCustomer}
                                />
                        </MyCartContext.Provider>
                            
    
                </div>
                    </div>
                </div>
            </header>
        )
    }else{
        return (
            <header className="cHeader" >
                <div className="row sm-md">
                            <div className="col sm-md">
                                <h2>CurbFresh</h2>
                            </div>
                            <div className="col sm-md">
                                <h2 onClick={toggleCartModal}><svg xmlns="http://www.w3.org/2000/svg" width="3vw" height="3vw" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg> Cart</h2>
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
    
}

export default CustomerHeader;