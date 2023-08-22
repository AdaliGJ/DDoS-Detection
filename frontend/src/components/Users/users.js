import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './users.css'

import NewUser from '../NewUsers/newUsers';
import { Typography } from '@mui/material';





function Users() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const client = axios.create({
    baseURL: 'http://127.0.0.1:8000',
  });

  function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    };
    return dateTime.toLocaleString('es-ES', options);
  }


  const [usuarios, setUsuarios] = useState([])
  const [totalUsers, setTotalUsers] = useState(0);
  //const [date, setDate] = useState(formatDateTime('2023-06-26T19:14:51.883333Z'));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  useEffect(() => {
    client.get('/api/allUsers')
      .then(function (res) {
        setUsuarios(res.data.users)
        setTotalUsers(res.data.users.length);
        console.log(res.data.users);
      })
      .catch(function (error) {
        
        console.log(error);
      });

      //console.log(date)
  }, []);

  return (
    <div className="users-container">
      <div className="form-container">
        <NewUser />
      </div>
      <Paper className="table-container" sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Typography component="h1" variant="h5">
              Usuarios del Sistema
          </Typography>
          <Table >
            <TableHead>
              <TableRow id="header">
                  <TableCell
                    align={'center'}
                    className="table-header"
                    style={{ top: 57, minWidth: 'fit-content' }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    align={'center'}
                    className="table-header"
                    style={{ top: 57, minWidth: 'fit-content' }}
                  >
                    Usuario
                  </TableCell>
                  <TableCell
                    align={'center'}
                    className="table-header"
                    style={{ top: 57, minWidth: 'fit-content' }}
                  >
                    Correo
                  </TableCell>
                  <TableCell
                    align={'center'}
                    className="table-header"
                    style={{ top: 57, minWidth: 'fit-content' }}
                  >
                    Último Inicio de Sesión
                  </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((usuario) => {
                  return (
                    <TableRow key={usuario.user_id}>
                      <TableCell align="right">{usuario.user_id}</TableCell>
                      <TableCell align="right">{usuario.username}</TableCell>
                      <TableCell align="right">{usuario.email}</TableCell>
                      <TableCell align="right">{usuario.last_login?formatDateTime(usuario.last_login):"Nunca"}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={totalUsers}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default Users;