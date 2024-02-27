import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
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
import {
  PatchProfile,
  getUser,
  handleProfileEditionError,
} from '@/Store/UserSlice';
// import { useHistory } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { makeStyles } from '@material-ui/core/styles';

const defaultTheme = createTheme();

const avatars = [
  {
    id: 1,
    value: 'et1',
    label: 'A',
    src: 'public/img/profile/et1.png',
    alt: 'Avatar 1',
  },
  {
    id: 2,
    value: 'et2',
    label: 'B',
    src: 'public/img/profile/et2.png',
    alt: 'Avatar 2',
  },
  {
    id: 3,
    value: 'et3',
    label: 'C',
    src: 'public/img/profile/et3.png',
    alt: 'Avatar 3',
  },
  {
    id: 4,
    value: 'et4',
    label: 'D',
    src: 'public/img/profile/et4.png',
    alt: 'Avatar 4',
  },
  {
    id: 5,
    value: 'et5',
    label: 'E',
    src: 'public/img/profile/et5.png',
    alt: 'Avatar 5',
  },
];

export default function Profile() {
  // Condition - formulaire éditable si on est loggé
  // const logged = useSelector((state) => state.user.logged);
  const navigate = useNavigate();
  const loginError = useSelector((state) => state.user.error);
  // récupération & modifications du state
  const user = useSelector((state) => state.user);
  console.log(user);
  const [formValues, setFormValues] = useState({
    firstname: user.firstname || '',
    lastname: user.lastname || '',
    alias: user.alias || '',
    avatar: user.avatar || '',
  });

  const dispatch = useDispatch();
  // Radio group AVATAR
  const [selectedValue, setSelectedValue] = React.useState(user.avatar);
  const handleAvatarChange = (event) => {
    event.preventDefault();
    setSelectedValue(event.target.value);
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
  };

  const [errors, setErrors] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
    const inputErrors = {};
    if (!formValues.firstname.trim()) {
      inputErrors.firstname = 'Veuillez indiquer votre prénom';
      handleProfileEditionError();
    }
    if (!formValues.lastname.trim()) {
      inputErrors.lastname = 'Veuillez indiquer votre nom de famille';
    }
    if (!formValues.alias.trim()) {
      inputErrors.alias = 'Veuillez indiquer votre alias';
    }
    setErrors(inputErrors);
    if (Object.keys(errors).length > 0) {
      console.error('Erreurs de modification: ', inputErrors);
      return;
    }
    console.log('Patch profile > ', {
      ...formValues,
      avatar: selectedValue,
    });
    const updatedProfile = {
      ...formValues,
      avatar: selectedValue,
      firstname: formValues.firstname.trim(),
      lastname: formValues.lastname.trim(),
      alias: formValues.alias.trim(),
    };
    dispatch(PatchProfile(updatedProfile));
    dispatch({ type: 'PATCH_PROFILE' });
    // navigate('/');
  };

  // Bouton MODIFIER
  const [isReadOnly, setIsReadOnly] = useState(true);
  const handleModifyClick = () => {
    // const currentAvatar = user.avatar;
    // setFormValues({ ...formValues, avatar: currentAvatar });
    setIsReadOnly(false);
  };

  // Supprimer le compte
  const deleteButton = (event) => {
    event.preventDefault();
    dispatch(getUser());
    dispatch({ type: 'DELETE_PROFILE' });
    navigate('/SignInSide');
  };

  console.log('ERROR PATATE', errors);
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
            <Avatar
              sx={{ m: 1 }}
              src={`../../public/img/profile/${user.avatar}.png`}
            />

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
                    autoComplete="firstname"
                    autoFocus
                    value={formValues.firstname}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        firstname: e.target.value,
                      })
                    }
                    InputProps={{ readOnly: isReadOnly }}
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
                    autoComplete="lastname"
                    autoFocus
                    value={formValues.lastname}
                    onChange={handleChange}
                    InputProps={{ readOnly: isReadOnly }}
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
                InputProps={{ readOnly: isReadOnly }}
              />
              {errors.alias && (
                <p style={{ color: 'red', fontSize: 'small' }}>
                  {errors.alias}
                </p>
              )}
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

              {loginError && (
                <Typography variant="body2" color="error">
                  {loginError}
                </Typography>
              )}
              <Button
                type="modify"
                color="primary"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
                onClick={handleModifyClick}
              >
                Modifier
              </Button>
              <Button
                type="save"
                fullWidth
                variant="contained"
                sx={{ mt: 0.5, mb: 2 }}
                onClick={handleSubmit}
              >
                Enregistrer
              </Button>
              <Button variant="contained" fullWidth onClick={deleteButton}>
                Supprimer
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
