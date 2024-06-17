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
import { SubmitEmail } from '../../../Store/UserSlice';

import Notification from '../../Notification';

import {
  showNotification,
  hideNotification,
} from '../../../Store/notificationSlice';

const defaultTheme = createTheme();

export default function UserEmailSide() {
  const [emailSent, setEmailSent] = useState(false); // Trace de l'envoi de l'email
  const resetEmailError = useSelector((state) => state.user.error);
  const notification = useSelector((state) => state.notification);

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: '',
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
    dispatch(SubmitEmail({ email: formValues.email }));
    setEmailSent(true);
    dispatch({ type: 'SUBMIT_EMAIL' });
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (emailSent && !resetEmailError) {
      dispatch(
        showNotification('Un email de réinitialisation vous a été envoyé.')
      );
      const timer = setTimeout(() => {
        dispatch(hideNotification());
        setEmailSent(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [emailSent, resetEmailError, dispatch]);

  const renderNotification = () => {
    if (emailSent && !resetEmailError) {
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
              Email utilisateur
            </Typography>
            {renderNotification()}
            {resetEmailError && (
              <Typography color="error" variant="body2">
                {resetEmailError}
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
                name="email"
                label="Email utilisateur"
                type="email"
                id="email"
                autoComplete="current-email"
                value={formValues.email}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Recevoir un email de réinitialisation
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
