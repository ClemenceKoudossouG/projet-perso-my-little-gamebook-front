import './Stories.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard() {
  return (
    <div className="content-container">
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="public/img/bg/espace_exterieur_planete.jpg"
            alt="space"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              L''histoire des 4 créateurs
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dans "L'histoire des 4 créateurs", explorez des îles, des bateaux,
              des villages et des forêts. Rencontrez des pirates, des poulpes,
              des sirènes et des robots. Dévoilez les mystères de l'espace et
              des planètes rouge et bleue.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="public/img/bg/espace_exterieur_planete.jpg"
            alt="space"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              L''histoire des 4 créateurs
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dans "L'histoire des 4 créateurs", explorez des îles, des bateaux,
              des villages et des forêts. Rencontrez des pirates, des poulpes,
              des sirènes et des robots. Dévoilez les mystères de l'espace et
              des planètes rouge et bleue.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="public/img/bg/espace_exterieur_planete.jpg"
            alt="space"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              L''histoire des 4 créateurs
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dans "L'histoire des 4 créateurs", explorez des îles, des bateaux,
              des villages et des forêts. Rencontrez des pirates, des poulpes,
              des sirènes et des robots. Dévoilez les mystères de l'espace et
              des planètes rouge et bleue.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
