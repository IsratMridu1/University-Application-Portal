import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import {  useHistory, useLocation, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { rootUrl } from '../../../../constants/constants'
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import get from '../../../../helpers/get';
import put from '../../../../helpers/put';
import ButtonForFunction from '../../Components/ButtonForFunction';
import { permissionList } from '../../../../constants/AuthorizationConstant';


const Branch = () => {
    const history = useHistory();
    const { addToast } = useToasts();
    const {branchId} = useParams();
   
    const [activetab, setActivetab] = useState("1");
      const [submitData, setSubmitData] = useState(false);
      const [countryLabel, setCountryLabel] = useState("Select Country");
      const [countryValue, setCountryValue] = useState(0);
      const [stateLabel, setStateLabel] = useState("Select State");
      const [stateValue, setStateValue] = useState(0);
      const [country,setCountry] = useState([]);
      const [state,setState] = useState([]);
      const [branchInfo,setBranchInfo] = useState({});
      const location = useLocation();

      const [countryError, setCountryError] = useState(false);
      const [stateError, setStateError] = useState(false);
      const [emailError, setEmailError] = useState(true);
      const permissions = JSON.parse(localStorage.getItem("permissions"));
      const [buttonStatus,setButtoStatus] = useState(false);

      
      
      

      

     
      

     useEffect(()=>{
       get(`CountryDD/Index`)
       .then(res => {
         
         setCountry(res);
       })

    
       
       get(`Branch/Get/${branchId}`)
       .then(res => {
         
        setBranchInfo(res)
        setCountryLabel(res?.country?.name);
        setCountryValue(res?.country.id);
        setStateLabel(res?.state?.name);
        setStateValue(res?.state?.id);
       })
    
   
     

     },[branchId])

     
  
   

    const searchStateByCountry = (countryValue) => {
      get(`StateDD/Index/${countryValue}`)
      .then(res => {
       
        setState(res);
      })
    }
    

    
     const countryName = country?.map((branchCountry) => ({
      label: branchCountry.name,
      value: branchCountry.id,
    }));

    const stateName = state?.map((branchState) => ({
      label: branchState.name,
      value: branchState.id,
    }));


     // select University Country
  const selectCountry = (label, value) => {
    setCountryError(false);
    setCountryLabel(label);
    setCountryValue(value);
    searchStateByCountry(value);
    setStateLabel('Select State');
   
   
  }

  
  

  // select University State
  const selectState = (label, value) => {
    setStateError(false);
  
    setStateLabel(label);
    setStateValue(value);

  };

  


    const backToBranchList = () => {
        history.push('/branchList');
    }

     // tab toggle
  // const toggle = (tab) => {
  //   setActivetab(tab);
  //   if (tab == "2") {
  //     history.push("/addBranchManager");
  //   }
   
  
  // };

  
  
  const AuthStr = localStorage.getItem("token");
  

   const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);




    //  watch form data values
    for (var value of subdata) {
      
    }


    if(countryValue == 0){
      setCountryError(true);
    }
    else if(stateValue == 0){
      setStateError(true);
   
    }
    else if(emailError == false){
      setEmailError(emailError);
    }
    else{

      if(branchId){
        setButtoStatus(true);
        put('Branch/Update', subdata).then((res) => {
          
          setButtoStatus(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            setSubmitData(true);
            addToast(res.data.message, {
              appearance: 'success',
              autoDismiss: true,
            })
            history.push({
              pathname: "/branchList"
             
            });
          }
        });
       }

       else{
        setButtoStatus(true);
        Axios.post(`${rootUrl}Branch/Create`, subdata, {
          headers: {
            'authorization': AuthStr,
          },
        }).then((res) => {
        
          
          setButtoStatus(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            setSubmitData(true);
                 addToast(res.data.message, {
               appearance:'success',
                autoDismiss: true,
              })
          
            history.push("/branchList");
          }
        });
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
             <Card className='uapp-card-bg'>
        <CardHeader className="page-header">
          <h3 className='text-white'>Branch Information</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToBranchList} className='text-white'>
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
              {submitData ? (
                <NavLink active={activetab === "2"} onClick={() => toggle("2")}>
                 Manager Information
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "2"}>
             Manager Information
                </NavLink>
              )}
            </NavItem>
            <NavItem>
            <NavLink active={activetab === "3"} disabled>
                Employee Information
              </NavLink>
              </NavItem>

          </Nav> */}
          <TabContent activeTab={activetab}>
            <TabPane tabId="1">
              <Form className="mt-5" onSubmit={handleSubmit}>
                {
                  branchId? 
                  <Input 
                  type='hidden'
                  value={branchId}
                  name='id'
                  id='id' />
                  :
                  null
                
            }

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Branch Name <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="4">
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter Branch Name"
                      required
                      defaultValue={branchInfo?.name}
                    />
                
                  </Col>
                </FormGroup>
                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Address Line <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="4">
                    <Input
                      type="text"
                      name="addressLine"
                      id="addressLine"
                      placeholder="Enter Address Line"
                      required
                      defaultValue={branchInfo?.addressLine}
                    />
                
                  </Col>
                </FormGroup>
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
                      defaultValue={branchInfo?.email}
                      onBlur={handleEmail}
                    />
                    {
                      !emailError ? 

                      <span className='text-danger'>Email already exists</span>
                      :
                      null

                    }
                  </Col>
                </FormGroup>
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
                      defaultValue={branchInfo?.phoneNumber}
                    
                    />
                
                  </Col>
                </FormGroup>
                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Telephone Number <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="4">
                    <Input
                      type="text"
                      name="telePhoneNumber"
                      id="telePhoneNumber"
                      placeholder="Enter Telephone Number"
                      required
                      defaultValue={branchInfo?.telePhoneNumber}
                    />
                
                  </Col>
                </FormGroup>
                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Branch Code <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="4">
                    <Input
                      type="text"
                      name="branchCode"
                      id="branchCode"
                      placeholder="Enter Branch Code"
                      required
                      defaultValue={branchInfo?.branchCode}
                    />
                
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                       Country <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="4">
                    <Select
                      options={countryName}
                      value={{ label: countryLabel, value: countryValue }}
                      onChange={(opt) => selectCountry(opt.label, opt.value)}
                      name="countryId"
                      id="countryId"
                      required

                    />
                    {
                      countryError ? 
                      <span className='text-danger'>Country is required</span>
                      :
                      null
                    }


                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                       State <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="4">
                    <Select
                      options={stateName}
                      value={{ label: stateLabel, value: stateValue }}
                      onChange={(opt) => selectState(opt.label, opt.value)}
                      name="stateId"
                      id="stateId"
                      required
                    />
                     {
                      stateError ? 
                      <span className='text-danger'>State is required</span>
                      :
                      null
                    }

                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>


                <FormGroup
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "space-between" }}
                ></FormGroup>
                <FormGroup row
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                
                  <Col md="7">
                  {
                    permissions?.includes(permissionList?.Add_Branch) ?
                    <ButtonForFunction 
                    type={"submit"}
                    className={"mr-1 mt-3 badge-primary"}
                    name={"Submit"}
                    permission={6}
                    disable={buttonStatus}
                  />
                  :
                  null
                  }
                  </Col>

                </FormGroup>
              </Form>
            </TabPane>
          </TabContent>

              

          </CardBody>
      </Card>
            
        </div>
    );
};

export default Branch;