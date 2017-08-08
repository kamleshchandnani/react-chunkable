export const FETCH_REPOS = "FETCH_REPOS";
export const FETCH_REPOS_SUCCESS = "FETCH_REPOS_SUCCESS";
export const FETCH_REPOS_FAILURE = "FETCH_REPOS_FAILURE";

export const fetchRepos = username => ({ type: FETCH_REPOS, username });
export const fetchReposSuccess = reposData => ({
  type: FETCH_REPOS_SUCCESS,
  reposData
});
export const fetchReposFailure = error => ({
  type: FETCH_REPOS_FAILURE,
  error
});
