import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {routes} from "routes"

import CRouteMap from 'component/__RouteMap__'
import "App.css";

export default () => {  
  return (
    <div className="App">
      <Router>
        <CRouteMap routes={routes} />
      </Router>      
    </div>
  )
}