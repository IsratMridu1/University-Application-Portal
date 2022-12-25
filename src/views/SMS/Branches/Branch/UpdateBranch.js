import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import {  useHistory, useLocation, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { rootUrl } from '../../../../constants/constants';
import get from '../../../../helpers/get';
import Select from "react-select";

const Branch = () => {
    const {id} = useParams();
    const [branchInfo, setBranchInfo] = useState({});
    const location = useLocation();
    const [countryLabel, setCountryLabel] = useState("Country");
    const [countryValue, setCountryValue] = useState(0);
    const [stateLabel, setStateLabel] = useState("State");
    const [stateValue, setStateValue] = useState(0);
    const [country,setCountry] = useState([]);
    const [state,setState] = useState([]);
    


    useEffect(()=>{
      get(`Country/Index`)
      .then(res => {
       
        setCountry(res);
      })

    },[])


    useEffect(()=>{
        get(`Branch/Get/${location?.pathname}`)
        .then(res => {
            setBranchInfo(res);
           
            setCountryLabel(res?.country?.name);
            setStateLabel(res?.state?.name);
        })
    },[])
    
    const history = useHistory();
    const [activetab, setActivetab] = useState("1");
      const [submitData, setSubmitData] = useState(false);
    const backToBranchList = () => {
        history.push('/branchList');
    }

     // tab toggle
  const toggle = (tab) => {
    setActivetab(tab);
    if (tab == "2") {
      history.push(`/updateBranchManager/${id}`);
    }
   
  
  };

  const countryName = country?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));

  const stateName = state?.map((branchState) => ({
    label: branchState.name,
    value: branchState.id,
  }));

  const searchStateByCountry = (countryValue) => {
    get(`State/GetbyCountryId/${countryValue}`)
    .then(res => {
      
      setState(res);
    })
  }


  
     // select University Country
     const selectCountry = (label, value) => {
      setCountryLabel(label);
      setCountryValue(value);
      searchStateByCountry(value);
      setStateLabel('');
     
     
    }
    
  
    // select University State
    const selectState = (label, value) => {
      setStateLabel(label);
      setStateValue(value);
  
    };

    const AuthStr = localStorage.getItem("token");

   const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);


    //  watch form data values
    for (var value of subdata.values()) {
     
    }

   

    Axios.put(`${rootUrl}Branch/Update`, subdata, {
      headers: {
        'authorization': AuthStr,
      },
    }).then((res) => {
      // (res.status === 200 && res.data.isSuccess === true) ?
      // status = 'success' : status = res.data.message;
      // status = res.data.message;
      // data = res.data.result;

      //     addToast(res.data.message, {
      //     appearance: res.data.message == 'University has been created successfully!' ? 'success': 'error',
      //     // autoDismiss: true,
      //   })

      
    
      localStorage.setItem("branchId",res?.data?.result?.id);
      const uniID = res?.data?.result?.id;

      if (res?.status === 200 && res?.data?.isSuccess === true) {
        setSubmitData(true);
        history.push({
          pathname: `/updateBranchManager/${id}`,
          id: uniID,
        });
      }
    });
  };


    return (
        <div>
             <Card>
        <CardHeader className="page-header">
          <h3>Update Branch Information</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToBranchList}>
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Branch List
            </span>
          </div>
        </CardHeader>
      </Card>
      <Card>
          <CardBody>
          <Nav tabs>
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

          </Nav>
          <TabContent activeTab={activetab}>
            <TabPane tabId="1">
              <Form className="mt-5" onSubmit={handleSubmit}>
           
           <input type='hidden'
           name='id'
           id='id'
           value={branchInfo?.id} />

           <input
           type='hidden'
           name='branchCode'
           id='branchCode'
           value={branchInfo?.branchCode}
           />

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
                defaultValue={branchInfo?.name}
                      required
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
                     defaultValue={branchInfo?.addressLine}
                      required
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
                      defaultValue={branchInfo?.email}
                      required
                    />
                
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
                      defaultValue={branchInfo?.telePhoneNumber}
                     
                      required
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

                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>
              
                <FormGroup row
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  <Col md="7">
                  <Button.Ripple
                    type="submit"
                    className="mr-1 mt-3 badge-primary"
                  >
                    Submit
                  </Button.Ripple>
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