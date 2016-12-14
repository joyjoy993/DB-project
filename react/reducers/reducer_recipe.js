import {FETCH_RECIPE} from '../actions/const';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_RECIPE:
            return action.payload.data.recipe;
    }
    return state;
}
