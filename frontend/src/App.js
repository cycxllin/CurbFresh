import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "./components/loginBtn/loginBtn.component";
import { MyCartContext } from './Context/MyCartContext';

function App() {
  //clears cache
  localStorage.removeItem("cart");
  localStorage.removeItem("customer");
  return (
      <div className="App">
        <h1 className="Welcome"> Welcome to CurbFresh !</h1>
        <p className="log">Log in as ...</p>
        <Button name="Manager"></Button>
        <Button name="Customer"></Button>
        <div className='bgIMG'></div>
      </div>
  );
}

export default App;
