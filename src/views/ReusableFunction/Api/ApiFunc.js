import Axios from "axios";
import { useHistory } from "react-router-dom";
export const rootUrl = `https://192.168.0.123:45457/`
// Get Function
export async function get(url){
  let status;
  let data;
  // await Axios.get(`${url}`)
  // .then(res => {
  //     status = res.data.message
  //     data = res.data.result;

  // })
  // return data;
  const res = await Axios.get(`${url}`)
  status = res.data.message;
  data = res.data.result;
  
  return data;
}

// Post Function
export async function post(url,body){

  let status;
  let data;

  // await Axios.post(`${url}`,body)
  // .then(res => {

  //   // (res.status === 200 && res.data.isSuccess === true) ?
  //   // status = 'success' : status = res.data.message;
  //   status = res.data.message;
  //   // data = res.data.result;
  // })
    const res =await Axios.post(`${url}`,body)
    // (res.status === 200 && res.data.isSuccess === true) ?
    // status = 'success' : status = res.data.message;
    status = res.data.message;
    // data = res.data.result;

  return status;
}


// Update Function
export async function update(url,body){
  let status;
  let data;
  // await Axios.put(`${url}`,body)
  // .then(res => {

 
  //   status = res.data.message
  //   data = res.data.result;
  // })
  const res = await Axios.put(`${url}`,body)

 
  
    status = res.data.message
    data = res.data.result;

  return status;
}


// Delete Function
export async function del(url){
  let status;
  let data;
  // await Axios.delete(`${url}`)
  // .then(res => {
 
 
  //   // (res.status === 200 && res.data.isSuccess === true) ?
  //   // status = 'success' : status = res.data.message;
  //   status = res.data.message;
  // })
    const res = await Axios.delete(`${url}`)
  
    
    // (res.status === 200 && res.data.isSuccess === true) ?
    // status = 'success' : status = res.data.message;
    status = res.data.message;

  return status;
}
