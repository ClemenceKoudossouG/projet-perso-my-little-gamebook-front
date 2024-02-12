import './ReviewStory.scss';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

function ReviewStory() {
  return (
    <div className="play">
      <PlayCircleFilledWhiteIcon className="icon" sx={{ fontSize: 100 }} />
      <p>Lire</p>
      <p>une histoire</p>
    </div>
  );
}
export default ReviewStory;
