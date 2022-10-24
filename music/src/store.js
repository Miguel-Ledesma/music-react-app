import {Action} from './actions';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

const initialState = {
    entries: [
        {
            id: 9999,
            artist: "sampleArtist",
            album: "sampleAlbum99",
            albumYear: 2022,
            song: "That One Song",
            isEditing: false,
        },
    ],
};

function reducer(state, action) {
    switch(action.type) {
        case Action.ShowInfo:
            return {
                ...state,
                entries: action.payload,
            };
        case Action.EditSong:
            return {
                ...state,
                entries: state.entries.map(entry => {
                    if (entry.id === action.payload) {
                        return {...entry, isEditing: true};
                    }
                    else {
                        return entry;
                    }
                }),
            };
        case Action.CancelSong:
            return {
                ...state,
                entries: state.entries.map( entry => {
                    if (entry.id === action.payload) {
                        return {...entry, isEditing: false};
                    }
                    else {
                        return entry;
                    }
                }),
            };
        case Action.ReplaceSong:
            return {
                ...state,
                entries: state.entries.map(entry => {
                    if (entry.id === action.payload) {
                        return action.payload;
                    }
                    else {
                        return entry;
                    }
                }),
            };
        case Action.RemoveSong:
            return {
                ...state,
                entries: state.entries.filter(entry => entry.id !== action.payload),
            };
        default:
            return state;
    }
}

export const store = createStore(reducer, initialState, applyMiddleware(thunk));