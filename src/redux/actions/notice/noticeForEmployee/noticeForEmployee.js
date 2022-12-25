import api from "./api";
import axios from "axios";
export const ACTION_TYPES = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  FETCH_ALL: "FETCH_ALL",
};

const formateData = (data) => ({
  ...data,
});

export const fetchAll = () => (dispatch) => {
  api
    .noticeForEmployee()
    .fetchAll()
    .then((response) => {
     
      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: response.data.result,
      });
    })
    .catch((err) => "error");
};

export const create = (data, onSuccess) => (dispatch) => {
  data = formateData(data);
  
  api
    .noticeForEmployee()
    .create(data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.CREATE,
        payload: res.data,
      });
      onSuccess();
    })
    .catch();
};

export const update = (id, data, onSuccess) => (dispatch) => {
  data = formateData(data);
  api
    .noticeForEmployee()
    .update(id, data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.UPDATE,
        payload: { id, ...data },
      });
      onSuccess();
    })
    .catch();
};

export const Delete = (id, onSuccess) => (dispatch) => {
  api
    .noticeForEmployee()
    .delete(id)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.DELETE,
        payload: id,
      });
      onSuccess();
    })
    .catch();
};

export const getInitialData = () => {
  return async (dispatch) => {
    await axios
      .get("http://localhost:5001/api/noticeForEmployee")
      .then((response) => {
        dispatch({ type: "GET_ALL_DATA", data: response.data });
      });
  };
};

export const filterData = (value) => {
  return (dispatch) => dispatch({ type: "FILTER_DATA", value });
};
