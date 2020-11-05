import React from "react";

import { HashRouter, Route, Switch, Redirect} from "react-router-dom";
import App from "./App";
import Admin from "./admin";
import Home from "./pages/home";
import Login from "./pages/form/login";
import Register from "./pages/form/register";
import Bar from "./pages/echarts/bar/index";
import Line from "./pages/echarts/line/index";
import Pie from "./pages/echarts/pie/index";
import BikeMap from "./pages/map/bikeMap";



import City from "./pages/city/index";
import Order from "./pages/order/index";
import Common from "./common"
import OrderDetail from './pages/order/detail'


export default class IRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>

            {/* <Route path="/login" component={Login} /> */}

            <Route
              path="/common"
              render={() => (
                <Common>
                  <Route
                    path="/common/order/detail/:orderId"
                    component={OrderDetail}
                  />
                </Common>
              )}

            />*/}
            <Route
              path="/"
              render={() => (
                <Admin>
                  <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/form/login" component={Login}/>
                    <Route path="/form/register" component={Register} />
                    <Route path="/charts/bar" component={Bar} />
                    <Route path="/charts/line" component={Line} />
                    <Route path="/charts/pie" component={Pie} />
                    <Route path="/bikeMap" component={BikeMap}/>
                    <Route path="/city" component={City} />
                    <Route path="/order" component={Order} />
                    <Redirect to="/home" />

                  </Switch>
                </Admin>
              )}
            />
          </Switch>
        </App>
      </HashRouter>
    );
  }
}
