// Home.js
import React from 'react';
import axios from 'axios'

function Home(props) {

    axios.defaults.xsrfCookieName = 'crsftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRDToken';
    axios.defaults.withCredentials = true;
    

 /*const client = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true
  });*/


  

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
    </div>
  );
}

export default Home;
