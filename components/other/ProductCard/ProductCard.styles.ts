import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  add: {
    marginLeft: 'auto',
  },
}));
