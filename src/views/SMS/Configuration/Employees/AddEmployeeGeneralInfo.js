import React, { createRef, useEffect, useState } from 'react'
import { Upload, Modal } from 'antd';
import "antd/dist/antd.css";
import * as Icon from 'react-feather';
import { connect, useSelector } from 'react-redux'
import { Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col, Row, Card, CardHeader, CardTitle, CardBody, UncontrolledTooltip, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { useParams } from 'react-router-dom';

import { useToasts } from "react-toast-notifications";
import axios from 'axios';

import get from '../../../../helpers/get';
import { rootUrl } from '../../../../constants/constants';

import CoverPicturesWall from './EmployeeCoverImage';

import ButtonForFunction from '../../Components/ButtonForFunction';
import post from '../../../../helpers/post';


const EmployeeGeneralInfo = (props) => {

    const { id } = useParams();

    const [userInfo, setUserInfo] = useState({});

    const myForm = createRef();
    const history = useHistory();
    const [activetab, setActivetab] = useState('1');
    const [employeeList, setEmployeeList] = useState([]);
    const [employeeType, setEmployeeType] = useState('Select Staff Type');
    const [employeeValue, setEmployeeValue] = useState(0);
    const [employeeError, setEmployeeError] = useState('');
    const [nationality, setNationality] = useState([]);
    const [nationalityType, setNationalityType] = useState('Select Nationality');
    const [nationalityValue, setNationalityValue] = useState(0);
    const [nationalityError, setNationalityError] = useState('');
    const { addToast } = useToasts();
    const [files, setFiles] = useState([]);
    const [exactFile, setExactFile] = useState({});
    const [dropzoneErrorProfile, setDropzoneErrorProfile] = useState(false);
    const [pass,setPass] = useState('');
    const [passError,setPassError] = useState('');
    const [title, setTitle] = useState([]);
    const [titleLabel, setTitleLabel] = useState("Select Title");
    const [titleValue, setTitleValue] = useState(0);
    const [titleError, setTitleError] = useState('');
    const [buttonStatus,setButtonStatus] = useState(false);
    

    const [emailError, setEmailError] = useState(true);

    const result1 = useSelector((state) => state.employeeCoverDataReducer.employeeCoverImage);

    // Image js code start


    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [FileList, setFileList] = useState([]);



    function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }
      
     
     
      const  handleCancel = () => {
          setPreviewVisible(false);
      };
    
      const handlePreview = async file => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
    
        // this.setState({
        //   previewImage: file.url || file.preview,
        //   previewVisible: true,
        //   previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        // });
    
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name ||  file.url.substring(file.url.lastIndexOf('/') + 1) );
    
    
    
    
    
      };
    
     const handleChange = ({ fileList }) => {
         setFileList(fileList);
         setDropzoneErrorProfile(false);
        
        
     };
    



    // Image js code end






    // remove file
    const onDelete = (id) => {
        setFiles([]);
    };

    const nameTitle = title?.map((singleTitle) => ({
        label: singleTitle.name,
        value: singleTitle.id,
      }));
    
      // select  Title
      const selectTitle = (label, value) => {
        setTitleError('');
        setTitleLabel(label);
        setTitleValue(value);
      };


    useEffect(() => {
        const returnValue = get(`EmployeeTypeDD/Index`).then((action) => {
            setEmployeeList(action)
        })

        get("NameTittleDD/index").then((res) => {
          
            setTitle(res);
          });
    }, [])

    useEffect(() => {
        const returnValue = get(`NationalityDD/Index`).then((action) => {
            setNationality(action)
        })
    }, [])


    const employeeTypeName = employeeList?.map(emp => ({ label: emp.name, value: emp.id }))
    const nationalityName = nationality?.map(nation => ({ label: nation.name, value: nation.id }))



    const AuthStr = localStorage.getItem("token");

    const handlePass = (e) => {
        setPassError('')
        setPass(e.target.value);
    }


    // submitting form
    const handleSubmit = (event) => {

        event.preventDefault();
        
        const subData = new FormData(event.target);
        subData.append('profileImage', FileList[0]?.originFileObj);
        subData.append('coverImage', result1.length > 0 ? result1[0]?.originFileObj : null);
        //  watch form data values
        for (var value of subData.values()) {


        }
      
        if(titleValue == 0){
            setTitleError('Name title is required');
        }

       else if (employeeValue == 0) {
            setEmployeeError('Staff type is required');
            return;
        }
         else if (nationalityValue == 0) {
            setNationalityError('Nationality is required');
            return;
        }
        else if(pass.length<6){
            setPassError('Password length can not be less than six digits');

        }
        else if(FileList?.length < 1) {
            setDropzoneErrorProfile(true);
            return;
        }

        else if(emailError == false){
            setEmailError(emailError);
          }

        else{

            setButtonStatus(true);
            axios.post(`${rootUrl}Employee/Create`,subData, {
                headers: {
                    'content-type': 'multipart/form-data',
                  'authorization': AuthStr
                  
                },
              })

                .then(res => {

                    // (res.status === 200 && res.data.isSuccess === true) ?
                    // status = 'success' : status = res.data.message;
                    // status = res.data.message;
                    // data = res.data.result;
               

                  

           
                    if (res.status === 200 && res.data.isSuccess === true) {
                        setButtonStatus(false);
                        addToast(res.data.message, {
                            appearance: 'success',
                            autoDismiss: true,
                        })
                        // history.push({
                        //     pathname: '/employeeContactInfo',
                        //   //   state: { detail : uID},
                        //     id: uID
                        // })
                        history.push(`/addStaffContactInfo/${res?.data?.result?.id}`);
                    }
                    else if(res.status === 200 && res.data.isSuccess === false){
                        setButtonStatus(false);
                        addToast(res.data.message, {
                            appearance: 'error',
                            autoDismiss: true,
                        })
                    }

                })
                .catch()
        }

    }


    // select Employee Type
    const selectEmployeeType = (label, value) => {
        setEmployeeType(label)
        setEmployeeValue(value)
        setEmployeeError(false);
    }

    //   select Nationality Type
    const selectNationalityType = (label, value) => {
        setNationalityType(label);
        setNationalityValue(value);
        setNationalityError(false);
    }


    // tab toggle
    const toggle = (tab) => {
        setActivetab(tab)
        if (tab == '2') {
            history.push(`/addStaffContactInfo`)
        }
    }
    // redirect to dashboard
    const backToDashboard = () => {
        history.push("/staffList")
    }

    const handleEmail = (e) => {
       
  
        get(`Consultant/OnChangeEmail/${e.target.value}`)
        .then(res => {
       
          setEmailError(res);
        })
      }

    return (

        <div className="uapp-employee">
            <Card className='uapp-card-bg'>
                <CardHeader className="page-header">

                    <h3 className='text-white'>Staff General Information</h3>
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
                                active={activetab === '1'}
                                onClick={() => toggle('1')}
                            >
                                General Information
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            {/* <NavLink disabled
                                active={activetab === '2'}
                                onClick={() =>toggle('2')}
                                > */}
                            <NavLink
                                disabled
                                active={activetab === '2'}
                                onClick={() => toggle('1')}
                            >

                                Contact Information
                            </NavLink>
                        </NavItem>
                    </Nav>

                    <TabContent activeTab={activetab}>
                        <TabPane tabId="1">
                            <Form ref={myForm} onSubmit={handleSubmit} className="mt-5" >

                                {/* <FormGroup row className="has-icon-left position-relative">
                                    <Input
                                        defaultValue={userInfo.id}
                                        type="hidden"
                                        name="id"
                                        id="id"
                                    />

                                </FormGroup> */}

<FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
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
                </FormGroup>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                        <span>Staff Type <span className="text-danger">*</span>{" "}</span>
                                    </Col>
                                    <Col md="6">
                                        <Select options={employeeTypeName}

                                            value={{ label: employeeType, value: employeeValue }}
                                            onChange={opt => selectEmployeeType(opt.label, opt.value)}

                                            name="employeeTypeId"
                                            id="employeeTypeId"

                                        />
                                        {
                                            employeeError && <span className="text-danger">{employeeError}</span>
                                        }
                                        {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                                    </Col>
                                </FormGroup>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                        <span>Select Nationality <span className="text-danger">*</span>{" "}</span>
                                    </Col>
                                    <Col md="6">
                                        <Select options={nationalityName}
                                            value={{ label: nationalityType, value: nationalityValue }}
                                            onChange={opt => selectNationalityType(opt.label, opt.value)}
                                            name="nationalityId"
                                            id="nationalityId"

                                        />
                                        {
                                            nationalityError && <span className="text-danger">{nationalityError}</span>
                                        }
                                        {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                                    </Col>
                                </FormGroup>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                        <span>First Name <span className="text-danger">*</span>{" "}</span>
                                    </Col>
                                    <Col md="6">
                                        <Input
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            placeholder='Enter First Name'
                                            required
                                        />
                                        {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                                    </Col>
                                </FormGroup>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                        <span>Last Name <span className="text-danger">*</span>{" "}</span>
                                    </Col>
                                    <Col md="6">
                                        <Input
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            placeholder='Enter Last Name'
                                            required
                                        />
                                        {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                                    </Col>
                                </FormGroup>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                        <span>Email Address <span className="text-danger">*</span>{" "}</span>
                                    </Col>
                                    <Col md="6">
                                        <Input
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder='Enter Email Address'
                                            required
                                            onBlur={handleEmail}
                                        />
                                        {
                      !emailError ? 

                      <span className='text-danger'>Email Already Exists</span>
                      :
                      null

                    }
                                    </Col>
                                </FormGroup>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                        <span>Password <span className="text-danger">*</span>{" "}</span>
                                    </Col>
                                    <Col md="6">
                                        <Input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder='Enter Password'
                                            required
                                            onChange={handlePass}

                                        />
                                        <span className='text-danger'>{passError}</span>
                                        
                                    </Col>
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
                                            placeholder='Enter Phone Number'
                                            required
                                        />
                                        {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                                    </Col>
                                </FormGroup>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                        <span>Profile Image <span className="text-danger">*</span>{" "}</span>
                                    </Col>
                                    <Col md="6">
                                       <Upload
         
          listType="picture-card"
          multiple={false}
          fileList={FileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={(file)=>{

          
              
            
              return false;
          }}
        >
           {FileList.length < 1 ?  <div className='text-danger' style={{ marginTop: 8 }}><Icon.Upload/></div>: ''}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>

                                        {
                                            dropzoneErrorProfile ?
                                                <span className='text-danger'>Profile image is required</span>
                                                :
                                                null
                                        }

                                    </Col>
                                </FormGroup>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                        <span>Cover Image</span>
                                    </Col>
                                    <Col md="6">
                                        <CoverPicturesWall />

                                    </Col>
                                </FormGroup>

                                {/* <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span>Profile Image</span>
                                    </Col>
                                    <Col md="6">
                                    <Input
                                        type="file"
                                        name="profileImage"
                                        id="profileImage"
                                        required
                                    />
                                  
                                    </Col>
                                </FormGroup> */}



                                <FormGroup row className="has-icon-left position-relative" style={{ display: 'flex', justifyContent: 'end' }}>

                                    {/* <Button.Ripple
                                    type="submit"
                                    className="mr-1 mt-3 badge-primary"
                                    >
                                    Submit
                                    </Button.Ripple> */}

                                    <Col md="6">

                                        <Button color='danger' className='mt-3 mx-2' onClick={()=> history.push('/staffList')}>
                                            Cancel                                            
                                        </Button>

                                        <ButtonForFunction
                                            type={"submit"}
                                            color={'primary'}
                                            className={"mr-1 mt-3"}
                                            name={"Submit"}
                                            permission={6}
                                            disable={buttonStatus}
                                        />
                                       
                                    </Col>

                                </FormGroup>

                            </Form>
                        </TabPane>
                        {/* <TabPane tabId="2">
                        
                    </TabPane> */}

                    </TabContent>
                </CardBody>
            </Card>


        </div>
    )
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(EmployeeGeneralInfo);
