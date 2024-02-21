import React, { useEffect } from 'react';
import './Stories.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { CardActionArea } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getAllStories } from '@/Store/StoriesSlice.js';

export default function ActionAreaCard() {
  const dispatch = useDispatch();
  const { stories } = useSelector((state) => state.stories) || [];

  // Charger les histoires lorsque le composant est monté
  useEffect(() => {
    dispatch(getAllStories());
  }, [dispatch]);

  // Gérer le cas où stories est undefined
  if (!stories) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-container-stories">
      <Grid
        container
        spacing={2}
        className="card-container"
        style={{ marginTop: '40px', marginBottom: '20px' }}
      >
        {stories.map((story) => (
          <Grid item xs={12} sm={6} md={4} key={story.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="public/pirate_bateau_voile.jpg"
                  alt={story.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {story.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Dans "L'histoire des 4 créateurs", explorez des îles, des
                    bateaux, des villages et des forêts. Rencontrez des pirates,
                    des poulpes, des sirènes et des robots. Dévoilez les
                    mystères de l'espace et des planètes rouge et bleues.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Jouer cette histoire</Button>
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
