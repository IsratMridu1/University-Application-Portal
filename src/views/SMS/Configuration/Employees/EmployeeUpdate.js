import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input } from 'reactstrap';
import Select from 'react-select';
import CoverPicturesWall from './EmployeeCoverImage';
import ProfilePicturesWall from './EmployeeProfileImage';
import CustomButtonRipple from '../../Components/CustomButtonRipple';


const EmployeeUpdate = () => {


    
   const history = useHistory();
    

    const backToDashboard = () => {
        history.push("/")
    }

    return (
        <div>
            <Card>
              <CardHeader className="page-header">
              
                  <h3>Update Employee Information</h3>
                  <div className="page-header-back-to-home">
                    <span onClick={backToDashboard}> <i className="fas fa-arrow-circle-left"></i> Back to Dashboard</span>
                  </div>
              
              </CardHeader>
              
            </Card>

            <Card>
                <CardBody>
               

                    
                            <Form   className="mt-5">

                            <FormGroup row className="has-icon-left position-relative">
                                    <Input
                                       
                                        type="hidden"
                                        name="userId"
                                        id="userId"
                                    />

                                </FormGroup>
                           
                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span>Employee Type</span>
                                    </Col>
                                    <Col md="6">
                                    <Select
                                        name="addressTypeId"
                                        id="addressTypeId"
                                        
                                    />
                                     
                                    </Col>
                                </FormGroup>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span>Nationality</span>
                                    </Col>
                                    <Col md="6">
                                    <Select
                                        name="addressTypeId"
                                        id="addressTypeId"
                                        
                                    />
                                     
                                    </Col>
                                </FormGroup>


                                

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span>First Name</span>
                                    </Col>
                                    <Col md="6">
                                    <Input
                                        type="text"
                                        name="state"
                                        id="state"
                                        placeholder="Your First Name"
                                       />
                                    </Col>
                                </FormGroup>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span>Last Name</span>
                                    </Col>
                                    <Col md="6">
                                    <Input
                                        type="text"
                                        name="state"
                                        id="state"
                                        placeholder="Your Last Name"
                                       />
                                    </Col>
                                </FormGroup>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span>Email Address</span>
                                    </Col>
                                    <Col md="6">
                                    <Input
                                        type="number"
                                        name="zipCode"
                                        id="zipCode"
                                        placeholder="Your Email Address"
                                       />
                                    </Col>
                                </FormGroup>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span>Phone Number</span>
                                    </Col>
                                    <Col md="6">
                                    <Input
                                        type="number"
                                        name="zipCode"
                                        id="zipCode"
                                        placeholder="Your Phone Number"
                                       />
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span>Profile Image</span>
                                    </Col>
                                    <Col md="6">
                                    <ProfilePicturesWall/>
                                       
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span>Cover Image</span>
                                    </Col>
                                    <Col md="6">
                                    <CoverPicturesWall/>
                                       
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span>Cell Phone Number</span>
                                    </Col>
                                    <Col md="6">
                                    <Input
                                        type="number"
                                        name="zipCode"
                                        id="zipCode"
                                        placeholder="Your Cell Phone Number"
                                       />
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span> Address Line</span>
                                    </Col>
                                    <Col md="6">
                                    <Input
                                        type="number"
                                        name="zipCode"
                                        id="zipCode"
                                        placeholder="Your Address Line"
                                       />
                                    </Col>
                                </FormGroup>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span>Address Type</span>
                                    </Col>
                                    <Col md="6">
                                    <Select
                                        name="addressTypeId"
                                        id="addressTypeId"
                                        
                                    />
                                     
                                    </Col>
                                </FormGroup>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span>Country</span>
                                    </Col>
                                    <Col md="6">
                                    <Select
                                        name="addressTypeId"
                                        id="addressTypeId"
                                        
                                    />
                                     
                                    </Col>
                                </FormGroup>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span>City</span>
                                    </Col>
                                    <Col md="6">
                                    <Input
                                        type="number"
                                        name="zipCode"
                                        id="zipCode"
                                        placeholder="Your City"
                                       />
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span>State</span>
                                    </Col>
                                    <Col md="6">
                                    <Input
                                        type="number"
                                        name="zipCode"
                                        id="zipCode"
                                        placeholder="Your State"
                                       />
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span>Zip Code</span>
                                    </Col>
                                    <Col md="6">
                                    <Input
                                        type="number"
                                        name="zipCode"
                                        id="zipCode"
                                        placeholder="Zip Code"
                                       />
                                    </Col>
                                </FormGroup>

                                

                                

                                

                                <FormGroup row className="has-icon-left position-relative" style={{ display: 'flex', justifyContent: 'end' }}>

                                    {/* <Button.Ripple
                                    type="submit"
                                    className="mr-1 mt-3 badge-primary"
                                    >
                                    Submit
                                    </Button.Ripple> */}

                                   <Col md="5">
                                   <CustomButtonRipple
                                      type={"submit"}
                                      className={"mr-1 mt-3 badge-primary"}
                                      name={"Submit"}
                                      permission={6}
                                    />
                                   </Col>

                                </FormGroup>
                            </Form>
                      
                </CardBody>
            </Card>


          
            
        </div>
    );
};

export default EmployeeUpdate;