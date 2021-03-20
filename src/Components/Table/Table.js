import React, {useEffect, useState} from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import "./Table.css"


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700
    },
});


function TableCustom(props) {
    const [state, setData] = useState(props.state);
    const [currentRow, setCurrentRow] = useState(null);
    const [amount, setAmount] = useState(0)

    const classes = useStyles();

    useEffect(() => {
        setData(props.state)

    }, [props]);

    useEffect(() => {
        let result = 0;
        for (let i = 0; i < state.length; i++) {
            if (state[i].sign === '+') result = result + state[i].amount;
            else result = result - state[i].amount;
        }
        setAmount(result);
    }, [state.length]);


    function dragStartHandler(event, row) {
        let rowIndex = event.target.id;
        setCurrentRow({
            rowValue: row,
            rowIndex: rowIndex
        })
    }

    function dragLeaveHandler(event) {
        // event.target.style.background = 'red'
    }

    function dragOverHandler(event) {
        event.preventDefault()
    }

    function dropHandler(event, row) {
        event.preventDefault();
        let list = state;
        let currentIndex = list.indexOf(row);
        let transmittedIndex = currentRow.rowIndex;
        list[transmittedIndex] = list[currentIndex];
        list[currentIndex] = currentRow.rowValue;
        setData([...list])
    }


    function deleteDrop(event) {
        event.preventDefault();
        let index = currentRow.rowIndex;
        let list1 = state;
        list1.splice(index, 1);
        setData([...list1]);
        event.target.style.background = 'white'
    }

    function deleteOver(event) {
        event.preventDefault();
        event.target.style.background = 'red'

    }

    function deleteLeaveHandler(event) {
        event.target.style.background = 'white'
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>DocType</StyledTableCell>
                        <StyledTableCell align="right">CompanyID</StyledTableCell>
                        <StyledTableCell align="right">Date</StyledTableCell>
                        <StyledTableCell align="right">DocID</StyledTableCell>
                        <StyledTableCell align="right">Sign</StyledTableCell>
                        <StyledTableCell align="right">Amount</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.map((row, index) => (
                        <StyledTableRow
                            id={index}
                            onDragStart={(event => dragStartHandler(event, row))}
                            onDragLeave={event => dragLeaveHandler(event)}
                            onDragOver={event => dragOverHandler(event)}
                            onDrop={event => dropHandler(event, row)}
                            draggable={true}
                            key={row.docId}>
                            <StyledTableCell component="th" scope="row">  {row.docType}  </StyledTableCell>
                            <StyledTableCell align="right">{row.companyID}</StyledTableCell>
                            <StyledTableCell align="right">{row.date}</StyledTableCell>
                            <StyledTableCell align="right">{row.docId}</StyledTableCell>
                            <StyledTableCell align="right">{row.sign}</StyledTableCell>
                            <StyledTableCell align="right">{row.amount}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            <div
                onDrop={(event) => deleteDrop(event)}
                onDragOver={event => deleteOver(event)}
                onDragLeave={event => deleteLeaveHandler(event)}
                className={"delete"}
            >drag here to delete...
            </div>
            <div className={"totalAmount"}>Total Amount {amount}</div>
        </TableContainer>
    )
}

export default TableCustom;

