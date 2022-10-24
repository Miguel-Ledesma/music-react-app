import {useSelector,useDispatch} from 'react-redux';
import {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {newSong, saveEditSong, fetchInfo, cancelSong, editSong, addSong} from './actions';

export function AddEditSong(props) {
    const location = useLocation();
    const dispatch = useDispatch();
    const {id, mainArtist, mainAlbum, mainAlbumYear, mainSong} = location.state;
    const [artist, setArtist] = useState(mainArtist);
    const [album, setAlbum] = useState(mainAlbum);
    const [albumYear, setAlbumYear] = useState(mainAlbumYear);
    const [song, setSong] = useState(mainSong);

    if (id > -1) {
        return (
            <div className='editing-block'>
                <h1>Editing Song</h1>
                <div className='song-editing'>
                    <span className='artist'>Artist: 
                        <input type="text" defaultValue={mainArtist} placeholder={mainArtist} onChange={event => setArtist(event.target.value)}></input>
                    </span>
                    <span className='album'>Album: 
                        <input type="text" defaultValue={mainAlbum} placeholder={mainAlbum} onChange={event => setAlbum(event.target.value)}></input>
                    </span>
                    <span className='albumYear'>Year: 
                        <input type="number" defaultValue={mainAlbumYear} placeholder={mainAlbumYear} onChange={event => setAlbumYear(event.target.value)}></input>
                    </span>
                    <span className='song'>Song: 
                        <input type="text" defaultValue={mainSong} placeholder={mainSong} onChange={event => setSong(event.target.value)}></input>
                    </span>
                </div>
                <div className='options'>
                    <Link to={'/'}>
                        <button type='button' onClick={() => dispatch(saveEditSong({id, artist, album, albumYear, song}))}>Save Song Edits</button>
                    </Link>
                    <Link to={'/'}><button type='button'>Cancel Edits</button></Link>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className='editing-block'>
                <h1>Adding A New Song</h1>
                <div className='song-editing'>
                    <span className='artist'>Artist: 
                        <input type="text" defaultValue={mainArtist} placeholder={mainArtist} onChange={event => setArtist(event.target.value)}></input>
                    </span>
                    <span className='album'>Album: 
                        <input type="text" defaultValue={mainAlbum} placeholder={mainAlbum} onChange={event => setAlbum(event.target.value)}></input>
                    </span>
                    <span className='albumYear'>Year: 
                        <input type="number" defaultValue={mainAlbumYear} placeholder={mainAlbumYear} onChange={event => setAlbumYear(event.target.value)}></input>
                    </span>
                    <span className='song'>Song: 
                        <input type="text" defaultValue={mainSong} placeholder={mainSong} onChange={event => setSong(event.target.value)}></input>
                    </span>
                </div>
                <div className='options'>
                    <Link to={'/'} onClick={() => dispatch(fetchInfo())}>
                        <button type='button' onClick={() => dispatch(newSong(artist, album, albumYear, song))}>Add New Song</button>
                    </Link>
                    <Link to={'/'}><button type='button'>Cancel Addition</button></Link>
                </div>
            </div>
        );
    }
}