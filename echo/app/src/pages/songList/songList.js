import './songList.css';
import Song from '../../components/song/song.js';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import Input from '../../components/Input.js';

function SongList() {
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState({title: ''})
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSongs() {
      const result = await axios.get(`${process.env.REACT_APP_REQUEST_API_URL}/songs`);
      if (result.data) {
        setSongs(result.data)
      }
    }

    fetchSongs();
  }, []);

  function handleChangeValue(property, value) {
    const newTitle = {...title, [property]: value};
    setTitle(newTitle);
  }

  async function handleSearchClick(event) {
    event.preventDefault()
    try {
      const result = await axios.get(`${process.env.REACT_APP_REQUEST_API_URL}/songs/search/${title.title}`, title);
      console.log(result.data)
      navigate(`/songs/${result.data.id}`);
    } catch (error) {
      console.log('Error');
    }
  }

  function handleHomeClick(event) {
    event.preventDefault();
    navigate(`/`);
  }

  function handleAddClick(event) {
    event.preventDefault();
    navigate(`/songs/add`);
  }

  return (
    <>
      <div className={'search-bar'}>
        <Input property={'title'} type={'text'} value={title.title} placeholder={'Title'} handleChangeValue={handleChangeValue}/>
        <button className={'button'} onClick={handleSearchClick}>Search</button>
      </div>
      <div className={"list"}>
        {songs.map((song) =>
          <Song key={song.id} song={song}/>
        )}
      </div>
      <button className={'add-button left-overlay'} onClick={handleAddClick}>
        <FontAwesomeIcon className={'add-button'} icon={faPlus} size={'3x'}/>
      </button>
      <button className={'overlay-button right-overlay'} onClick={handleHomeClick}>Home</button>
    </>
  )
}

export default SongList;
