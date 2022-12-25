import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
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
import { Toggle } from "react-toggle-component";
import get from "../../../helpers/get";
import StudentProfileImage from "./StudentProfileImage";
import { Image } from "antd";
import { useSelector } from "react-redux";
import { Upload, Modal } from "antd";
import * as Icon from "react-feather";
import post from "../../../helpers/post";
import put from "../../../helpers/put";
import { useToasts } from "react-toast-notifications";
import { rootUrl } from "../../../constants/constants";
import { useDispatch } from "react-redux";
import { StoreStudentProfileImageData } from "../../../redux/actions/SMS/Students/StudentProfileImageAction";
import ButtonForFunction from "../Components/ButtonForFunction";

const PersonalInformation = () => {
  

  

  const [check, setCheck] = useState(true);
  const {applicationStudentId , update} = useParams();

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

  // const dispatch = useDispatch();

  useEffect(() => {
    get("NameTittleDD/index").then((res) => {
      console.log("title", res);
      setTitle(res);
    });

    get("MaritalStatusDD/Index").then((res) => {
      console.log(res);
      setMaritalStatus(res);
    });

    get("GenderDD/Index").then((res) => {
      console.log(res);
      setGender(res);
    });

    get("CountryDD/index").then((res) => {
      console.log("Check Country", res);
      setCountry(res);
    });

    get("NationalityDD/Index").then((res) => {
      console.log(res);
      setNationality(res);
    });

    get("ConsultantDD/index").then((res) => {
      console.log("r", res);
      setConsultant(res);
      setConsultantLabel(res?.name);
      setConsultantValue(res?.id);
    });

    get("StudentTypeDD/Index").then((res) => {
      console.log(res);
      setStudentType(res);
    });

    // get(`Consultant/Get/${consultantValueId}`)
    // .then(res => {
    //   console.log('Cid',res);
    //   setConsultantLabel(res?.firstName);
    //   setConsultantValue(res?.id);
    // })

    if (applicationStudentId) {
      get(`Student/Get/${applicationStudentId}`).then(
        (res) => {
          console.log("fetching student info from api", res);
          setConsultantLabel(
            res?.consultant?.firstName + " " + res?.consultant?.lastName
          );
          setOneData(res);
          setConsultantValue(res?.consultantId);
          setFirstName(res?.firstName);
          setLastName(res?.lastName);
          setEmail(res?.email);
          setTitleLabel(
            res?.nameTittle?.name == null
              ? "Select Title"
              : res?.nameTittle?.name
          );
          setTitleValue(res?.nameTittle?.id == null ? 0 : res?.nameTittle?.id);

          setNumber(res?.phoneNumber);
          setPassport(res?.passportNumber);
          setGenderLabel(
            res?.gender?.name == null ? "Select Gender" : res?.gender?.name
          );
          setGenderValue(res?.gender?.id == null ? 0 : res?.gender?.id);
          setMaritalStatusLabel(
            res?.maritalStatus?.name == null
              ? "Select Marital Status"
              : res?.maritalStatus?.name
          );
          setMaritalStatusValue(
            res?.maritalStatus?.id == null ? 0 : res?.maritalStatus?.id
          );
          setNationalityLabel(
            res?.nationality?.name == null
              ? "Select Nationality"
              : res?.nationality?.name
          );
          setNationalityValue(
            res?.nationality?.id == null ? 0 : res?.nationality?.id
          );
          setCountryLabel(
            res?.country?.name == null ? "Select Country" : res?.country?.name
          );
          setCountryValue(res?.country?.id == null ? 0 : res?.country?.id);
          setCheck(false);
          console.log("Check", check);

          const z = res?.dateOfBirth;

          var utcDate = new Date(z);

          var localeDte = utcDate.toLocaleString("en-CA");

          const x = localeDte.split("T");
          const y = x[0].split(",");
          setDatee(y[0]);
        }
      );
    }
  }, [success]);

  console.log("Image Error", imgError);

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

  console.log("One two three", FileList[0]?.originFileObj);

  // Trial End

  // const profileImageData = useSelector((state) => state?.StudentProfileImageReducer?.studentImage);

  // console.log('11111111',profileImageData);

  const toggle = (tab) => {
    setActivetab(tab);
    if (tab == "1") {
      history.push(`/addStudentApplicationInformation/${applicationStudentId}/${1}`);
    }

    if (tab == "2") {
      history.push(`/addStudentInformation/${applicationStudentId}`);
    }

    if (tab == "3") {
      history.push(`/addStudentContactInformation/${applicationStudentId}`);
    }

    if (tab == "4") {
      history.push(`/addStudentEducationalInformation/${applicationStudentId}`);
    }

    if (tab == "5") {
      history.push(`/addTestScore/${applicationStudentId}`);
    }

    if (tab == "6") {
      history.push(`/addExperience/${applicationStudentId}`);
    }

    if (tab == "7") {
      history.push(`/addReference/${applicationStudentId}`);
    }

    if (tab == "8") {
      history.push(`/addPersonalStatement/${applicationStudentId}`);
    }
    if (tab == "9") {
      history.push(`/addOtherInformation/${applicationStudentId}`);
    }
    if (tab == "10") {
      history.push(`/uploadDocument/${applicationStudentId}`);
    }
    if (tab == "11") {
      history.push(`/studentDeclaration/${applicationStudentId}`);
    }
  };

  const backToStudentProfile = () => {
    history.push(
      `/studentProfile/${applicationStudentId}`
    );
  };

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

  const studentTypeName = studentType?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));

  const goForward = () => {
    history.push(`/AddStudentContactInformation/${applicationStudentId}`);
  };

  const goBackward = () => {
    history.push(`/AddStudentApplicationInformation/${applicationStudentId}/${1}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCheck(true);

    const subData = new FormData(event.target);
    subData.append("profileImageFile", FileList[0]?.originFileObj);

    // for( var x of subData.values()){
    //   console.log(x);
    // }

  

    if (titleValue == 0) {
      setTitleError(true);
      console.log("error 111111");
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
        console.log("posted data", res);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setFileList([]);

        }
        else{
          addToast(res?.data?.message, {
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
            <span className="text-white" onClick={backToStudentProfile}>
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Student
              Profile
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
         
            <Nav tabs>
              <NavItem>
                <NavLink
              
                  active={activetab === "1"}
                  onClick={() => toggle("1")}
                >
                  Application
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
               
                  active={activetab === "2"}
                  onClick={() => toggle("2")}
                >
                  Personal
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                
                  active={activetab === "3"}
                  onClick={() => toggle("3")}
                >
                  Contact
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                
                  active={activetab === "4"}
                  onClick={() => toggle("4")}
                >
                  Educational
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
               
                  active={activetab === "5"}
                  onClick={() => toggle("5")}
                >
                  Test Score
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  
                  active={activetab === "6"}
                  onClick={() => toggle("6")}
                >
                  Experience
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                
                  active={activetab === "7"}
                  onClick={() => toggle("7")}
                >
                  Reference
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
               
                  active={activetab === "8"}
                  onClick={() => toggle("8")}
                >
                  Personal Statement
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
               
                  active={activetab === "9"}
                  onClick={() => toggle("9")}
                >
                  Others
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  
                  active={activetab === "10"}
                  onClick={() => toggle("10")}
                >
                  Documents
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  
                  active={activetab === "11"}
                  onClick={() => toggle("11")}
                >
                  Declaration
                </NavLink>
              </NavItem>
            </Nav>
          

          <TabContent activeTab={activetab}>
            <TabPane tabId="2">
              <Form onSubmit={handleSubmit} className="mt-5">
                <input
                  type="hidden"
                  name="id"
                  id="id"
                  value={applicationStudentId}
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
                      defaultValue={FirstName}
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
                      defaultValue={LastName}
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
                      defaultValue={datee}
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
                      defaultValue={number}
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
                      defaultValue={passport}
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
                      {oneData?.profileImage !== null ? (
                        <div className="col-md-3">
                          <Image
                            width={104}
                            height={104}
                            src={rootUrl + oneData?.profileImage?.fileUrl}
                          />
                        </div>
                      ) : null}

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

                <FormGroup
                  row
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  <Col md="5">
                    <ButtonForFunction
                      className={"mr-1 mt-3 badge-primary"}
                      type={"submit"}
                      name={"Submit"}
                      disable={buttonStatus}
                    />
                  </Col>
                </FormGroup>

                <FormGroup
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "space-between" }}
                ></FormGroup>
              </Form>

              <FormGroup
                className="has-icon-left position-relative"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <ButtonForFunction
                  className={" mt-3 btn-warning"}
                  icon={<i className="fas fa-arrow-left-long mr-1"></i>}
                  name={"Previous"}
                  func={goBackward}
                />

                <Button.Ripple
                  onClick={goForward}
                  className="mr-1 mt-3 btn-warning"
                  
                >
                  Next
                  <i className="fas fa-arrow-right-long ml-1"></i>
                </Button.Ripple>
              </FormGroup>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default PersonalInformation;
