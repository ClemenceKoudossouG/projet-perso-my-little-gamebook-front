import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleSuccessfulContact,
  SubmitContact,
  clearContactError,
} from '../../Store/contactPageSlice';

import Notification from '../Notification';

import {
  showNotification,
  hideNotification,
} from '../../Store/notificationSlice';

const defaultTheme = createTheme();

export default function Contact() {
  const dispatch = useDispatch();
  const contactError = useSelector((state) => state.contactPage.error);
  const [isSent, setIsSent] = useState(false);
  const notification = useSelector((state) => state.notification);

  const [formValues, setFormValues] = useState({
    email: '',
    name: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const [errors, setErrors] = useState({});

  // eslint-disable-next-line consistent-return
  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputErrors = {};

    if (!formValues.email.trim()) {
      inputErrors.email = "N'oublie pas de renseigner ton email !";
    }

    if (!formValues.name.trim()) {
      inputErrors.name = "N'oublie pas de renseigner ton nom !";
    }

    if (!formValues.message.trim()) {
      inputErrors.message = "N'oublie pas ton message !";
    }

    setErrors(inputErrors);
    if (Object.keys(inputErrors).length === 0) {
      console.log('Contact Info > ', {
        ...formValues,
      });

      await dispatch(SubmitContact(formValues));
      dispatch({ type: 'SUBMIT_CONTACT' });
      if (!contactError) {
        setIsSent(true);
      }
      dispatch(
        showNotification({
          message: 'Message bien envoyé ! Nous vous répondrons au plus vite.',
          type: 'success',
        })
      );
      const timer = setTimeout(() => {
        dispatch(hideNotification());
        setIsSent(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    if (contactError) {
      dispatch(showNotification({ message: contactError, type: 'error' }));
      setIsSent(false);
      dispatch(clearContactError()); // Retirer toute trace d'erreur.
    }
    const timer = setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
    return () => clearTimeout(timer);
  }, [contactError, dispatch]);

  const renderNotification = () => {
    if (notification.message) {
      // eslint-disable-next-line prettier/prettier
      return <Notification message={notification.message} type={notification.type} />;
    }
    return null;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="background">
        <Container
          component="main"
          maxWidth="m"
          sx={{
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Une remarque ou une question ? Raconte-nous tout !{' '}
              {renderNotification()}
              {/* {contactError && (
                <Typography color="error" variant="body2">
                  {contactError}
                </Typography>
              )} */}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label="nom"
                type="name"
                id="name"
                autoComplete="name"
                value={formValues.name}
                onChange={handleChange}
              />
              {errors.name && (
                <Typography color="error" variant="body2">
                  {errors.name}
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="email"
                name="email"
                autoComplete="email"
                value={formValues.email}
                onChange={handleChange}
              />
              {errors.email && (
                <Typography color="error" variant="body2">
                  {errors.email}
                </Typography>
              )}
              <TextField
                margin="normal"
                fullWidth
                required
                name="message"
                id="outlined-textarea"
                label="message"
                placeholder="message"
                multiline
                value={formValues.message}
                onChange={handleChange}
              />
              {errors.message && (
                <Typography color="error" variant="body2">
                  {errors.message}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Envoyer
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}
