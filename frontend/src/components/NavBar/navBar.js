import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import './navBar.css'

import axios from 'axios'
import { useState, useEffect } from 'react';




function NavBar() {

const [session, setSession] = useState();

  const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
  });

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
            <Button id="navButton">Inicio</Button>
            <Button id="navButton" >Usuarios</Button>
            <Button id="navButton">Registro</Button>
            <Button id="navButton" >
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

