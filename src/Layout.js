import React , { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PeopleIcon from '@material-ui/icons/People';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import SubwayIcon from '@material-ui/icons/Subway';
import CommuteIcon from '@material-ui/icons/Commute';
import { useSelector } from "react-redux";
import Logo from './assets/images/logo.svg';


const drawerWidth = 240;
export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
  },
  menuItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
}));

const Layout = ({children}) => {
  const history = useHistory();
  const [drawerOpen, setDrawerOpen] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const openAccountMenu = Boolean(anchorEl);
  const { account } = useSelector((state) => state.account);

  const handleAccountMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAccountMenu = () => {
    setAnchorEl(null);
  };

  const ToggleDrawer = () => {
    if(drawerOpen){
      setDrawerOpen(false);
    } else {
      setDrawerOpen(true);
    }
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Hidden mdUp>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick = {ToggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Hidden>
          <img src={Logo} alt="Logo" width="150" height="55"/>
          <Typography variant="h6" className={classes.title}>
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="account-menu"
              aria-haspopup="true"
              onClick={handleAccountMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="account-menu"
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
              open={openAccountMenu}
              onClose={handleCloseAccountMenu}
            >
              <MenuItem onClick={() => { handleCloseAccountMenu(); history.push('/')}}>Create Account</MenuItem>
              <MenuItem onClick={() => { handleCloseAccountMenu(); history.push('/view-account')}}>View Account</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Hidden smUp>
        <Drawer
          open={drawerOpen}
          onClose={() => {setDrawerOpen(false)}}
          className={classes.drawer}
          variant="temporary"
          classes={{
            paper: classes.drawerPaper,
          }}
          style={{zIndex: 1099}}
        >
          <div className={classes.toolbar} />
              <MenuItem onClick={() => { setDrawerOpen(false); history.push('/dashboard')}}>
                <div className={classes.menuItemContainer}>
                  <div>
                    <ListItemIcon>
                      <DashboardIcon/>
                    </ListItemIcon>
                  </div>
                  <div>
                    <ListItemText
                      primary="Dashboard"
                    />
                  </div>
                </div>
              </MenuItem>
              <MenuItem onClick={() => { setDrawerOpen(false); history.push('/fleet')}}>
                <div className={classes.menuItemContainer}>
                  <div>
                    <ListItemIcon>
                      <CommuteIcon/>
                    </ListItemIcon>
                  </div>
                  <div>
                    <ListItemText
                      primary="Fleet"
                    />
                  </div>
                </div>
              </MenuItem>
              <MenuItem onClick={() => { setDrawerOpen(false); history.push('/manage-trucks')}}>
                <div className={classes.menuItemContainer}>
                  <div>
                    <ListItemIcon>
                      <LocalShippingIcon/>
                    </ListItemIcon>
                  </div>
                  <div>
                    <ListItemText
                      primary="My Trucks"
                    />
                  </div>
                </div>
              </MenuItem>
              <MenuItem onClick={() => { setDrawerOpen(false); history.push('/manage-trailers')}}>
                <div className={classes.menuItemContainer}>
                  <div>
                    <ListItemIcon>
                      <SubwayIcon/>
                    </ListItemIcon>
                  </div>
                  <div>
                    <ListItemText
                      primary="My Trailers"
                    />
                  </div>
                </div>
              </MenuItem>
              <MenuItem onClick={() => { setDrawerOpen(false); history.push('/manage-drivers')}}>
                <div className={classes.menuItemContainer}>
                  <div>
                    <ListItemIcon>
                      <PeopleIcon/>
                    </ListItemIcon>
                  </div>
                  <div>
                    <ListItemText
                      primary="My Drivers"
                    />
                  </div>
                </div>
              </MenuItem>
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
            paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar} />
              <MenuItem onClick={() => { setDrawerOpen(false); history.push('/dashboard')}}>
                <div className={classes.menuItemContainer}>
                  <div>
                    <ListItemIcon component="div">
                      <DashboardIcon/>
                    </ListItemIcon>
                  </div>
                  <div>
                    <ListItemText
                      primary="Dashboard"
                    />
                  </div>
                </div>
              </MenuItem>
              <MenuItem onClick={() => { setDrawerOpen(false); history.push('/fleet')}}>
                <div className={classes.menuItemContainer}>
                  <div>
                    <ListItemIcon>
                      <CommuteIcon/>
                    </ListItemIcon>
                  </div>
                  <div>
                    <ListItemText
                      primary="Fleet"
                    />
                  </div>
                </div>
              </MenuItem>
              <MenuItem onClick={() => { setDrawerOpen(false); history.push('/manage-trucks')}}>
                <div className={classes.menuItemContainer}>
                  <div>
                    <ListItemIcon>
                      <LocalShippingIcon/>
                    </ListItemIcon>
                  </div>
                  <div>
                    <ListItemText
                      primary="My Trucks"
                    />
                  </div>
                </div>
              </MenuItem>
              <MenuItem onClick={() => { setDrawerOpen(false); history.push('/manage-trailers')}}>
                <div className={classes.menuItemContainer}>
                  <div>
                    <ListItemIcon>
                      <SubwayIcon/>
                    </ListItemIcon>
                  </div>
                  <div>
                    <ListItemText
                      primary="My Trailers"
                    />
                  </div>
                </div>
              </MenuItem>
              <MenuItem onClick={() => { setDrawerOpen(false); history.push('/manage-drivers')}}>
                <div className={classes.menuItemContainer}>
                  <div>
                    <ListItemIcon>
                      <PeopleIcon/>
                    </ListItemIcon>
                  </div>
                  <div>
                    <ListItemText
                      primary="My Drivers"
                    />
                  </div>
                </div>
              </MenuItem>
        </Drawer>
      </Hidden>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

export default Layout