import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "./components/loginBtn/loginBtn.component";

function App() {

  return (
    <div className="App">
      <h1 class="Welcome"> Welcome to CurbFresh !</h1>
      <p>Log in as ...</p>
      <Button name="Manager"></Button>
      <Button name="Customer"></Button>
      
    </div>
  );
}

export default App;
