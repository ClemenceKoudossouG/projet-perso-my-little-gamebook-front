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
import { useSelector, useDispatch } from 'react-redux';
import { PatchProfile, getUser } from '@/Store/UserSlice';
// import { useHistory } from 'react-router-dom';

import Stack from '@mui/material/Stack';

const defaultTheme = createTheme();

export default function Profile() {
  const logged = useSelector((state) => state.user.logged);
  const user = useSelector((state) => state.user);

  const [formValues, setFormValues] = useState({
    email: user.email || '',
    password: user.password || '',
    firstname: user.firstname || '',
    lastname: user.lastname || '',
    alias: user.alias || '',
    avatar: user.avatar || '',
  });

  const getDataUser = () => {
    const dispatch = useDispatch();
    const { dataUser } = user;

    console.log('GET data user >', user.firstname);
    dispatch(getData(dataUser));
    dispatch({ type: 'GET_PROFILE' });
  };

  const dataUser = () => {
    const { userData } = user;
    console.log('Get data user', userData);
  };

  const dispatch = useDispatch();

  // Radio group AVATAR
  const [selectedValue, setSelectedValue] = React.useState('a');
  const handleAvatarChange = (event) => {
    event.preventDefault();
    setSelectedValue(event.target.value);
    console.log(event.target.value);

    const { name, value } = event.target;
    // Radio group

    setSelectedValue({
      ...selectedValue,
      [name]: value,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Patch profile baby!!', formValues);
    dispatch(PatchProfile(formValues));
    dispatch({ type: 'PATCH_PROFILE' });
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
            {!logged && (
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <ManageAccountsIcon />
              </Avatar>
            )}
            {logged && (
              <Avatar sx={{ m: 1 }} src="../../public/img/profile/et3.png" />
            )}
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
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    name="firstname"
                    autoComplete={user.firstname}
                    value={user.firstname}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    autoComplete={user.lastname}
                    value={user.lastname}
                    InputProps={{
                      readOnly: true,
                    }}
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
                autoComplete={user.alias}
                autoFocus
                value={user.alias}
                // onChange={handleChange}
                InputProps={{
                  readOnly: true,
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
                <Radio
                  checked={selectedValue === 'et1'}
                  onChange={handleAvatarChange}
                  value="et1"
                  name="radio-buttons"
                  inputProps={{ 'aria-label': 'A' }}
                />
                <Radio
                  checked={selectedValue === 'et2'}
                  onChange={handleAvatarChange}
                  value="et2"
                  name="radio-buttons"
                  inputProps={{ 'aria-label': 'B' }}
                />
                <Radio
                  checked={selectedValue === 'et3'}
                  onChange={handleAvatarChange}
                  value="et3"
                  name="radio-buttons"
                  inputProps={{ 'aria-label': 'C' }}
                />
                <Radio
                  checked={selectedValue === 'et4'}
                  onChange={handleAvatarChange}
                  value="et4"
                  name="radio-buttons"
                  inputProps={{ 'aria-label': 'D' }}
                />
                <Radio
                  checked={selectedValue === 'et5'}
                  onChange={handleAvatarChange}
                  value="et5"
                  name="radio-buttons"
                  inputProps={{ 'aria-label': 'E' }}
                />
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
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
                color="primary"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
              >
                Modifier
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 0.5, mb: 2 }}
              >
                Enregistrer
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}