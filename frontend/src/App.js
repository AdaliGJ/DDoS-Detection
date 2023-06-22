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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.get('/api/user')
      .then(function (res) {
        setSession(true);
        console.log(res);
      })
      .catch(function (error) {
        setSession(false);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null; // Render nothing until the session status is determined
  }

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route
            exact
            path="/home"
            render={(props) =>
              session ? <Home {...props} setSession={setSession} /> : <Redirect to="/login" />
            }
          />
          <Route
            exact
            path="/login"
            render={(props) =>
              !session ? <Login {...props} setSession={setSession} /> : <Redirect to="/home" />
            }
          />
          {/* Add more routes here */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
