import {FETCH_RESULTS} from '../actions/const';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_RESULTS:
            return action.payload.data.recipes;
    }
    return state;
}
