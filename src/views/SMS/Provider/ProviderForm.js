
import Select from 'react-select';

import React, { createRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Card, CardBody, CardHeader, CardTitle,  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col, Row, InputGroup, Table, TabContent, TabPane, Nav, NavItem, NavLink, UncontrolledTooltip } from 'reactstrap';
import get from '../../../helpers/get';
import post from '../../../helpers/post';
import ProviderLogo from './ProviderLogo';
import { useSelector } from 'react-redux';
import ButtonForFunction from '../Components/ButtonForFunction';


const ProviderForm = (props) => {

    const history = useHistory();
   
    useEffect(()=> {
        get(`ProviderTypeDD/Index`)
        .then(res => setProviderType(res))
        .catch()

    },[])
   
    const [providerType, setProviderType] = useState([]);
    const [providerTypeOptions, setProvidertypeOptions] = useState('');
    const [providerTypeLabel, setProviderTypeLabel]= useState('Select Provider Type');
    const [providerTypeValue, setProviderTypeValue] = useState(0);
    const [providerTypeError, setProviderTypeError] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [emailError, setEmailError] = useState(true);

    const [titles, setTitles] = useState([]);
    const [titleLabel, setTitleLabel] = useState("Select Title");
    const [titleValue, setTitleValue] = useState(0);
    const [titleError, setTitleError] = useState('');
    const [buttonStatus,setButtonStatus] = useState(false);

    
    const providerMenu = providerType.map(providerOptions =>({label:providerOptions.name, value:providerOptions.id}) )
   
  
    // useEffect(()=>{
      
    //   get("NameTittleDD/index").then((res) => {
    //     console.log("title", res);
    //     setTitles(res);
    //   });
    // },[])

  
    const [title,setTitle] = useState('');
   
    const { addToast } = useToasts();
 
    
    const providerLogo = useSelector((state) => state?.GeneralProviderlogoFile ?.ProviderLogoFile);

    // console.log('Hello Provider Logo', providerLogo[0]?.originFileObj);
 
    

    const backToDashboard = () => {
        history.push("/")
    }

    // const nameTitle = titles?.map((singleTitle) => ({
    //   label: singleTitle.name,
    //   value: singleTitle.id,
    // }));
  
    // // select  Title
    // const selectTitle = (label, value) => {
    //   setTitleError('');
    //   setTitleLabel(label);
    //   setTitleValue(value);
    // };


    const backtoList = () => {
      history.push(`/providerList`);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
       
   
        const subData = new FormData(event.target);
        subData.append('providerLogo',providerLogo[0]?.originFileObj);

        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };

      //   if(titleValue == 0){
      //     setTitleError('Name title is required');
      // }
        if(providerTypeValue == 0){
          setProviderTypeError(true);
        }
        else if(providerLogo.length <1){
          setImageError(true);
        }
        else if(emailError == false){
          setEmailError(emailError);
        }
        else{
        //  post form data and notify the response to user
        setButtonStatus(true);
        post(`Provider/Create`,subData,config).then((action)=> {
          setButtonStatus(false);
                
          if(action?.status ==200 && action?.data?.isSuccess == true){


        
          addToast(action?.data?.message, {
          appearance:  'success',
          autoDismiss: true,
        })
       
        history.push(`/adminProviderForm/${action?.data?.result?.id}`);
        }
        else{
          addToast(action?.data?.message, {
            appearance:  'success',
            autoDismiss: true,
          })
        }
        })
        }
      
   
   
      }

      const selectProviderType = (label, value) => {
        setProviderTypeLabel(label);
        setProviderTypeValue(value);
        setProviderTypeError(false);
       
      }

      const handleEmail = (e) => {
        console.log(e.target.value);
  
        get(`Provider/EmailCheck/${e.target.value}`)
        .then(res => {
          console.log('Checking Response', res);
          setEmailError(res);
        })
      }


    return (
        <div>
        <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Provider Information</h3>
          <div className="page-header-back-to-home">
            <span className="text-white" onClick={backtoList}>
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Provider List
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
          
          <CardBody>
      <form onSubmit={handleSubmit} >


      {/* <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span className='pl-2'>
                      Title <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={nameTitle}
                      value={{ label: titleLabel, value: titleValue }}
                      onChange={(opt) => selectTitle(opt.label, opt.value)}
                      name="nameTittleId"
                      id="nameTittleId"
                      required
                    />
                    <span className='text-danger'>{titleError}</span>

                
                  </Col>
                </FormGroup> */}

                  <FormGroup row>
                    <Col md="2">
                  
                      <span className="pl-2">Provider Name {' '}<span className='text-danger'>*</span></span>
                    </Col>

                   

                 
                   
                    
                    
                    <Col md="10" lg="6">
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Provider Name"
                        onChange={(e)=>setTitle(e.target.value)}
                        required
                      />

                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                  
                   <span className="pl-2">Email {' '}<span className='text-danger'>*</span></span>
                    </Col>

             
                    

                

                    <Col md="10" lg="6">
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter Email"
                        required
                        onBlur={handleEmail}
                        // onChange={(e)=>setIcon(e.target.value)}
                      />
                      {
                      !emailError ? 

                      <span className='text-danger'>Email Already Exists</span>
                      :
                      null

                    }
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                   
                   <span className="pl-2">Phone Number {' '}<span className='text-danger'>*</span></span>
                    </Col>

                  

                  

                    <Col md="10" lg="6">
                      <Input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="Enter Phone Number"
                        required
                        // onChange={(e)=>setIcon(e.target.value)}
                      />

                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                   
                   <span className="pl-2">User Name {' '}<span className='text-danger'>*</span></span>
                    </Col>

                   
                  

                    <Col md="10" lg="6">
                      <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter User Name"
                        required
                        // onChange={(e)=>setIcon(e.target.value)}
                      />

                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                 
                    <span className="pl-2">Address Line {' '}<span className='text-danger'>*</span></span>
                    </Col>

                  
                  

                    <Col md="10" lg="6">
                      <Input
                        type="text"
                        name="addressLine"
                        id="addressLine"
                        placeholder="Enter Address Line"
                        required
                        // onChange={(e)=>setIcon(e.target.value)}
                      />

                    </Col>
                  </FormGroup>


                  <FormGroup row>
                    <Col md="2">
                    
                    <span className="pl-2">Provider Type {' '}<span className='text-danger'>*</span></span>
                    </Col>
                   
                  

                    <Col md="10" lg="6">
                    <Select 
                            options = {providerMenu}
                           value={{ label: providerTypeLabel, value: providerTypeValue }}
                           onChange={opt => selectProviderType(opt.label, opt.value)}
                           name="providerTypeId"
                           id="providerTypeId"
                           required
                          
                           />
                           {
                            providerTypeError? 
                            <span className='text-danger'>Provider type is required</span>
                            :
                            null
                           }

                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                    
                    <span className="pl-2">Provider Logo {' '}<span className='text-danger'>*</span></span>
                    </Col>
                   
                    

                    <Col md="10" lg="6">
                     <ProviderLogo setImageError={setImageError}/>
                     {
                      imageError ? 
                      <span className='text-danger'>Image is required</span>
                      :
                      null
                     }

                    </Col>
                  </FormGroup>

                  <FormGroup row
                  className="has-icon-left position-relative"
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "end",
                  }}
                  >

                    <Col md="5">


                     <div style={{position: 'relative', left: '-60px'}}>
                     <Button color='danger' className='mt-3 ml-1' onClick={backtoList}>
                        Cancel
                      </Button>

                      <ButtonForFunction 
                        type={"submit"}
                        color={'primary'}
                        className={"mt-3 ml-1"}
                        name={"Submit"}
                        permission={6}
                        disable={buttonStatus}
                      />
                     </div>
                    </Col>

                    </FormGroup>
                  
              </form>
              </CardBody>
              </Card>
            
            
        </div>
    );
};

export default ProviderForm;