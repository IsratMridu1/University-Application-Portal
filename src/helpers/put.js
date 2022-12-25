import Axios from "axios";

import history from "./history";
import { rootUrl } from "../constants/constants";

const AuthStr = localStorage.getItem("token");
async function put(url, body = {}, authToken = "") {
  try {
    const res = await Axios.put(`${rootUrl}${url}`, body, {
      headers: {
        "authorization": AuthStr,
      },
    });
    return await res;
  } catch (error) {
    return error;
    // if (error.response.status === 404) {
    //   history.push("/404");
      
    // }
    // else if(error.response.status === 400){
    //   history.push('/400')
    // }

    // throw error;
  }
}

export default put;
