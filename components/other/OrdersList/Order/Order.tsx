import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CartTable from 'components/other/CartTable';
import { Paper, TableContainer } from '@material-ui/core';
import { format } from 'date-fns';

// TODO any
const Order = ({ isHistory, order }: any) => {
  const [open, setOpen] = React.useState(false);

  const { items, deliveryCost, total, currency, totalQuantity } = order.details;

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Paper>
        <ListItem button onClick={handleClick} key={order._id}>
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText
            primary={`${format(new Date(order.createdAt), 'MM.dd.yyyy hh:mm')}
            To: ${order.name} ${order.surname}
            At: ${order.address}`}
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </Paper>
      <Collapse in={open} timeout="auto" unmountOnExit key={order._id}>
        <TableContainer component={Paper}>
          <CartTable
            isHistory={isHistory}
            items={items}
            deliveryCost={deliveryCost}
            total={total}
            currency={currency}
            totalQuantity={totalQuantity}
          />
        </TableContainer>
      </Collapse>
    </>
  );
};

export default Order;
