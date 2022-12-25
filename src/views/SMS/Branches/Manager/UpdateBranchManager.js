import React, { useEffect, useState } from 'react';
import {  useHistory, useParams } from 'react-router-dom';
import { Card, CardBody, CardHeader, Nav, NavItem, Form,NavLink, FormGroup, Col, Input, Button } from 'reactstrap';
import get from '../../../../helpers/get';
import put from '../../../../helpers/put';
import ManagerImage from './ManagerImage';
import Select from "react-select";
import { useToasts } from 'react-toast-notifications';

const UpdateBranchManager = () => {
    const {id}= useParams();

    const history = useHistory(); 
   
    const [activetab, setActivetab] = useState("2");
    const [branchManager, setBranchManager] = useState({});
    const [branch, setBranch] = useState([]);
    const [branchLabel, setBranchLabel] = useState('Enter branch');
    const [branchValue, setBranchValue] = useState(0);
    const [buttonStatus,setButtonStatus] = useState(false);
    const {addToast}  = useToasts();
    const backToDashboard = () => {
        history.push('/');

    }

         // tab toggle
  const toggle = (tab) => {
    setActivetab(tab);
    if (tab === "2") {
      
    }
   
  
  };

  useEffect(()=>{
    get(`Branch/Index`)
    .then(res => {
      setBranch(res);
      
    })
  },[])

  const branchName = branch?.map((branchLocation) => ({
    label: branchLocation.name,
    value: branchLocation.id,
  }));

  useEffect(()=>{
    get(`BranchManager/GetbyBranch/${id}`)
    .then(res => {
        
        setBranchManager(res);
        
    })
  },[id])

  const handleSubmit = (e) => {
      e.preventDefault();
      const subData = new FormData(e.target);
      setButtonStatus(true);
      put(`BranchManager/Update`,subData)
      .then(res => {
        setButtonStatus(false);
         {
          if(res.status ==200 && res?.data?.isSuccess == true){
           
           addToast(res?.data?.message,{
            appearance: 'success',
            autoDismiss: true
           })
                history.push(`/branchProfile/${id}`);
            
          }
          else{
            addToast(res?.data?.message,{
              appearance: 'error',
              autoDismiss: true
             })
          }
         }
      })

  }

         // select University Country
         const selectBranch = (label, value) => {
          setBranchLabel(label);
          setBranchValue(value);
        
        }


    return (
        <div>
              <div>
             <Card>
        <CardHeader className="page-header">
          <h3>Add Branch Manager Information</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToDashboard}>
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
            <NavLink disabled active={activetab === "1"}>
                  Branch Information
                </NavLink>
             
            </NavItem>
            <NavItem>
            
            <NavLink active={activetab === "2"} onClick={() => toggle("2")}>
              Manager Information
              </NavLink>
           
           
               
           
            </NavItem>

          </Nav>
         
              <Form className="mt-5"  onSubmit={handleSubmit}>
           

                
              <input
                type='hidden'
                name='branchId'
                id='branchid'
                value={id}
                />

                <input
                type='hidden'
                name='id'
                id='id'
                value={branchManager?.id}
                />


<FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                       Title <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="4">
                    <Input
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Enter title"
                      required
                    />
                
                  </Col>
                </FormGroup>
                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                       First Name <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="4">
                    <Input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="Enter first name"
                      required
                    />
                
                  </Col>
                </FormGroup>
                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                       Last Name <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="4">
                    <Input
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Enter last name"
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
                      placeholder="Enter email"
                      required
                    />
                
                  </Col>
                </FormGroup>

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
                      placeholder="Enter password"
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
                      placeholder="Enter phone number"
                    
                    />
                
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                       Branch <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="4">
                    <Select
                      options={branchName}
                      value={{ label: branchLabel, value: branchValue }}
                      onChange={(opt) => selectBranch(opt.label, opt.value)}
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
                      Manager Image <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="4">
                    <ManagerImage/>
                
                  </Col>
                </FormGroup>
                
               
            
                <FormGroup
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "space-between" }}
                ></FormGroup>
                <FormGroup
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    type="submit"
                    className="mr-1 mt-3 badge-primary"
                    disabled={buttonStatus}
                  >
                    Submit
                  </Button>
                </FormGroup>
              </Form>
          

              

          </CardBody>
      </Card>
            
        </div>
            
        </div>
    );
};

export default UpdateBranchManager;