import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    { id: 'Imatge', label: 'Imatge', minWidth: 100 },
    { id: 'Producte', label: 'Producte', minWidth: 100 },
    { id: 'Data', label: 'Data', minWidth: 100 },
    { id: 'Preu', label: 'Preu', minWidth: 100 },
    { id: 'Estat', label: 'Estat', minWidth: 100 }
    // {
    //   id: 'population',
    //   label: 'Population',
    //   minWidth: 170,
    //   align: 'right',
    //   format: (value) => value.toLocaleString('en-US'),
    // }
];

function createData(Imatge, Producte, Data, Preu, Estat) {
    const Reclamar = 'True'; //Aqui va una funcion que detecta si la data fi esta superada y ofrece la renovacion
    return { Imatge, Producte, Data, Preu, Estat, Reclamar };
}

const rows = [
    createData('_', 'Samarreta Negre', '00/00/0000', '25€', 'Entregat'),
    createData('_', 'Tote Bag', '00/00/0000', '10€', 'Entregat'),
    createData('_', 'EP Not On Earth', '00/00/0000', '20€', 'Pendent'),

];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function Compres() {
    const classes = useStyles();
    // const [page, setPage] = React.useState(0);
    // const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // const handleChangePage = (event, newPage) => {
    //   setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event) => {
    //   setRowsPerPage(+event.target.value);
    //   setPage(0);
    // };

    return (
        <Paper className={classes.root} component="span">
            <TableContainer className={classes.container} component="span">
                <Table stickyHeader aria-label="sticky table" component="span">
                    <TableHead component="span">
                        <TableRow component="span">
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }
                                    } component="span"
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody component="span">
                        {/* {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => { */}
                        {rows.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.Producte} component="span">
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align} component="span">
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      /> */}
        </Paper>
    );
}
