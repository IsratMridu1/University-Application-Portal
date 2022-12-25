import React, { Suspense, lazy } from "react"
import { Router, Switch, Route } from "react-router-dom"
import { history } from "./history"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import Spinner from "./components/core/spinner/Loading-spinner"
import { ContextLayout } from "./utility/context/Layout"


import { ToastProvider } from "react-toast-notifications";
import AdmissionGetData from "./views/Test/AdmissionGetData"


import {permissionList} from './constants/AuthorizationConstant'







// Authentication Checking
const token = localStorage.getItem('token');
const permissions= JSON.parse(localStorage.getItem('permissions'));

const isAuth = token != null ? true : false;
const permission = JSON.parse(localStorage.getItem("current_user"));


// Route-based code splitting
const analyticsDashboard = lazy(() =>
  import("./views/dashboard/analytics/AnalyticsDashboard")
)

// trial dashboard start
// const analyticsDashboard = lazy(() =>
//   import("./views/SMS/Dashboard/Pages/ProviderAdmin/Index")
// )
// trial dashboard end

const select = lazy(() => import("./views/forms/form-elements/select/Select"))
const switchComponent = lazy(() =>
  import("./views/forms/form-elements/switch/Switch")
)
const checkbox = lazy(() =>
  import("./views/forms/form-elements/checkboxes/Checkboxes")
)
const radio = lazy(() => import("./views/forms/form-elements/radio/Radio"))
const input = lazy(() => import("./views/forms/form-elements/input/Input"))
const group = lazy(() =>
  import("./views/forms/form-elements/input-groups/InputGoups")
)
const numberInput = lazy(() =>
  import("./views/forms/form-elements/number-input/NumberInput")
)
const textarea = lazy(() =>
  import("./views/forms/form-elements/textarea/Textarea")
)
const pickers = lazy(() =>
  import("./views/forms/form-elements/datepicker/Pickers")
)
const inputMask = lazy(() =>
  import("./views/forms/form-elements/input-mask/InputMask")
)
const layout = lazy(() => import("./views/forms/form-layouts/FormLayouts"))
const formik = lazy(() => import("./views/forms/formik/Formik"))

 // Desk Client Component
const countryList = lazy(()=>import("./views/core/country/pages/index"))
const designationList = lazy(()=>import("./views/core/designation/pages/index"))
const companyBranchList =lazy(()=>import("./views/company/companyBranch/pages/index"))
const companyContactInformation =lazy(()=>import("./views/company/companyContactInformaiton/pages/index"))
const companyInformation =lazy(()=>import("./views/company/companyInformation/pages/index"))
const noticeItemList =lazy(()=>import("./views/notice/noticeItem/pages/index"))
const noticeForEmployeeList =lazy(()=>import("./views/notice/noticeForEmployee/pages/index"))
const cityList =lazy(()=>import("./views/core/city/pages/index"))
const stateList =lazy(()=>import("./views/core/state/pages/index"))
const jobCircularList =lazy(()=>import("./views/recruitments/jobCircular/pages/index"))
const applicationList =lazy(()=>import("./views/recruitments/application/pages/index"))
const clientList =lazy(()=>import("./views/clients/client/pages/index"))
const clientTypeList =lazy(()=>import("./views/clients/clientType/pages/index"))
// SMS Client Component

// const AdmissionManager = lazy(() => import("./views/Test/AdmissionManager"))

const Roles = lazy(() => import("./views/SMS/Configuration/Roles/Roles.jsx"))
const Menu = lazy(() => import("./views/SMS/Configuration/Menu/Menu.jsx"))

const RolePermission = lazy(() => import("./views/SMS/Configuration/Permissions/RolePermission.jsx"))
const RoleMenu = lazy(() => import("./views/SMS/Configuration/Menu/RoleMenu.jsx"))
const EmployeeType = lazy(() => import("./views/SMS/Configuration/Employees/EmployeeType.jsx"))
const EmployeeGeneralInfo = lazy(() => import("./views/SMS/Configuration/Employees/EmployeeGeneralInfo.jsx"))
const EmployeeContactInfo = lazy(() => import("./views/SMS/Configuration/Employees/EmployeeContactInfo.jsx"))
const EmployeeList = lazy(() => import("./views/SMS/Configuration/Employees/EmployeeList.jsx"))
const EmployeeProfile = lazy(() => import("./views/SMS/Configuration/Employees/EmployeeProfile.jsx"))
const AddUniversityType = lazy(() => import("./views/SMS/University/AddUniversityType.jsx"))
const AddUniversityCountry = lazy(() => import("./views/SMS/University/AddUniversityCountry.jsx"))
const AddUniversityState = lazy(() => import("./views/SMS/University/AddUniversityState.jsx"))
const AddUniversity = lazy(() => import("./views/SMS/University/AddUniversity.jsx"))
const AddProviderUniversity = lazy(() => import("./views/SMS/University/ProviderUniversity/AddProviderUniversity"))
const AddProviderUniversityCampus = lazy(() => import("./views/SMS/University/ProviderUniversity/AddProviderUniversityCampus"))
const AddProviderUniversityFinancial = lazy(() => import("./views/SMS/University/ProviderUniversity/AddProviderUniversityFinancial"))
const AddProviderUniversityFeatures = lazy(() => import("./views/SMS/University/ProviderUniversity/AddProviderUniversityFeatures"))
const AddProviderUniversityGallery = lazy(() => import("./views/SMS/University/ProviderUniversity/AddProviderUniversityGallery"))
const AddProviderUniversityApplicationDocument = lazy(() => import("./views/SMS/University/ProviderUniversity/AddProviderUniversityApplicationDocument"))
const AddProviderUniversityTemplateDocument = lazy(() => import("./views/SMS/University/ProviderUniversity/AddProviderUniversityTemplateDocument"))
const AddProviderUniversityCommission = lazy(() => import("./views/SMS/University/ProviderUniversity/AddProviderUniversityCommission"))

const AddUniversityCampus = lazy(() => import("./views/SMS/University/AddUniversityCampus.jsx"))
const EditDepartment = lazy(() => import("./views/SMS/UniversitySubjects/EditDepartment"))
const EditSubDepartment = lazy(() => import("./views/SMS/UniversitySubjects/EditSubDepartment"))
const AddUniversityFinancial = lazy(() => import("./views/SMS/University/AddUniversityFinancial.jsx"))
const AddUniversityFeatures = lazy(() => import("./views/SMS/University/AddUniversityFeatures.jsx"))
const UniversityList = lazy(() => import("./views/SMS/University/UniversityList.jsx"))
const UniversityDetails = lazy(() => import("./views/SMS/University/UniversityDetails.jsx"))
const CampusList = lazy(() => import("./views/SMS/University/CampusList.jsx"))
const CampusDetails = lazy(() => import("./views/SMS/University/CampusDetails.jsx"))
const AssignMultipleSubject = lazy(() => import("./views/SMS/University/AssignMultipleSubject"))
const CampusSubjectList = lazy(() => import("./views/SMS/University/CampusSubjectList.jsx"))
const AddUniversityGallery = lazy(() => import("./views/SMS/University/AddUniversityGallery.jsx"))
const AddUniversityTemplateDocument = lazy(() => import("./views/SMS/University/AddUniversityTemplateDocument"))
const AddUniversityApplicationDocument = lazy(() => import("./views/SMS/University/AddUniversityApplicationDocument"))
const UniversityRecquiredDocument = lazy(() => import("./views/SMS/University/UniversityRecquiredDocument"))

