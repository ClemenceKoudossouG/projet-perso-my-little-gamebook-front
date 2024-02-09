import './Header.scss';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export default function ButtonAppBar() {
  const theme = useTheme();

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
          <Button color="inherit">Sign In</Button>
          <Button color="inherit">
            <Link to="SignUpSide">Sign Up</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
