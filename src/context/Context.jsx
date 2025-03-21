import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

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
    comment: ""
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

export { Context, Provider };
