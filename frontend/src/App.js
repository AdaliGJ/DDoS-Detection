import './App.css';
import axios from 'axios'
import {Route, BrowserRouter as Router, Switch, Link, Redirect} from "react-router-dom";
import { useState, useEffect } from 'react';

import Home from './components/Home/home';
import Login from './components/Login/login';
import NavBar from './components/NavBar/navBar';


axios.defaults.xsrfCookieName = 'crsftoken';
axios.defaults.xsrfHeaderName = 'X-CSRDToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});


function App() {

  const [session, setSession] = useState();

  useEffect(() => {
    client.get("/api/user")
    .then(function(res) {
      setSession(true);
    })
    .catch(function(error) {
      setSession(false);
    });
  }, []);


  return (
    <Router>

      <div className="App">
        
        {session ? 
        <Switch> 
            <Route exact path="/home" component={Home}/>
            <Redirect path="/" to="/home"></Redirect>
          </Switch>:
          <Switch> 
            <Route exact path="/login" component={Home}/>
            <Redirect path="/" to="/login"></Redirect>
          </Switch>}
      </div>
    </Router>
  );
}

export default App;
