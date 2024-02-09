import './PlayStories.scss';
import PlayStory from '../PlayStory/PlayStory';
import HomeBg from '../HomeBg/HomeBg';

function PlayStories() {
  return (
    <div className="img">
      <HomeBg />
      <div className="container">
        <PlayStory />
        <PlayStory />
        <PlayStory />
        <PlayStory />
        <PlayStory />
      </div>
    </div>
  );
}

export default PlayStories;
