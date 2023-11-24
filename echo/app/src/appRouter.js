import './app.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/home/home.js";
import SongList from "./pages/songList/songList.js";
import SongDetails from "./pages/songDetails/songDetails.js";
import ArtistList from "./pages/artistList/artistList.js";
import NewSong from "./pages/newSong/newSong.js";
import NewArtist from "./pages/newArtist/newArtist.js";

function AppRouter() {
  return (
    <div className={'App'}>
      <Router>
        <Routes>
          <Route exact path={''} element={<Home/>}/>
          <Route exact path={'/songs'} element={<SongList/>}/>
          <Route exact path={'/songs/add'} element={<NewSong/>}/>
          <Route exact path={'/songs/:songId'} element={<SongDetails/>}/>
          <Route exact path={'/artists'} element={<ArtistList/>}/>
          <Route exact path={'/artists/add'} element={<NewArtist/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default AppRouter;
