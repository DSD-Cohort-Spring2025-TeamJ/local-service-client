import { Route, Switch } from "react-router-dom";
import pragmaticplumberlogo from "/src/assets/pragmaticplumberlogo.png";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ServiceRequest from "./pages/ServiceRequest";
import Footer from "./components/Footer.jsx";
import Button from "/src/components/Button.jsx"

import "./css/App.css";

function App() {
  return (
    <>
      <div>
        <div className="logo">
          <img
            className="pragmatic-plumber"
            src={pragmaticplumberlogo}
            alt="The Pragmatic Plumber Logo"
          />
        </div>
        <Nav />
        <Switch>
          <Route exact path="/login" render={(props) => <Login {...props} />} />
          <Route
            exact
            path="/signup"
            render={(props) => <Signup {...props} />}
          />
          <Route
            exact
            path="/dashboard"
            render={(props) => <Dashboard {...props} />}
          />
        </Switch>
        <ServiceRequest />
        <Footer />
      </div>
    </>
  );
}

export default App;
