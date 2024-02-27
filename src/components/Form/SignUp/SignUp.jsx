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
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitNewUser } from '@/Store/UserSlice';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function SignUpSide() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginError = useSelector((state) => state.user.error);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    alias: '',
  });

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
    // Vérification si passwordConfirmation matche bien avec password
    if (formValues.password !== formValues.passwordConfirmation) {
      // Si ça ne matche pas, mesage d'erreur
      alert('Veuillez confirmer de nouveau le mot de passe.');
    }
    // Si les champs des inputs sont vides, message d'erreur
    if (!formValues.firstname.trim()) {
      inputErrors.firstname = 'Veuillez indiquer votre prénom';
    }
    if (!formValues.lastname.trim()) {
      inputErrors.lastname = 'Veuillez indiquer votre nom de famille';
    }
    if (!formValues.alias.trim()) {
      inputErrors.alias = 'Veuillez indiquer votre alias';
    }
    if (!formValues.email.trim()) {
      inputErrors.email = 'Veuillez indiquer votre adresse email';
    }
    if (!formValues.password.trim()) {
      inputErrors.password = 'Veuillez indiquer votre mot de passe';
    }
    if (!formValues.passwordConfirmation.trim()) {
      inputErrors.passwordConfirmation =
        'Veuillez confirmer votre mot de passe';
    }
    if (Object.keys(inputErrors).length > 0) {
      console.error('Erreurs de validation: ', inputErrors);
      setErrors(inputErrors);
      return;
    }
    // Si c'est rempli correctement, on envoit au back les données et on "navigate"
    dispatch(SubmitNewUser(formValues));
    dispatch({ type: 'SUBMIT_NEWUSER' });
    navigate('/SignInSide');
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
            backgroundImage: 'url(public/pirate_bateau_voile.jpg)',
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
              Sign Up
            </Typography>
            {loginError && (
              <Typography color="error" variant="body2">
                {loginError}
              </Typography>
            )}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstname"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    autoFocus
                    value={formValues.firstname}
                    onChange={handleChange}
                  />
                  {errors.firstname && (
                    <p style={{ color: 'red', fontSize: 'small' }}>
                      {errors.firstname}
                    </p>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    autoComplete="family-name"
                    value={formValues.lastname}
                    onChange={handleChange}
                  />
                  {errors.lastname && (
                    <p style={{ color: 'red', fontSize: 'small' }}>
                      {errors.lastname}
                    </p>
                  )}
                </Grid>
              </Grid>
              <TextField
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
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formValues.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p style={{ color: 'red', fontSize: 'small' }}>
                  {errors.email}
                </p>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formValues.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p style={{ color: 'red', fontSize: 'small' }}>
                  {errors.password}
                </p>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="passwordConfirmation"
                label="Password confirmation"
                type="password"
                id="passwordConfirmation"
                autoComplete="current-password"
                value={formValues.passwordConfirmation}
                onChange={handleChange}
              />
              {errors.passwordConfirmation && (
                <p style={{ color: 'red', fontSize: 'small' }}>
                  {errors.passwordConfirmation}
                </p>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/SignInSide" variant="body2">
                    Already have an account? Sign in
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
