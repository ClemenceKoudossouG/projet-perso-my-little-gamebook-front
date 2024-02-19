import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SubmitNewUser } from '@/Store/UserSlice';
import Stack from '@mui/material/Stack';

const defaultTheme = createTheme();

export default function Profile() {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    alias: '',
  });

  // Radio group
  const [selectedValue, setSelectedValue] = React.useState('a');
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  /* const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);

    setFormValues({
      ...formValues,
      [name]: value,
    });
  }; 
  */

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    dispatch(SubmitNewUser(formValues));
    dispatch({ type: 'SUBMIT_NEWUSER' });
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <ManageAccountsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Profile
            </Typography>
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
                <Radio
                  checked={selectedValue === 'a'}
                  onChange={handleChange}
                  value="a"
                  name="radio-buttons"
                  inputProps={{ 'aria-label': 'A' }}
                />
                <Radio
                  checked={selectedValue === 'b'}
                  onChange={handleChange}
                  value="b"
                  name="radio-buttons"
                  inputProps={{ 'aria-label': 'B' }}
                />
                <Radio
                  checked={selectedValue === 'c'}
                  onChange={handleChange}
                  value="c"
                  name="radio-buttons"
                  inputProps={{ 'aria-label': 'C' }}
                />
                <Radio
                  checked={selectedValue === 'd'}
                  onChange={handleChange}
                  value="d"
                  name="radio-buttons"
                  inputProps={{ 'aria-label': 'D' }}
                />
                <Radio
                  checked={selectedValue === 'e'}
                  onChange={handleChange}
                  value="e"
                  name="radio-buttons"
                  inputProps={{ 'aria-label': 'E' }}
                />
              </Stack>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <Avatar alt="Remy Sharp" src="public/img/profile/et1.png" />
                <Avatar alt="Travis Howard" src="public/img/profile/et2.png" />
                <Avatar alt="Cindy Baker" src="public/img/profile/et3.png" />
                <Avatar alt="Cindy Baker" src="public/img/profile/et4.png" />
                <Avatar alt="Cindy Baker" src="public/img/profile/et5.png" />
              </Stack>

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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
