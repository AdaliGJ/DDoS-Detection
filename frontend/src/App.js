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

  const handleSessionChange = (newValue) => {
    setSession(newValue);
  };

  useEffect(() => {
    client.get("/api/user")
    .then(function(res) {
      setSession(true);
      console.log(res);
    })
    .catch(function(error) {
      setSession(false);
      console.log(error);

    });
  }, []);


  return (
    <Router>

      <div className="App">
        
        {session ? 
        <Switch> 
            <Route exact path="/home" 
            render={(props) => <Home {...props} setSession={handleSessionChange} />}/>
            <Redirect path="/" to="/home"></Redirect>
          </Switch>:
          <Switch> 
            <Route exact path="/login"
            render={(props) => <Login {...props} setSession={handleSessionChange} />}/>
            <Redirect path="/" to="/login"></Redirect>
          </Switch>}
      </div>
    </Router>
  );
}

export default App;
