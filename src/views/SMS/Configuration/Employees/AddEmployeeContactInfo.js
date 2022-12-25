import React, { createRef, useEffect, useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom';
import { connect } from 'react-redux'
import { useHistory, useLocation} from 'react-router';
import Select from 'react-select';
import { useToasts } from 'react-toast-notifications';
import { Button, Form, FormGroup,  Input,  Col,  Card, CardHeader, CardBody, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import get from '../../../../helpers/get';
import post from '../../../../helpers/post';
import ButtonForFunction from '../../Components/ButtonForFunction';



const EmployeeContactInfo = () => {
   
 
    const {employeeId} = useParams();

    
    const myForm = createRef();
    const history = useHistory();
    const [activetab, setActivetab] = useState('2');
    const [addressLine, setAddressLine] = useState([]);
    const [addressLineName, setAddressLineName] = useState('Select Address Type');
    const [addressLineValue, setAddressLineValue] = useState(0);
    const [addressLineError, setAddressLineError] = useState('');
    const [countryList, setCountryList] = useState([]);
    const [countryLabel, setCountryLabel] = useState('Select Country');
    const [countryValue, setCountryValue] = useState(0);
    const [countryError, setCountryError] = useState('');
    const { addToast } = useToasts();
    const [buttonStatus,setButtonStatus] = useState(false);
    



    const location = useLocation();

    let hiddenId;
    if(location.id){
         hiddenId = location.id;
    }else{
        hiddenId = '';
    }


 

    useEffect(()=>{
      const returnValue = get(`AddressTypeDD/Index`).then((action)=>{
     
         
        setAddressLine(action);
      })
    },[])

    useEffect(()=>{
      const returnValue = get(`CountryDD/Index`).then((action)=>{
        setCountryList(action);
        })
    },[])

    const addressLineOpt = addressLine?.map(add => ({label: add.name, value: add.id}));
    const countryOpt = countryList?.map(c => ({label: c.name, value: c.id}));




    // submitting form
    const handleSubmit = (event) => {
        event.preventDefault();


        const subData = new FormData(event.target);
        for (var value of subData.values()) {
       
        }
         if(addressLineValue == 0){
            setAddressLineError('Address type is required')
        }
        else if(countryValue == 0){
            setCountryError('Country is required')
        }
        
        else{

            setButtonStatus(true);
             post(`EmployeeContactInformation/Create`,subData).then((action)=> {
              
               if(action?.status == 200 && action?.data?.isSuccess == true){
                setButtonStatus(false);
                addToast(action?.data?.message, {
                    appearance:  'success',
                    autoDismiss: true,
                  })
                  history.push('/staffList');
               }
               else{
                setButtonStatus(false);
                addToast(action?.data?.message, {
                    appearance:  'error',
                    autoDismiss: true,
                  })
                 
               }
              
            })
        }
    }


    // tab toggle
   const toggle = (tab) => {
    setActivetab(tab)
        if(tab == '1'){
            history.push(`/addStaffGeneralInfo`)
        }
    }


    // select Address Line
    const selectAddressLine = (label,value) => {
        setAddressLineName(label);
        setAddressLineValue(value);
        setAddressLineError('');
    }

    // select Country
    const selectCountry = (label, value) => {
        setCountryLabel(label);
        setCountryValue(value);
        setCountryError('');
    }
    // redirect to dashboard
    const backToDashboard = () => {
        history.push("/staffList")
    }
    return (

        <div className="uapp-employee">
            <Card className='uapp-card-bg'>
              <CardHeader className="page-header">
              
                  <h3 className='text-white'>Staff Contact Information</h3>
                  <div className="page-header-back-to-home">
                    <span onClick={backToDashboard} className='text-white'> <i className="fas fa-arrow-circle-left"></i> Back to Staff List</span>
                  </div>
              
              </CardHeader>
              
            </Card>

            <Card>
                <CardBody>
                <Nav tabs>
                            <NavItem>
                                <NavLink
                               disabled
                                >
                                General Information
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                active={activetab === '2'}
                                onClick={() =>toggle('2')}
                                >

                                Contact Information
                                </NavLink>
                            </NavItem>
                    </Nav>

                    <TabContent activeTab={activetab}>

                        <TabPane tabId="2">
                            <Form ref={myForm} onSubmit={handleSubmit} className="mt-5">

                            <FormGroup row className="has-icon-left position-relative">
                                    <Input
                                        value={employeeId}
                                        type="hidden"
                                        name="employeeId"
                                        id="employeeId"
                                    />

                            </FormGroup>
                              

                            <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span>Phone Number <span className="text-danger">*</span>{" "}</span>
                                    </Col>
                                    <Col md="6">
                                    <Input
                                        type="number"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        placeholder="Enter Phone Number"
                                        required
                                       />
                                    </Col>
                                </FormGroup>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span>Cell Phone Number <span className="text-danger">*</span>{" "}</span>
                                    </Col>
                                    <Col md="6">
                                    <Input
                                        type="number"
                                        name="cellPhoneNumber"
                                        id="cellPhoneNumber"
                                        placeholder="Enter Cell Phone Number"
                                       />
                                    </Col>
                                </FormGroup>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span>Address Line <span className="text-danger">*</span>{" "}</span>
                                    </Col>
                                    <Col md="6">
                                    <Input
                                        type="text"
                                        name="addressLine"
                                        id="addressLine"
                                        placeholder="Enter Address Line"
                                       />
                                    </Col>
                                </FormGroup>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span>Address Type <span className="text-danger">*</span>{" "}</span>
                                    </Col>
                                    <Col md="6">
                                    <Select options={addressLineOpt}
                                        value={{label: addressLineName ,value: addressLineValue }}
                                        onChange={opt => selectAddressLine(opt.label, opt.value)}
                                        name="addressTypeId"
                                        id="addressTypeId"
                                        
                                    />
                                     {
                                        addressLineError && <span className="text-danger">{addressLineError}</span>
                                    }
                                    </Col>
                                </FormGroup>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span>Country <span className="text-danger">*</span>{" "}</span>
                                    </Col>
                                    <Col md="6">
                                    <Select options={countryOpt}
                                        value={{label: countryLabel, value: countryValue}}
                                        onChange={opt => selectCountry(opt.label, opt.value)}
                                        name="countryId"
                                        id="countryId"

                                    />
                                    {
                                        countryError && <span className="text-danger">{countryError}</span>
                                    }
                                    </Col>
                                </FormGroup>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span>City <span className="text-danger">*</span>{" "}</span>
                                    </Col>
                                    <Col md="6">
                                    <Input
                                        type="text"
                                        name="city"
                                        id="city"
                                        placeholder="Enter City"
                                        required
                                       />
                                    </Col>
                                </FormGroup>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span>State <span className="text-danger">*</span>{" "}</span>
                                    </Col>
                                    <Col md="6">
                                    <Input
                                        type="text"
                                        name="state"
                                        id="state"
                                        placeholder="Enter State"
                                       />
                                    </Col>
                                </FormGroup>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span>Zip Code <span className="text-danger">*</span>{" "}</span>
                                    </Col>
                                    <Col md="6">
                                    <Input
                                        type="number"
                                        name="zipCode"
                                        id="zipCode"
                                        placeholder="Enter Zip Code"
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
                                    <ButtonForFunction
                                      type={"submit"}
                                      className={"mr-1 mt-3 badge-primary"}
                                      name={"Submit"}
                                      permission={6}
                                      disable={buttonStatus}
                                    />
                                    </Col>

                                </FormGroup>
                            </Form>
                        </TabPane>
                    </TabContent>
                </CardBody>
            </Card>
        </div>
    )
}
const mapStatetoProps = state => ({

})
export default connect(mapStatetoProps)(EmployeeContactInfo);
