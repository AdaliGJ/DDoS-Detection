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
import './dataTable.css'

import NewUser from '../NewUsers/newUsers';
import { Typography } from '@mui/material';





function DataTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const client = axios.create({
    baseURL: 'http://127.0.0.1:8100',
  });

  function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const options = {
     
    };
    return dateTime.toLocaleString('es-ES', options);
  }


  const [usuarios, setUsuarios] = useState([])
  const [totalUsers, setTotalUsers] = useState(0);
  //const [date, setDate] = useState(formatDateTime('2023-06-26T19:14:51.883333Z'));

  


  useEffect(() => {
    client.get('/packets/all')
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
    <div className="packet-container">
      <Paper className="table-container2" sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table className='tabla-packet'
          style={{
            width: '100%',
            borderCollapse: 'collapse', 
            borderRadius: '15px',        
            overflow: 'hidden'           
          }} >
            <TableHead>
              <TableRow >
                  <TableCell
                    align={'center'}
                    className="table-header"
                    style={{ top: 57, minWidth: 'fit-content', color: 'white' }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    align={'center'}
                    className="table-header"
                    style={{ top: 57, minWidth: 'fit-content', color: 'white' }}
                  >
                    IP Origen
                  </TableCell>
                  <TableCell
                    align={'center'}
                    className="table-header"
                    style={{ top: 57, minWidth: 'fit-content', color: 'white' }}
                  >
                    IP Destino
                  </TableCell>
                  <TableCell
                    align={'center'}
                    className="table-header"
                    style={{ top: 57, minWidth: 'fit-content', color: 'white' }}
                  >
                    Puerto Destino
                  </TableCell>
                  <TableCell
                    align={'center'}
                    className="table-header"
                    style={{ top: 57, minWidth: 'fit-content', color: 'white' }}
                  >
                    Protocolo
                  </TableCell>
                  <TableCell
                    align={'center'}
                    className="table-header"
                    style={{ top: 57, minWidth: 'fit-content', color: 'white' }}
                  >
                    Clasificación
                  </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default DataTable;