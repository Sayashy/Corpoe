import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { toast } from 'react-toastify';
import SidebarExampleDimmed from './layouts/sidebar'
import routes from "./routes"

import './App.css';
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.min.css';


toast.configure({
  draggable: true
});

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <Router basename={process.env.REACT_APP_BASENAME || ""} >
          <div>
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={props => {
                    return (
                      <SidebarExampleDimmed Children={route.component} {...props}/>
                    );
                  }}
                />
              );
            })}
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
