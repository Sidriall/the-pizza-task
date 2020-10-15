import React, { useEffect } from 'react';
import Head from 'next/head';
import Auth from 'components/other/Auth';
import { FormikHelpers } from 'formik';
import { IUserForm } from 'components/forms/UserForm/types';
import { useRouter } from 'next/router';
import { useCurrentUser } from '../hooks/useUser';

const SignupPage = () => {
  const router = useRouter();
  const [user, { mutate }] = useCurrentUser();

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.push('/');
  }, [user]);

  const handleSubmit = async (
    values: IUserForm,
    { setErrors }: FormikHelpers<any>
  ) => {
    const body = {
      username: values.username,
      password: values.password,
    };
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 201) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
      setErrors({ username: 'Unavailable username' });
    }
  };

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>

      <Auth isNewUser onSubmit={handleSubmit} />
    </>
  );
};

export default SignupPage;
