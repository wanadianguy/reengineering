import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Welcome from "./components/Welcome";
import SongList from "./components/song/SongList";
import SongDetails from "./components/song/SongDetails";
import ArtistList from "./components/artist/ArtistList";
import AddSong from "./components/song/AddSong";
import AddArtist from "./components/artist/AddArtist";

function App() {
  return (
    <div className={'App'}>
      <Router>
        <Routes>
          <Route exact path={''} element={<Welcome/>}/>
          <Route exact path={'/songs'} element={<SongList/>}/>
          <Route exact path={'/songs/add'} element={<AddSong/>}/>
          <Route exact path={'/songs/:songId'} element={<SongDetails/>}/>
          <Route exact path={'/artists'} element={<ArtistList/>}/>
          <Route exact path={'/artists/add'} element={<AddArtist/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;