import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './About.scss';

const defaultTheme = createTheme();

export default function About() {
  return (
    <div className="background">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              margin: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              sx={{
                marginBottom: 5,
                textAlign: 'center',
              }}
            >
              À propos de l'équipe
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ textAlign: 'justify' }}
            >
              Cette application a été créée dans le cadre d'un projet de fin de
              formation chez O'Clock et propose des histoires interactives pour
              de jeunes aventuriers à partir de 3 ans. Notre objectif était
              clair : concevoir une appli web à la fois sympa et fonctionnelle.
              Avec notre dévouement, notre créativité et notre désir
              d'apprendre, nous nous sommes engagés à créer une expérience en
              ligne immersive et intuitive. Crée un compte et découvre toutes
              les histoires du catalogue. Avant de t'inscrire, tu peux tester
              une histoire directement en page d'accueil. Et bien sûr, n'oublie
              pas de demander l'autorisation à tes parents avant de te lancer !
            </Typography>
            <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
              L'équipe de développement :
            </Typography>
            <Typography variant="body1" gutterBottom>
              - Clémence Koudossou-Garde: Product Owner et développeuse
              full-stack <br />
              - Lucien Poncet: Lead dev backend <br />
              - Emeline Bellemin: Designer, développeuse front-end et Scrum
              Master <br /> - Joey Augustinien: Lead dev front-end
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
