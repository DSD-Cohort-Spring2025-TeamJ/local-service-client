import { Route, Switch } from "react-router-dom";
import { useState, useContext } from "react";
import Dashboard from "./pages/Dashboard";
import ServiceRequest from "./pages/ServiceRequest";
import Header from "/src/components/Header.jsx";
import Modal from "./components/Modal";
import Footer from "./components/Footer.jsx";
import Pipe from "./components/Pipe.jsx";
import "./css/App.css";
import FeaturedImageGallery from "./components/Gallery.jsx";
import { Context } from "./context/Context.jsx";


function App() {
  const { setAppointment } = useContext(Context);
  const [open, setOpen] = useState(false);
  const handleCloseModal = () => {
    setOpen(!open);
    setAppointment({
      service_id: "",
      estimated_time: "",
      tech_id: "",
      date: "",
      start_time: "",
      end_time: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      comment: ""
    })
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="flex-grow">
        <Header setOpen={setOpen} />

        <Pipe className="pipe h-[40px] mt-5" />

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
      <FeaturedImageGallery />
      <Footer />
    </div>
  );
}

export default App;
