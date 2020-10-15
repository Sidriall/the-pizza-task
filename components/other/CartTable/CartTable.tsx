import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useDispatch } from 'react-redux';
import { addQuantity, subQuantity } from 'store/slices/cartSlice';
import { IOrderProps } from 'interfaces';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import useStyles from './CartTable.styles';
import { currencySymbols } from 'theme';

const CartTable = ({
  isHistory = false,
  items,
  deliveryCost,
  total,
  currency,
}: IOrderProps) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleAddClick = (id: number) => dispatch(addQuantity({ id }));

  const handleRemoveClick = (id: number) => dispatch(subQuantity({ id }));

  const ccyFormat = (num: number) =>
    `${currencySymbols[currency]} ${num.toFixed(2)}`;

  return (
    // <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="spanning table">
      <TableHead>
        <TableRow>
          <TableCell align="center" colSpan={3}>
            Details
          </TableCell>
          <TableCell align="right">Price</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Desc</TableCell>
          <TableCell align="right">Qty.</TableCell>
          <TableCell align="right">Unit</TableCell>
          <TableCell align="right">Sum</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.name}>
            <TableCell>{item.name}</TableCell>
            <TableCell align="right">
              {!isHistory && (
                <IconButton
                  onClick={() => handleRemoveClick(item.id)}
                  aria-label="add"
                >
                  <RemoveIcon />
                </IconButton>
              )}

              {item.quantity}

              {!isHistory && (
                <IconButton
                  onClick={() => handleAddClick(item.id)}
                  aria-label="add"
                >
                  <AddIcon />
                </IconButton>
              )}
            </TableCell>
            <TableCell align="right">
              {ccyFormat(item.price[currency])}
            </TableCell>
            <TableCell align="right">{ccyFormat(item.totalPrice)}</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell rowSpan={3} />
          <TableCell colSpan={2}>Subtotal</TableCell>
          <TableCell align="right">{ccyFormat(total)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Delivery cost</TableCell>
          <TableCell />
          <TableCell align="right">{ccyFormat(deliveryCost)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell align="right">{ccyFormat(total + deliveryCost)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
    // </TableContainer>
  );
};

export default CartTable;
