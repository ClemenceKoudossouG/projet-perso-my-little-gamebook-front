import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Footer() {
  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation showLabels>
        <BottomNavigationAction label=" À propos" />
        <BottomNavigationAction label="Contact" />
      </BottomNavigation>
    </Box>
  );
}
