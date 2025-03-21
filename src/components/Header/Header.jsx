import './Header.scss';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { handleLogOut, checkLoggedIn } from '@/Store/UserSlice';

export default function ButtonAppBar() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    dispatch(checkLoggedIn());
  }, [dispatch]);

  const logged = useSelector((state) => state.user.logged);
  const user = useSelector((state) => state.user);

  const handleClickLogOut = () => {
    dispatch(handleLogOut());
    navigate('/');
    setMobileOpen(false);
  };

  const toggleDrawer = (open) => () => {
    setMobileOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: theme.palette.primary.main }}>
        <Toolbar>
          {/* Mobile Menu Button */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: 'block', md: 'none' } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ display: { xs: 'none', md: 'block' }, mr: 2 }}
          >
            <Link to="/" className="icon-link">
              <MenuBookRoundedIcon />
            </Link>
          </IconButton>

          {/* Title */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: { xs: 'center', md: 'left' },
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            My Little GameBook
          </Typography>

          {/* Avatar & Logout Button (Hidden on mobile) */}
          {logged && (
            <>
              <Link to="/profile">
                <Avatar
                  className="profile-avatar"
                  src={`/img/profile/${user.avatar}.png`}
                />
              </Link>
              <Button
                onClick={handleClickLogOut}
                color="inherit"
                className="logout-button"
              >
                Déconnexion
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer(false)}
        classes={{ paper: 'drawer-paper' }}
      >
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          className="drawer-list"
        >
          <List>
            <ListItem button component={Link} to="/">
              <ListItemText primary="Accueil" />
            </ListItem>
            {logged && (
              <>
                <ListItem button component={Link} to="/stories">
                  <ListItemText primary="Histoires" />
                </ListItem>
                <ListItem button component={Link} to="/profile">
                  <ListItemText primary="Profil" />
                </ListItem>
                <ListItem button onClick={handleClickLogOut}>
                  <ListItemText primary="Déconnexion" />
                </ListItem>
              </>
            )}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </Box>
  );
}
