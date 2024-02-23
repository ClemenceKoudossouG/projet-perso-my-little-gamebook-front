import './Game2.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCompartment,
  loadCompartment,
  getCompartmentBeginning,
} from '@/Store/compartmentSlice';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Game2() {
  const dispatch = useDispatch();
  const compartment = useSelector((state) => state.compartment);
  const { compartmentData } = compartment;

  // Vérifier si la classe du compartiment est une fin ou un bonus de fin
  const ending =
    compartmentData.class === 'ending' ||
    compartmentData.class === 'bonus_ending';

  // Vérifier si le compartiment a une conséquence pour les actions
  const consequence =
    compartmentData.action1_consequence !== '' ||
    compartmentData.action2_consequence !== '';

  // État de la modale de dialogue
  const [open, setOpen] = React.useState(false);

  // Ouvrir la modale
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Fermer la modale
  const handleClose = () => {
    setOpen(false);
  };

  // Gérer le clic sur le premier bouton d'action
  const handleClickButton1 = () => {
    // Reducer qui charge le state avec l'id dont on a besoin pour charger nos données
    dispatch(getCompartment(compartmentData.action1_child)); // Appel de l'action.type qui va déclencher le switch du middleware Story
    dispatch({ type: 'FETCH_COMPARTMENT' });
  };

  // Gérer le clic sur le deuxième bouton d'action
  const handleClickButton2 = () => {
    // Reducer qui charge le state avec l'id dont on a besoin pour charger nos données
    dispatch(getCompartment(compartmentData.action2_child)); // Appel de l'action.type qui va déclencher le switch du middleware Story
    dispatch({ type: 'FETCH_COMPARTMENT' });
    handleClose();
  };

  // Gérer le clic sur le bouton de recommencer
  const handleClickButtonCompartment = () => {
    // Reducer qui charge le state avec l'id dont on a besoin pour charger nos données
    dispatch(getCompartmentBeginning(3)); // Appel de l'action.type qui va déclencher le switch du middleware Story
    dispatch({ type: 'FETCH_COMPARTMENT_BEGINNING' });
    handleClose();
  };

  return (
    <div
      className="image-container"
      style={{
        backgroundImage: `url(/img/bg/${compartmentData.place_img}.jpg)`,
      }}
    >
      <div className="image-container">
        <img
          src={`/img/pnj/${compartmentData.npc_img}.png`}
          alt={compartmentData.npc_img}
          style={{ maxWidth: '100%', height: 'auto' }}
        />

        <div className="content-container">
          <div className="textbox">
            <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
              Tu es {compartmentData.place_label}{' '}
              {compartmentData.npc_label && `avec ${compartmentData.npc_label}`}
              , que fais-tu ?
            </Typography>
          </div>

          {/* Afficher les boutons d'action si ce n'est pas une fin ou une conséquence */}
          {!ending && !consequence && (
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
          )}

          {/* Afficher le dialogue de fin s'il s'agit d'une fin */}
          {ending && (
            <div>
              <div>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleClickOpen}
                >
                  {compartmentData.action1_label}
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleClickOpen}
                >
                  {compartmentData.action2_label}
                </Button>
              </div>

              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">C'est fini !</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {compartmentData.action1_consequence}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Link to="/">
                    <Button onClick={handleClose}>Quitter</Button>
                  </Link>
                  <Button onClick={handleClickButtonCompartment} autoFocus>
                    Recommencer
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          )}

          {/* Afficher le dialogue de conséquence s'il y a une conséquence */}
          {consequence && !ending && (
            <div>
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
                  onClick={handleClickOpen}
                >
                  {compartmentData.action2_label}
                </Button>
              </div>

              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Le {compartmentData.npc_label} te dit :{' '}
                    {compartmentData.action2_consequence}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClickButton2} autoFocus>
                    Continuer
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Game2;
