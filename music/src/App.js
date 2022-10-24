import './App.css';
import {Route, Routes} from 'react-router-dom';
import {MusicDisplay} from './MusicDisplay';
import {AlbumDisplay} from './AlbumDisplay';
import {SongDisplay} from './SongDisplay';
import {AddEditSong} from './AddEditSong.js';


function App() {

  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route path="/" element={<MusicDisplay />}/>
          <Route path="/AlbumDisplay" element={<AlbumDisplay/>}/>
          <Route path="/SongDisplay" element={<SongDisplay/>}/>
          <Route path="/AddEditSong" element={<AddEditSong/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
