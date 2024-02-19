import './Stories.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStories } from '@/Store/StoriesSlice.js';

export default function ActionAreaCard() {
  const stories = useSelector(getAllStories);
  console.log(stories);

  return (
    <div className="content-container">
      <ul>
        {stories.map((story) => (
          <Card sx={{ maxWidth: 345 }} key={story.id}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="public/img/bg/espace_exterieur_planete.jpg"
                alt="space"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {story.name}
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
        ))}
      </ul>
    </div>
  );
}
