import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import App from './components/app';
import reducers from './reducers';
import RecipeListing from './containers/recipe-listing';
import RecipeDetail from './containers/recipe-detail';
import Profile from './containers/profile';
import Events from './components/events';
import Login from './containers/login';
import SearchKeywordResult from './containers/search-keyword-result';
import SearchTagResult from './containers/search-tag-result';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={browserHistory}>
            <Route path="/recipes/" component={App}>
                <IndexRoute component={RecipeListing}/>
                <Route path="/recipes/:id" component={RecipeDetail}/>
                <Route path="/login/" component={Login}/>
                <Route path="/profile/" component={Profile}/>
                <Route path="/events/:id" component={Events}/>
                <Route path="/search/keyword/:keyword" component={SearchKeywordResult}/>
                <Route path="/search/tag/:tagid" component={SearchTagResult}/>
            </Route>
        </Router>
  </Provider>
  , document.querySelector('.container'));
