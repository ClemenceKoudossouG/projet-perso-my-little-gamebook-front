import './ReviewStory.scss';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { GetCompartment } from '@/Store/compartmentSlice';
import { useDispatch } from 'react-redux';

function ReviewStory() {
  const dispatch = useDispatch();

  const handleClickButton = () => {
    dispatch(GetCompartment(1));
    dispatch({ type: 'FETCH_COMPARTMENT' });
  };

  return (
    <div className="play">
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        sx={{ mr: 2 }}
        onClick={handleClickButton}
      >
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
