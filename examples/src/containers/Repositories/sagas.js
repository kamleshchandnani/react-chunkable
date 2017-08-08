import { put, call, takeLatest, all } from "redux-saga/effects";
import { fetchReposSuccess, fetchReposFailure, FETCH_REPOS } from "./actions";
import getRepos from "../../api/repos";
import sagasManager from "../../store/SagasManager";

function* handleFetchRepos({ username }) {
  try {
    const reposData = yield call(getRepos, username);
    if (reposData.length) {
      yield put(fetchReposSuccess(reposData));
    } else {
      yield put(fetchReposFailure("No data Found"));
    }
  } catch (e) {
    yield put(fetchReposFailure(`Fetch Repos failed:: ${e}`));
    console.log("Fetch Repos failed", e);
  }
}

/*
 * Adding listeners to root saga
 */
// const sagas = () => {

sagasManager.addSagaToRoot(function* watcher() {
  yield all([takeLatest(FETCH_REPOS, handleFetchRepos)]);
});
