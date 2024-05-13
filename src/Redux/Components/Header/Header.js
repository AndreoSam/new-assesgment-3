import React, { useEffect, useState } from 'react'
import "./Header.css"
import { useDispatch } from 'react-redux'
// import { Button } from 'react-bootstrap'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser, userProfile } from '../Reducer/mediaSlice';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Header = () => {
  const [img, setImg] = useState("")
  const [state, setState] = useState("")
  const dispatch = useDispatch()

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(userProfile())
      .then((res) => {
        // console.log(res.payload.data[0]);
        setImg(res.payload.data[0].image)
        setState(res.payload.data[0])
      })
  }, [dispatch])
  const navigate = useNavigate();

  //logout
  const handleLogout = () => {
    dispatch(logoutUser())
      .then((res) => {
        navigate("/")
      })
      .catch((err) => { console.log(err); })
  }

  return (
    <div className='header_css'>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: "row", width: "100%", alignItems: 'center' }}>
              <Typography variant="h6" noWrap component="div">
                <Link to={"/view"} style={{ textDecoration: "none", color: "white" }}>
                  Home
                </Link>
              </Typography>
              <Typography variant="h6" noWrap component="div">
                Welcome Mr.{state.name}
              </Typography>
              <div>
                <PopupState variant="popover" popupId="demo-popup-menu">
                  {(popupState) => (
                    <React.Fragment>
                      <Link variant="contained" style={{ color: "white", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }} {...bindTrigger(popupState)}>
                        <img src={`https://webskitters-student.onrender.com/${img}`} style={{ height: "30px", borderRadius: "20px" }} />
                        <div>
                          Profile
                        </div>
                      </Link>
                      <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={popupState.close}>
                          <Link to={"/user/dashboard"} style={{ textDecoration: "none" }}>
                            My Profile
                          </Link>
                        </MenuItem>
                        {/* <MenuItem onClick={popupState.close}>
                  <Link to={"/user/dashboard"} style={{ textDecoration: "none" }}>
                    Logout
                  </Link>
                </MenuItem> */}
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem>
              <Link className='header_left_list' to={"/view"}>
                All Items
              </Link>
            </ListItem>
            <Divider />
            <ListItem>
              <Link className='header_left_list' to={"/user"}>
                All Users
              </Link>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </div>
  )
}

export default Header