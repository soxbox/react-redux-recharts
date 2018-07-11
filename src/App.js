import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomePage from './components/HomePage';
// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.
const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div>Re Chart</div>,
    main: () => <HomePage />
  }
];

const App = () => (
  <Router>
    <div style={{ display: "flex" }}>
      <div
        style={{
          padding: "10px",
          background: "#f0f0f0"
        }}
      >
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {routes.map((route, index) => (
            <li key={index}>
              <Link to={route.path} key={index}><route.sidebar /></Link>
            </li>
          ))}
        </ul>

      </div>

      <div style={{ flex: 1, padding: "10px" }}>
        {routes.map((route, index) => (
          // Render more <Route>s with the same paths as
          // above, but different components this time.
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
      </div>
    </div>
  </Router>
);

export default App;
