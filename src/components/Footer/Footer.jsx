import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useTheme } from '@mui/material/styles';

export default function Footer() {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <BottomNavigation showLabels>
        <BottomNavigationAction label=" À propos" />
        <BottomNavigationAction label="Contact" />
      </BottomNavigation>
    </Box>
  );
}
