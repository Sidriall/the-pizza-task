import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'theme';
import { Provider } from 'react-redux';
import store from 'store';
import Header from 'components/interface/Header';
import { Container, CssBaseline } from '@material-ui/core';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  // maxWidth="xs"
  return (
    <>
      <Head>
        <title>The Pizza Task</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Header />
          <Container component="main">
            <Component {...pageProps} />
          </Container>
        </Provider>
      </ThemeProvider>
    </>
  );
}
