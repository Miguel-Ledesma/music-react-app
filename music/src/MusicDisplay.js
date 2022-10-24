import {useSelector,useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {fetchInfo,fetchArtistAlbums} from './actions';

export function MusicDisplay(props) {
    const entries = useSelector(state => state.entries);
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(fetchInfo());
      }, [dispatch]);
    console.log(entries);
    
    return (
        <div className='display-container'>
            <h1>Recorded Artists</h1>
            <div className="artists">
                {entries.map((entry) => 
                    <span><span>{entry.artist}</span>
                        <Link to={'/AlbumDisplay'} onClick={() =>
                                dispatch(fetchArtistAlbums(entry.artist))
                            }><button type='button'>{entry.artist}'s Albums</button>
                        </Link>
                    </span>
                )}
            <Link to={'/AddEditSong'} state={{id: -1, mainArtist: "", mainAlbum:"", mainAlbumYear: 0, mainSong:""}}>
                <button className='newItem' type='button'>Add New Song</button>
            </Link>
            </div>
        </div>
    );
}