import React from 'react';
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import Link from 'components/other/Link';
import Logo from 'svg/Logo';
import { useCurrentUser } from 'hooks/useUser';
import {
  AccountCircle,
  ShoppingCart,
  AttachMoney,
  EuroSymbol,
} from '@material-ui/icons';
import { IState } from 'interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart, setCurrency } from 'store/slices/cartSlice';
import { selectCurrency, switchCurrency } from 'store/slices/currencySlice';
import { useRouter } from 'next/router';
import useStyles from './Header.styles';

const Header = () => {
  const [user, { mutate }] = useCurrentUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency);

  const handleLogout = async () => {
    handleClose();
    await fetch('/api/auth', {
      method: 'DELETE',
    });
    await mutate(null);
    router.push('/');
  };

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // TODO any and better way to switch
  const handleCurrencySwitch = (e: any) => {
    let newCurrency;
    if (e.currentTarget.value === 'us') {
      newCurrency = 'eu';
    } else {
      newCurrency = 'us';
    }
    dispatch(switchCurrency(newCurrency));
    dispatch(setCurrency(newCurrency));
  };

  const { totalQuantity }: IState = useSelector(selectCart);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Link href="/">
          <Logo />
        </Link>
        <Typography variant="h6" className={classes.title}>
          <Link href="/">The Pizza Task</Link>
        </Typography>

        <Tooltip title="Change currency">
          <IconButton
            aria-label="Currency"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleCurrencySwitch}
            color="inherit"
            value={currency}
          >
            {currency === 'us' ? <AttachMoney /> : <EuroSymbol />}
          </IconButton>
        </Tooltip>

        <Tooltip title="Your cart">
          <Link href="/cart" color="inherit">
            <IconButton aria-label="Cart">
              <Badge badgeContent={totalQuantity} color="primary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Link>
        </Tooltip>

        {!user ? (
          <>
            <Link href="/signup">
              <Button color="inherit">Sign Up</Button>
            </Link>
            <Link href="/login">
              <Button color="inherit">Login</Button>
            </Link>
          </>
        ) : (
          <div>
            <Tooltip title="Profile">
              <IconButton
                aria-label="Account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <Link href="/orders" color="textPrimary">
                <MenuItem onClick={handleClose}>History</MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
