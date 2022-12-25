import axios from "axios";

const baseUrl = "https://localhost:5001/api/";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("JwtBearerToken"),
  },
};

export default {
  clientType(url = baseUrl + "clientType/") {
    return {
      fetchAll: () => axios.get(url + "Get/", config),
      fetchById: (id) => axios.get(url + id),
      create: (newRecord) => axios.post(url + "create/", newRecord),
      update: (id, updateRecord) => axios.put(url + "update/", updateRecord),
      delete: (id) => axios.delete(url + "PermanentDeleteById/" + id),
    };
  },
};
