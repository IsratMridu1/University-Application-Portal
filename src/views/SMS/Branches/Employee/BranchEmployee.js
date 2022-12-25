import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import {  Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { useToasts } from "react-toast-notifications";
import { Button, ButtonGroup, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Nav, NavItem, NavLink, TabContent, Table, TabPane } from 'reactstrap';
import { rootUrl } from '../../../../constants/constants';
import Select from "react-select";
import { Image } from 'antd';
import "antd/dist/antd.css";
import get from '../../../../helpers/get';
import BranchProfileImage from './BranchProfileImage';
import BranchCoverImage from './BranchCoverimage';
import { useSelector } from 'react-redux';
import { permissionList } from '../../../../constants/AuthorizationConstant';



const Branch = () => {

  const AuthStr = localStorage.getItem("token");
    const history = useHistory();
    const {branchId, employeeId} = useParams();
    
    const { addToast } = useToasts();
    const location = useLocation();
    const [activetab, setActivetab] = useState("3");
      const [submitData, setSubmitData] = useState(false);
      const [success, setSuccess] = useState(false);
      const [nationalityLabel, setNationalityLabel] = useState("Select Nationality");
      const [nationalityValue, setNationalityValue] = useState(0);
      const [nationalityError, setNationalityError] = useState(false);
      const [serialNum, setSerialNum] = useState(0);
      const [branchLabel, setBranchLabel] = useState("Branch");
      const [branchValue, setBranchValue] = useState(0);
      const [nationality,setNationality] = useState([]);
      const [branch,setBranch] = useState([]);
      const [branchEmployee, setBranchEmployee] = useState([]);
      const [empty,setEmpty] = useState(false);
      const [employeeInfo, setEmployeeInfo] = useState({});
      const [check,setCheck] = useState(true);
      const [imageError, setImageError] = useState(false);
      const [emailError, setEmailError] = useState(true);
      const permissions = JSON.parse(localStorage.getItem("permissions"));
      const [buttonStatus,setButtonStatus] = useState(false);

      const employeeProfileImage = useSelector((state) => state?.BranchEmployeeProfileImageReducer?.employeeProfileImage);
      
      const employeeCoverImage = useSelector((state)=> state?.BranchEmployeeCoverImageReducer?.employeeCoverImage);
      

      
     

      
      
     
    

      const [empLabel, setEmpLabel] = useState('Select Employee Type');
      const [empValue, setEmpValue] = useState(0);
      const [emp,setEmp] = useState([]);
      const [empError,setEmpError] = useState('');
      const [pass,setPass] = useState('');
      const [passError,setPassError] = useState('');

         

     useEffect(()=>{

     

      get(`BranchEmployee/Index`)
      .then( res => {
        
        setBranchEmployee(res);
        setEmpty(true);
      })

      get(`EmployeeTypeDD/ForBranch`)
      .then(res => {
        setEmp(res);
      })
   

       get(`NationalityDD/Index`)
       .then(res => {
       
         setNationality(res);
       })

       get(`Branch/Index`)
       .then(res => {
       
         setBranch(res);
       })

       get(`BranchEmployee/Get/${employeeId}`)
       .then(res => {
         
         setEmployeeInfo(res);
         setNationalityLabel(res?.nationality?.name);
         setNationalityValue(res?.nationality?.id);
         setBranchLabel(res?.branch?.name);
         setEmpLabel(res?.employeType?.name);
         setEmpValue(res?.employeType?.id);
         setCheck(false);
       })
       

     },[success])

   
    
     const backToBranchList = () => {
      history.push("/branchList");
    };


    const empOptions = emp?.map((em) => ({
      label: em.name,
      value: em.id,
    }));
    
    
    const selectEmp = (label, value) => {
    
      setEmpError('');
      setEmpLabel(label);
      setEmpValue(value);
      
     
     
    }

    
     const nationalityName = nationality?.map((nationalityInfo) => ({
      label: nationalityInfo.name,
      value: nationalityInfo.id,
    }));

    const branchName = branch?.map((branchInfo) => ({
      label: branchInfo.name,
      value: branchInfo.id,
    }));

    const handlePass = (e) => {
      setPassError('');
      setPass(e.target.value);
    }


     // select University Country
  const selectNationality = (label, value) => {
    setNationalityError(false);
    setNationalityLabel(label);
    setNationalityValue(value);
   
  }

   const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);
    subdata.append('profileImage',employeeProfileImage[0]?.originFileObj);
    subdata.append('coverImage',employeeCoverImage[0]?.originFileObj);


    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'authorization': AuthStr,
      }
    }


     if(empValue == 0){
      setEmpError('Employee type is required');
    }
    else if(nationalityValue == 0){
      setNationalityError(true);
    }
    
   
    else if(emailError == false){
      setEmailError(emailError);
    }
    
    else if(employeeProfileImage.length <1 && check){
      setImageError(true);
    }
    else{

   if(!employeeId){

    if(pass.length < 6){
      setPassError('Password length can not be less than six digits');

    }
    else{
      setButtonStatus(true);
      Axios.post(`${rootUrl}BranchEmployee/Create`, subdata, config).then((res) => {
          setButtonStatus(false);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          setSubmitData(true);
          
          addToast(res?.data?.message, {
            appearance: 'success'
            
          })
          history.push(`/branchProfile/${branchId}`)
        }
        else if (res?.status === 200 && res?.data?.isSuccess === false) {
          setSubmitData(true);
          
          addToast(res?.data?.message, {
            appearance: 'error'
            
          })
         
        }
      });

    }
    
    

   }
    
        
      
       
    
       else{
        setButtonStatus(true);
        Axios.put(`${rootUrl}BranchEmployee/Update`, subdata, config)
        .then(res => {
          setButtonStatus(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
          
            
            addToast(res?.data?.message, {
              appearance: 'success'
              
            })
            history.push(`/branchProfile/${branchId}`)
           
          }
    
        })
    
     
    
       }

    }


  

   
  };

  const handleEmail = (e) => {
    

    get(`EmailCheck/EmailCheck/${e.target.value}`)
    .then(res => {
      
      setEmailError(res);
    })
  }


    return (
        <div>
         
         <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Branch Employee Information</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToBranchList} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Branch List
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
          <CardBody>
          {/* <Nav tabs>
            <NavItem>
              <NavLink active={activetab === "1"} onClick={() => toggle("1")}>
                Branch Information
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink active={activetab === "2"} onClick={() => toggle("2")}>
                Manager Information
              </NavLink>
            </NavItem>
            <NavItem>
            <NavLink active={activetab === "3"} onClick={()=> toggle("3")}>
                  Employee Information
                </NavLink>
             
            </NavItem>
          

          </Nav> */}

          {/* {   empty && 
         <>
         <div className="table-responsive">


<Button  className="btn btn-uapp-add mb-4 " onClick={()=> setEmpty(false)}> <i className="fas fa-plus"></i>  Add New </Button>



   <Table className="table-sm table-bordered" >
     <thead className="thead-uapp-bg">
       <tr style={{ textAlign: "center" }}>
         <th>SL/NO</th>
                          
         <th>First Name</th>                    
         <th>Last Name</th>                    
         <th>Email</th>
         <th>Phone Number </th>

         <th style={{width: '8%'}} className="text-center">Picture</th>
       </tr>
     </thead>
     <tbody>

       {
         branchEmployee?.map((bemp, i) => <tr key={bemp.id} style={{ textAlign: "center" }}>
           <td>{serialNum + 1}</td>
         
           <td>{bemp?.firstName}</td>
           <td>{bemp?.lastName}</td>
           <td>{bemp?.email}</td>
           <td>{bemp?.phoneNumber}</td>
        
          
           <td style={{width: '8%'}} className="text-center">
          
             
           </td>
         </tr>)

       }


     </tbody>
   </Table>
 </div>

         </>
} */}


          <>
          <Form className="mt-5" onSubmit={handleSubmit}>
           

           

           

            <input
            type='hidden'
            name='branchId'
            id='branchId'
            value={branchId}
            />


          <FormGroup row className="has-icon-left position-relative">
             <Col md="2">
               <span>
                  Employee Type <span className="text-danger">*</span>{" "}
               </span>
             </Col>
             <Col md="4">
               <Select
                 options={empOptions}
                 value={{ label: empLabel, value: empValue }}
                 onChange={(opt) => selectEmp(opt.label, opt.value)}
                 name="employeeTypeId"
                 id="employeeTypeId"
              
               />
                  <span className='text-danger'>{empError}</span>
               

              
             </Col>
           </FormGroup>

           <FormGroup row className="has-icon-left position-relative">
             <Col md="2">
               <span>
                 First  Name <span className="text-danger">*</span>{" "}
               </span>
             </Col>
             <Col md="4">
               <Input
                 type="text"
                 name="firstName"
                 id="firstName"
                 placeholder="Enter First Name"
                 required
                 defaultValue={employeeInfo?.firstName}
               />
           
             </Col>
           </FormGroup>
           <FormGroup row className="has-icon-left position-relative">
             <Col md="2">
               <span>
                 Last  Name <span className="text-danger">*</span>{" "}
               </span>
             </Col>
             <Col md="4">
               <Input
                 type="text"
                 name="lastName"
                 id="lastName"
                 placeholder="Enter Last Name"
                 required
                 defaultValue={employeeInfo?.lastName}
               />
           
             </Col>
           </FormGroup>
        
           
           {
             employeeId? 
             <input
             type='hidden'
             name='email'
             id='email'
             value={employeeInfo?.email}
             />
            :
            <FormGroup row className="has-icon-left position-relative">
             <Col md="2">
               <span>
                 Email <span className="text-danger">*</span>{" "}
               </span>
             </Col>
             <Col md="4">
               <Input
                 type="email"
                 name="email"
                 id="email"
                 placeholder="Enter Email"
                 required
                 defaultValue={employeeInfo?.email}
                 onBlur={handleEmail}
               />
                {
                      !emailError ? 

                      <span className='text-danger'>email already exists</span>
                      :
                      null

                    }
             </Col>
           </FormGroup>
           }
          

        {
          employeeId ? 
          null
          :
          <FormGroup row className="has-icon-left position-relative">
          <Col md="2">
            <span>
              Password <span className="text-danger">*</span>{" "}
            </span>
          </Col>
          <Col md="4">
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              required
              onChange={handlePass}
            />
            <span className='text-danger'>{passError}</span>
        
          </Col>
        </FormGroup>
        }
         
         
           <FormGroup row className="has-icon-left position-relative">
             <Col md="2">
               <span>
                 Phone Number <span className="text-danger">*</span>{" "}
               </span>
             </Col>
             <Col md="4">
               <Input
                 type="text"
                 name="phoneNumber"
                 id="phoneNumber"
                 placeholder="Enter Phone Number"
                 defaultValue={employeeInfo?.phoneNumber}
               
               />
           
             </Col>
           </FormGroup>
         
          

           <FormGroup row className="has-icon-left position-relative">
             <Col md="2">
               <span>
                  Nationality <span className="text-danger">*</span>{" "}
               </span>
             </Col>
             <Col md="4">
               <Select
                 options={nationalityName}
                 value={{ label: nationalityLabel, value: nationalityValue }}
                 onChange={(opt) => selectNationality(opt.label, opt.value)}
                 name="nationalityId"
                 id="nationalityId"
                 required
               />
               {
                nationalityError? 
                <span className='text-danger'>Nationality is required</span>
                :
                null
               }

              
             </Col>
           </FormGroup>
           
              {
                employeeId? 
                
            <Input
            type='hidden'
            name='id'
            id='id'
            value={employeeId}
            />
            : null
              }
           
           <FormGroup row className="has-icon-left position-relative">
             <Col md="2">
               <span>
                  Profile Image <span className="text-danger">*</span>{" "}
               </span>
             </Col>
             <Col md="4">
              <div className='d-flex'>

              {
                employeeId? 
               <div className='mr-2'>
                 <Image
                width={104} height={104}
                src={rootUrl+employeeInfo?.profileImageMedia?.thumbnailUrl}
              />
               </div>
              : 
              null
              }
            
              <div className='ms-2'>
              <BranchProfileImage imageError={imageError} setImageError={setImageError} />
              {
                imageError ? 
                <span className='text-danger'>Profile image is required</span>
                :
                null
              }
              </div>

              </div>
             </Col>
           </FormGroup>
           <FormGroup row className="has-icon-left position-relative">
             <Col md="2">
               <span>
                  Cover Image <span className="text-danger"></span>{" "}
               </span>
             </Col>
             <Col md="4">
             <div className='d-flex'>

              {
                (employeeInfo?.coverImageMedia?.thumbnailUrl !== null && employeeId !== undefined) ?
              <div className='mr-2'>
                <Image
                width={104} height={104}
                src={rootUrl+employeeInfo?.coverImageMedia?.thumbnailUrl}
              />
              </div>
              : 
              null
              }

              <div className='ms-2'>
              <BranchCoverImage/>
              </div>

              </div>
             </Col>
           </FormGroup>

          


         
           <FormGroup
            row
             className="has-icon-left position-relative"
             style={{ display: "flex" }}
           >
            <Col md="6">
              <div className='d-flex justify-content-end'>

             {

              permissions?.includes(permissionList?.Add_Branch_Employee) ?
               <Button
               type="submit"
               className="mr-1 mt-3 badge-primary"
               disabled={buttonStatus}
             >
               Submit
             </Button>
             :
             null
             }

              </div>
            
            
            </Col>
            
            
            
           </FormGroup>
         </Form>
          </> 

         
           
        
          </CardBody>
      </Card>

    
       

       
             
    

        

       

           
           
      
        </div>
    );
};

export default Branch;