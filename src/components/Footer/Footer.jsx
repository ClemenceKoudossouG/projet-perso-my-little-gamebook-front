import Box from '@mui/material/Box';
import './Footer.scss';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useTheme } from '@mui/material/styles';

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: theme.palette.primary.main,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        className="footer"
        sx={{ bgcolor: theme.palette.primary.main }}
      >
        <BottomNavigationAction label=" À propos" sx={{ color: 'white' }} />
        <BottomNavigationAction label="Contact" sx={{ color: 'white' }} />
      </BottomNavigation>
    </Box>
  );
}
