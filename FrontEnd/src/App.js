import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Users from './pages/Users'
import Orders from './pages/Orders'
import StockMovement from './pages/Stock'
import Items from './pages/Items'

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Users</Link>
            </li>
            <li>
              <Link to="/items">Items</Link>
            </li>
            <li>
              <Link to="/stock">Stock</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/stock">
            <StockMovement />
          </Route>
          <Route path="/items">
            <Items />
          </Route>
          <Route path="/">
            <Users />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}