import { put, call, takeLatest, all } from "redux-saga/effects";
import { fetchUserSuccess, fetchUserFailure, FETCH_USER } from "./actions";
import getUser from "../../api/user";
import sagasManager from "../../store/SagasManager";

function* handleFetchUser({ username }) {
  try {
    const userData = yield call(getUser, username);
    if (userData.username) {
      yield put(fetchUserSuccess(userData));
    } else {
      yield put(fetchUserFailure("No data Found"));
    }
  } catch (e) {
    yield put(fetchUserFailure(`Fetch User failed:: ${e}`));
    console.log("Fetch User failed", e);
  }
}

/*
 * Adding listeners to root saga
 */
// const sagas = () => {

sagasManager.addSagaToRoot(function* watcher() {
  yield all([takeLatest(FETCH_USER, handleFetchUser)]);
});
