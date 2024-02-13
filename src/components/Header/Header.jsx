import './Header.scss';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { handleLogOut } from '@/Store/UserSlice';
import store from '@/Store/index';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function ButtonAppBar() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const logged = useSelector((state) => state.user.logged);

  const handleClickLogOut = () => {
    dispatch(handleLogOut());
  };

  // useEffect(() => {
  //  console.log('render header');
  //  const Logged = store.getState().user.logged;
  // }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: theme.palette.primary.main }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <Link to="/">
              <MenuBookRoundedIcon />
            </Link>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Little GameBook
          </Typography>
          {!logged && (
            <>
              <Button color="inherit">
                <Link to="SignInSide">Sign In</Link>
              </Button>
              <Button color="inherit">
                <Link to="SignUpSide">Sign Up</Link>
              </Button>
            </>
          )}
          {logged && (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
              >
                <Link to="/">
                  <AccountCircleIcon />
                </Link>
              </IconButton>
              <Button onClick={handleClickLogOut} color="inherit">
                Log Out
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
