import { Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import Login from "./Login";
import Signup from "./Signup";
import ClientInfoForm from "./components/ClientInfoForm";
import AppointmentsList from "./components/AppointmentsList";
import Dashboard from "./Dashboard";

import './App.css'

function App() {

  return (
    <>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/login" render={(props) => <Login {...props} />} />
          <Route exact path="/signup" render={(props) => <Signup {...props} />} />
          <Route exact path="/" render={(props) => <Dashboard {...props} />} />
        </Switch>
        </div>
    </>
  )
}

export default App
