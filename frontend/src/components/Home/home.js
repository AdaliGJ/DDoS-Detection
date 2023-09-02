// Home.js
import React from 'react';
import axios from 'axios';

import './home.css'


import Grid from '@mui/material/Grid';
import DataTable from '../DataTable/dataTable';
import Button from '@mui/material/Button';
import PacketList from '../PruebaPacket/PacketList';
import TrafficChart from '../Chart/chart';


function Home(props) {

    axios.defaults.xsrfCookieName = 'crsftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRDToken';
    axios.defaults.withCredentials = true;
    

 /*const client = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true
  });*/


  

  return (
    <div className="home">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <div className='side'>
            <img alt="Logo" className='logo2' src={process.env.PUBLIC_URL + '/icon.png'} />
            <div className='buttonSniff'>
              <Button id="buttonStart">Iniciar Captura</Button>
            </div>
            <div className='buttonSniff'>
              <Button id="buttonStop">Detener Captura</Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={9}>
          <Grid item xs={12}>
            <div className='graphs'>
              <TrafficChart/>
            </div>
          </Grid>
        <Grid item xs={12}>
          <div className='graphs'>
            <PacketList/>
          </div>
        </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
