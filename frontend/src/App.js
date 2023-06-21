// App.js
import './App.css';
import axios from 'axios';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Login from './components/Login/login';
import NavBar from './components/NavBar/navBar';
import Home from './components/Home/home';

axios.defaults.xsrfCookieName = 'crsftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    client.get('/api/user')
      .then(function (res) {
        setSession(true);
        console.log(res);
      })
      .catch(function (error) {
        setSession(false);
        console.log(error);
      });
  }, []);

  if (session === null) {
    return null; // Render nothing until the session is determined
  }

  return (
    <Router>
      <div className="App">
        <NavBar />
        
          {session ? (
            <Switch>
            <Route exact path="/home" component={Home} />
            <Redirect to="/home" /> 
            </Switch>
          ) : (
            <Switch>
            <Route exact path="/login" render={(props) => <Login {...props} setSession={setSession} />} />
            <Redirect to="/login" /> 
            </Switch>
          )}
         </div>
    </Router>
  );
}

export default App;
