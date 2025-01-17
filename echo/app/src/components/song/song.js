import './song.css';
import ReactPlayer from 'react-player/youtube';
import {useNavigate} from 'react-router-dom';

function Song({song}) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/songs/${song.id}`);
  }

  return (
    <div className={'song'}>
      <ReactPlayer url={song.url} controls={true} light={true} volume={0.2} width={'30vw'}/>
      <div className={'title link'} onClick={handleClick}>
        {song.title}
      </div>
    </div>
  )
}

export default Song;
