import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getAllPurchases} from '../../redux/actions'

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import styled from 'styled-components'
import { Container } from '@mui/system';

function BuyScreens() {
    const dispatch = useDispatch()
    const purchases = useSelector(state => state.allPurchases)
    const [buys, setBuys] = React.useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rowsView , setRows] = React.useState([])
    const rows = []    

    useEffect(() => {
        getAllPurchases().then(res => {
            dispatch(res)
        }
        )
    }
    , [])

    const createData = (purchases, quantity, price, client, payment) =>{
        return { purchases, quantity, price, client, payment };
      }

    useEffect(() => {
        setBuys(purchases)
        buys.forEach(buy => {
            rows.push(createData(buy.name, buy.quantity, buy.price, buy.user, "true"))
            }
        )
        setRows(rows)
    }
    , [purchases])

    const columns = [
        { id: 'purchases', label: 'Compras', minWidth: 170 },
        { id: 'quantity', label: 'Cantidad', minWidth: 100 },
        {
          id: 'price',
          label: 'Importe',
          minWidth: 170,
          align: 'right',
        },
        {
          id: 'client',
          label: 'Cliente',
          minWidth: 170,
          align: 'right',
        },
        {
          id: 'payment',
          label: 'Pago',
          minWidth: 170,
          align: 'right',
        },
      ];
  
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

  return (
    <Container>
        <h1>Compras</h1>
        <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowsView.length !== 0? rowsView.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1}>
                            {columns.map((column) => {
                            const value = row[column.id];
                            return (
                                <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                            );
                            })}
                        </TableRow>
                        );
                    }): <div>No hay compras</div>}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    </Container>
  )
}

export default BuyScreens
