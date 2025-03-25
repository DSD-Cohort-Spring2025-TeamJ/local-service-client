import { Route, Switch } from "react-router-dom";
import { useState, useContext } from "react";
import Dashboard from "./pages/Dashboard";
import ServiceRequest from "./pages/ServiceRequest";
// import Header from "/src/components/Header.jsx";
import Modal from "./components/Modal";
import Footer from "./components/Footer.jsx";
import Pipe from "./components/Pipe.jsx";
import "./css/App.css";
import FeaturedImageGallery from "./components/Gallery.jsx";
import { Context } from "./context/Context.jsx";
import { useLocation } from "react-router-dom";
// import ScrollingReviews from "./components/Reviews.jsx";
// import Contact from "./components/Contact.jsx";
import StickyHeader, {
  HeroSection,
  TestimonialCarousel,
} from "./pages/Home.jsx";

export default function App() {
  const { setAppointment } = useContext(Context);
  const [open, setOpen] = useState(false);
  const location = useLocation();

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
      comment: "",
    });
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-green-50">
      <div className="">
        {/* <Header setOpen={setOpen} /> */}
        <StickyHeader setOpen={setOpen} />

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
      {/* <div className="flex flex-row justify-center items-center w-full"> */}
      {/* <div className="flex flex-col"> */}
      {location.pathname === "/" && <HeroSection setOpen={setOpen} />}
      {/* {location.pathname === "/" && <ScrollingReviews />} */}
      {/* </div> */}
      <div className="flex flex-col items-center w-full">
        {location.pathname === "/" && <TestimonialCarousel />}
        {location.pathname === "/" && <FeaturedImageGallery />}
      </div>
      {/* </div> */}
      <Footer />
    </div>
  );
}
