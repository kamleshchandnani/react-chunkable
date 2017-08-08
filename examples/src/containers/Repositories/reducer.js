import { FETCH_REPOS_SUCCESS, FETCH_REPOS_FAILURE } from "./actions";

/**
 * Based on the type of action the respective case will be executed and the state would be changed
 * After the state changes the components which have subscribed to state changes via mapStateToProps will be called and the componentDidMount will be invoked of the component
 */
const initialState = {
  reposData: null,
  error: null
};
export default (state = initialState, action) => {
  switch (action.type) {
    // For success creaate new lead
    case FETCH_REPOS_SUCCESS:
      return { ...state, reposData: action.reposData };
    case FETCH_REPOS_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
