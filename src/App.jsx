import { Route, Switch } from "react-router-dom";
import pragmaticplumberlogo from '/src/assets/pragmaticplumberlogo.png';
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ServiceRequest from "./pages/ServiceRequest";
import Footer from "./components/Footer.jsx"
import Header from "/src/components/Header.jsx"

import './css/App.css'

function App() {

  return (
    <body className="flex flex-col min-h-screen pt-8 pb-2">
      <main className="flex-grow">
        <Header />
        {/* <Nav /> */}
        <Switch>
          <Route exact path="/login" render={(props) => <Login {...props} />} />
          <Route exact path="/signup" render={(props) => <Signup {...props} />} />
          <Route exact path="/dashboard" render={(props) => <Dashboard {...props} />} />
        </Switch>
        <ServiceRequest />
      </main>
      <Footer />
    </body>
  )
}

export default App
