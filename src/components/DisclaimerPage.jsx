import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledRoot = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  backgroundImage: `url(public/img/bg/foret_sombre.jpg)`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  overflowY: 'scroll',
  paddingTop: '60vh',
  paddingBottom: '10vh',
}));

const StyledContainer = styled(Container)(() => ({
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  borderRadius: '8px',
  padding: '20px',
  maxWidth: '800px',
}));

const StyledTypography = styled(Typography)(() => ({
  color: '#ffffff',
  marginBottom: '16px',
}));

const StyledLink = styled('a')(() => ({
  color: '#add8e6',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

function DisclaimerPage() {
  return (
    <StyledRoot>
      <StyledContainer>
        <StyledTypography variant="h3" component="h1">
          Mentions légales
        </StyledTypography>
        <StyledTypography variant="h5" component="h2">
          Clause de non-responsabilité et politique de confidentialité
        </StyledTypography>
        <StyledTypography variant="body1" component="p">
          <strong>1. Introduction</strong>
          <br />
          Bienvenue sur <i>My Little Gamebook</i> !<br />
          <br />
          En utilisant notre application, vous acceptez les termes et conditions
          suivants. Veuillez les lire attentivement. Si vous n'acceptez pas ces
          termes, veuillez ne pas utiliser notre application.
        </StyledTypography>
        <StyledTypography variant="body1" component="p">
          <strong>2. Informations sur le compte utilisateur</strong>
          <br />
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
        </StyledTypography>
        <StyledTypography variant="body1" component="p">
          <strong>3. Jetons JWT</strong>
          <br />
          Nous utilisons des jetons JWT (JSON Web Tokens) à des fins d'identité
          et pour maintenir votre session de connexion sans utiliser de cookies.
        </StyledTypography>
        <StyledTypography variant="body1" component="p">
          <strong>4. Stockage des données</strong>
          <br />
          Toutes les informations utilisateur sont stockées de manière sécurisée
          appropriées pour protéger vos données contre tout accès non autorisé,
          altération, divulgation ou destruction.
        </StyledTypography>
        <StyledTypography variant="body1" component="p">
          <strong>5. Images tierces</strong>
          <br />
          Notre application utilise des images et icônes gratuites provenant de
          Freepik et Flaticon (https://www.freepik.com,
          https://www.flaticon.com/fr/). Nous respectons leurs directives
          d'utilisation et attribuons correctement les crédits lorsque
          nécessaire.
        </StyledTypography>
        <StyledTypography variant="body1" component="p">
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
        </StyledTypography>
        <StyledTypography variant="body1" component="p">
          <strong>7. Limitation de responsabilité</strong>
          <br />
          <i>My Little Gamebook</i> est fourni "tel quel" et "selon
          disponibilité" sans aucune garantie, expresse ou implicite. Nous ne
          garantissons pas que l'application sera exempte d'erreurs ou
          ininterrompue.
        </StyledTypography>
        <StyledTypography variant="body1" component="p">
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
        </StyledTypography>
        <StyledTypography variant="body1" component="p">
          <strong>9. Contactez-nous</strong>
          <br />
          Si vous avez des questions concernant cette clause de
          non-responsabilité ou nos pratiques de confidentialité, veuillez nous
          contacter via le{' '}
          <StyledLink href="/Contact">formulaire de contact</StyledLink>.
        </StyledTypography>
      </StyledContainer>
    </StyledRoot>
  );
}

export default DisclaimerPage;
