import { createStyles, makeStyles } from '@material-ui/core';
import { Theme } from 'theme';

export default makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      boxShadow: 'none',
      borderBottom: `1px solid ${theme.additionalPalette.border}`,
      height: theme.mixins.toolbar.height,
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);
