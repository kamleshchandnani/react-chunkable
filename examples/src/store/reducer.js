import { combineReducers } from "redux";
import UserReducer from "../containers/Profile/reducer";
import ReposReducer from "../containers/Repositories/reducer";

const appReducer = combineReducers({
  userReducer: UserReducer,
  reposReducer: ReposReducer
});

export default appReducer;
