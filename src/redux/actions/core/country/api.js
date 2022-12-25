import axios from "axios";
import {apiUrl} from "../../../../configs/config.json"


const apiEndpoint = apiUrl+ "country/";

// const instance = axios.create({
//     baseUrl,
//     timeout:1000,
//     headers:{'Athorization':'Bearer '+ localStorage.getItem("JwtBearerToken")}
// })

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("JwtBearerToken"),
  },
};

export default {
  country() {
    return {
      fetchAll: () => axios.get(apiEndpoint + "get/", config),
      fetchById: (id) => axios.get(apiEndpoint + id),
      create: (newRecord) => axios.post(apiEndpoint + "create/", newRecord),
      update: (id, updateRecord) => axios.put(apiEndpoint + "update/", updateRecord),
      delete: (id) => axios.delete(apiEndpoint + "PermanentDeleteById/" + id),
    };
  },
};
