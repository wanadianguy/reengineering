import Artist from "./Artist";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {faPlus, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function ArtistList() {
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchArtists() {
      const result = await axios.get(`http://localhost:8080/artists`);
      if (result.data) {
        setArtists(result.data)
      }
    }

    fetchArtists();
  }, []);

  function handleHomeClick(event) {
    event.preventDefault();
    navigate(`/`);
  }

  async function handleAddClick(event) {
    event.preventDefault();
    navigate(`/artists/add`);
  }

  function deleteArtist(index) {
    const newArtists = [...artists];
    newArtists.splice(index, 1);
    setArtists(newArtists);
  }

  return (
    <>
      <div className={"List"}>
        {artists.map((artist, index) =>
          <Artist key={artist.id} index={index} artist={artist} deleteArtist={deleteArtist}/>
        )}
      </div>
      <button className={'AddButton LeftOverlay'} onClick={handleAddClick}>
        <FontAwesomeIcon className={'AddButton'} icon={faPlus} size={'3x'}/>
      </button>
      <button className={'OverlayButton RightOverlay'} onClick={handleHomeClick}>Home</button>
    </>
  )
}

export default ArtistList;