import { makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { Theme } from 'theme';

export default makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));
