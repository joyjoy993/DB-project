import {FETCH_GROUPS} from '../actions/const';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_GROUPS:
            return action.payload.data.groups;
    }
    return state;
}
