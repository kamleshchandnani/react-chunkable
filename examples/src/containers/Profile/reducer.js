import { FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from "./actions";

/**
 * Based on the type of action the respective case will be executed and the state would be changed
 * After the state changes the components which have subscribed to state changes via mapStateToProps will be called and the componentDidMount will be invoked of the component
 */
const initialState = {
  userData: null,
  error: null
};
export default (state = initialState, action) => {
  switch (action.type) {
    // For success creaate new lead
    case FETCH_USER_SUCCESS:
      return { ...state, userData: action.reposData };
    case FETCH_USER_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
