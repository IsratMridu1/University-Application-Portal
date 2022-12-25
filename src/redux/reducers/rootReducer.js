import { combineReducers } from "redux"
import chatReducer from "./chat/"
import customizer from "./customizer/"
import auth from "./auth/"

import { country } from "../reducers/core/country/country";
import { designation } from '../reducers/core/designation/designation';
import { companyBranch } from '../reducers/company/companyBranch/companyBranch';
import { companyContactInformation } from '../reducers/company/companyContactInformation/companyContactInformation';
import { companyInformation } from '../reducers/company/companyInformation/companyInformation';
import { noticeForEmployee } from '../reducers/notice/noticeForEmployee/noticeForEmployee';
import { noticeItem } from '../reducers/notice/noticeItem/noticeItem';

import { city } from '../reducers/core/city/city';
import { state } from '../reducers/core/state/state';
import { application } from '../reducers/recruitments/application/application';
import { jobCircular } from '../reducers/recruitments/jobCircular/jobCircular';
import { client } from '../reducers/clients/client/client';
import { clientType } from '../reducers/clients/clientType/clientType';
import { commentDataReducer } from "./SMS/DemoReducers";
import { postDataReducer } from "./SMS/DemoReducers";
import { todoDataReducer } from "./SMS/DemoReducers";
import { roleDataReducer } from "./SMS/RoleReducer";
import { parentMenuItemReducer } from "./SMS/MenuReducers";

import { permissionsDataReducer } from "./SMS/PermissionsReducer";
import { employeeTypeDataReducer } from "./SMS/Employees/EmployeesTypeReducers";
import { employeeProfileDataReducer } from "./SMS/Employees/EmployeeProfileReducers";
import { universityTypeDataReducer } from "./SMS/UniversityTypeReducer";
import { universityListReducer } from "./SMS/UniversityListReducer";
import { universityCampusListReducer } from "./SMS/UniversityCampusListReducer";
import { universityCountryDataReducer } from "./SMS/UniversityCountryReducer";
import { universityProviderDataReducer } from "./SMS/Provider/UniversityProviderReducer";
import { GeneralProviderlogoFile } from "./SMS/Provider/ProviderLogoFileReducer";
import { universityStateDataReducer } from "./SMS/UniversityStateReducer";

// UniversitySubject
import{departmentDataReducer} from "./SMS/UniversitySubject/DepartmentReducer"
import{subDepartmentDataReducer} from "./SMS/UniversitySubject/SubDepartmentReducer"
import{programLevelDataReducer} from "./SMS/UniversitySubject/ProgramLevelReducer"

import { UniversityLogoImageReducer } from "./SMS/UniversityLogoImageReducer";
import { UniversityCoverImageReducer } from "./SMS/UniversityCoverImageReducer";
import { UniversityGalleryImageReducer } from "./SMS/UniversityGalleryImageReducer";
import { employeeProfileImageReducer } from "./SMS/Employees/EmployeeImageReducers";
import { employeeCoverDataReducer } from "./SMS/Employees/EmployeeCoverReducers";
import { SightSettingLogoDataReducer } from "./SMS/SiteSetting/SiteSettingLogoImageReducer";
import { SightSettingCoverIconReducer } from "./SMS/SiteSetting/SiteSettingCoverIconReducer";

import { ManagerImageReducer } from "./SMS/Branch/ManagerImageReducer";
import { BranchEmployeeProfileImageReducer } from "./SMS/Branch/EmployeeProfileImageReducer";
import { BranchEmployeeCoverImageReducer } from "./SMS/Branch/EmployeeCoverImageReducer";

import { ConsultantFileReducer } from "./SMS/Consultant/ConsultantFileReducer";

import { StudentProfileImageReducer } from "./SMS/Students/StudentsProfileImageReducer";





const rootReducer = combineReducers({
  chatApp: chatReducer,
  customizer: customizer,
  auth: auth,

  country,
  designation,
  companyBranch,
  companyContactInformation,
  companyInformation,
  noticeForEmployee,
  noticeItem,
  city,
  state,
  application,
  jobCircular,
  client,
  clientType,


  // SMS Reducers
  commentDataReducer,
  postDataReducer,
  todoDataReducer,

  roleDataReducer,
  permissionsDataReducer,
  parentMenuItemReducer,

  employeeTypeDataReducer,
  employeeProfileDataReducer,
  universityTypeDataReducer,
  universityListReducer,
  universityCampusListReducer,
  universityCountryDataReducer,
  universityProviderDataReducer,
  universityStateDataReducer,

// UniversitySubject
  departmentDataReducer,
  subDepartmentDataReducer,
  programLevelDataReducer,

// University Logo Image
  UniversityLogoImageReducer,

// University Gallery Image
  UniversityGalleryImageReducer,

// University Cover Image 
  UniversityCoverImageReducer,

// Employee Profile Image
  employeeProfileImageReducer, 

// Employee Cover Image
  employeeCoverDataReducer,


  SightSettingLogoDataReducer,

  SightSettingCoverIconReducer,

  // Branch Manager Image
  ManagerImageReducer,

  // Branch Employee Images
  BranchEmployeeProfileImageReducer,
  BranchEmployeeCoverImageReducer,

  // Consultant

  ConsultantFileReducer,

  //  Student profile image reducer
  StudentProfileImageReducer,

  // General Provider Logo
  GeneralProviderlogoFile 

  



})

export default rootReducer
