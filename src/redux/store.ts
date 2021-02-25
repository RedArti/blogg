import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import articlesReducer from './reducers/articlesReducer';
import selfArticleReducer from './reducers/selfArticleReducer';
import loginReducer from './reducers/loginReducer';
import tagsReducer from './reducers/tagsReducer';
import modalReducer from './reducers/modalReducer';

const reducers = combineReducers({
  articlesReducer,
  selfArticleReducer,
  loginReducer,
  tagsReducer,
  modalReducer,
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
export type RootState = ReturnType<typeof reducers>;
export default store;