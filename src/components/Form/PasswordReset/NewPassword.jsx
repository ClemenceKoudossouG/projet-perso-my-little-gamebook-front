import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  setPasswordResetToken,
  SubmitPassword,
} from '../../../Store/UserSlice';

import Notification from '../../Notification';

import {
  showNotification,
  hideNotification,
} from '../../../Store/notificationSlice';

const defaultTheme = createTheme();

export default function NewPasswordSide() {
  // const { token } = useSelector((state) => state.user);
  // const { token } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const resetToken = useSelector((state) => state.user.resetToken);
  const resetError = useSelector((state) => state.user.error);
  const [passwordSaved, setPasswordSaved] = useState(false); // Trace de la sauvegarde du mot de passe
  const notification = useSelector((state) => state.notification);
  const navigate = useNavigate();

  console.log('Token from state:', resetToken);

  useEffect(() => {
    console.log('Component mounted or updated');
    const params = new URLSearchParams(location.search);
    const tokenFromURL = params.get('token');
    console.log('Extracted token from URL:', tokenFromURL);
    if (tokenFromURL) {
      dispatch(setPasswordResetToken(tokenFromURL)); // Stocke le token dans le state
    }
  }, [location, dispatch]);

  const [formValues, setFormValues] = useState({
    password: '',
    confirmNewPassword: '',
    resetToken: '',
  });

  const validatePasswordFormat = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputErrors = {};

    if (!validatePasswordFormat(formValues.password)) {
      inputErrors.passwordMatch =
        'Le mot de passe doit contenir au moins 8 caractères, dont une majuscule et minuscule, 1 chiffre et 1 caractère spécial.';
    }
    // Vérification si passwordConfirmation matche bien avec password
    if (formValues.password !== formValues.confirmNewPassword) {
      // Si ça ne matche pas, message d'erreur
      inputErrors.passwordMatch = 'Les mots de passe ne correspondent pas.';
    }
    if (!formValues.password.trim()) {
      inputErrors.password = 'Oups, tu as oublié ton mot de passe !';
    }
    if (!formValues.confirmNewPassword.trim()) {
      inputErrors.confirmNewPassword =
        "N'oublie pas de confirmer ton mot de passe !";
    }

    setErrors(inputErrors);

    if (Object.keys(inputErrors).length === 0) {
      console.log('Submitting new password > ', formValues.password);
      console.log('Token before submit:', resetToken);
      // Log the URL and data before making the request
      console.log('Request URL:', 'http://localhost:3000/request-password-reset/reset-password');
      console.log('Request data:', {
        password: formValues.password,
        token: resetToken,
      });

      dispatch(SubmitPassword({ password: formValues.password, resetToken }));
      setPasswordSaved(true);
      dispatch({ type: 'SUBMIT_NEW_PASSWORD' });
    }
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (passwordSaved) {
      dispatch(
        showNotification(
          'Mot de passe mis à jour avec succès. Tu vas être être redirigé.e vers la page de connexion.'
        )
      );
      const timer = setTimeout(() => {
        dispatch(hideNotification());
        setPasswordSaved(false);
        navigate('/SignInSide');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [passwordSaved, dispatch, navigate]);

  const renderNotification = () => {
    if (passwordSaved) {
      // eslint-disable-next-line prettier/prettier
      return <Notification message={notification.message} variant={notification.variant} />;
    }
    return null;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/img/bg/fonds_marins.jpg)',
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Nouveau mot de passe
            </Typography>
            {renderNotification()}
            {resetError && (
              <Typography color="error" variant="body2">
                {resetError}
              </Typography>
            )}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Nouveau mot de passe"
                type="password"
                id="password"
                autoComplete="password"
                value={formValues.password}
                onChange={handleChange}
              />
              {errors.passwordMatch && (
                <Typography color="error" variant="body2">
                  {errors.passwordMatch}
                </Typography>
              )}
              {errors.password && (
                <Typography color="error" variant="body2">
                  {errors.password}
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmNewPassword"
                label="Je confirme mon mot de passe"
                type="password"
                id="confirmNewPassword"
                autoComplete="new-password"
                value={formValues.confirmNewPassword}
                onChange={handleChange}
              />
              {errors.confirmNewPassword && (
                <Typography color="error" variant="body2">
                  {errors.confirmNewPassword}
                </Typography>
              )}
              <input type="hidden" name="resetToken" value={resetToken} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Valider
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
