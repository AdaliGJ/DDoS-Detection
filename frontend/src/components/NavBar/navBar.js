import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { Link } from 'react-router-dom';


import './navBar.css'


import axios from 'axios'
import { useState, useEffect } from 'react';




function NavBar(props) {

const [session, setSession] = useState();


  const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
  });

  const logout = () =>{
    client.post('/api/logout')
    window.location.reload(false);
  }

  const users = () =>{
    window.location.href = '/users';
  }

  const home = () =>{
    window.location.href = '/home';
  }

  useEffect(() => {
    client.get("/api/user")
    .then(function(res) {
      setSession(true);
    })
    .catch(function(error) {
      setSession(false);
    });
  });


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar id="appbar" position="static">
        <Toolbar>
        <Typography
            variant="h6"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Detección DDoS
          </Typography>
          {session?
          <ButtonGroup variant="contained" id="appbar_button">
            <Button id="navButton" onClick={home}>Inicio</Button>
            <Button id="navButton" onClick={users}>Usuarios</Button>
            <Button id="navButton">Registro</Button>
            <Button id="navButton" onClick={logout} >
                <MeetingRoomIcon/>
            </Button >
        </ButtonGroup>:
        null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default NavBar;

