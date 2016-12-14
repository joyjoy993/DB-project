import {FETCH_REVIEWS} from '../actions/const';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_REVIEWS:
            return action.payload.data.reviews;
    }
    return state;
}