// intake
const Intake = lazy(() => import("./views/SMS/University/Intake.js"))
const AddNewIntakes = lazy(() => import("./views/SMS/University/AddNewIntakes.jsx"))
const UpdateIntake = lazy(() => import("./views/SMS/University/UpdateIntake.jsx"))

// consultant
const ConsultantList = lazy(() => import("./views/SMS/Consultant/ConsultantList"))
const ConsultantProfile = lazy(() => import("./views/SMS/Consultant/ConsultantProfile"))
const AddConsultant = lazy(() => import("./views/SMS/Consultant/AddConsultant"))
const AddConsultantType = lazy(() => import("./views/SMS/Consultant/AddConsultantType"))

const BankDetails = lazy(() => import("./views/SMS/Consultant/BankDetails"))
const ConsultantCommission = lazy(() => import("./views/SMS/Consultant/ConsultantCommission"))
const AddConsultantInformation = lazy(() => import("./views/SMS/Consultant/AddConsultantInformation"))
const AssociateList = lazy(() => import("./views/SMS/Consultant/ConsultantByConsultant"))

// Document
const DocumentList = lazy(() => import("./views/SMS/Document/DocumentList.js"))
const DocumentCategoryList = lazy(() => import("./views/SMS/Document/DocumentcategoryList.js"))

//Subject
const AddDepartment = lazy(() => import("./views/SMS/UniversitySubjects/Department.jsx"))
const AddSubDepartment = lazy(() => import("./views/SMS/UniversitySubjects/SubDepartment.jsx"))
const AddProgramLevel = lazy(() => import("./views/SMS/UniversitySubjects/ProgramLevel.jsx"))
const Subject = lazy(() => import("./views/SMS/UniversitySubjects/Subject.jsx"))
const SubjectList = lazy(() => import("./views/SMS/UniversitySubjects/SubjectList.jsx"))
const DocumentGroup = lazy(() => import("./views/SMS/UniversitySubjects/DocumentGroup.js"))
const AddSubjectFee = lazy(() => import("./views/SMS/UniversitySubjects/AddSubjectFee.jsx"))
const AddSubjectDeliveryPattern = lazy(() => import("./views/SMS/UniversitySubjects/AddSubjectDeliveryPattern"))
const AddSubjectDocumentRequirement = lazy(() => import("./views/SMS/UniversitySubjects/AddSubjectDocumentRequirement"))
const EditSubjectDocumentRequirement = lazy(() => import("./views/SMS/UniversitySubjects/EditSubjectDocumentRequirement"))
const AddSubjectRequirements = lazy(() => import("./views/SMS/UniversitySubjects/AddSubjectRequirements"))
const EditSubjectRequirements = lazy(() => import("./views/SMS/UniversitySubjects/EditSubjectRequirements"))
const SubjectFeeInformation = lazy(() => import("./views/SMS/UniversitySubjects/SubjectFeeInformation.jsx"))
const EditSubject = lazy(() => import("./views/SMS/UniversitySubjects/EditSubject.jsx"))
const EditSubjectFee = lazy(() => import("./views/SMS/UniversitySubjects/EditSubjectFee.jsx"))
const EditDeliveryPattern = lazy(() => import("./views/SMS/UniversitySubjects/EditDeliveryPattern"))
const SubjectIntake =  lazy(() => import("./views/SMS/UniversitySubjects/SubjectIntake.jsx"))
const SubjectProfile =  lazy(() => import("./views/SMS/UniversitySubjects/SubjectProfile.js"))

// university subject
const UniversitySubjectList = lazy(() => import("./views/SMS/University/Subjects/UniversitySubjectList"));
const AddUniversitySubject = lazy(() => import("./views/SMS/University/Subjects/AddUniversitySubject"));
const AddUniversitySubjectFee = lazy(() => import("./views/SMS/University/Subjects/AddUniversitySubjectFee"));
const AddUniversitySubjectDeliveryPattern = lazy(() => import("./views/SMS/University/Subjects/AddUniversitySubjectDeliveryPattern"));
const AddUniversitySubjectRequirements = lazy(() => import("./views/SMS/University/Subjects/AddUniversitySubjectRequirements"));
const AddUniversitySubjectDocumentRequirement = lazy(() => import("./views/SMS/University/Subjects/AddUniversitySubjectDocumentRequirement"));

// university profile subject
const AddUniProfileSubject = lazy(() => import("./views/SMS/University/UniversityProfileSubjectAdd/AddUniProfileSubject"));
const AddUniProfileSubjectFee = lazy(() => import("./views/SMS/University/UniversityProfileSubjectAdd/AddUniProfileSubjectFee"));
const AddUniProfileSubjectDeliveryPattern = lazy(() => import("./views/SMS/University/UniversityProfileSubjectAdd/AddUniProfileSubjectDeliveryPattern"));
const AddUniProfileSubjectRequirements = lazy(() => import("./views/SMS/University/UniversityProfileSubjectAdd/AddUniProfileSubjectRequirements.js"));
const AddUniProfileSubjectDocumentRequirement = lazy(() => import("./views/SMS/University/UniversityProfileSubjectAdd/AddUniProfileSubjectDocumentRequirement"));

// country List
const AddCountry = lazy(() => import("./views/SMS/Country/AddCountry"))

// State List
const AddState = lazy(() => import("./views/SMS/State/AddState"))

// file upload
const FileUpload =  lazy(() => import("./views/SMS/UniversitySubjects/FileUpload.js"))

// Applications
const Applications = lazy(() => import("./views/SMS/Applications/Applications.js"));
const ApplicationDetails = lazy(() => import("./views/SMS/Applications/ApplicationDetails.js"));


// const Pagination = lazy(() => import("./views/SMS/Pagination/Pagination.jsx"))

// const Login = lazy(() => import("./views/SMS/Login/Login.jsx"))


const forgotPassword = lazy(() =>
  import("./views/pages/authentication/ForgotPassword")
)
const lockScreen = lazy(() => import("./views/pages/authentication/LockScreen"))
const resetPassword = lazy(() =>
  import("./views/pages/authentication/ResetPassword")
)
const StudentRegister = lazy(() =>
  import("./views/pages/authentication/register/StudentRegister")
)
const ConsultantRegister = lazy(() =>
  import("./views/pages/authentication/register/ConsultantRegister")
)
const ProviderRegister = lazy(() =>
  import("./views/pages/authentication/register/ProviderRegister")
)
const accessControl = lazy(() =>
  import("./extensions/access-control/AccessControl")
)
const notFound = lazy(() =>
  import("./views/pages/misc/error/404")
)
const BadRequest = lazy(() =>
  import("./views/pages/misc/error/400")
)

