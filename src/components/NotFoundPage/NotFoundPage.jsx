import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: `url(public/img/bg/cabine.jpg)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));

function NotFoundPage() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h3" component="h1">
        404 - Page Not Found
      </Typography>
      <Typography variant="h5" component="h2">
        Désolé, la page que vous cherchez n'existe pas.
      </Typography>
    </Container>
  );
}

export default NotFoundPage;
