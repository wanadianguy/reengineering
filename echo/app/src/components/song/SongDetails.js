import './Song.css'
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import ReactPlayer from 'react-player/youtube';
import Input from "../Input";
import Feedback from "../feedback/Feedback";

function SongDetails() {
  const [song, setSong] = useState(null);
  const [feedback, setFeedback] = useState({mark: 5, comment: ''});
  const [showForm, setShowForm] = useState(false);
  const {songId} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSong() {
      const result = await axios.get(`http://localhost:8080/songs/${songId}`);
      if (result.data) {
        setSong(result.data)
      }
    }

    fetchSong();
  }, [songId]);

  function handleChangeValue(property, value) {
    const newFeedback = {...feedback, [property]: value};
    setFeedback(newFeedback);
  }

  function handleHomeClick(event) {
    event.preventDefault();
    navigate(`/`);
  }

  function handleBackClick(event) {
    event.preventDefault();
    navigate(`/songs`);
  }

  async function handleDeleteClick(event) {
    event.preventDefault();
    try {
      await axios.delete(`http://localhost:8080/songs/${songId}`);
      navigate(`/songs`);
    } catch (error) {
      console.log('Error');
    }
  }

  async function handleFeedbackClick(event) {
    event.preventDefault();
    try {
      const result = await axios.post(`http://localhost:8080/comments/${songId}`, feedback);
      const modifiedSong = {...song};
      modifiedSong.feedback.push(result.data);
      setSong(modifiedSong);
      setShowForm(!showForm);
      setFeedback({mark: 5, comment: ''});
    } catch (error) {
      console.log('Error');
    }
  }

  function toggleFeedbackForm(event) {
    event.preventDefault();
    setFeedback({mark: 5, comment: ''});
    setShowForm(!showForm);
  }

  return (
    <>
      {song ?
        <>
          <div className={'SongDetails'}>
            <ReactPlayer url={song.url} controls={true} light={true} volume={0.2} width={'40vw'} height={'50vh'}/>
            <div className={'Title'}>
              {song.title}
            </div>
            <div>
              Type: {song.type}
            </div>
            <div>
              Date: <Moment locale={'en'} date={song.date} format={'LL'}/>
            </div>
            <button className={'DeleteButton'} onClick={handleDeleteClick}>Delete song</button>
            {!showForm ?
              <button className={'Button'} onClick={toggleFeedbackForm}>Comment</button>
              :
              <>
                <Input property={'mark'} type={'number'} value={feedback.mark} placeholder={''} min={0} max={5}
                       handleChangeValue={handleChangeValue}/>
                <Input property={'comment'} type={'textarea'} value={feedback.comment} placeholder={'comment'} handleChangeValue={handleChangeValue}/>
                <button className={'Button'} onClick={handleFeedbackClick}>Submit</button>
                <button className={'Button'} onClick={toggleFeedbackForm}>Cancel</button>
              </>
            }
          </div>
          <div className={'RightOverlay'}>
            <button className={'OverlayButton'} onClick={handleHomeClick}>Home</button>
            <button className={'OverlayButton'} onClick={handleBackClick}>Back</button>
          </div>
          <div>
            {song.feedback.map((feedback) =>
              <Feedback key={feedback.id} feedback={feedback}/>
            )}
          </div>
        </>
        : null}
    </>
  );
}

export default SongDetails;