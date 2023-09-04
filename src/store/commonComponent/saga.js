import { takeEvery, put, call } from "redux-saga/effects"

// Calender Redux States
import { GET_COMMONDATA } from "./actionTypes"
import { getCommonDataSuccess, getCommonDataFail } from "./actions"

//Include Both Helper File with needed methods
import {
  getEvents,
  addNewEvent,
  updateEvent,
  deleteEvent,
  getCategories,
  PostApi,
} from "../../helpers/fakebackend_helper"

function* onGetCommonData({ payload: event }) {
  try {
    const response = yield call(PostApi, event)

    yield put(getCommonDataSuccess(response))
  } catch (error) {
    yield put(getCommonDataFail(error))
  }
}

function* commonDataSaga() {
  yield takeEvery(GET_COMMONDATA, onGetCommonData)
}

export default commonDataSaga
