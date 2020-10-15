import React from 'react';
import { Box } from '@material-ui/core';
import OrdersList from 'components/other/OrdersList';
import { useRouter } from 'next/router';
import { useCurrentUser } from '../hooks/useUser';

const OrdersPage = () => {
  const router = useRouter();
  const [user] = useCurrentUser();

  React.useEffect(() => {
    if (!user) router.push('/');
  }, [user]);

  return <Box margin={5}>{user && <OrdersList />}</Box>;
};

export default OrdersPage;
