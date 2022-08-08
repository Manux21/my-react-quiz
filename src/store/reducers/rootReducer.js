import {combineReducers} from 'redux'
import quizReducer from "./quiz";
import createReducer from "./сreate";

export default combineReducers({
  quiz: quizReducer,
  create: createReducer

})