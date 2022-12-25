import api from "./api";
import axios from "axios";
import * as baseActions from "../baseActions/baseActions"

export const ACTION_TYPES = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  FETCH_ALL: "FETCH_ALL",
};
const apiController = "country/"

export const fetchAll = () => (dispatch) => {
   baseActions.fetchAll(apiController,dispatch)
};

export const create = (data, onSuccess) => (dispatch) => {
 
  baseActions.create(apiController,data,onSuccess,dispatch)
  
};

export const update = (id, data, onSuccess) => (dispatch) => {
  baseActions.update(apiController,id,data,onSuccess,dispatch)
  
};

export const Delete = (id, onSuccess) => (dispatch) => {
  baseActions.Delete(apiController,id,onSuccess,dispatch)
  
};



export const getInitialData = () => {
  return async (dispatch) => {
    await axios.get("http://localhost:5001/api/country").then((response) => {
      dispatch({ type: "GET_ALL_DATA", data: response.data });
    });
  };
};

export const filterData = (value) => {
  return (dispatch) => dispatch({ type: "FILTER_DATA", value });
};
