// import axios from "axios";
// import {apiUrl} from "../../../../configs/config.json"


// const apiEndpoint = apiUrl;

// // const instance = axios.create({
// //     baseUrl,
// //     timeout:1000,
// //     headers:{'Athorization':'Bearer '+ localStorage.getItem("JwtBearerToken")}
// // })

// const config = {
//   headers: {
//     Authorization: "Bearer " + localStorage.getItem("JwtBearerToken"),
//   },
// };

// export default {
//   baseHttp(controllerName) {
//     return {
//       fetchAll: () => axios.get(apiEndpoint+controllerName + "get/", config),
//       fetchById: (id) => axios.get(apiEndpoint+controllerName + id),
//       create: (newRecord) => axios.post(apiEndpoint+controllerName + "create/", newRecord),
//       update: (id, updateRecord) => axios.put(apiEndpoint+controllerName + "update/", updateRecord),
//       delete: (id) => axios.delete(apiEndpoint+controllerName + "PermanentDeleteById/" + id),
//     };
//   },
// };
