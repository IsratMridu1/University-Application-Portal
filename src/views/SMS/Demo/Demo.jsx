import axios from 'axios';
import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { connect, useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import { UncontrolledTooltip, Button, Card, FormGroup } from 'reactstrap';
import get from '../../../helpers/get';

import post from '../../../helpers/post';
import { StoreCommentData } from '../../../redux/actions/SMS/DemoActions/DemoActions'
import { commentDataReducer } from '../../../redux/reducers/SMS/DemoReducers'
import { roleDataReducer } from '../../../redux/reducers/SMS/RoleReducer';
import rootUrl from '../../../constants/constants'
import { Select } from 'antd';
import "antd/dist/antd.css";



const Demo = () => {
  const dispatch = useDispatch()

  const role = useSelector((state) => state.roleDataReducer.roles)

  const [formType, setFormType] = useState([]);

  const [addressLineName, setAddressLineName] = useState(
    "Select Address Type..."
  );
  const [addressLineValue, setAddressLineValue] = useState(0);
  const [dat,setDat] = useState([
    {
      label: "Group 1",
      options: [
        { label: "Group 1, option 1", value: "value1" },
        { label: "Group 1, option 2", value: "value2" }
      ]
    },
    { label: "A root option", value: "value3" },
    { label: "Another root option", value: "value4" }
  ])


 
  // Fetching get api
  useEffect(()=>{

    get('Practice/GetAttribute')
    .then(res => {
      console.log('dynamic form', res);
      setFormType(res);
    })

    Axios.get(`http://192.168.0.10:45455/Test/index`,{ 
      method: 'GET',
    'headers': { 'Authorization': localStorage.getItem('token') } })
    .then(res => {
      console.log('checking', res);
    })


  //   fetch('http://192.168.0.119:45455/Test/index',{
  //     method: 'GET',
  //     headers:{
  //         'content-type' : 'application/json',
  //         'token' : localStorage.getItem('token')

  //     },
    

  // })
  // .then(res => res.json())
  // .then(data => {
  //   console.log('checking', data);
  // })

//   fetch('http://192.168.0.119:45455/Account/GetCurrentUser',{
//     method: 'GET',
//     headers:{
//         'content-type' : 'application/json',
      

//     }
  

// })
// .then(res => res.json())
// .then(data => {
//   console.log('checking', data);
// })
  
  },[]);

  // const data = [
    
  //   {
  //       id: 1,
  //       name: 'Stokes'
  //   },
  //   {
  //       id: 2,
  //       name: 'butler'
  //   },
  //   {
  //       id: 3,
  //       name: 'root'
  //   },
  //   {
  //       id: 4,
  //       name: 'bairstow'
  //   }
    
  //   ]

    // const addressLineOpt = dat?.map((add) => ({
    //   label: add.name,
    //   value: add.id,
    // }));


      // select Address Line
  // const selectAddressLine = (label, value) => {
  //   setAddressLineName(label);
  //   setAddressLineValue(value);

  //   const newDat = dat.filter((label,value) => dat?.name !== label && dat?.id !== value );
    
  //   setDat(newDat);
  //   console.log(newDat);
 
   
  

  // console.log('Practising a new thing',dat);

// const handleSubmit  = (event) => {

//   event.preventDefault();

//   const subdata = new FormData(event.target);

//   for (var x of subdata.values()){
//     console.log(x);
//   }

// }



  // Fetching post api
 

  const options = [
    {
      label: "Bd",
      options: [
        { label: "Dhaka", value: 1 },
       
      ]
    },
    {
      label: "Eng",
      options: [
        { label: "London", value: 2 },
        { label: "Bristol", value: 3}
      ]
    },
    {
      label: "Aus",
      options: [
        { label: "Sydney", value: 4 },
        
      ]
    },
   
  ];

  const values = options?.map((x)=> ({
    label: x?.label,
    value: x?.options?.map((c)=> ({
      label : c?.label,
      value: c?.value
    }))
  }))
    

  // const newValues = values.b.map((y) => ({
  //   e: y.label,
  //   f: y.value
  // }))

  console.log('mapping object from optGroup', values);

  

  // console.log('second mapping for inner array', values?.b);

  const { Option, OptGroup } = Select;

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };



  return (


   
    
 <div className='d-flex justify-content-center'>

<Select options={options} className='me-2'
     style={{
      width: '25%',
   
    }}
    />



{/* <Select
className='ms-2'
    defaultValue="lucy"
    style={{
      width: '25%',
   
    }}
    onChange={handleChange}
  >
    <OptGroup label="Manager">
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
    </OptGroup>
    <OptGroup label="Engineer">
      <Option value="Yiminghe">yiminghe</Option>
    </OptGroup>
  </Select> */}

 </div>
    

      
      

  )
}


export default Demo;
