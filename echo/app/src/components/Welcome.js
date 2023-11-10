import './Welcome.css'
import {useNavigate} from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  function handleSongClick(event) {
    event.preventDefault();
    navigate(`/songs`);
  }

  function handleArtistClick(event) {
    event.preventDefault();
    navigate(`/artists`);
  }

  return (
    <div className={'WelcomeBackground'}>
      <div className={'WelcomePage'}>
        Echo
      </div>
      <div className={'Footer'}>
        <div> Click to Explore Echo :</div>
        <span className={'Link'} onClick={handleSongClick}>Songs</span>
        <span className={'Link'} onClick={handleArtistClick}>Artists</span>
      </div>
    </div>
  );
}

export default Welcome;