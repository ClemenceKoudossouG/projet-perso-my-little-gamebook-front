import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Game2.scss';

function Game2() {
  const place = useSelector((state) => state.place.place);

  return (
    <div className="image-container">
      <div className={`image-container ${place ? place : ''}`}>
        <img src="/public/img/home/home-01.png" alt="PNJ" />

        <div className="content-container">
          <div className="textbox">
            <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
              Vous êtes sur {place} que faites vous ?{' '}
            </Typography>
          </div>

          <div>
            <Button variant="contained" size="large">
              Action 1
            </Button>
            <Button variant="contained" size="large">
              Action 2
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game2;
