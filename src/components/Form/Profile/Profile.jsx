import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
// import Snackbar from '@mui/material/Snackbar';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@mui/material';
import Notification from '../../Notification';

import {
  showNotification,
  hideNotification,
} from '../../../Store/notificationSlice';

import {
  PatchProfile,
  handleProfileEditionError,
  checkLoggedIn,
  clearError,
} from '../../../Store/UserSlice';

// Create styled components using the styled API
const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const avatars = [
  {
    id: 1,
    value: 'et1',
    label: 'Avatar 1',
    alt: 'Avatar 1',
    src: '/img/profile/et1.png',
  },
  {
    id: 2,
    value: 'et2',
    label: 'Avatar 2',
    alt: 'Avatar 2',
    src: '/img/profile/et2.png',
  },
  {
    id: 3,
    value: 'et3',
    label: 'Avatar 3',
    alt: 'Avatar 3',
    src: '/img/profile/et3.png',
  },
  {
    id: 4,
    value: 'et4',
    label: 'Avatar 4',
    alt: 'Avatar 4',
    src: '/img/profile/et4.png',
  },
  {
    id: 5,
    value: 'et5',
    label: 'Avatar 5',
    alt: 'Avatar 5',
    src: '/img/profile/et5.png',
  },
];

export default function Profile() {
  const dispatch = useDispatch();
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isModified, setIsModified] = useState(false); // On garde une trace des modifications
  const [avatarClicked, setAvatarClicked] = useState(false); // On garde une trace du clic sur l'avatar
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(checkLoggedIn());
  }, [dispatch]);

  useEffect(() => {
    // On enlève l'éventuel message d'erreur login résiduel.
    dispatch(handleProfileEditionError(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Condition - formulaire éditable si on est loggé
  // const logged = useSelector((state) => state.user.logged);
  const navigate = useNavigate();
  const loginError = useSelector((state) => state.user.error);
  const [errors, setErrors] = useState({});
  // récupération & modifications du state
  const user = useSelector((state) => state.user);
  console.log(user);
  const [formValues, setFormValues] = useState({
    alias: user.alias || '',
    avatar: user.avatar || '',
  });

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    if (userFromLocalStorage) {
      setFormValues(userFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    // Define a function to check whether the form is modified and an avatar is clicked
    const checkFormModification = () => {
      // Check if either form is modified, avatar is clicked, or alias is modified
      if (isModified || avatarClicked) {
        // If modified or avatar clicked or alias modified, show the "Enregistrer mon profil" button
        setIsModified(false);
      }
    };
    // On appelle la fonction checkFormModification si isModified ou avatarClicked changent
    checkFormModification();
  }, [isModified, avatarClicked]);

  // Radio group AVATAR
  const [selectedValue, setSelectedValue] = React.useState(user.avatar);
  const handleAvatarChange = (event) => {
    event.preventDefault();
    setSelectedValue(event.target.value);
    setAvatarClicked(true); // état "cliqué" de l'avatar
    setIsModified(true); // State modifié = true
    console.log('avatar >', event.target.value);
  };
  // Modifications des inputs + spread operator
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log('Form element > ', name);
    console.log('Valeur >', value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setIsModified(true); // State modifié = true
  };
  // Bouton MODIFIER
  const handleModifyClick = () => {
    setIsReadOnly(false);
  };
  useEffect(() => {
    if (isModified) {
      // On évite le déclenchement de la notification de succès au clic sur le bouton modifier
      setIsModified(false);
    }
  }, [isModified]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputErrors = {};
    // Message d'erreur si le champ alias est vide.
    if (!formValues.alias.trim()) {
      inputErrors.alias = "N'oublie pas ton pseudo !";
    }
    setErrors(inputErrors);
    if (Object.keys(inputErrors).length > 0) {
      console.error('Erreurs de modification: ', errors);
      return; // S'il y a des erreurs, on ne fait rien et on return dès maintenant pour ne pas poursuivre la soumission du formulaire.
    }
    console.log('Patch profile > ', {
      ...formValues,
      avatar: selectedValue,
    });
    const updatedProfile = {
      ...formValues,
      avatar: selectedValue,
      alias: formValues.alias.trim(),
    };
    await dispatch(PatchProfile(updatedProfile));
    dispatch({ type: 'PATCH_PROFILE' });
    localStorage.setItem('user', JSON.stringify(formValues));
    if (isModified && !loginError) {
      dispatch(
        showNotification({
          message: 'Profil bien enregistré !',
          type: 'success',
        })
      );
      // Masquer la notification après quelques secondes
      setTimeout(() => {
        dispatch(hideNotification());
      }, 5000); //  = 5 secondes
    }
  };

  useEffect(() => {
    if (loginError) {
      dispatch(showNotification({ message: loginError, type: 'error' }));
      dispatch(clearError()); // Retirer toute trace d'erreur.
      setIsModified(false);
    }
    const timer = setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
    return () => clearTimeout(timer);
  }, [loginError, dispatch]);

  // Fonction d'affichage de la notification après sauvegarde du profil.
  const renderNotification = () => {
    if (notification.message) {
      // eslint-disable-next-line prettier/prettier
      return <Notification message={notification.message} type={notification.type} />;
    }
    return null;
  };
  // Supprimer le compte
  // On ouvre la modale de confirmation avec le bouton supprimer mon profil
  const handleDeleteButtonClick = () => {
    setShowConfirmationModal(true);
  };

  // On gère la fermerture de la modale de confirmation
  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  // On gère la suppression du profil avec la modale de confirmation
  const handleDeleteProfile = () => {
    // Dispatch de l'action delete
    dispatch({ type: 'DELETE_PROFILE' });
    // Fermeture de la modale de confirmation
    setShowConfirmationModal(false);
    // Redirection vers la page d'accueil logged out
    navigate('/SignInSide');
  };
  return (
    <StyledContainer>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(public/img/bg/village.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar
              sx={{ m: 1 }}
              src={`../../public/img/profile/${user.avatar}.png`}
            />

            <Typography component="h1" variant="h5">
              Mon profil
              {/* Affichage de la notification après sauvegarde du profil. */}
              {renderNotification()}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <StyledTextField
                margin="normal"
                required
                fullWidth
                id="alias"
                label="alias"
                name="alias"
                autoComplete="alias"
                autoFocus
                value={formValues.alias}
                onChange={handleChange}
                InputProps={{
                  readOnly: isReadOnly,
                  sx: {
                    '& input': {
                      cursor: isReadOnly ? 'default' : 'text', // Style par défaut si non éditable
                      backgroundColor: isReadOnly ? 'inherit' : '#ffffcc', // Couleur de fond si éditable
                    },
                  },
                }}
              />
              {errors.alias && (
                <p style={{ color: 'red', fontSize: 'small' }}>
                  {errors.alias}
                </p>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={formValues.email}
                onChange={handleChange}
                InputProps={{
                  readOnly: isReadOnly,
                  sx: {
                    '& input': {
                      cursor: isReadOnly ? 'default' : 'text',
                      backgroundColor: isReadOnly ? 'inherit' : '#ffffcc',
                    },
                  },
                }}
              />
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Avatar
                </FormLabel>
              </FormControl>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                {avatars.map((avatar) => (
                  <Radio
                    key={avatar.id} // Unique key for each radio button
                    checked={selectedValue === avatar.value}
                    onChange={handleAvatarChange}
                    value={avatar.value}
                    name="avatar"
                    inputProps={{ 'aria-label': avatar.label }}
                  />
                ))}
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                {avatars.map((avatar) => (
                  <Avatar key={avatar.id} alt={avatar.alt} src={avatar.src} />
                ))}
              </Stack>
              {/* {loginError && (
                <Typography variant="body2" color="error">
                  {loginError}
                </Typography>
              )} */}
              <StyledButton
                type="modify"
                color="primary"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
                onClick={handleModifyClick}
              >
                Modifier mon profil
              </StyledButton>
              {isModified && ( // Le bouton enregistrer ne s'affiche qu'en cas de modification du profil
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 0.5, mb: 2 }}
                  // onClick={handleSubmit}: fonction handleSubmit appelée plus aut dans le form, onSubmit. Evite l'affichage de la notification au clic sur le bouton.
                >
                  Enregistrer mon profil
                </Button>
              )}
              <Button
                variant="contained"
                fullWidth
                onClick={handleDeleteButtonClick}
              >
                Supprimer mon profil
              </Button>
              {/* Modale de confirmation de suppression du profil */}
              <Modal
                open={showConfirmationModal}
                onClose={handleCloseConfirmationModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: 'absolute',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Es-tu certain(e) de vouloir supprimer ton profil ?
                  </Typography>
                  <Button onClick={handleDeleteProfile}>Oui !</Button>
                  <Button onClick={handleCloseConfirmationModal}>Non !</Button>
                </Box>
              </Modal>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}
