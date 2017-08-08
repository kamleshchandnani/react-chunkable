export const FETCH_USER = "FETCH_USER";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export const fetchUser = username => ({ type: FETCH_USER, username });
export const fetchUserSuccess = reposData => ({
  type: FETCH_USER_SUCCESS,
  reposData
});
export const fetchUserFailure = error => ({
  type: FETCH_USER_FAILURE,
  error
});
