import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import App from "./App";
import Admin from "./admin";
import Home from "./pages/home";
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
            />
            <Route
              path="/admin"
              render={() => (
                <Admin>
                  <Switch>
                    <Route path="/admin/home" component={Home} />
                    <Route path="/admin/city" component={City} />
                    <Route path="/admin/order" component={Order} />
                    <Redirect to="/admin/home" />
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
