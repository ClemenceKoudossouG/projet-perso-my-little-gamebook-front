import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './VisitorHomePage.scss';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import IconButton from '@mui/material/IconButton';
import { getCompartment, loadCompartment } from '@/Store/compartmentSlice';
import { getAllStories } from '@/Store/StoriesSlice.js';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: 'url("public/img/bg/ile.jpg")',
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    padding: theme.spacing(4),
  },
  title: {
    color: '#fff',
    margin: theme.spacing(4, 0),
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  },
  button: {
    margin: theme.spacing(1),
    minWidth: '200px',
  },
}));

function LandingPage() {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logged = useSelector((state) => state.user.logged);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const dispatch = useDispatch();

  const handleClickButtonCompartment = () => {
    // Reducer qui charge le state avec l'id dont on a besoin pour charger nos données
    dispatch(getCompartment(1));
    // Appel de l'action.type qui va déclencher le switch du middleware Story
    dispatch({ type: 'FETCH_COMPARTMENT' });
  };
  const handleClickButtonStories = () => {
    // Reducer qui charge le state avec l'id dont on a besoin pour charger nos données
    dispatch(getAllStories());
    // Appel de l'action.type qui va déclencher le switch du middleware Story
    dispatch({ type: 'FETCH_STORIES' });
  };
  return (
    <div className={classes.root}>
      <div className="overlay" />

      <Container>
        <Typography variant="h1" className={classes.title}>
          My Little GameBook
        </Typography>
        {!logged ? (
          <div>
            <Link to="/SignInSide">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Se connecter
              </Button>
            </Link>

            <Link to="/SignUpSide">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                S'inscrire
              </Button>
            </Link>
          </div>
        ) : (
          <div
            style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
                onClick={handleClickButtonStories}
              >
                <Link to="/stories">
                  <PlayCircleFilledWhiteIcon
                    className="icon"
                    sx={{ fontSize: 100 }}
                  />
                </Link>
              </IconButton>
              <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                Voir les histoires
              </Typography>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
                onClick={handleClickButtonCompartment}
              >
                <Link to="/gameDynamic">
                  <PlayCircleFilledWhiteIcon
                    className="icon"
                    sx={{ fontSize: 100 }}
                  />
                </Link>
              </IconButton>
              <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                Jouer une histoire
              </Typography>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default LandingPage;
