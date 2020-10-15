import React from 'react';
import { Box, Paper, TableContainer } from '@material-ui/core';
import CartTable from 'components/other/CartTable';
import OrderForm from 'components/forms/OrderForm';
import { IOrderProps } from 'interfaces';
import { useSelector } from 'react-redux';
import { selectCart } from 'store/slices/cartSlice';

const IndexPage = () => {
  const { items, deliveryCost, total, currency }: IOrderProps = useSelector(
    selectCart
  );

  return (
    <Box margin={5}>
      <TableContainer component={Paper}>
        <CartTable
          isHistory={false}
          items={items}
          deliveryCost={deliveryCost}
          total={total}
          currency={currency}
        />
      </TableContainer>
      <OrderForm />
    </Box>
  );
};

export default IndexPage;
