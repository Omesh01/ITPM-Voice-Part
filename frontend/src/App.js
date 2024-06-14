import "./App.css";
import './css/elegant-icons.css';
import './css/font-awesome.min.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import Main from "./components/Main";
import ProductList from "./components/ProductList";
import ButterToast, { POS_RIGHT, POS_TOP } from "butter-toast";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <Router>
    <Navbar/>
      <div
        className="App center-div-custom"
        style={{
          backgroundImage: "url(/team-bg.jpg)",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          height: "100%",
        }}
      >
        <Switch>
          <Route path="/main" component={Main}></Route>
          <Route path="/" component={ProductList}></Route>
    
          
          
        </Switch>
        
        <ButterToast position={{ vertical: POS_TOP , horizontal: POS_RIGHT }} />
        
      </div>
      <Footer/>

      
    </Router>
    
  );
  
}

export default App;
