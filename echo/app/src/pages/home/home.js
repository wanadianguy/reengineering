import './home.css';
import {useNavigate} from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  function handleSongClick(event) {
    event.preventDefault();
    navigate('/songs');
  }

  function handleArtistClick(event) {
    event.preventDefault();
    navigate('/artists');
  }

  return (
    <div className={'welcome-background'}>
      <div className={'welcome-page'}>
        Echo
      </div>
      <div className={'footer'}>
        <div> Click to Explore Echo :</div>
        <span className={'link'} onClick={handleSongClick}>Songs</span>
        <span className={'link'} onClick={handleArtistClick}>Artists</span>
      </div>
    </div>
  );
}

export default Home;
