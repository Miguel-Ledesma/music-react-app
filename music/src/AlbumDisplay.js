import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchSongs} from './actions';

export function AlbumDisplay(props) {
    const entries = useSelector(state => state.entries);
    const dispatch = useDispatch();
    //dispatch(fetchArtistAlbums(entries[0].artist));
    return (
        <div className='display-container'>
            <h1>{entries[0].artist}'s Albums</h1>
            <div className='albums'>
                {entries.map((entry) => 
                    <span> {entry.album}
                        <Link to={'/SongDisplay'} onClick={() =>
                                dispatch(fetchSongs(entry.artist, entry.album))
                            }><button type='button'>{entry.album} Songs</button>
                        </Link>
                    </span>
                )}
            </div>
            <div className='options'>
                <Link to={'/'}><button>Back to Artists</button></Link>
                <Link to={'/AddEditSong'} state={{id: -1, mainArtist: entries[0].artist, mainAlbum:"", mainAlbumYear: 0, mainSong:""}}>
                    <button type='button'>Add New Song</button>
                </Link>
            </div>
        </div>
    );
}