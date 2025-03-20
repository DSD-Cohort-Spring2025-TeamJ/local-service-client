import { Route, Switch } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import ServiceRequest from "./pages/ServiceRequest";
import Header from "/src/components/Header.jsx";
import Modal from "./components/Modal";
import Footer from "./components/Footer.jsx";
import Pipe from "./components/Pipe.jsx"
import "./css/App.css";

function App() {
  const [open, setOpen] = useState(false);
  const handleCloseModal = () => setOpen(!open);

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="flex-grow">
        <Header setOpen={setOpen} />

        <Pipe className="pipe h-[40px] mt-5"/>
        
        <Switch>
          <Route
            exact
            path="/admin"
            render={(props) => <Dashboard {...props} />}
          />
        </Switch>
        <Modal isOpen={open} onClose={handleCloseModal}>
          <ServiceRequest />
        </Modal>
      </div>
      <Footer />
    </div>
  );
}

export default App;
