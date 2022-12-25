import React from "react"
import "../../../assets/scss/pages/dashboard-analytics.scss"
import { userTypes } from "../../../constants/userTypeConstant";
import Consultant from "../../SMS/Dashboard/Pages/Consultant/Index";
import SuperAdmin from "../../SMS/Dashboard/Pages/SuperAdmin/Index";
import AdmissionManager from "../../SMS/Dashboard/Pages/AdmissionManager/Index";
import Admin from "../../SMS/Dashboard/Pages/Admin/Index";
import Provider from "../../SMS/Dashboard/Pages/Provider/Index";
import BranchManager from "../../SMS/Dashboard/Pages/BranchManager/Index";
import Student from "../../SMS/Dashboard/Pages/Student/Index";
import AccountManager from "../../SMS/Dashboard/Pages/AccountManager/Index";
import Editor from "../../SMS/Dashboard/Pages/Editor/Index";
import FinanceManager from "../../SMS/Dashboard/Pages/FinanceManager/Index";
import AccountOfficer from "../../SMS/Dashboard/Pages/AccountOfficer/Index";
import ComplianceManager from "../../SMS/Dashboard/Pages/ComplianceManager/Index";
import ProviderAdmin from "../../SMS/Dashboard/Pages/ProviderAdmin/Index";
import AdmissionOfficer from "../../SMS/Dashboard/Pages/AdmissionOfficer/Index";


const AnalyticsDashboard = () => {

  const currentUser = JSON?.parse(localStorage.getItem('current_user'));

  //fetch('https://localhost:44349/api/Values')
  //  .then(response => response.json())
  //  .then(data => {
 
  //  });

  return (
    <div>

   
    {
      currentUser.userTypeId == userTypes?.SystemAdmin && 
      <SuperAdmin/>
    }

    {
      currentUser.userTypeId == userTypes?.Admin && 
      <Admin/>
      }

    {
      currentUser.userTypeId == userTypes?.AdmissionManager && 
      <AdmissionManager/>
      }

    {
      currentUser.userTypeId == userTypes?.Provider && 
      <Provider/>
      }

    {
      currentUser.userTypeId == userTypes?.BranchManager && 
      <BranchManager/>
      }

    {
      currentUser.userTypeId == userTypes?.Student && 
      <Student/>
      }

    {
      currentUser.userTypeId == userTypes?.AccountManager && 
      <AccountManager/>
      }

    {
      currentUser.userTypeId == userTypes?.Editor && 
      <Editor/>
      }

    {
      currentUser.userTypeId == userTypes?.FinanceManager && 
      <FinanceManager/>
      }

    {
      currentUser.userTypeId == userTypes?.AccountOfficer && 
      <AccountOfficer/>
      }

    {
      currentUser.userTypeId == userTypes?.ComplianceManager && 
      <ComplianceManager/>
      }

    {
      currentUser.userTypeId == userTypes?.ProviderAdmin && 
      <ProviderAdmin/>
      }

    {
      currentUser.userTypeId == userTypes?.AdmissionOfficer && 
      <AdmissionOfficer/>
      }

    {
      currentUser.userTypeId == userTypes?.Consultant && 
      <Consultant/>
      }


      </div>

  )

}

export default AnalyticsDashboard
