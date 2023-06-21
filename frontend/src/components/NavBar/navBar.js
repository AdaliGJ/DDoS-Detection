import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import './navBar.css'



function NavBar() {


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
          <ButtonGroup variant="contained" id="appbar_button">
            <Button class="navButton">Inicio</Button>
            <Button class="navButton" >Usuarios</Button>
            <Button class="navButton">Registro</Button>
            <Button class="navButton" >
                <MeetingRoomIcon/>
            </Button >
        </ButtonGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default NavBar;

