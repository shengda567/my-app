/**
 * reducer
 */

import { combineReducers } from "redux";
import { type } from "../action";

const initialState = {
  userinfo: {},
};

const ebikeData = (state, action) => {
  switch (action.type) {
    case type.ADD_SESSION:
      return {
        ...state,
        userinfo: action.userinfo,
      };
    default:
      return { ...state };
  }
};

export default ebikeData;
