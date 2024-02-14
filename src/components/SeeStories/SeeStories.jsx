import './SeeStories.scss';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';

function SeeStories() {
  return (
    <div className="play">
      <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
        <Link to="/stories">
          <PlayCircleFilledWhiteIcon className="icon" sx={{ fontSize: 100 }} />
        </Link>
      </IconButton>
      <p>Voir</p>
      <p>les histoires</p>
    </div>
  );
}
export default SeeStories;
