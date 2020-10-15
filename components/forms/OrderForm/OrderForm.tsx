import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  CircularProgress,
  FormGroup,
  Grid,
  Paper,
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart, resetCart } from 'store/slices/cartSlice';
import { IState } from 'interfaces';
import { useCurrentUser } from 'hooks/useUser';
import useStyles from './OrderForm.styles';
import { IOrderForm } from './types';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  surname: Yup.string().required('Surname is required'),
  address: Yup.string().required('Address is required'),
});

const initialValues: IOrderForm = {
  name: '',
  surname: '',
  address: '',
};

const OrderForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [user] = useCurrentUser();

  const cart: IState = useSelector(selectCart);

  const handleSubmit = async (values: IOrderForm): Promise<void> => {
    const body = {
      // eslint-disable-next-line no-underscore-dangle
      userId: (user && user._id) || null,
      name: values.name,
      surname: values.surname,
      address: values.address,
      details: cart,
    };
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.status === 201) {
      dispatch(resetCart());
      await res.json();
    } else {
      // TODO
      console.error('error');
    }
  };

  return (
    <Paper className={classes.paper}>
      <Formik<IOrderForm>
        validateOnMount
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {(props) => (
          <Form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormGroup>
                  <Field
                    label="Name"
                    name="name"
                    type="text"
                    component={TextField}
                    fullWidth
                    variant="outlined"
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormGroup>
                  <Field
                    label="Surname"
                    name="surname"
                    type="text"
                    component={TextField}
                    fullWidth
                    variant="outlined"
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12}>
                <FormGroup>
                  <Field
                    label="Address"
                    name="address"
                    type="text"
                    component={TextField}
                    fullWidth
                    variant="outlined"
                  />
                </FormGroup>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={
                !cart.totalQuantity || !props.isValid || props.isSubmitting
              }
              className={classes.submit}
            >
              Submit
              {props.isSubmitting && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default OrderForm;
