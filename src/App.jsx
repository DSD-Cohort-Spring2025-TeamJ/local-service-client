import { Route, Switch } from "react-router-dom";
import pragmaticplumberlogo from '/src/assets/pragmaticplumberlogo.png';
import Nav from "./Nav";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import ServiceRequest from "./pages/ServiceRequest";
import Footer from "/src/components/Footer.jsx"

import './App.css'

function App() {

  return (
    <>
      <div>
        <div className="logo">
          <img className="pragmatic-plumber" src={pragmaticplumberlogo} alt="The Pragmatic Plumber Logo" />
        </div>
        <Nav />
        <Switch>
          <Route exact path="/login" render={(props) => <Login {...props} />} />
          <Route exact path="/signup" render={(props) => <Signup {...props} />} />
          <Route exact path="/dashboard" render={(props) => <Dashboard {...props} />} />
        </Switch>
        <ServiceRequest />
        <Footer />
      </div>
    </>
  )
}

export default App
