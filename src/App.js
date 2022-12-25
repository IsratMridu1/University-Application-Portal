import React, { useEffect } from "react";

import "./components/core/rippleButton/RippleButton"
import Router from "./Router"
import "react-perfect-scrollbar/dist/css/styles.css"
import "prismjs/themes/prism-tomorrow.css"

import "./components/core/rippleButton/RippleButton";

import "react-perfect-scrollbar/dist/css/styles.css";
import "prismjs/themes/prism-tomorrow.css";

import { useDispatch } from 'react-redux';
import { StoreRoleData } from './redux/actions/SMS/RoleAction/RoleAction';
import {StoreEmployeeTypeData} from './redux/actions/SMS/Employees/EmployeesTypeAction';
import { StoreUniversitytypeData } from "./redux/actions/SMS/UniversityAction/UniversityTypeAction";
import { StoreUniversityCountryData } from "./redux/actions/SMS/UniversityAction/UniversityCountryAction";
import { StoreUniversityStateData } from "./redux/actions/SMS/UniversityAction/UniversityStateAction";
import get from "./helpers/get";

const App = (props) => {
  const dispatch = useDispatch();

  // useEffect(()=>{
  //    get(`UserRole/Index`).then((action)=>{
  //     dispatch(StoreRoleData(action))
  //   });
  // },[dispatch]);

  // useEffect(()=>{
  //    get(`EmployeTypeDD/Index`).then((action)=>{
  //     // dispatch(StoreRoleData(action))
  //     dispatch(StoreEmployeeTypeData(action))
  //   });
  // })

  // useEffect(()=> {
  //    get(`UniversityType/Index`).then((action)=>{
     
  //       dispatch(StoreUniversitytypeData(action))
  //     });
  // },[dispatch])

  // useEffect(()=> {
  //   get(`UniversityCountry/Index`).then((action)=>{
   
  //       dispatch(StoreUniversityCountryData(action))
  //     });
  // },[dispatch])

  // useEffect(()=>{
  //    get(`UniversityState/Index`).then((action)=> {
  //     dispatch(StoreUniversityStateData(action));
  //   })
  // },[dispatch])

  // EmployeType/Index
  // return <Router />
 return (
  
  <Router />


 )
}

export default App
