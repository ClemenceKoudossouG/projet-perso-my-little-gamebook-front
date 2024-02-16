import './Game2.scss';
import { useSelector } from 'react-redux';
import { getCompartment, loadCompartment } from '@/Store/compartmentSlice';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Game2() {
  const compartment = useSelector((state) => state.compartment);
  const { compartmentData } = compartment;
  // console.log(compartment.place_id);
  // console.log(compartment.class);
  // console.log(compartment.story_id);

  return (
    <div
      className="image-container"
      style={{
        backgroundImage: `url(img/${compartmentData.place_img}.jpg)`,
      }}
    >
      <div className="image-container">
        <img src="/public/img/home/home-01.png" alt="PNJ" />

        <div className="content-container">
          <div className="textbox">
            <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
              Vous êtes sur {compartmentData.place_id} que faites vous ?
            </Typography>
          </div>

          <div>
            <Button variant="contained" size="large">
              Action {compartmentData.children}
            </Button>
            <Button variant="contained" size="large">
              Action {compartmentData.class}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game2;
