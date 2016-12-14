import {FETCH_CURRENTUSER} from '../actions/const';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_CURRENTUSER:
            return action.payload.data.user;
    }
    return state;
}
