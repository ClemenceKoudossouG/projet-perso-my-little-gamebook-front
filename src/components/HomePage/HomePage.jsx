import './HomePage.scss';
import PlayStory from '../PlayStory/PlayStory';
import ReviewStory from '../ReviewStory/ReviewStory';
import HomeBg from '../HomeBg/HomeBg';

function Home() {
  return (
    <div className="home">
      <div>
        <HomeBg />
      </div>
      <div className="HomePageContainer">
        <PlayStory />
        <ReviewStory />
      </div>
    </div>
  );
}

export default Home;
