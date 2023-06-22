import React, {useContext} from 'react';
import './login.css'
import NavBar from '../NavBar/navBar';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { InputAdornment } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

import axios from 'axios'




function Login(props) {


axios.defaults.xsrfCookieName = 'crsftoken';
axios.defaults.xsrfHeaderName = 'X-CSRDToken';
axios.defaults.withCredentials = true;
    

 const client = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    client.post(
        "api/login",
        {
            email: data.get("email"),
            password: data.get("password"),
        }
    ).then(function(res) {
        console.log({
            email: data.get("email"),
            password: data.get("password"),
            res
        });
        props.setSession(true);
        window.location.reload(false);
    }).catch((res)=>{
        console.log(res);
    });;
    
  };

  

  return (
    <div>
        <Container component="main" maxWidth="xs">
        <Box
            sx={{  
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            }}
        >
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                variant="standard"
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{color: 'black'}}>
                        <AccountCircleIcon/>
                      </InputAdornment>
                    ),
                  }}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                variant="standard"
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{color: 'black'}}>
                        <LockIcon/>
                      </InputAdornment>
                    ),
                  }}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 5, mb: 2 }}
                id = "loginButton"
            >
                Log In
            </Button>
            </Box>
        </Box>
        </Container>
    </div>
  );
}

export default Login;