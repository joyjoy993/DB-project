import {FETCH_USEREVENTS} from '../actions/const';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_USEREVENTS:
            return action.payload.data.userevents;
    }
    return state;
}
