import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function About() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="m">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h3">
            À propos de l'équipe
          </Typography>
          <Typography variant="body1" gutterBottom>
            Nous sommes une équipe passionnée de développement en formation, un
            groupe dynamique de futurs développeurs cherchant à mettre en
            pratique nos compétences naissantes. Notre objectif est clair :
            concevoir un site web à la fois sympa et fonctionnel. Avec notre
            dévouement, notre créativité et notre désir d'apprendre, nous nous
            engageons à créer une expérience en ligne immersive et intuitive
            pour nos utilisateurs. Chaque ligne de code que nous écrivons est
            une opportunité d'apprentissage, et chaque défi rencontré est une
            chance de grandir. Nous croyons fermement que le succès naît de la
            collaboration et de la persévérance, et c'est avec cet esprit que
            nous abordons ce projet. Nous sommes impatients de partager notre
            passion et notre travail avec le monde, en créant un site web qui
            marquera les esprits et apportera une réelle valeur à ses visiteurs.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
