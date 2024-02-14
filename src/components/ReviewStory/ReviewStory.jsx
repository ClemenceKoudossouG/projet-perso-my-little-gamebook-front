import './ReviewStory.scss';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';

function ReviewStory() {
  return (
    <div className="play">
      <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
        <Link to="/gameDynamic">
          <PlayCircleFilledWhiteIcon className="icon" sx={{ fontSize: 100 }} />
        </Link>
      </IconButton>
      <p>Lire</p>
      <p>une histoire</p>
    </div>
  );
}
export default ReviewStory;
