// Home.js
import React from 'react';
import axios from 'axios';

import './home.css'


import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

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
            <img className='logo2' src={process.env.PUBLIC_URL + '/icon.png'} />
          </div>
        </Grid>
        <Grid item xs={9}>
          <Grid item xs={12}>
            <div className='graphs'>Hey</div>
          </Grid>
        <Grid item xs={12}>
          <div className='graphs'>Hey</div>
        </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
