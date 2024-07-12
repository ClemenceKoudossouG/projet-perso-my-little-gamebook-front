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
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SubmitLogin } from '../../../Store/UserSlice';
import Notification from '../../Notification';

import {
  showNotification,
  hideNotification,
} from '../../../Store/notificationSlice';

const defaultTheme = createTheme();

export default function SignInSide() {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginError = useSelector((state) => state.user.error);
  const isLogged = useSelector((state) => state.user.logged);
  const notification = useSelector((state) => state.notification);
  const [formValues, setFormValues] = useState({
    alias: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputErrors = {};
    if (!formValues.alias) {
      inputErrors.alias = "N'oublie pas ton pseudo.";
    }
    if (!formValues.password) {
      inputErrors.password = "N'oublie pas ton mot de passe";
    }
    if (Object.keys(inputErrors).length > 0) {
      setErrors(inputErrors);
      return;
    }
    dispatch(SubmitLogin(formValues));
    dispatch({ type: 'SUBMIT_LOGIN' });

    if (loginError) {
      dispatch(showNotification({ message: loginError, type: 'error' }));
      setTimeout(() => {
        dispatch(hideNotification());
      }, 5000);
    }
  };
  // Conditionnelle pour rediriger l'utilisateur uniquement si connecté
  useEffect(() => {
    if (isLogged) {
      navigate('/');
    }
  }, [isLogged, navigate]);

  const renderNotification = () => {
    if (notification.message) {
      // eslint-disable-next-line prettier/prettier
      return <Notification message={notification.message} type={notification.type} />;
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
              Connexion
            </Typography>
            {renderNotification()}
            {/* {loginError && (
              <Typography color="error" variant="body2">
                {loginError}
              </Typography>
            )} */}
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
                id="alias"
                label="Pseudo"
                name="alias"
                autoComplete="alias"
                autoFocus
                value={formValues.alias}
                onChange={handleChange}
              />
              {errors.alias && (
                <Typography color="error" variant="body2">
                  {errors.alias}
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Halte-là, ton mot de passe ?"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formValues.password}
                onChange={handleChange}
              />
              {errors.password && (
                <Typography color="error" variant="body2">
                  {errors.password}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Je me connecte !
              </Button>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Link href="/SignUpSide" variant="body2">
                    Pas encore de compte ? Inscris-toi ici !
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <Link href="/UserEmailSide" variant="body2">
                    Mot de passe oublié ?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
