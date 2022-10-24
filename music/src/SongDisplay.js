import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchInfo, fetchArtistAlbums, editSong, deleteSong} from './actions';

export function SongDisplay(props) {
    const entries = useSelector(state => state.entries);
    const dispatch = useDispatch();
    //dispatch(fetchSongs(entries[0].artist, entries[0].album));

    return (
        <div className='display-container'>
            <h1>Songs in {entries[0].album}</h1>
            <h2>By {entries[0].artist}</h2>
            <div className='entries'>
                {entries.map((entry) =>
                    <span className='row'><span>{entry.song}</span>
                        <span>
                            <Link to={'/AddEditSong'} state={
                                {id: entry.id, mainArtist: entry.artist, mainAlbum: entry.album, 
                                mainAlbumYear: entry.albumYear, mainSong: entry.song}}>
                                <button type='button' 
                                    onClick={() => dispatch(editSong(entry.id))}>Edit Song
                                </button>
                            </Link>
                            <Link to={'/'} onClick={() => dispatch(fetchInfo())}>
                                <button type='button' onClick={() => dispatch(deleteSong(entry.id))}>Delete</button>
                            </Link>
                        </span>
                    </span>
                )}
            </div>
            <div className='options'>
                <Link to={'/'}><button>Back to Artists</button></Link>
                <Link to={'/AlbumDisplay'} onClick={() => 
                    dispatch(fetchArtistAlbums(entries[0].artist))}>
                    <button type='button'>Back to Albums</button>
                </Link>
                <Link to={'/AddEditSong'} state={{mainArtist: entries[0].artist, mainAlbum: entries[0].album,
                        mainAlbumYear: entries[0].albumYear, mainSong:""}}>
                    <button type='button'>Add New Song</button>
                </Link>
            </div>
        </div>
    );
}