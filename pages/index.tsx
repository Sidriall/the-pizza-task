import React from 'react';
import ProductCard from 'components/other/ProductCard';
import { Box, Grid } from '@material-ui/core';
import { GetStaticProps } from 'next';
import { samplePizzaData } from 'utils/sample-data';
import { IPizza } from 'interfaces';

type Props = {
  data: IPizza[];
};

export const getStaticProps: GetStaticProps = async () => {
  // simulate downloading data from the server
  try {
    return { props: { data: samplePizzaData } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};

const IndexPage = ({ data }: Props) => (
  <Box margin={5}>
    <Grid container spacing={2}>
      {data.map(({ id, name, description, price }: IPizza) => (
        <Grid item key={id} xs={12} sm={3}>
          <ProductCard
            id={id}
            name={name}
            description={description}
            price={price}
          />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default IndexPage;