const InternalServerError = lazy(() =>
  import("./views/pages/misc/error/500")
)

const NotAuthorized = lazy(() =>
  import("./views/pages/misc/NotAuthorized")
)

const Post = lazy(() =>
  import("./views/SMS/CRUD/Post/Post")
)
const Get = lazy(() =>
  import("./views/SMS/CRUD/Get/Get")
)
const Put = lazy(() =>
  import("./views/SMS/CRUD/PUT/Put")
)
const Delete = lazy(() =>
  import("./views/SMS/CRUD/Delete/Delete")
)
const ProviderForm = lazy(() =>
  import("./views/SMS/Provider/ProviderForm")
)
const AdminProviderForm = lazy(() =>
  import("./views/SMS/Provider/Admin/AdminProviderForm")
)
const loginForm = lazy(() =>
  import("./views/core/auth/pages/loginForm")
)
const StudentLogin = lazy(() =>
  import("./views/pages/authentication/login/StudentLogin")
)

const SessionExpired = lazy(() =>
  import("./views/pages/authentication/login/SessionExpired")
)

const AddEmployeeGeneralInfo = lazy(() => import("./views/SMS/Configuration/Employees/AddEmployeeGeneralInfo"))
const AddEmployeeContactInfo = lazy(() => import("./views/SMS/Configuration/Employees/AddEmployeeContactInfo"))
const EmployeeInformation = lazy(() => import("./views/SMS/Configuration/Employees/EmployeeInformatio"))
const MenuInfo = lazy(() => import("./views/SMS/Configuration/Menu/MenuInfo"))
const SiteSetting = lazy(() => import("./views/SMS/Configuration/SiteSetting/SiteSetting"))
const AddSiteSetting = lazy(() => import("./views/SMS/Configuration/SiteSetting/AddSiteSetting"))
const UpdateSiteSetting = lazy(() => import("./views/SMS/Configuration/SiteSetting/UpdateSiteSetting"))
const Country = lazy(() => import("./views/core/country/pages/index"))
const ProviderList = lazy(() => import("./views/SMS/Provider/ProviderList"))
const ProviderAdminList = lazy(() => import("./views/SMS/Provider/Admin/ProviderAdminList"))
const ProviderDetails = lazy(() => import("./views/SMS/Provider/ProviderDetails"))
const ProviderDashboard = lazy(() => import("./views/SMS/Provider/ProviderDashboard"))
const AssignUniversity = lazy(() => import("./views/SMS/Provider/AssignUniversity"))
const UpdateProvider = lazy(() => import("./views/SMS/Provider/UpdateProvider"))
const Branch = lazy(() => import("./views/SMS/Branches/Branch/Branch"))
const BranchManager = lazy(() => import("./views/SMS/Branches//Manager/BranchManager"))
const UpdateBranch = lazy(() => import("./views/SMS/Branches/Branch/UpdateBranch"))
const BranchList = lazy(() => import("./views/SMS/Branches/Branch/BranchList"))
const UpdateBranchManager = lazy(() => import("./views/SMS/Branches/Manager/UpdateBranchManager"))
const BranchProfile = lazy(() => import("./views/SMS/Branches/Branch/BranchProfile"))
const BranchEmployee = lazy(() => import("./views/SMS/Branches/Employee/BranchEmployee"))
const BranchManagerInformation = lazy(() => import("./views/SMS/Branches/BranchManager/BranchManagerInformation"))
const BranchTeamEmployeeInformation = lazy(() => import("./views/SMS/Branches/BranchManager/BranchTeamEmployeeInformation"))

// Admission Manager

const AdmissionManager = lazy(() => import("./views/SMS/Provider/AdmissionManager/AdmissionManager"))
const AdmissionManagerList = lazy(() => import("./views/SMS/Provider/AdmissionManager/AdmissionManagerList"))
const UpdateAdmissionManager = lazy(() => import("./views/SMS/Provider/AdmissionManager/UpdateAdmissionManager"))

// Student

const StudentList = lazy(() => import("./views/SMS/Students/StudentList"))
const StudentProfile = lazy(() => import("./views/SMS/Students/StudentProfile"))
const PersonalInformation = lazy(() => import("./views/SMS/Students/PersonalInformation"))
const ContactInformation = lazy(() => import("./views/SMS/Students/ContactInformation"))
const ApplicationInformation = lazy(() => import("./views/SMS/Students/ApplicationInformation"))
const EducationalInformation = lazy(() => import("./views/SMS/Students/EducationalInformation"))
const AddStudentRegister = lazy(() => import("./views/SMS/Students/StudentRegister"))
const AddExperience = lazy(() => import("./views/SMS/Students/Experience"))
const AddReference = lazy(() => import("./views/SMS/Students/Reference"))
const AddPersonalStatement = lazy(() => import("./views/SMS/Students/PersonalStatement"))
const AddOtherInformation = lazy(() => import("./views/SMS/Students/OtherInformation"))
const AddTestScore = lazy(() => import("./views/SMS/Students/TestScore"))
const StudentByConsultant = lazy(() => import("./views/SMS/Students/StudentByConsultant"))

// Education Level

const EducationLevelList = lazy(() => import("./views/SMS/EducationLevel/EducationLevelList"))
const AddEducationLevel = lazy(() => import("./views/SMS/EducationLevel/AddEducationLevel"))

// Degree

const DegreeList = lazy(() => import("./views/SMS/Degree/DegreeList"))
const AddDegree = lazy(() => import("./views/SMS/Degree/AddDegree"))









const UploadDocument = lazy(() => import("./views/SMS/Students/DocumentUpload"))

const ExamTestType = lazy(() => import("./views/SMS/Configuration/ExamTestType/ExamTestType"))
const ExamTestTypeAttribute = lazy(() => import("./views/SMS/Configuration/ExamTestType/ExamTestTypeAttribute"))


const UpdateUniversityInformation = lazy(() => import("./views/SMS/University/UpdateUniversityInformation"))

const StudentType = lazy(() => import("./views/SMS/Students/StudentType.js"))

// country

const CountryList = lazy(() => import("./views/SMS/Configuration/Country/Country.js"))

// Search

const Search = lazy(() => import("./views/SMS/Search/Search"))

// Comission
const AccountIntake = lazy(() => import("./views/SMS/Comission/AccountIntake/AccountIntake"))

const ComissionGroup = lazy(() => import("./views/SMS/Comission/CommissionGroup/ComissionGroup"))



const CommissionPriceList = lazy(() => import("./views/SMS/Comission/CommissionPrice/CommissionPriceList"))


// practice

const UpdateUser = lazy(() => import("./views/Test/UpdateUser"));

// Consultant Conscent

