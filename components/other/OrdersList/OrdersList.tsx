import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import { LinearProgress } from '@material-ui/core';
import useStyles from './OrdersList.styles';
import Order from './Order';

const OrdersList = () => {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getData = async () => {
    const res = await fetch('/api/orders', {
      method: 'GET',
    });

    setData((await res.json()).data);
    setIsLoading(false);
  };

  React.useEffect(() => {
    if (isLoading) {
      getData().then();
    }
  }, []);

  return (
    <List
      component="nav"
      aria-labelledby="orders-list-subheader"
      subheader={
        <ListSubheader component="div" id="orders-list">
          Your orders
        </ListSubheader>
      }
      className={classes.root}
    >
      {isLoading ? (
        <LinearProgress />
      ) : (
        // TODO any
        data.map((order: any) => (
          <Order key={order._id} isHistory order={order} />
        ))
      )}
    </List>
  );
};

export default OrdersList;
