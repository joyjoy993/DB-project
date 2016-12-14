import {FETCH_RECIPES} from '../actions/const';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_RECIPES:
            return action.payload.data.recipes;
    }
    return state;
}
