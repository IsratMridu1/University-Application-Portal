import axios from "axios";
import baseApi from "./baseApi"


export const ACTION_TYPES = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  FETCH_ALL: "FETCH_ALL",
};

const formateData = (data) => ({
  ...data,
});



export function fetchAll(controllerName,dispatch){
    return (baseApi
    .baseHttp(controllerName)
    .fetchAll()
    .then((response) => {
      
      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: response.data.result,
      });
    })
    .catch((err) => "error")
    )
}

export function create (controllerName,data, onSuccess,dispatch) {
  data = formateData(data);
  return (
    baseApi
    .baseHttp(controllerName)
    .create(data)
    .then((res) => {
     
      dispatch({
        type: ACTION_TYPES.CREATE,
        payload: res.data.result,
      });
      baseApi
      .baseHttp(controllerName)
        .fetchAll()
        .then((response) => {
          dispatch({
            type: ACTION_TYPES.FETCH_ALL,
            payload: response.data.result,
          });
        });

      onSuccess();
    })
    .catch()
  )
};

export function update (controllerName,id, data, onSuccess,dispatch) {
  data = formateData(data);
  return(baseApi
    .baseHttp(controllerName)
    .update(id, data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.UPDATE,
        payload: { id, ...data },
      });
      onSuccess();
    })
    .catch()
  )
};

export function Delete (controllerName,id, onSuccess,dispatch)  {
  return (baseApi
    .baseHttp(controllerName)
    .delete(id)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.DELETE,
        payload: id,
      });
      onSuccess();
    })
    .catch()
  )
};


