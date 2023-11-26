import 'newArtist.css';
import Input from '../../components/Input.js';
import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {baseApiUrl} from '../../app.const.js';

function NewArtist() {
  const [artist, setArtist] = useState({name: '', image: ''});
  const navigate = useNavigate();

  function handleChangeValue(property, value) {
    const newArtist = {...artist, [property]: value};
    setArtist(newArtist);
  }

  function handleHomeClick(event) {
    event.preventDefault();
    navigate('/');
  }

  function handleBackClick(event) {
    event.preventDefault();
    navigate('/artists');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.post(`${baseApiUrl}/artists`, artist);
      navigate('/artists');
    } catch (error) {
      console.log('Error');
    }
  }

  return (
    <>
      <div className={'add-artist-page'}>
        <div>
          Name:
          <Input property={'name'} type={'text'} value={artist.name} placeholder={'Name'} handleChangeValue={handleChangeValue}/>
          Image URL:
          <Input property={'image'} type={'text'} value={artist.image} placeholder={'URL'} handleChangeValue={handleChangeValue}/>
        </div>
        <button className={'button'} onClick={handleSubmit}>Save</button>
      </div>
      <div className={'right-overlay'}>
        <button className={'overlay-button'} onClick={handleHomeClick}>Home</button>
        <button className={'overlay-button'} onClick={handleBackClick}>Back</button>
      </div>
    </>
  )
}

export default NewArtist;
