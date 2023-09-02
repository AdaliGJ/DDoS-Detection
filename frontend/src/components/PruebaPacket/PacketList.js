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
//import './dataTable.css';
import NewUser from '../NewUsers/newUsers';
import { Typography } from '@mui/material';

function PacketList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [paquetes, setPaquetes] = useState([]);
  const [totalPackets, setTotalPackets] = useState(0);

  const client = axios.create({
    baseURL: 'http://127.0.0.1:8000',
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 3));
    setPage(0);
  };

  const fetchPackets = async () => {
    try {
      const response = await client.get('/packets/all');
      if (response.data.paquetes) {
        setPaquetes(response.data.paquetes);
        setTotalPackets(response.data.paquetes.length);
        //console.log(response.data.paquetes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const startLongPolling = async () => {
    while (true) {
      await fetchPackets();
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
    }
  };

  useEffect(() => {
    startLongPolling(); 
  }, []);

  return (
    <div className="packet-container">
      <Paper className="table-container2" sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table
            className="tabla-packet"
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              borderRadius: '15px',
              overflow: 'hidden',
            }}
          >
            <TableHead>
              <TableRow>
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
              {paquetes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((paquete) => {
                  return (
                    <TableRow key={paquete.id}>
                      <TableCell align="right">{paquete.id}</TableCell>
                      <TableCell align="right">{paquete.ip_source}</TableCell>
                      <TableCell align="right">{paquete.ip_destination}</TableCell>
                      <TableCell align="right">{paquete.destination_port}</TableCell>
                      <TableCell align="right">{paquete.protocol}</TableCell>
                      <TableCell align="right" id={paquete.classification == "Normal" ? "norm" : "attack"}>{paquete.classification}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[3]}
          component="div"
          count={totalPackets}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default PacketList;

