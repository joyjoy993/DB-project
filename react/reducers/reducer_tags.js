import {FETCH_TAGS} from '../actions/const';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_TAGS:
            return action.payload.data.tags;
    }
    return state;
}
