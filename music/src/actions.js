export const Action = Object.freeze({
    ShowInfo: 'ShowInfo',
    AddSong: 'AddSong',
    EditSong: 'EditSong',
    CancelSong: 'CancelSong',
    ReplaceSong: 'ReplaceSong',
    RemoveSong: 'RemoveSong',
});

function assertResponse(response) {
    if (response.status >= 200 || response.status < 300) {
        return response;
    }
    else {
        throw new Error(`${response.status}: ${response.statusText}`);
    }
}

// ALL GET REQUESTS
export function fetchInfo() {
    return dispatch => {
        fetch(`https://music-api.miguelledesma.com:8443/artists`)
            .then(assertResponse)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(showInfo(data.results));
                }
                else {
                    console.error(data);
                }
            });
    }
}

export function fetchArtistAlbums(artist) {
    return dispatch => {
        fetch(`https://music-api.miguelledesma.com:8443/artists/${artist}`)
            .then(assertResponse)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(showInfo(data.results))
                }
                else {
                    console.error(data)
                }
            });
    }
}

export function fetchSongs(artist, album) {
    return dispatch => {
        fetch(`https://music-api.miguelledesma.com:8443/artists/${artist}/${album}`)
            .then(assertResponse)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(showInfo(data.results))
                }
                else {
                    console.error(data)
                }
            });
    }
}

export function fetchAlbums(year) {
    return dispatch => {
        fetch(`https://music-api.miguelledesma.com:8443/albums/${year}`)
            .then(assertResponse)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(showInfo(data.results))
                }
                else {
                    console.error(data)
                }
            });
    }
}

// NEW ENTRY TO MUSIC
export function newSong(artist, album, albumYear, song) {
    const entry = {artist, album, albumYear, song}
    console.log(entry);
    return dispatch => {
        const option = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(entry),
        };

        console.log(entry.id);

        fetch(`https://music-api.miguelledesma.com:8443/artists`, option)
            .then(assertResponse)
            .then(repsonse => repsonse.json())
            .then(data => {
                if (data.ok) {
                    dispatch(addSong({
                        ...entry,
                        id: data.results,
                        isEditing: false,
                    }));
                }
            });
    }
}

// SAVE EDIT OF ENTRY
export function saveEditSong(entry) {
    return dispatch => {
        console.log(entry);
        const option = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(entry),
        };
        fetch(`https://music-api.miguelledesma.com:8443/artists/${entry.id}`, option)
            .then(assertResponse)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(replaceSong({...entry, isEditing: false}));
                }
                else {
                    console.error(data);
                }
            });
    };
}

// DELETE AN ENTRY
export function deleteSong(id) {
    return dispatch => {
        const option = {
            method: 'DELETE',
        };

        fetch(`https://music-api.miguelledesma.com:8443/artists/${id}`, option)
            .then(assertResponse)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(removeSong(id));
                }
            });
    };
}

export function removeSong(id) {
    return {type: Action.RemoveSong, payload: id}
}
export function addSong(entry) {
    return {type: Action.AddSong, payload: entry};
}
export function replaceSong(entry) {
    return {type: Action.ReplaceSong, payload: entry};
}
export function showInfo(entry) {
    return {type: Action.ShowInfo, payload: entry};
}
export function cancelSong(id) {
    return {type: Action.CancelSong, payload: id}
}
export function editSong(id) {
    return {type: Action.EditSong, payload: id}
}