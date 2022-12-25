import Axios from 'axios'

import history from './history'
import { rootUrl } from '../constants/constants'

const AuthStr = localStorage.getItem("token");

async function get(url, authToken = ""){

    
   
   try {
    const res = await Axios.get(`${rootUrl}${url}`,{

      headers: {
        'authorization': AuthStr
      }
    })
    return await res?.data?.result
   }
    catch (error) {

        // if(error?.response?.status  === 404){
        //     history.push('/404')
        // }

        

        throw error
   }
   
}

export default get


