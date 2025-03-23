import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const Context = React.createContext();

function Provider({ children }) {
  const [user, setUser] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [appointment, setAppointment] = useState({
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

  const history = useHistory();

  // useEffect(() => {
  //   fetch("/api/me")
  //     .then(r => r.json())
  //     .then(data => {
  //       if (data.error) {
  //         history.push("/")
  //       }
  //       else {
  //         setUser(data)
  //       }
  //     })
  // }, [])

  useEffect(() => {
    if (services.length === 0) {
      fetch(
        "https://booking-app.us-east-1.elasticbeanstalk.com/service-provider/api/v1/services",
      )
        .then((res) => res.json())
        .then((data) => setServices(data))
        .catch((err) => console.error("Error fetching services:", err));
    }
  }, [services.length]);

  const logout = () => {
    fetch("/api/logout", {
      method: "DELETE",
    }).then(() => {
      setUser(false);
      history.push("/");
    });
  };

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        services,
        setServices,
        selectedService,
        setSelectedService,
        appointment,
        setAppointment,
        logout,
      }}
    >
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Context, Provider };