const ConsultantConscent = lazy(() => import("./views/SMS/Consultant/ConsultantConscent"));

// Student Declaration
const StudentDeclaration = lazy(() => import("./views/SMS/Students/StudentDeclaration"));

// Branch Employee Profile Page
const BranchEmployeeProfile = lazy(() => import("./views/SMS/Branches/Employee/EmployeeProfile"));



const Nationality = lazy(() => import("./views/SMS/Nationality/Nationality"));

const AdmissionManagerProfile = lazy(() => import("./views/SMS/Provider/AdmissionManager/AdmissionManagerProfile"));

const PromotionalCommissionList = lazy(() => import("./views/SMS/PromotionalCommission/CommissionList/PromotionalCommissionList"));

const DistributionLevelSetting = lazy(() => import("./views/SMS/DistributionLevelSetting/Index"));

const ApplicationTransaction = lazy(() => import("./views/SMS/ApplicationTransaction/Index"));
const ApplicationTransactionDetails = lazy(() => import("./views/SMS/ApplicationTransaction/Details"));

const InFlow = lazy(() => import("./views/SMS/InFlow/Index"));
const InFlowDetails = lazy(() => import("./views/SMS/InFlow/Details"));
const InFlowUpdate = lazy(() => import("./views/SMS/InFlow/Update"));

const AccountTransactionList = lazy(() => import("./views/SMS/AccountTransaction/Index"));

const CreateWithdrawRequest = lazy(() => import("./views/SMS/WithdrawRequest/Create"));
const WithdrawRequestList = lazy(() => import("./views/SMS/WithdrawRequest/List"));
const ExportWithdrawRequestPdf =  lazy(() => import("./views/SMS/WithdrawRequest/ExportWithdrawRequestPdf"));

const WithdrawTransaction = lazy(() => import("./views/SMS/WithdrawTransaction/Index"));

// admission officer
const AdmissionOfficerList = lazy(() => import("./views/SMS/AdmissionOfficer/AdmissionOfficerList.js"));
const AdmissionOfficerDetails = lazy(() => import("./views/SMS/AdmissionOfficer/AdmissionOfficerDetails.js"));
const AssignAdmissionOfficer = lazy(() => import("./views/SMS/AdmissionOfficer/AssignAdmissionOfficer.js"));

// Student Create Forms
const StudentApplicationForm = lazy(() => import("./views/SMS/Students/CreateForms/StudentApplicationForm"));

const StudentPersonalForm = lazy(() => import("./views/SMS/Students/CreateForms/StudentPersonalForm"));

const StudentContactForm = lazy(() => import("./views/SMS/Students/CreateForms/StudentContactForm"));

const StudentEducationForm = lazy(() => import("./views/SMS/Students/CreateForms/StudentEducationForm"));

const StudentTestScoreForm = lazy(() => import("./views/SMS/Students/CreateForms/StudentTestScoreForm"));

const StudentExperienceForm = lazy(() => import("./views/SMS/Students/CreateForms/StudentExperienceForm"));

const StudentReferenceForm = lazy(() => import("./views/SMS/Students/CreateForms/StudentReferenceForm"));

const StudentPersonalStatementForm = lazy(() => import("./views/SMS/Students/CreateForms/StudentPersonalStatementForm"));

const StudentOtherInformationForm = lazy(() => import("./views/SMS/Students/CreateForms/StudentOtherInformationForm"));

const StudentDeclarationForm = lazy(() => import("./views/SMS/Students/CreateForms/StudentDeclarationForm"));

const UniversityCommission = lazy(() => import("./views/SMS/University/UniversityCommission"));
const UniversityTestScore = lazy(() => import("./views/SMS/University/UniversityTestScore"));

const ReadAllNotifiation = lazy(() => import("./views/SMS/ReadAllNotification/ReadAllNotifiation"));


const TrialNotification = lazy(() => import("./views/Test/Notification"));




const demo = lazy(() => import("./views/SMS/Demo/Demo"))


const RouteConfig = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return (
        <ContextLayout.Consumer>
          {context => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                    <Component {...props} />
                </Suspense>
              </LayoutTag>
            )
          }}
        </ContextLayout.Consumer>
      )
    }}
  />
)
const mapStateToProps = state => {
  return {
    user: state.auth.login.userRole
  }
}

