import { Route, Switch } from "react-router-dom";
import { useState } from "react";
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
    <div className="flex flex-col min-h-screen pt-8 pb-2">
      <div className="flex-grow">
        <Header setOpen={setOpen} />
        <Switch>
          <Route
            exact
            path="/dashboard"
            render={(props) => <Dashboard {...props} />}
          />
        </Switch>
        <Modal isOpen={open} onClose={handleCloseModal} children={<ServiceRequest />} /> {/*to test modal, change isOpen={!open}*/}
      </div>
      <Footer />
    </div>
  )
};

export default App;
