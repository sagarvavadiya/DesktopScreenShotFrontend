import {
  GET_COMMONDATA,
  GET_COMMONDATA_SUCCESS,
  GET_COMMONDATA_FAIL,
} from "./actionTypes"

export const getCommonData = payload => ({
  type: GET_COMMONDATA,
  payload: payload,
})

export const getCommonDataSuccess = commonData => ({
  type: GET_COMMONDATA_SUCCESS,
  payload: commonData,
})

export const getCommonDataFail = error => ({
  type: GET_COMMONDATA_FAIL,
  payload: error,
})
