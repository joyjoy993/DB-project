import {FETCH_POSTS} from '../actions/const';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return action.payload.data.posts;
    }
    return state;
}
