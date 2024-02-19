import './Game2.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getCompartment, loadCompartment } from '@/Store/compartmentSlice';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Game2() {
  const dispatch = useDispatch();
  const compartment = useSelector((state) => state.compartment);
  const { compartmentData } = compartment;

  const handleClickButton1 = () => {
    // Reducer qui charge le state avec l'id dont on a besoin pour charger nos données
    dispatch(getCompartment(compartmentData.action1_child));
    // Appel de l'action.type qui va déclencher le switch du middleware Story
    dispatch({ type: 'FETCH_COMPARTMENT' });
  };
  const handleClickButton2 = () => {
    // Reducer qui charge le state avec l'id dont on a besoin pour charger nos données
    dispatch(getCompartment(compartmentData.action2_child));
    // Appel de l'action.type qui va déclencher le switch du middleware Story
    dispatch({ type: 'FETCH_COMPARTMENT' });
  };
  return (
    <div
      className="image-container"
      style={{
        backgroundImage: `url(public/img/bg/${compartmentData.place_img}.jpg)`,
      }}
    >
      <div className="image-container">
        <img
          src={`public/img/pnj/${compartmentData.npc_img}.png`}
          alt={compartmentData.npc_img}
        />

        <div className="content-container">
          <div className="textbox">
            <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
              Vous êtes sur {compartmentData.place_label} avec
              {compartmentData.npc_label} que faites vous ?
            </Typography>
          </div>

          <div>
            <Button
              variant="contained"
              size="large"
              onClick={handleClickButton1}
            >
              {compartmentData.action1_label}
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={handleClickButton2}
            >
              {compartmentData.action2_label}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game2;
