import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button, CircularProgress, FormGroup, Grid } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import Link from 'components/other/Link/Link';
import useStyles from './UserForm.styles';
import { IUserForm, IProps } from './types';

const schema = {
  username: Yup.string()
    .required('Login is required')
    .min(3, 'Username must be at least 3 characters'),
  password: Yup.string().required('Enter your password'),
};

const loginSchema = Yup.object().shape({
  ...schema,
});

const signupSchema = Yup.object().shape({
  ...schema,

  confirmPassword: Yup.string()
    .required('Confirm password')
    .oneOf([Yup.ref('password')], 'Password does not match'),
});

const initialValues: IUserForm = {
  username: '',
  password: '',
  confirmPassword: '',
};

const UserForm = ({ onSubmit, isNewUser }: IProps) => {
  const classes = useStyles();
  return (
    <Formik<IUserForm>
      validateOnMount
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={isNewUser ? signupSchema : loginSchema}
    >
      {(props) => (
        <Form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormGroup>
                <Field
                  label="Username"
                  name="username"
                  type="text"
                  component={TextField}
                  fullWidth
                  // value={props.username}
                  variant="outlined"
                  // disabled={props.isSubmitting}
                />
              </FormGroup>
            </Grid>

            <Grid item xs={12}>
              <FormGroup>
                <Field
                  label="Password"
                  name="password"
                  type="password"
                  component={TextField}
                  fullWidth
                  // value={props.password}
                  variant="outlined"
                />
              </FormGroup>
            </Grid>

            {isNewUser && (
              <Grid item xs={12}>
                <FormGroup>
                  <Field
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    component={TextField}
                    fullWidth
                    // value={props.confirmPassword}
                    variant="outlined"
                  />
                </FormGroup>
              </Grid>
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!props.isValid || props.isSubmitting}
            className={classes.submit}
          >
            {isNewUser ? 'Sign Up' : 'Log In'}
            {props.isSubmitting && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              {isNewUser ? (
                <Link href="/login">Already have an account? Sign in</Link>
              ) : (
                <Link href="/signup">Don&#39;t have an account? Sign up</Link>
              )}
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
