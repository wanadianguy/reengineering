import Song from "./Song";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Input from "../Input";

function SongList() {
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState({title: ''})
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSongs() {
      const result = await axios.get(`http://localhost:8080/songs`);
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
      const result = await axios.get(`http://localhost:8080/songs/search/${title.title}`, title);
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
      <div className={'SearchBar'}>
        <Input property={'title'} type={'text'} value={title.title} placeholder={'Title'} handleChangeValue={handleChangeValue}/>
        <button className={'Button'} onClick={handleSearchClick}>Search</button>
      </div>
      <div className={"List"}>
        {songs.map((song) =>
          <Song key={song.id} song={song}/>
        )}
      </div>
      <button className={'AddButton LeftOverlay'} onClick={handleAddClick}>
        <FontAwesomeIcon className={'AddButton'} icon={faPlus} size={'3x'}/>
      </button>
      <button className={'OverlayButton RightOverlay'} onClick={handleHomeClick}>Home</button>
    </>
  )
}

export default SongList;