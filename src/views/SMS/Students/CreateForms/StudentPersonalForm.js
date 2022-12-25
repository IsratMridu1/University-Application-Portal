import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import 'antd/dist/antd.css';
import {
  Card,
  CardBody,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Form,
  FormGroup,
  Col,
  Input,
  Button,
} from "reactstrap";

import get from "../../../../helpers/get";

import { Image } from "antd";

import { Upload, Modal } from "antd";
import * as Icon from "react-feather";

import put from "../../../../helpers/put";
import { useToasts } from "react-toast-notifications";
import { rootUrl } from "../../../../constants/constants";

import ButtonForFunction from "../../Components/ButtonForFunction";

const StudentPersonalForm = () => {

    const [check, setCheck] = useState(true);
  const {id} = useParams();

  const history = useHistory();

  const { addToast } = useToasts();

  const [success, setSuccess] = useState(false);

  const [oneData, setOneData] = useState({});

  

  const [datee, setDatee] = useState("");

  const [activetab, setActivetab] = useState("2");

  const [title, setTitle] = useState([]);
  const [titleLabel, setTitleLabel] = useState("Select Title");
  const [titleValue, setTitleValue] = useState(0);
  const [country, setCountry] = useState([]);
  const [countryLabel, setCountryLabel] = useState("Select Country");
  const [countryValue, setCountryValue] = useState(0);
  const [gender, setGender] = useState([]);
  const [genderLabel, setGenderLabel] = useState("Select Gender");
  const [genderValue, setGenderValue] = useState(0);
  const [maritalStatus, setMaritalStatus] = useState([]);
  const [maritalStatusLabel, setMaritalStatusLabel] =
    useState("Select Marital status");
  const [maritalStatusValue, setMaritalStatusValue] = useState(0);
  const [nationality, setNationality] = useState([]);
  const [nationalityLabel, setNationalityLabel] = useState("Select Nationality");
  const [nationalityValue, setNationalityValue] = useState(0);
  const [consultant, setConsultant] = useState([]);
  const [consultantLabel, setConsultantLabel] = useState("Select Consultant");
  const [consultantValue, setConsultantValue] = useState(0);
  const [studentType, setStudentType] = useState([]);

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Dates, SetDate] = useState("");
  const [number, setNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [passport, setPassport] = useState("");
  const [toggleData, setToggleData] = useState(false);
  const [studentView, setStudentview] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [countryOfBirthError, setCountryOfBirthError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [maritalStatusError, setMaritalStatusError] = useState(false);
  const [nationalityError, setNationalityError] = useState(false);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [FileList, setFileList] = useState([]);

  const [imgError, setImgError] = useState(false);
  const [buttonStatus,setButtonStatus] = useState(false);

  useEffect(() => {
    get("NameTittleDD/index").then((res) => {
     
      setTitle(res);
    });

    get("MaritalStatusDD/Index").then((res) => {
     
      setMaritalStatus(res);
    });

    get("GenderDD/Index").then((res) => {
     
      setGender(res);
    });

    get("CountryDD/index").then((res) => {
     
      setCountry(res);
    });

    get("NationalityDD/Index").then((res) => {
    
      setNationality(res);
    });

    get("ConsultantDD/index").then((res) => {
     
      setConsultant(res);
      setConsultantLabel(res?.name);
      setConsultantValue(res?.id);
    });

    get("StudentTypeDD/Index").then((res) => {
      
      setStudentType(res);
    });

      get(`Student/Get/${id}`).then(
        (res) => {
          
          setConsultantLabel(
            res?.consultant?.firstName + " " + res?.consultant?.lastName
          );
        
          setConsultantValue(res?.consultantId);
         
          setEmail(res?.email);
        
        }
      );
    
  }, [success]);

  // Trial start

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
    setImgError(false);
  };

  // dispatch(StoreStudentProfileImageData(FileList));



  // Trial End

  
  const nameTitle = title?.map((singleTitle) => ({
    label: singleTitle.name,
    value: singleTitle.id,
  }));

  // select  Title
  const selectTitle = (label, value) => {
    setTitleError(false);
    setTitleLabel(label);
    setTitleValue(value);
  };

  const countryName = country?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));

  // select  Country
  const selectCountry = (label, value) => {
    setCountryOfBirthError(false);
    setCountryLabel(label);
    setCountryValue(value);
  };

  const genderName = gender?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));

  // select  Gender
  const selectGender = (label, value) => {
    setGenderError(false);
    setGenderLabel(label);
    setGenderValue(value);
  };

  const maritalStatusName = maritalStatus?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));

  // select  Marital Status
  const selectMaritalStatus = (label, value) => {
    setMaritalStatusError(false);
    setMaritalStatusLabel(label);
    setMaritalStatusValue(value);
  };

  const nationalityName = nationality?.map((cons) => ({
    label: cons.name,
    value: cons.id,
  }));

  // select  Marital Status
  const selectNationality = (label, value) => {
    setNationalityError(false);
    setNationalityLabel(label);
    setNationalityValue(value);
  };

  const consultantName = consultant?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));

  // select  Consultant
  const selectConsultant = (label, value) => {
    setConsultantLabel(label);
    setConsultantValue(value);
  };




  const handleSubmit = (event) => {
    event.preventDefault();
    setCheck(true);

    const subData = new FormData(event.target);
    subData.append("profileImageFile", FileList[0]?.originFileObj);

   

  

    if (titleValue == 0) {
      setTitleError(true);
     
    }

    else if (countryValue == 0) {
      setCountryOfBirthError(true);
    }

    else if (genderValue == 0) {
      setGenderError(true);
    }

    else if (maritalStatusValue == 0) {
      setMaritalStatusError(true);
    }

    else if (nationalityValue == 0) {
      setNationalityError(true);
    }

    else if (FileList?.length < 1 && check) {
      setImgError(true);
    } 
    else {
      setButtonStatus(true);
      put("Student/Update", subData).then((res) => {
       
        setButtonStatus(false);
     
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setFileList([]);
          history.push(`/studentContact/${id}`);

        }
        else{
          addToast(res?.response?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };




    return (
        <div>
        <Card className="uapp-card-bg">
          <CardHeader className="page-header">
            <h3 className="text-white">Personal Information</h3>
            <div className="page-header-back-to-home">
              <span className="text-white" >
                {" "}
                 20% Completed
               
              </span>
            </div>
          </CardHeader>
        </Card>
  
        <Card>
          <CardBody>
           
           
                <Form onSubmit={handleSubmit} className="mt-5">
                  <input
                    type="hidden"
                    name="id"
                    id="id"
                    value={id}
                  />
  
                  {/* <input
                    type="hidden"
                    name="studentTypeId"
                    id="studentTypeId"
                    value={localStorage.getItem("applictionStudentTypeId")}
                  />
  
                  <input
                    type="hidden"
                    name="studentViewId"
                    id="studentViewId"
                    value={localStorage.getItem("registerStudentViewId")}
                  />
  
                  <input
                    type="hidden"
                    name="userId"
                    id="userId"
                    value={localStorage.getItem("registerUserId")}
                  /> */}
  
                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="2">
                      <span>
                        Consultant <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Select
                        options={consultantName}
                        value={{ label: consultantLabel, value: consultantValue }}
                        onChange={(opt) => selectConsultant(opt.label, opt.value)}
                        name="consultantId"
                        id="consultantId"
                        required
                      />
  
                    
                    </Col>
                  </FormGroup>
  
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
                      {titleError && (
                        <span className="text-danger">Title is required</span>
                      )}
  
                  
                    </Col>
                  </FormGroup>
  
                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="2">
                      <span>
                        First Name <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Enter First Name"
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                     
                      />
  
                      
                    </Col>
                  </FormGroup>
  
                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="2">
                      <span>
                        Last Name <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Enter Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        
                      />
  
                    </Col>
                  </FormGroup>
  
                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="2">
                      <span>
                        Date Of Birth <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        onChange={(e) => SetDate(e.target.value)}
                      
                      />
  
                     
                    </Col>
                  </FormGroup>
  
                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="2">
                      <span>
                        Phone Number <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Input
                        type="number"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="Enter Phone Number"
                        onChange={(e) => setNumber(e.target.value)}
                        required
                      
                      />
  
                   
                    </Col>
                  </FormGroup>
  
                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="2">
                      <span>
                        Passport Number <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Input
                        type="text"
                        name="passportNumber"
                        id="passportNumber"
                        placeholder="Enter Passport Number"
                        onChange={(e) => setPassport(e.target.value)}
                        required
                        
                      />
  
                   
                    </Col>
                  </FormGroup>
  
                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="2">
                      <span>
                        Country Of Birth <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Select
                        options={countryName}
                        value={{ label: countryLabel, value: countryValue }}
                        onChange={(opt) => selectCountry(opt.label, opt.value)}
                        name="birthCountryId"
                        id="birthCountryId"
                        required
                      />
                      {countryOfBirthError && (
                        <span className="text-danger">
                          Country is required
                        </span>
                      )}
  
                      
                    </Col>
                  </FormGroup>
  
                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="2">
                      <span>
                        Gender <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Select
                        options={genderName}
                        value={{ label: genderLabel, value: genderValue }}
                        onChange={(opt) => selectGender(opt.label, opt.value)}
                        name="genderId"
                        id="genderId"
                        required
                      />
  
                      {genderError && (
                        <span className="text-danger">Gender is required</span>
                      )}
  
                      
                    </Col>
                  </FormGroup>
  
                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="2">
                      <span>
                        Marital Status <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Select
                        options={maritalStatusName}
                        value={{
                          label: maritalStatusLabel,
                          value: maritalStatusValue,
                        }}
                        onChange={(opt) =>
                          selectMaritalStatus(opt.label, opt.value)
                        }
                        name="maritalStatusId"
                        id="maritalStatusId"
                        required
                      />
  
                      {maritalStatusError && (
                        <span className="text-danger">Marital status is required</span>
                      )}
  
                     
                    </Col>
                  </FormGroup>
  
                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="2">
                      <span>
                        Nationality <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Select
                        options={nationalityName}
                        value={{
                          label: nationalityLabel,
                          value: nationalityValue,
                        }}
                        onChange={(opt) =>
                          selectNationality(opt.label, opt.value)
                        }
                        name="nationalityId"
                        id="nationalityId"
                        required
                      />
  
                      {nationalityError && (
                        <span className="text-danger">Nationality is required</span>
                      )}
  
                     
                    </Col>
                  </FormGroup>
  
                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="2">
                      <span>
                        Email <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Input type="email" name="email" id="email" value={Email} />
  
                      
                    </Col>
                  </FormGroup>
  
                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="2">
                      <span>
                        Profile Photo <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <div className="row">
                       <div className="col-md-3">
                          <>
                            <Upload
                              listType="picture-card"
                              multiple={false}
                              fileList={FileList}
                              onPreview={handlePreview}
                              onChange={handleChange}
                              beforeUpload={(file) => {
                                return false;
                              }}
                            >
                              {FileList.length < 1 ? (
                                <div
                                  className="text-danger"
                                  style={{ marginTop: 8 }}
                                >
                                  <Icon.Upload />
                                  <br />
                                  <span>Upload Image Here</span>
                                </div>
                              ) : (
                                ""
                              )}
                            </Upload>
                            <Modal
                              visible={previewVisible}
                              title={previewTitle}
                              footer={null}
                              onCancel={handleCancel}
                            >
                              <img
                                alt="example"
                                style={{ width: "100%" }}
                                src={previewImage}
                              />
                            </Modal>
                          </>
                        </div>
                      </div>
  
                      {imgError ? (
                        <span className="text-danger">
                          Profile picture is required
                        </span>
                      ) : null}
                    </Col>
                  </FormGroup>
  
              
                  
                    <div className="row">
                        <div className="col-md-8 d-flex justify-content-end">
                        <ButtonForFunction
                        className={"badge-primary"}
                        type={"submit"}
                        name={"Save & Next"}
                        disable={buttonStatus}
                      />
                

                        </div>

                    </div>
              
  
                
                </Form>
  
              
            
          </CardBody>
        </Card>
      </div>
    );
};

export default StudentPersonalForm;