import './artistList.css';
import Artist from '../../components/artist/artist.js';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {baseApiUrl} from '../../app.const.js';

function ArtistList() {
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();

  useEffect(async () => {
    async function fetchArtists() {
      const result = await axios.get(`${baseApiUrl}/artists`);
      if (result.data) {
        setArtists(result.data)
      }
    }

    await fetchArtists();
  }, []);

  function handleHomeClick(event) {
    event.preventDefault();
    navigate('/');
  }

  async function handleAddClick(event) {
    event.preventDefault();
    navigate('/artists/add');
  }

  function deleteArtist(index) {
    const newArtists = [...artists];
    newArtists.splice(index, 1);
    setArtists(newArtists);
  }

  return (
    <>
      <div className={'list'}>
        {artists.map((artist, index) =>
          <Artist key={artist.id} index={index} artist={artist} deleteArtist={deleteArtist}/>
        )}
      </div>
      <button className={'add-button left-overlay'} onClick={handleAddClick}>
        <FontAwesomeIcon className={'add-button'} icon={faPlus} size={'3x'}/>
      </button>
      <button className={'overlay-button right-overlay'} onClick={handleHomeClick}>Home</button>
    </>
  )
}

export default ArtistList;