const AppRoute = connect(mapStateToProps)(RouteConfig)

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <>
     
          {/* SMS Client Routing */}
         {
           isAuth ?
           <>
             <Router history={history}>
         <ToastProvider autoDismiss={true}>
        <Switch>
         <AppRoute exact path="/" component={analyticsDashboard} />
        
         <AppRoute  path="/AdmissionManager" component={permissions?.includes(602)? AdmissionManager  : NotAuthorized } />
         <AppRoute  path="/AdmissionGetData" component={AdmissionGetData} />
         <AppRoute  path="/updateUser/:id" component={UpdateUser} />
         <AppRoute exact path="/addAdmissionManager/:id" component={permissions?.includes(permissionList.Add_Admission_manager)? AdmissionManager : NotAuthorized} />
         <AppRoute exact path="/admissionManagerList" component={AdmissionManagerList} />
         <AppRoute  path="/updateAdmissionManager/:id/:id2" component={permissions?.includes(permissionList.Update_Admission_manager) ? UpdateAdmissionManager : NotAuthorized } />

         {/* admission officer */}
         <AppRoute  path="/admissionOfficerList" component={AdmissionOfficerList} />
         <AppRoute  path="/admissionOfficerDetails/:officerId" component={AdmissionOfficerDetails} />
         <AppRoute  path="/assignAdmissionOfficer/:officerId" component={AssignAdmissionOfficer} />
{/*   
         <AppRoute  path="/demo" component={demo} /> */}
         {/* <AppRoute  path="/uni1" component={demo} /> */}
         {/* <AppRoute  path="/uni2" component={demo} /> */}
         {/* <AppRoute  path="/roles" component={permissions?.includes(3)? Roles : NotAuthorized} /> */}
         {/* <AppRoute  path="/addMenu" component={Menu} /> */}
         {/* <AppRoute  path="/menu" component={MenuInfo} /> */}
   
         <AppRoute  path="/rolePermission" component={permissions?.includes(permissionList?.Permission_List)? RolePermission : NotAuthorized} />
         <AppRoute  path="/roleMenu" component={permissions?.includes(permissionList?.View_Menulist) ? RoleMenu : NotAuthorized} />

  
         <AppRoute  path="/staffType" component={permissions.includes(permissionList?.EmployeeTypeList)? EmployeeType : NotAuthorized} />
         {/* <AppRoute path="/employeeGeneralInfo/:id" component={EmployeeGeneralInfo} /> */}
         {/* <AppRoute path="/employeeContactInfo/:id" component={EmployeeContactInfo} /> */}
         <AppRoute  path="/staffListByType/:type" component={permissions?.includes(permissionList?.Staff_List) ? EmployeeList : NotAuthorized} />
         <AppRoute exact path="/staffList" component={permissions?.includes(permissionList?.Staff_List) ? EmployeeList : NotAuthorized} />
         <AppRoute  path="/staffProfile/:id" component={permissions?.includes(permissionList?.View_Staff)? EmployeeProfile : NotAuthorized} />
         <AppRoute  path="/universityTypes" component={permissions?.includes(permissionList?.Add_Universitytype)? AddUniversityType : NotAuthorized} />
         <AppRoute  path="/universityCountry" component={permissions?.includes(permissionList?.Add_UniversityCountry)? AddUniversityCountry : NotAuthorized} />
         <AppRoute  path="/universityState" component={permissions?.includes(permissionList?.Universitystate_List) ? AddUniversityState : NotAuthorized} />
         <AppRoute  path="/addUniversity/:univerId?" component={permissions?.includes(permissionList?.Add_University  || permissionList?.Update_University)? AddUniversity : NotAuthorized} />
         <AppRoute  path="/addProviderUniversity/:providerProfileId/:univerId?" component={permissions?.includes(permissionList?.Add_University  || permissionList?.Update_University)? AddProviderUniversity : NotAuthorized} />
         <AppRoute  path="/addUniversityApplicationDocument/:univerId" component={permissions?.includes(permissionList?.Add_universityApplicationdocument || permissionList?.Update_universityApplicationdocument)? AddUniversityApplicationDocument: NotAuthorized} />
         <AppRoute  path="/addProviderUniversityApplicationDocument/:providerProfileId/:univerId" component={permissions?.includes(permissionList?.Add_universityApplicationdocument || permissionList?.Update_universityApplicationdocument)? AddProviderUniversityApplicationDocument: NotAuthorized} />
         <AppRoute  path="/addUniversityTemplateDocument/:univerId" component={permissions?.includes(permissionList?.Add_University_Template_Document || permissionList?.Update_University_Template_Document)? AddUniversityTemplateDocument : NotAuthorized} />
         <AppRoute  path="/addProviderUniversityTemplateDocument/:providerProfileId/:univerId" component={permissions?.includes(permissionList?.Add_University_Template_Document || permissionList?.Update_University_Template_Document)? AddProviderUniversityTemplateDocument : NotAuthorized} />
         
         <AppRoute  path="/addProviderUniversityCommission/:providerProfileId/:univerId" component={AddProviderUniversityCommission} />

         {/* <AppRoute  path="/addUniversityRequiredDocument" component={UniversityRecquiredDocument} /> */}

          {/* intake */}
          <AppRoute  path="/intake" component={permissions?.includes(permissionList?.subject_intake_List)? Intake : NotAuthorized} />
          <AppRoute  path="/addNewIntakes" component={permissions?.includes(permissionList?.Add_subject_intake)? AddNewIntakes: NotAuthorized} />
          <AppRoute  path="/updateIntake/:id" component={permissions?.includes(permissionList?.Update_subject_intake)? UpdateIntake : NotAuthorized} />

          {/* Country */}
          <AppRoute  path="/country" component={permissions?.includes(permissionList?.Country_List)? AddCountry: NotAuthorized} />

          {/* State */}
          <AppRoute  path="/state" component={permissions?.includes(permissionList?.State_List)? AddState: NotAuthorized} />


          {/* consultant */}
          <AppRoute  path="/consultantList" component={permissions?.includes(permissionList?.Counsultant_List) ? ConsultantList : NotAuthorized} />
          <AppRoute  path="/consultantProfile/:id" component={permissions?.includes(permissionList?.View_Consultant)? ConsultantProfile : NotAuthorized} />
          <AppRoute  path="/addConsultant" component={permissions?.includes(permissionList?.Add_Consultant) ? AddConsultant : NotAuthorized} />

          {/* permission not added */}
          <AppRoute  path="/consultantType" component={permissions?.includes(permissionList?.Consultant_type_List) ? AddConsultantType : NotAuthorized} />
          
          <AppRoute  path="/consultantBankDetails/:consultantRegisterId" component={permissions?.includes(permissionList?.Add_Consultant)? BankDetails : NotAuthorized } />
          <AppRoute  path="/consultantCommission/:consultantRegisterId" component={permissions?.includes(permissionList?.ConsultantCommissionGroup_List)? ConsultantCommission : NotAuthorized} />
          <AppRoute  path="/consultantInformation/:consultantRegisterId" component={permissions?.includes(permissionList?.Add_Consultant)? AddConsultantInformation : NotAuthorized } />
          <AppRoute  path="/associates/:id" component={permissions?.includes(permissionList?.Associate_List)? AssociateList : NotAuthorized} />
          
          

         <AppRoute  path="/addUniversityCampus/:univerId" component={permissions?.includes(permissionList?.Add_UniversityCampus)? AddUniversityCampus: NotAuthorized} />
         <AppRoute  path="/addProviderUniversityCampus/:providerProfileId/:univerId" component={permissions?.includes(permissionList?.Add_UniversityCampus)? AddProviderUniversityCampus: NotAuthorized} />
         <AppRoute  path="/addUniversityFinancial/:univerId" component={permissions?.includes(permissionList?.Add_Financialinfo)? AddUniversityFinancial : NotAuthorized }/>
         <AppRoute  path="/addProviderUniversityFinancial/:providerProfileId/:univerId" component={permissions?.includes(permissionList?.Add_Financialinfo)? AddProviderUniversityFinancial : NotAuthorized }/>
         <AppRoute  path="/addUniversityFeatures/:univerId" component={permissions?.includes(permissionList?.Add_UniversityFeatures)? AddUniversityFeatures : NotAuthorized} />
         <AppRoute  path="/addProviderUniversityFeatures/:providerProfileId/:univerId" component={permissions?.includes(permissionList?.Add_UniversityFeatures)? AddProviderUniversityFeatures : NotAuthorized} />
         <AppRoute  path="/addUniversityGallery/:univerId" component={permissions?.includes(permissionList?.Add_Universitygallery)? AddUniversityGallery: NotAuthorized} />
         <AppRoute  path="/addProviderUniversityGallery/:providerProfileId/:univerId" component={permissions?.includes(permissionList?.Add_Universitygallery)? AddProviderUniversityGallery: NotAuthorized} />
         <AppRoute  path="/universityList" component={permissions?.includes(permissionList?.University_List)? UniversityList : NotAuthorized} />
         <AppRoute  path="/universityDetails/:id" component={permissions?.includes(permissionList?.View_University)? UniversityDetails : NotAuthorized} />
         <AppRoute  path="/campusList/:uniId?" component={permissions?.includes(permissionList?.UniversityCampus_List)? CampusList : NotAuthorized } />
         <AppRoute  path="/campusSubjectList/:camId" component={permissions?.includes(permissionList?.university_campus_subject_List)? CampusSubjectList : NotAuthorized} />
         <AppRoute  path="/campusDetails/:id" component={permissions?.includes(permissionList?.View_UniversityCampus)? CampusDetails : NotAuthorized } />
         <AppRoute  path="/assignMultipleSubject/:id" component={permissions?.includes(permissionList?.View_UniversityCampus)? AssignMultipleSubject : NotAuthorized } />

         {/* University Subject starts here */}
         <AppRoute  path="/universitySubjectList/:id" component={permissions?.includes(permissionList?.subject_List)? UniversitySubjectList : NotAuthorized } />
         <AppRoute  path="/addUniversitySubject/:id/:subjId?" component={permissions?.includes(permissionList?.Add_subject)? AddUniversitySubject : NotAuthorized} />
         <AppRoute  path="/addUniversitySubjectFee/:id/:subjId" component={permissions?.includes(permissionList?.Add_subject_fee_structure)? AddUniversitySubjectFee : NotAuthorized} />
         <AppRoute  path="/addUniversitySubjectDeliveryPattern/:id/:subjId" component={permissions?.includes(permissionList?.Add_Subject_Delivery_Pattern)? AddUniversitySubjectDeliveryPattern : NotAuthorized} />
         <AppRoute  path="/addUniversitySubjectRequirements/:id/:subjId" component={permissions?.includes(permissionList?.Add_subject_requirement)? AddUniversitySubjectRequirements : NotAuthorized} />
         <AppRoute  path="/addUniversitySubjectDocumentRequirement/:id/:subjId" component={permissions?.includes(permissionList?.Add_subject_requirement_document)? AddUniversitySubjectDocumentRequirement : NotAuthorized} />

         {/* University Subject ends here */}

         {/* university profile subject add starts here */}
         <AppRoute  path="/addUniProfileSubject/:id/:subjId?" component={permissions?.includes(permissionList?.Add_subject)? AddUniProfileSubject : NotAuthorized} />

         <AppRoute  path="/addUniProfileSubjectFee/:id/:subjId" component={permissions?.includes(permissionList?.Add_subject_fee_structure)? AddUniProfileSubjectFee : NotAuthorized} />

         <AppRoute  path="/addUniProfileSubjectDeliveryPattern/:id/:subjId" component={permissions?.includes(permissionList?.Add_Subject_Delivery_Pattern)? AddUniProfileSubjectDeliveryPattern : NotAuthorized} />

         <AppRoute  path="/addUniProfileSubjectRequirements/:id/:subjId" component={permissions?.includes(permissionList?.Add_subject_requirement)? AddUniProfileSubjectRequirements : NotAuthorized} />

         <AppRoute  path="/addUniProfileSubjectDocumentRequirement/:id/:subjId" component={permissions?.includes(permissionList?.Add_subject_requirement_document)? AddUniProfileSubjectDocumentRequirement : NotAuthorized} />
         {/* university profile subject add ends here */}

         <AppRoute  path="/documentlist" component={permissions?.includes(permissionList?.Document_List)? DocumentList : NotAuthorized} />
         <AppRoute  path="/documentCategoryList" component={permissions?.includes(permissionList?.Document_Category_List)? DocumentCategoryList : NotAuthorized} />
         <AppRoute  path="/subjectDocumentGroup" component={permissions?.includes(permissionList?.Add_Document_Group)? DocumentGroup : NotAuthorized} />


         <AppRoute  path="/department" component={permissions?.includes(permissionList?.Add_department)? AddDepartment : NotAuthorized} />
         <AppRoute  path="/subDepartment" component={permissions?.includes(permissionList?.sub_department_List)? AddSubDepartment : NotAuthorized} />
         <AppRoute  path="/programLevel" component={permissions?.includes(permissionList?.program_level_List)? AddProgramLevel : NotAuthorized} />
         {/* <AppRoute  path="/addSubject" component={permissions?.includes(permissionList?.Add_subject)? Subject : NotAuthorized} /> */}

         {/* <AppRoute  path="/addDepartment" component={permissions?.includes(permissionList?.Add_department)? AddDepartment : NotAuthorized} /> */}
         <AppRoute  path="/addSubDepartment" component={permissions?.includes(permissionList?.sub_department_List)? AddSubDepartment : NotAuthorized} />
         <AppRoute  path="/programLevel" component={permissions?.includes(permissionList?.program_level_List)? AddProgramLevel : NotAuthorized} />
         <AppRoute  path="/addSubject/:id?" component={permissions?.includes(permissionList?.Add_subject)? Subject : NotAuthorized} />

         <AppRoute  path="/subjectList" component={permissions?.includes(permissionList?.subject_List)? SubjectList: NotAuthorized} />
         <AppRoute  path="/editSubject/:id" component={permissions?.includes(permissionList?.Update_subject)? EditSubject : NotAuthorized} />
         <AppRoute  path="/addSubjectFee/:id" component={permissions?.includes(permissionList?.Add_subject_fee_structure)? AddSubjectFee : NotAuthorized} />
         <AppRoute  path="/addSubjectDeliveryPattern/:id" component={permissions?.includes(permissionList?.Add_Subject_Delivery_Pattern)? AddSubjectDeliveryPattern : NotAuthorized} />
         <AppRoute  path="/addSubjectDocumentRequirement/:id" component={permissions?.includes(permissionList?.Add_subject_requirement_document)? AddSubjectDocumentRequirement : NotAuthorized} />
         <AppRoute  path="/editSubjectDocumentRequirement/:id" component={permissions?.includes(permissionList?.Update_subject_requirement_document)? EditSubjectDocumentRequirement : NotAuthorized} />
         <AppRoute  path="/addSubjectRequirements/:id" component={permissions?.includes(permissionList?.Add_subject_requirement)? AddSubjectRequirements : NotAuthorized} />
         <AppRoute  path="/EditSubjectRequirements/:id" component={permissions?.includes(permissionList?.Update_subject_requirement)? EditSubjectRequirements : NotAuthorized} />
         <AppRoute  path="/EditSubjectFee/:subId" component={permissions?.includes(permissionList?.Update_subject_fee_structure)? EditSubjectFee : NotAuthorized} />
         <AppRoute  path="/editDeliveryPattern/:id" component={permissions?.includes(permissionList?.Update_Subject_Delivery_Pattern)? EditDeliveryPattern : NotAuthorized} />
         <AppRoute  path="/subjectFeeInfo" component={permissions?.includes(permissionList?.subject_fee_structure_List)? SubjectFeeInformation : NotAuthorized} />
         <AppRoute  path="/subjectIntake/:camId/:subbId" component={permissions?.includes(permissionList?.subject_intake_List)? SubjectIntake : NotAuthorized} />
         <AppRoute  path="/subjectProfile/:subjId" component={permissions?.includes(permissionList?.View_subject)? SubjectProfile : NotAuthorized} />

         {/* <AppRoute  path="/fileUpload" component={FileUpload} /> */}
         
         {/* <AppRoute path="/subjectIntake" component={SubjectIntake} /> */}

         {/* Applications */}
         <AppRoute  path="/applications" component={permissions?.includes(permissionList?.Application_List)? Applications : NotAuthorized} />

         <AppRoute  path="/applicationsByConsultant/:cId" component={permissions?.includes(permissionList?.Application_List)? Applications : NotAuthorized} />

         <AppRoute  path="/applicationDetails/:id/:stdId" component={permissions?.includes(permissionList?.View_Application)? ApplicationDetails : NotAuthorized} />

        
         {/* <AppRoute  path="/newform" component={Post} /> */}
         {/* <AppRoute  path="/showdata" component={Get} /> */}
         {/* <AppRoute  path="/update/:id" component={Put} /> */}
         {/* <AppRoute  path="/delete/:id" component={Delete} /> */}

         <AppRoute  path="/providerForm" component={permissions?.includes(permissionList?.Add_Provider)? ProviderForm : NotAuthorized} />
         <AppRoute  path="/adminProviderForm/:adminProviderHiddenId" component={permissions?.includes(permissionList?.Add_Provider_Admin)? AdminProviderForm : NotAuthorized} />
         <AppRoute  path="/addStaffGeneralInfo" component={permissions?.includes(permissionList?.Add_Staff)? AddEmployeeGeneralInfo : NotAuthorized} />
         <AppRoute  path="/addStaffContactInfo/:employeeId?" component={permissions?.includes(permissionList?.Add_Staff)? AddEmployeeContactInfo : NotAuthorized} />
         <AppRoute  path="/staffGeneralInfo/:id" component={permissions?.includes(permissionList?.Update_Staff)? EmployeeGeneralInfo : NotAuthorized} />
         <AppRoute  path="/staffContactInfo/:id" component={permissions?.includes(permissionList?.Update_Staff)? EmployeeContactInfo : NotAuthorized} />
         {/* <AppRoute  path="/employeeInformatio" component={EmployeeInformation} /> */}
         {/* <AppRoute  path="/siteSetting" component={SiteSetting} />
         <AppRoute  path="/addSiteSetting" component={AddSiteSetting} />
         <AppRoute  path="/updateSiteSetting" component={UpdateSiteSetting} /> */}
         {/* <AppRoute  path="/country" component={Country} /> */}
         <AppRoute  path="/editDepartment/:id" component={permissions?.includes(permissionList?.Update_department)? EditDepartment : NotAuthorized} />
         <AppRoute  path="/editSubDepartment/:id" component={permissions?.includes(permissionList?.Update_sub_department)? EditSubDepartment : NotAuthorized} />

         <AppRoute  path="/providerList" component={permissions?.includes(permissionList?.Provider_List)? ProviderList : NotAuthorized} />
         <AppRoute  path="/providerAdminList" component={permissions?.includes(permissionList?.Provider_Admin_List)? ProviderAdminList : NotAuthorized} />


         <AppRoute  path="/providerDetails/:id" component={permissions?.includes(permissionList?.View_Provider)? ProviderDetails : NotAuthorized} />
         <AppRoute  path="/providerDashboard/:id" component={ProviderDashboard} />
         <AppRoute  path="/assignUniversity/:providerId/:managerId" component={permissions?.includes(permissionList?.Assign_University)? AssignUniversity : NotAuthorized} />
         <AppRoute  path="/updateProvider/:id" component={permissions?.includes(permissionList?.Update_Provider)? UpdateProvider : NotAuthorized} />
         <AppRoute  path="/branchInformation/:branchId?" component={permissions?.includes(permissionList?.Add_Branch)? Branch : NotAuthorized} />
         <AppRoute  path="/addBranchManager/:branchId" component={permissions?.includes(permissionList?.Add_Branch_Manager)? BranchManager : NotAuthorized} />
         <AppRoute  path="/branchEmployeeInformation/:branchId/:employeeId?" component={permissions?.includes(permissionList?.Add_Branch_Employee)? BranchEmployee : NotAuthorized} />
         {/* <AppRoute path="/updateBranch/:id" component={UpdateBranch} /> */}
         <AppRoute  path="/branchList" component={permissions?.includes(permissionList?.Branch_List)? BranchList : NotAuthorized} />
         {/* <AppRoute path="/updateBranchManager/:id" component={UpdateBranchManager} /> */}
         <AppRoute  path="/branchProfile/:id" component={permissions?.includes(permissionList?.View_Branch)? BranchProfile : NotAuthorized} />
         <AppRoute  path="/updateBranchManagerInformation/:branchId/:managerId" component={permissions?.includes(permissionList?.Update_Branch_Manager)? BranchManagerInformation : NotAuthorized} />
         <AppRoute  path="/teamEmployee/:branchId/:teamId" component={permissions?.includes(permissionList?.Branch_Team_Employee_List)? BranchTeamEmployeeInformation : NotAuthorized} />

         <AppRoute  path="/studentList" component={permissions?.includes(permissionList?.Student_List)? StudentList : NotAuthorized} />
         <AppRoute  path="/studentListByType/:type" component={permissions?.includes(permissionList?.Student_List)? StudentList : NotAuthorized} />
         <AppRoute  path="/studentListByConsultant/:cId" component={permissions?.includes(permissionList?.Student_List)? StudentList : NotAuthorized} />
         <AppRoute  path="/studentProfile/:sId" component={permissions?.includes(permissionList?.View_Student)? StudentProfile : NotAuthorized} />
         <AppRoute  path="/addStudentInformation/:applicationStudentId/:update?" component={permissions?.includes(permissionList?.Add_Student)? PersonalInformation : NotAuthorized} />
         <AppRoute  path="/addStudentContactInformation/:applicationStudentId/:update?" component={permissions?.includes(permissionList?.Add_Student)? ContactInformation : NotAuthorized} />
         <AppRoute  path="/addStudentApplicationInformation/:applicationStudentId/:update?" component={permissions?.includes(permissionList?.Add_Student)? ApplicationInformation : NotAuthorized} />
         <AppRoute  path="/addStudentEducationalInformation/:applicationStudentId/:update?" component={permissions?.includes(permissionList?.Add_Student)? EducationalInformation : NotAuthorized} />
        
         <AppRoute  path="/addStudentRegister" component={permissions?.includes(permissionList?.Add_Student)? AddStudentRegister : NotAuthorized} />

         <AppRoute  path="/addExperience/:applicationStudentId/:update?" component={permissions?.includes(permissionList?.Add_Student)? AddExperience : NotAuthorized} />
         <AppRoute  path="/addReference/:applicationStudentId/:update?" component={permissions?.includes(permissionList?.Add_Student)? AddReference : NotAuthorized} />
         <AppRoute  path="/addPersonalStatement/:applicationStudentId/:update?" component={permissions?.includes(permissionList?.Add_Student)? AddPersonalStatement : NotAuthorized} />
         <AppRoute  path="/addOtherInformation/:applicationStudentId/:update?" component={permissions?.includes(permissionList?.Add_Student)? AddOtherInformation : NotAuthorized} />
         <AppRoute  path="/addTestScore/:applicationStudentId/:update?" component={permissions?.includes(permissionList?.Add_Student)?AddTestScore : NotAuthorized} />

         
         <AppRoute  path="/studentByConsultant/:id" component={permissions?.includes(permissionList?.Student_Consultant_List)? StudentByConsultant : NotAuthorized} />
       
         <AppRoute  path="/uploadDocument/:applicationStudentId?/:update?" component={permissions?.includes(permissionList?.Add_Student)? UploadDocument : NotAuthorized} />

         {/* Education Level paths */}

         <AppRoute  path="/educationalLevelList" component={permissions?.includes(permissionList?.Education_Level_List)? EducationLevelList : NotAuthorized} />
         <AppRoute  path="/addEducationLevel/:name?/:description?/:levelValue?/:id?" component={permissions?.includes(permissionList?.Add_Education_Level)? AddEducationLevel : NotAuthorized} />

         {/* Degree Paths */}

         <AppRoute  path="/degreeList" component={permissions?.includes(permissionList?.degree_List)? DegreeList : NotAuthorized} />
         <AppRoute  path="/addDegree/:degreeName?/:eduLabel?/:educationId?/:id?" component={permissions?.includes(permissionList?.Add_degree)? AddDegree : NotAuthorized} />


         <AppRoute  path="/examTestType" component={permissions?.includes(permissionList?.Exam_test_type_List)? ExamTestType : NotAuthorized} />

         {/* <AppRoute  path="/examTestTypeAttribute" component={ExamTestTypeAttribute} /> */}




         <AppRoute  path="/updateUniversityInformation/:id" component={permissions?.includes(permissionList?.Update_University)? UpdateUniversityInformation : NotAuthorized} />

         <AppRoute  path="/studentTypeList" component={permissions?.includes(permissionList?.Student_type_List)? StudentType : NotAuthorized} />


         <AppRoute  path="/countryList" component={permissions?.includes(permissionList?.Country_List)? CountryList : NotAuthorized} />

         {/* Comission paths */}

        <AppRoute  path="/accountIntakeList" component={permissions?.includes(permissionList?.AccountIntake_List)? AccountIntake : NotAuthorized} />
        <AppRoute  path="/commissionGroupList" component={permissions?.includes(permissionList?.CommissionGroup_List)? ComissionGroup : NotAuthorized} />
        
        <AppRoute  path="/commissionPriceList/:id" component={permissions?.includes(permissionList?.GroupPriceRange_List)? CommissionPriceList : NotAuthorized} />

        {/* Consultant Conscent Path */}

          <AppRoute  path="/consultantConscent/:consultantRegisterId" component={ConsultantConscent} />

          {/* Student Declaration Path */}
          <AppRoute  path="/studentDeclaration/:applicationStudentId/:update?" component={StudentDeclaration} />

          {/* Branch Employee Profile path */}
          <AppRoute  path="/branchEmployeeProfile/:branchId/:employeeId" component={BranchEmployeeProfile} />

          {/* nationality path */}
           <AppRoute  path="/nationality" component={Nationality} />


           <AppRoute  path="/providerAdmissionManager/:managerId/:providerId" component={AdmissionManagerProfile} />


           <AppRoute  path="/promotionalCommissionList" component={PromotionalCommissionList} />

           <AppRoute  path="/distributionLevelSetting" component={DistributionLevelSetting} />

           <AppRoute  path="/applicationTransaction" component={ApplicationTransaction} />
           <AppRoute  path="/applicationTransactionDetails/:id" component={ApplicationTransactionDetails} />

           <AppRoute  path="/inFlowTransaction" component={InFlow} />
           <AppRoute  path="/inFlow/details/:id" component={InFlowDetails} />
           <AppRoute  path="/inFlow/Update/:id" component={InFlowUpdate} />

           <AppRoute  path="/accountTransaction" component={AccountTransactionList} />

           <AppRoute  path="/createWithdrawRequest" component={CreateWithdrawRequest} />
           <AppRoute  path="/withdrawRequestList" component={WithdrawRequestList} />

           <AppRoute  path="/withdrawTransaction" component={WithdrawTransaction} />
           <AppRoute  path="/exportPDF" component={ExportWithdrawRequestPdf} />



           {/* Student Create Form Paths */}
           <AppRoute  path="/studentApplication/:id" component={StudentApplicationForm} />
           <AppRoute  path="/studentPersonal/:id" component={StudentPersonalForm} />
           <AppRoute  path="/studentContact/:id" component={StudentContactForm} />
           <AppRoute  path="/studentEducation/:id" component={StudentEducationForm} />
           <AppRoute  path="/studentTestScore/:id" component={StudentTestScoreForm} />
           <AppRoute  path="/studentExperience/:id" component={StudentExperienceForm} />
           <AppRoute  path="/studentReference/:id" component={StudentReferenceForm} />
           <AppRoute  path="/studentPersonalStatement/:idVal" component={StudentPersonalStatementForm} />
           <AppRoute  path="/studentOtherInformation/:idVal" component={StudentOtherInformationForm} />
           <AppRoute  path="/studentDeclarations/:idVal" component={StudentDeclarationForm} />

           <AppRoute  path="/addUniversityCommission/:univerId" component={UniversityCommission} />
           <AppRoute  path="/addUniversityTestScore/:univerId" component={UniversityTestScore} />
           <AppRoute  path="/allNotifications" component={ReadAllNotifiation} />


        <AppRoute  path="/search" component={Search} />

         <AppRoute  path="/500" component={InternalServerError} />

         <AppRoute  path="/notAuthorized" component={NotAuthorized} />


         {/* trial notification */}
         <AppRoute  path="/notification" component={TrialNotification} />

         <AppRoute  path="/400" component={BadRequest}  fullLayout/>

  
          {/* Session Expired  */}
         {/* <AppRoute path='/sessionExpired' component={SessionExpired} fullLayout /> */}


         <AppRoute component={notFound} fullLayout />



         </Switch>
      </ToastProvider>
      </Router>





         
         
         

        
         
       
        
         
         




           </> :
           <>
             <Router history={history}>
         <ToastProvider autoDismiss={true}>
        <Switch>

          
      
         <AppRoute exact path="/" component={StudentLogin} fullLayout />

         <AppRoute path="/pages/studentRegister" component={StudentRegister} fullLayout />
         <AppRoute path="/pages/consultantRegister" component={ConsultantRegister} fullLayout />
         <AppRoute path="/pages/providerRegister" component={ProviderRegister} fullLayout />
       

         <AppRoute
            path="/pages/forgot-password"
            component={forgotPassword}
            fullLayout
          />
         <AppRoute
            path="/pages/lock-screen"
            component={lockScreen}
            fullLayout
          />
          <AppRoute
            path="/pages/reset-password"
            component={resetPassword}
            fullLayout
          />

            <AppRoute
            path="*"
            exact
            component={() => <Redirect to="/" />}
          />

      </Switch>
      </ToastProvider>
      </Router>
           </>
         }
         
         
       
      </>
    )
  }
}

export default AppRouter
