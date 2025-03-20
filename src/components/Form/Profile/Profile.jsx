import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  Radio,
  FormControl,
  FormLabel,
  Stack,
  Modal,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Notification from '../../Notification';
import {
  showNotification,
  hideNotification,
} from '../../../Store/notificationSlice';
import {
  PatchProfile,
  handleProfileEditionError,
  checkLoggedIn,
} from '../../../Store/UserSlice';

// Styled components
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
  const navigate = useNavigate();
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);

  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isModified, setIsModified] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    alias: user.alias || '',
    email: user.email || '',
    avatar: user.avatar || '',
  });
  const [selectedValue, setSelectedValue] = useState(user.avatar);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setFormValues({
        alias: storedUser.alias || '',
        email: storedUser.email || '',
        avatar: storedUser.avatar || '',
      });
      setSelectedValue(storedUser.avatar);
    }
    dispatch(checkLoggedIn());
  }, [dispatch]);

  useEffect(() => {
    dispatch(handleProfileEditionError(null));
  }, [dispatch]);

  const handleAvatarChange = (event) => {
    setSelectedValue(event.target.value);
    setIsModified(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setIsModified(true);
  };

  const handleModifyClick = () => {
    setIsReadOnly(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputErrors = {};
    if (!formValues.alias.trim()) {
      inputErrors.alias = "N'oublie pas ton pseudo !";
    }
    setErrors(inputErrors);
    if (Object.keys(inputErrors).length > 0) {
      return;
    }

    const updatedProfile = {
      ...formValues,
      avatar: selectedValue,
      alias: formValues.alias.trim(),
    };
    await dispatch(PatchProfile(updatedProfile));
    dispatch({ type: 'PATCH_PROFILE' });

    setIsModified(false);
    localStorage.setItem('user', JSON.stringify(updatedProfile));
    dispatch(
      showNotification({
        message: 'Profil bien enregistré !',
        type: 'success',
      })
    );
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };

  const handleDeleteButtonClick = () => {
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleDeleteProfile = () => {
    dispatch({ type: 'DELETE_PROFILE' });
    setShowConfirmationModal(false);
    navigate('/SignInSide');
  };

  const renderNotification = () => {
    if (notification.message) {
      return (
        <Notification message={notification.message} type={notification.type} />
      );
    }
    return null;
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
            backgroundImage: 'url(/img/bg/village.jpg)',
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
            <Avatar sx={{ m: 1 }} src={`/img/profile/${user.avatar}.png`} />
            <Typography component="h1" variant="h5">
              Mon profil
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
                label="Alias"
                name="alias"
                value={formValues.alias}
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
              <StyledTextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
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
              {errors.email && (
                <Typography color="error" variant="body2">
                  {errors.email}
                </Typography>
              )}
              {errors.alias && (
                <Typography color="error" variant="body2">
                  {errors.alias}
                </Typography>
              )}
              <FormControl>
                <FormLabel>Avatar</FormLabel>
              </FormControl>
              <Stack direction="row" spacing={2}>
                {avatars.map((avatar) => (
                  <Radio
                    key={avatar.id}
                    checked={selectedValue === avatar.value}
                    onChange={handleAvatarChange}
                    value={avatar.value}
                    name="avatar"
                    inputProps={{ 'aria-label': avatar.label }}
                  />
                ))}
              </Stack>
              <Stack direction="row" spacing={2}>
                {avatars.map((avatar) => (
                  <Avatar key={avatar.id} alt={avatar.alt} src={avatar.src} />
                ))}
              </Stack>
              <StyledButton
                type="button"
                color="primary"
                fullWidth
                variant="contained"
                onClick={handleModifyClick}
              >
                Modifier mon profil
              </StyledButton>
              {isModified && (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  Enregistrer mon profil
                </Button>
              )}
              <Button
                variant="contained"
                fullWidth
                color="error"
                onClick={handleDeleteButtonClick}
                sx={{ mt: 2 }}
              >
                Supprimer mon profil
              </Button>
              <Modal
                open={showConfirmationModal}
                onClose={handleCloseConfirmationModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
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
                  <Typography id="modal-title" variant="h6">
                    Es-tu certain(e) de vouloir supprimer ton profil ?
                  </Typography>
                  <Button onClick={handleDeleteProfile} sx={{ mt: 2 }}>
                    Oui
                  </Button>
                  <Button onClick={handleCloseConfirmationModal} sx={{ mt: 2 }}>
                    Non
                  </Button>
                </Box>
              </Modal>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}
