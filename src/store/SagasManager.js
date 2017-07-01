/**
 * Sagas file
 * 1.Saga intercepts all the actions before they go to reducer
 * 2.yield method pauses the execution until it is finished
 * 3.yield has several functions
 *  i. takeEvery(intercepts the action types i.e listens to that type of action)
 *  ii. put(dispatch the action to reducer)
 *  iii. call(call some external functions like API calls)
 *  iv. select(get the state of any object from the store)
 * 4.Saga methods passes the action object to the saga so we can access the data in action object
 */

/*
* This is a utility class
* import this class in our individual sagas and call the function addSagaToRoot and push all our action listeners
* getRootSagaSaga is called from store file which activates all our listeners
*/
import { all, flush, fork,take } from "redux-saga/effects";
import { channel } from "redux-saga";
class SagasManager {
  constructor() {
    this.sagasWithArguments = channel();
  }

  /**
   * Function to add our yielded sagas from individual saga files
   * @param {array} sagaWithArguments array of yielded watchers 
   * 
   * @memberOf SagasManager
   */
  addSagaToRoot(...sagaWithArguments) {
    this.sagasWithArguments.put([...sagaWithArguments]);
  }


  /**
   * Function to activate root saga.
   * This function forks all the watchers and registers them in the root.
   * @returns rootSaga function which is registered in store
   * 
   * @memberOf SagasManager
   */
  // getRootSaga() {

  //   const self = this;
  //   return function* rootSaga() {
  //     yield self.sagasWithArguments.map((sagaWithArguments) => fork(...sagaWithArguments));
  //   };
  // }

  getRootSaga() {
    const sagasChannel = this.sagasWithArguments;
    return function* rootSaga() {
      const initialSagas = yield flush(sagasChannel);
      yield all(initialSagas.map((initialSagaWithArguments) => fork(...initialSagaWithArguments)));

      while (true) {
        const dynamicSaga = yield take(sagasChannel)
        yield fork(...dynamicSaga)
      }
    };
  }
}

export default new SagasManager;