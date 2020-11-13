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
    { id: 'Soci', label: 'Nº Soci', minWidth: 100 },
    { id: 'Nom', label: 'Nom', minWidth: 100 },
    { id: 'Cognoms', label: 'Cognoms', minWidth: 100 },
    { id: 'DataI', label: 'Data Inici', minWidth: 100 },
    { id: 'DataF', label: 'Data Fi', minWidth: 100 },
    { id: 'Permisos', label: 'Permisos', minWidth: 100 },
    { id: 'Estat', label: 'Estat', minWidth: 100 }
    // {
    //   id: 'population',
    //   label: 'Population',
    //   minWidth: 170,
    //   align: 'right',
    //   format: (value) => value.toLocaleString('en-US'),
    // }
];

function createData(Soci, Nom, Cognoms, DataI, DataF, Permisos, Estat) {
    // const Reclamar = 'True'; //Aqui va una funcion que detecta si la data fi esta superada y ofrece la renovacion
    return { Soci, Nom, Cognoms, DataI, DataF, Permisos, Estat };
}

const rows = [
    createData('01123', 'Manel', 'Sanchez', '00/00/0000', '00/00/0000', '_', 'Soci'),
    createData('01125', 'Homer', 'Simpson', '00/00/0000', '00/00/0000', '_', 'Soci'),
    createData('00012', 'Pablo', 'Casado', '00/00/0000', '00/00/0000', '_', 'Baixa'),
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function Socis() {
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
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.Soci} component="span">
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
