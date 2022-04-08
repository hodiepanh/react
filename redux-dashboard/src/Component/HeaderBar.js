import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      marginLeft: 25,
    },
  }));

function HeaderBar() {
    const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0}>
        <Toolbar style = {{backgroundColor: 'beige'}}>
          <Typography variant="h6" className={classes.title}
          style ={{color:'black'}}>
            React with Redux
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default HeaderBar