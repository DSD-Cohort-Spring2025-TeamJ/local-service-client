import { Route, Switch } from "react-router-dom";
import { useState } from "react";
import pragmaticplumberlogo from "/src/assets/pragmaticplumberlogo.png";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ServiceRequest from "./pages/ServiceRequest";
import Header from "/src/components/Header.jsx"
import Modal from "./components/Modal";
import Footer from "./components/Footer.jsx";
import "./css/App.css";

function App() {
  const [open, setOpen] = useState(false)
  const handleCloseModal = () => setOpen(!open)

  return (
    <body className="flex flex-col min-h-screen pt-8 pb-2">
      <main className="flex-grow">
        <Header />
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
        <Modal isOpen={open} onClose={handleCloseModal} children={<ServiceRequest />} /> {/*to test modal, change isOpen={!open}*/}
      </main>
      <Footer />
    </body>
  )
};

export default App;
