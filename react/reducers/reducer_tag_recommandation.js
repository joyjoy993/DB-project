import {FETCH_TAGRECOMMANDATION} from '../actions/const';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_TAGRECOMMANDATION:
            return action.payload.data.tagrecommandation;
    }
    return state;
}
