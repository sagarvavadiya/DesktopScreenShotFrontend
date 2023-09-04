import {
  GET_COMMONDATA,
  GET_COMMONDATA_SUCCESS,
  GET_COMMONDATA_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  events: [],
  commonData: [],
  error: {},
}

const CommonData = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COMMONDATA_SUCCESS:
      console.log("GET_COMMONDATA_SUCCESS============>", action)
      return {
        ...state,
        commonData: action.payload,
      }

    case GET_COMMONDATA_FAIL:
      console.log("GET_COMMONDATA_FAIL============>")
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default CommonData
