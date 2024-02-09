import './PlayStory.scss';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

function PlayStory() {
  return (
    <div className="play">
      <PlayCircleFilledWhiteIcon className="icon" sx={{ fontSize: 100 }} />
      <p>Histoire</p>
      <p>à jouer</p>
    </div>
  );
}
export default PlayStory;
