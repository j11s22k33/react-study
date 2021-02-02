import React, {Fragment} from "react";
import {Switch,Link} from "react-router-dom";
import {RouteWithSubRoutes} from "routes"

export default ({routes}) => {
  return (
    <div>
      {routes.map((route, i)=>(
          <Fragment key={i}><Link to={route.path}>{route.path}</Link><br/></Fragment>
        ))}      
      <hr/>
      <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
      </Switch>
    </div>
  )
}