import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { IPizza } from 'interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from 'store/slices/cartSlice';
import { selectCurrency } from 'store/slices/currencySlice';
import { currencySymbols } from 'theme';
import useStyles from './ProductCard.styles';

export default function ProductCard({ id, name, description, price }: IPizza) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const currency = useSelector(selectCurrency);

  const handleAddClick = () => {
    dispatch(addItem({ id, name, description, price, currency }));
  };

  return (
    <Card id={String(id)} className={classes.root}>
      <CardHeader
        title={name}
        subheader={`Price: ${currencySymbols[currency]} ${price[currency]}`}
      />
      <CardMedia
        className={classes.media}
        image={`/pizza/${id}.jpg`}
        title={name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={classes.add}
          onClick={handleAddClick}
          aria-label="add to cart"
        >
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
