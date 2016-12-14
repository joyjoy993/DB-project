import { combineReducers } from 'redux';
import RecipeReducer from './reducer_recipe';
import RecipesReducer from './reducer_recipes';
import CurrentUserReducer from './reducer_currentuser';
import GroupsReducer from './reducer_groups';
import PostsReducer from './reducer_posts';
import EventsReducer from './reducer_events';
import TagsReducer from './reducer_tags';
import ResultsReducer from './reducer_results';
import ReviewsReducer from './reducer_reviews';
import UserEventsReducer from './reducer_userevents';
import EventReportReducer from './reducer_eventreports';

const rootReducer = combineReducers({
    recipe: RecipeReducer,
    recipes: RecipesReducer,
    user: CurrentUserReducer,
    groups: GroupsReducer,
    posts: PostsReducer,
    events: EventsReducer,
    tags: TagsReducer,
    results: ResultsReducer,
    reviews: ReviewsReducer,
    userevents: UserEventsReducer,
    eventreports: EventReportReducer
});

export default rootReducer;