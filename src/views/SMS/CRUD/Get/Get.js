import React, { useEffect, useState } from 'react';
import { Item } from 'react-contexify';
import get from '../../../../helpers/get';
import GetShow from './GetShow';

const Get = () => {
    const [data,setData] = useState([]);
    const url = 'UniversityType/Index';
  useEffect(()=>{
    get(url).then(res =>{
        setData(res);
    })
    .then()
  },[])

  
    return (
        <div>
            <h1 className='text-center'>Total  number of records found: {data.length}</h1>

            <div className='container'>
            <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Action</th>
    
    </tr>
  </thead>
  <tbody>
  {
      data.map(item => <GetShow
      item={item}
      >

      </GetShow>)
  }
   
  </tbody>
</table>

            </div>
            
            
        </div>
    );
};

export default Get;