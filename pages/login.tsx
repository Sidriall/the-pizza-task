import React, { useEffect } from 'react';
import Head from 'next/head';
import Auth from 'components/other/Auth';
import { useCurrentUser } from 'hooks/useUser';
import { useRouter } from 'next/router';
import { IUserForm } from 'components/forms/UserForm/types';

const LoginPage = () => {
  const router = useRouter();
  const [user, { mutate }] = useCurrentUser();
  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.push('/');
  }, [user]);

  const handleSubmit = async (values: IUserForm): Promise<void> => {
    const body = {
      username: values.username,
      password: values.password,
    };
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
      // TODO
      console.log('Incorrect username or password. Try again!');
      // setErrorMsg('Incorrect username or password. Try again!');
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Auth onSubmit={handleSubmit} />
    </>
  );
};

export default LoginPage;
