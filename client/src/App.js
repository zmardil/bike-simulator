import React from "react";
import Simulator from "./components/Simulator";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import { Switch, Route } from "react-router-dom";

import theme from "./utils/theme";

import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

import BikesContext from "./components/BikesContext";

import axios from "axios";
import ProtectedRoute from "./components/ProtectedRoute";

axios.defaults.withCredentials = true;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BikesContext>
        <CssBaseline />
        <Switch>
          <Route exact path="/" component={Home} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <Route path="/login" component={SignIn} />
          <Route path="/register" component={SignUp} />
          <Route path="/simulator/:ids" component={Simulator} />
          <Route path="/simulator" component={Simulator} />
        </Switch>
      </BikesContext>
    </ThemeProvider>
  );
}

export default App;
