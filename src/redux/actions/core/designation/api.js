import axios from "axios";

const baseUrl = "https://localhost:5001/api/";

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
  designation(url = baseUrl + "designation/") {
    return {
      fetchAll: () => axios.get(url + "Get/", config),
      fetchById: (id) => axios.get(url + "GetDetails/" + id),
      create: (newRecord) => axios.post(url + "Create/", newRecord),
      update: (id, updateRecord) => axios.put(url + "Update/", updateRecord),
      delete: (id) => axios.post(url + "PermanentDeleteById/" + id),
    };
  },
};
