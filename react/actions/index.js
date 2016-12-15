import axios from 'axios';
import {
    FETCH_RECIPES, FETCH_RECIPE, FETCH_CURRENTUSER, FETCH_GROUPS, FETCH_POSTS, FETCH_EVENTS,
    FETCH_TAGS, FETCH_EVENTREPORT, FETCH_RESULTS, FETCH_USEREVENTS, FETCH_REVIEWS
} from './const';

export function fetchRecipes() {
    const request = axios.get("/api/v1/recipes/");

    return {
        type: FETCH_RECIPES,
        payload: request
    };
}

export function fetchRecipe(recipeId) {
    const request = axios.get(`/api/v1/recipes/${recipeId}`);

    return {
        type: FETCH_RECIPE,
        payload: request
    };
}

export function fetchReviews(recipeId) {
    const request = axios.get(`/api/v1/reviews/${recipeId}`);

    return {
        type: FETCH_REVIEWS,
        payload: request
    };
}

export function fetchCurrentUser() {
    const request = axios.get('/api/v1/current-user/');

    return {
        type: FETCH_CURRENTUSER,
        payload: request
    };
}

export function fetchGroups() {
    const request = axios.get('/api/v1/user-groups/');

    return {
        type: FETCH_GROUPS,
        payload: request
    };
}

export function fetchPosts() {
    const request = axios.get('/api/v1/user-recipes/');

    return {
        type: FETCH_POSTS,
        payload: request
    };
}

export function fetchEvents(groupId) {
    const request = axios.get(`/api/v1/events/${groupId}`);

    return {
        type: FETCH_EVENTS,
        payload: request
    };
}

export function fetchTags(groupId) {
    const request = axios.get('/api/v1/tags/');

    return {
        type: FETCH_TAGS,
        payload: request
    };
}

export function fetchResults(keyword) {
    const request = axios.post(`/api/v1/search/${keyword}`);

    return {
        type: FETCH_RESULTS,
        payload: request
    };
}

export function fetchUserEvents() {
    const request = axios.get('/api/v1/user-events/');

    return {
        type: FETCH_USEREVENTS,
        payload: request
    };
}

