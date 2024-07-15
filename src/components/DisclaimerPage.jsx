import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundImage: `url(public/img/bg/foret_sombre.jpg)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    overflowY: 'scroll',
    paddingTop: '100vh',
    paddingBottom: '10vh',
  },
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '800px',
  },
  text: {
    color: '#ffffff',
    marginBottom: '16px',
  },
  link: {
    color: '#add8e6',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

function DisclaimerPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Typography variant="h3" component="h1" className={classes.text}>
          Mentions légales
        </Typography>
        <Typography variant="h5" component="h2" className={classes.text}>
          Clause de non-responsabilité et politique de confidentialité
        </Typography>
        <Typography variant="body1" component="p" className={classes.text}>
          <strong>1. Introduction</strong>
          <br />
          Bienvenue sur <i>My Little Gamebook</i> !<br />
          <br />
          En utilisant notre application, vous acceptez les termes et conditions
          suivants. Veuillez les lire attentivement. Si vous n'acceptez pas ces
          termes, veuillez ne pas utiliser notre application.
        </Typography>
        <Typography variant="body1" component="p" className={classes.text}>
          <strong>2. Informations sur le compte utilisateur</strong><br />
          Lorsque vous créez un compte avec <i>My Little Gamebook</i>, nous 
          collectons les informations suivantes :<br />
          <br />
          <ul>
            <li>Adresse e-mail</li>
            <li>Alias</li>
            <li>Mot de passe</li>
          </ul>
          <strong>Utilisation des données</strong>
          <br />
          <ul>
            <li>
              <strong>Adresse e-mail</strong> : Utilisée pour la vérification de
              compte, la récupération de mot de passe et la communication
              concernant votre compte.
            </li>
            <li>
              <strong>Alias</strong> : Utilisé comme identifiant public dans
              l'application.
            </li>
            <li>
              <strong>Mot de passe</strong> : Stocké de manière sécurisée en
              utilisant des techniques de cryptage standard de l'industrie.
            </li>
          </ul>
        </Typography>
        <Typography variant="body1" component="p" className={classes.text}>
          <strong>3. Jetons JWT</strong>
          <br />
          Nous utilisons des jetons JWT (JSON Web Tokens) à des fins
          d'authentification. Les jetons JWT sont utilisés pour vérifier votre
          identité et maintenir votre session de connexion sans utiliser de
          cookies.
        </Typography>
        <Typography variant="body1" component="p" className={classes.text}>
          <strong>4. Stockage des données</strong>
          <br />
          Toutes les informations utilisateur sont stockées de manière sécurisée
          dans notre base de données PostgreSQL. Nous prenons des mesures
          appropriées pour protéger vos données contre tout accès non autorisé,
          altération, divulgation ou destruction.
        </Typography>
        <Typography variant="body1" component="p" className={classes.text}>
          <strong>5. Images tierces</strong>
          <br />
          Notre application utilise des images gratuites provenant de Freepik
          (https://www.freepik.com). Nous respectons leurs directives
          d'utilisation et attribuons correctement les crédits lorsque
          nécessaire.
        </Typography>
        <Typography variant="body1" component="p" className={classes.text}>
          <strong>6. Conduite de l'utilisateur</strong>
          <br />
          En utilisant <i>My Little Gamebook</i>, vous acceptez de :<br />
          <br />
          <ul>
            <li>
              Fournir des informations exactes lors de la création du compte.
            </li>
            <li>
              Maintenir la confidentialité de votre mot de passe et de votre 
              compte.
            </li>
            <li>
              Ne pas vous engager dans une activité pouvant nuire à
              l'application ou à ses utilisateurs.
            </li>
          </ul>
        </Typography>
        <Typography variant="body1" component="p" className={classes.text}>
          <strong>7. Limitation de responsabilité</strong>
          <br />
          <i>My Little Gamebook</i> est fourni "tel quel" et "selon
          disponibilité" sans aucune garantie, expresse ou implicite. Nous ne
          garantissons pas que l'application sera exempte d'erreurs ou
          ininterrompue.
        </Typography>
        <Typography variant="body1" component="p" className={classes.text}>
          <strong>
            8. Modifications de la clause de non-responsabilité et de la
            politique de confidentialité
          </strong>
          <br />
          Nous nous réservons le droit de mettre à jour ou de modifier cette
          clause de non-responsabilité et cette politique de confidentialité à
          tout moment. Nous vous informerons de tout changement significatif en
          publiant la nouvelle politique sur notre site web et dans
          l'application.
        </Typography>
        <Typography variant="body1" component="p" className={classes.text}>
          <strong>9. Contactez-nous</strong>
          <br />
          Si vous avez des questions concernant cette clause de
          non-responsabilité ou nos pratiques de confidentialité, veuillez nous
          contacter via le{' '}
          <a href="/Contact" className={classes.link}>
            formulaire de contact
          </a>
          .
        </Typography>
      </Container>
    </div>
  );
}

export default DisclaimerPage;
