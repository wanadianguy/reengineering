import './artist.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {baseApiUrl} from '../../app.const.js';

function Artist({index, artist, deleteArtist}) {
  const navigate = useNavigate();

  async function handleDeleteClick(event) {
    event.preventDefault();
    try {
      await axios.delete(`${baseApiUrl}/artists/${artist.id}`);
      deleteArtist(index);
    } catch (error) {
      console.log('Error');
    }
  }

  return (
    <>
      <div className={'Artist'}>
        <img className={'Image'} src={artist.image}/>
        <div className={'Name'}>
          {artist.name}
        </div>
        <button className={'DeleteButton'} onClick={handleDeleteClick}>Delete artist</button>
      </div>
    </>
  )
}

export default Artist;
