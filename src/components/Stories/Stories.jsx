import { useEffect } from 'react';
import './Stories.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getAllStories } from '@/Store/StoriesSlice';
import { getCompartmentBeginning } from '@/Store/compartmentSlice';
import { Link } from 'react-router-dom';

export default function ActionAreaCard() {
  const dispatch = useDispatch();
  const { stories } = useSelector((state) => state.stories) || [];

  // Fetch stories only if they are not already loaded
  useEffect(() => {
    if (!stories || stories.length === 0) {
      dispatch({ type: 'FETCH_STORIES' }); 
    }
  }, [dispatch, stories]);

  if (!stories || stories.length === 0) {
    return <div>Loading...</div>;
  }

  const handleClickButtonCompartment = (storyId) => {
    // Reducer qui charge le state avec l'id dont on a besoin pour charger nos données
    dispatch(getCompartmentBeginning(storyId));
    // Appel de l'action.type qui va déclencher le switch du middleware Story
    dispatch({ type: 'FETCH_COMPARTMENT_BEGINNING' });
  };

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
            <Card
              sx={{
                maxWidth: 345,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                overflow: 'hidden',
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={`img/bg/${story.img}.jpg`}
                alt={story.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {story.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {story.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Link to="/gameDynamic">
                  <Button
                    onClick={() => handleClickButtonCompartment(story.id)}
                    size="small"
                  >
                    Jouer cette histoire
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
