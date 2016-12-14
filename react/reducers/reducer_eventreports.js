import {FETCH_EVENTREPORT} from '../actions/const';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_EVENTREPORT:
            return action.payload.data.eventreports;
    }
    return state;
}
