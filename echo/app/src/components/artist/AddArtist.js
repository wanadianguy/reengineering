import Input from "../Input";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function AddArtist() {
  const [artist, setArtist] = useState({name: '', image: ''});
  const navigate = useNavigate();

  function handleChangeValue(property, value) {
    const newArtist = {...artist, [property]: value};
    setArtist(newArtist);
  }

  function handleHomeClick(event) {
    event.preventDefault();
    navigate(`/`);
  }

  function handleBackClick(event) {
    event.preventDefault();
    navigate(`/artists`);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:8080/artists`, artist);
      navigate(`/artists`);
    } catch (error) {
      console.log('Error');
    }
  }

  return (
    <>
      <div className={'AddArtistPage'}>
        <div>
          Name:
          <Input property={'name'} type={'text'} value={artist.name} placeholder={'Name'} handleChangeValue={handleChangeValue}/>
          Image URL:
          <Input property={'image'} type={'text'} value={artist.image} placeholder={'URL'} handleChangeValue={handleChangeValue}/>
        </div>
        <button className={'Button'} onClick={handleSubmit}>Save</button>
      </div>
      <div className={'RightOverlay'}>
        <button className={'OverlayButton'} onClick={handleHomeClick}>Home</button>
        <button className={'OverlayButton'} onClick={handleBackClick}>Back</button>
      </div>
    </>
  )
}

export default AddArtist;