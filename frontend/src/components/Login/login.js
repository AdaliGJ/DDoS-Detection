import React, {useState} from 'react';
import './login.css'
//import NavBar from '../NavBar/navBar';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Alert, InputAdornment } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import {Avatar} from '@mui/material';
//import '../../../public'

import axios from 'axios'




function Login(props) {


axios.defaults.xsrfCookieName = 'crsftoken';
axios.defaults.xsrfHeaderName = 'X-CSRDToken';
axios.defaults.withCredentials = true;


const [campoVacio, setCampoVacio] = useState(false);
const [error, setError] = useState(false);

    

 const client = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    if (data.get("email")==='' || data.get("password")==='') {
      setCampoVacio(true);
    } else {
      setCampoVacio(false);

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
        setError(false);
        props.setSession(true);
        window.location.reload(false);
    }).catch((res)=>{
        console.log(res);
        setError(true);
    });
    }
    
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
            <img className='logo' src={process.env.PUBLIC_URL + '/icon2.png'} />
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
            {campoVacio?<Alert id="campoVacio" severity="error">Por favor llena todos los campos</Alert>:null}
            {error?<Alert id="campoVacio" severity="error">Usuario o Contraseña incorrectos</Alert>:null}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 5, mb: 2 }}
                id = "loginButton"
            >
                Iniciar Sesión
            </Button>
            </Box>
        </Box>
        </Container>
    </div>
  );
}

export default Login;