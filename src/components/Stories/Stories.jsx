// ActionAreaCard.jsx
import React from 'react';
import './Stories.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';
import { useSelector } from 'react-redux';
import { getAllStories } from '@/Store/StoriesSlice.js';

export default function ActionAreaCard() {
  const stories = useSelector(getAllStories);

  return (
    <div className="content-container-stories">
      <Grid
        container
        spacing={2}
        className="card-container"
        style={{ marginTop: '20px', marginBottom: '20px' }}
      >
        <Grid item xs={12} sm={6} md={4} style={{ marginTop: '40px' }}>
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
                  L'histoire des 4 créateur
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Dans "L'histoire des 4 créateurs", explorez des îles, des
                  bateaux, des villages et des forêts. Rencontrez des pirates,
                  des poulpes, des sirènes et des robots. Dévoilez les mystères
                  de l'espace et des planètes rouge et bleue.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} style={{ marginTop: '40px' }}>
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
                  L'histoire des 4 créateur
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Dans "L'histoire des 4 créateurs", explorez des îles, des
                  bateaux, des villages et des forêts. Rencontrez des pirates,
                  des poulpes, des sirènes et des robots. Dévoilez les mystères
                  de l'espace et des planètes rouge et bleue.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
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
                  L'histoire des 4 créateur
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Dans "L'histoire des 4 créateurs", explorez des îles, des
                  bateaux, des villages et des forêts. Rencontrez des pirates,
                  des poulpes, des sirènes et des robots. Dévoilez les mystères
                  de l'espace et des planètes rouge et bleue.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
