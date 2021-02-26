import {Route, Redirect} from "react-router-dom";

import CRouteMap from 'component/__RouteMap__'
import CHome from 'component/home'
import CImages from 'component/images'
import CUseRef from 'component/useRef'
import CUseState from 'component/useState'
import CUseStateCallbackWrapper from 'component/useStateCallbackWrapper'

const routes = [
  {exact: true, path: "/", component: (props)=>(<Redirect to="/home" />)},
  {path: "/home", component: CHome},
  {path: "/images", component: CImages},
  {path: "/useState", component: CUseState},
  {path: "/useRef", component: CUseRef},
  {path: "/useStateCallbackWrapper", component: CUseStateCallbackWrapper},
  {path: "/routeMap", component: CRouteMap, routes: [
      {path: `/routeMap/useRef`, component: CUseRef},
      {path: `/routeMap/useState`, component: CUseState}
    ]
  },
  {path: "*", component: (props)=>(
      <div>
        <h1>
          404 NOT FOUND<br/>
          props.location.pathname ={">"} {props.location.pathname}
        </h1>
      </div>
    )
  }
]

// https://reactrouter.com/web/example/route-config
// https://reactrouter.com/web/api/Route
//  <Route exact={true} path='/myURL' render={props => <MYComponent {...props} myAuth={true} myName="JSK" />} />
//  <Route exact={true} path='/myURL' render={props => <div>MYComponent</div>} />} />
function RouteWithSubRoutes(route) {
  return (
    <Route exact={route.exact} path={route.path} render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  )
}

export {
  routes,
  RouteWithSubRoutes
}