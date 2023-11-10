import './Song.css';
import Input from "../Input";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function AddSong() {
  const [song, setSong] = useState({title: '', artistId: 0, type: '', date: new Date, url: ''});
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchArtists() {
      const result = await axios.get(`http://localhost:8080/artists`);
      if (result.data) {
        setArtists(result.data)
        const newSong = {...song, artistId: result.data[0].id};
        setSong(newSong);
      }
    }

    fetchArtists();
  }, []);

  function handleChangeValue(property, value) {
    const newSong = {...song, [property]: value};
    setSong(newSong);
  }

  function handleSelectChange(event) {
    const newSong = {...song, artistId: event.target.value};
    setSong(newSong);
  }

  function handleHomeClick(event) {
    event.preventDefault();
    navigate(`/`);
  }

  function handleBackClick(event) {
    event.preventDefault();
    navigate(`/songs`);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const result = await axios.post(`http://localhost:8080/songs/${song.artistId}`, song);
      navigate(`/songs/${result.data.id}`);
    } catch (error) {
      console.log('Error');
    }
  }

  return (
    <>
      <div className={"AddSongPage"}>
        <div>
          Title:
          <Input property={'title'} type={'text'} value={song.title} placeholder={'Title'}
                 handleChangeValue={handleChangeValue}/>
          Type:
          <Input property={'type'} type={'text'} value={song.type} placeholder={'Type'}
                 handleChangeValue={handleChangeValue}/>
          Song Link:
          <Input property={'url'} type={'text'} value={song.url} placeholder={'URL'}
                 handleChangeValue={handleChangeValue}/>
          <div>Date:</div>
          <Input property={'date'} type={'date'} value={song.date} handleChangeValue={handleChangeValue}/>
          <div>Artist:</div>
          <select value={song.artistId} onChange={handleSelectChange}>
            {artists.map((artist) => <option key={artist.id} value={artist.id}>{artist.name}</option>)}
          </select>
          <div>
            <button className={'Button'} onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
      <div className={'RightOverlay'}>
        <button className={'OverlayButton'} onClick={handleHomeClick}>Home</button>
        <button className={'OverlayButton'} onClick={handleBackClick}>Back</button>
      </div>
    </>
  )
}

export default AddSong;