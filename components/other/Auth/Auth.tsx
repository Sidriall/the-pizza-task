import React from 'react';
import { Avatar, Box, Container, Typography } from '@material-ui/core';
import LocalPizzaIcon from '@material-ui/icons/LocalPizza';
import UserForm from 'components/forms/UserForm';
import Link from '../Link/Link';
import useStyles from './Auth.styles';

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="https://github.com/Sidriall">
      Kirill Chistiakov
    </Link>
    {` ${new Date().getFullYear()}.`}
  </Typography>
);

// TODO any
const Auth = ({ isNewUser = false, onSubmit }: any) => {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LocalPizzaIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isNewUser ? 'Sign up' : 'Log in'}
        </Typography>
        <UserForm onSubmit={onSubmit} isNewUser={isNewUser} />
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Auth;
