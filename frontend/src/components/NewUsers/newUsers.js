import React, {useState} from 'react';
import './newUsers.css'
//import NavBar from '../NavBar/navBar';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Alert, InputAdornment } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import MailIcon from '@mui/icons-material/Mail';


import axios from 'axios'




function NewUser(props) {


axios.defaults.xsrfCookieName = 'crsftoken';
axios.defaults.xsrfHeaderName = 'X-CSRDToken';
axios.defaults.withCredentials = true;


const [campoVacio, setCampoVacio] = useState(false);
const [error, setError] = useState(false);
const [shortPasword, setShortPassword] = useState(false);

    

 const client = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: false       
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    if (data.get("email")==='' || data.get("password")==='' || data.get("user")=='') {
      setCampoVacio(true);
      setShortPassword(false);
      console.log(event.currentTarget);

    } else if(data.get("password").length < 10){
      setCampoVacio(false);
      setShortPassword(true);
      console.log(event.currentTarget.email);
    }
    else {
      setCampoVacio(false);
      setShortPassword(false);
      client.post(
        "api/signup",
        {
            email: data.get("email"),
            password: data.get("password"),
            username: data.get("user"), 
        }
    ).then(function(res) {
        console.log({
            email: data.get("email"),
            password: data.get("password"),
            res
        });
        setError(false);
        //props.setSession(true);
        //window.location.reload(false);
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
                Registro Usuarios
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="user"
                label="Usuario"
                name="user"
                autoComplete="user"
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
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                variant="standard"
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{color: 'black'}}>
                        <MailIcon/>
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
            {error?<Alert id="campoVacio" severity="error">Este usuario ya existe</Alert>:null}
            {shortPasword?<Alert id="campoVacio" severity="error">La contraseña debe contener al menos 10 caracteres</Alert>:null}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 5, mb: 2 }}
                id = "loginButton"
            >
                Registrar Usuario
            </Button>
            </Box>
        </Box>
        </Container>
    </div>
  );
}

export default NewUser;