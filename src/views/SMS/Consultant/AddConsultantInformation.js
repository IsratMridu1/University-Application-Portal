import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
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
  Label,
} from "reactstrap";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import get from "../../../helpers/get";
import { Upload, Modal } from "antd";
import * as Icon from "react-feather";
import { Image } from "antd";
import "antd/dist/antd.css";
import put from "../../../helpers/put";
import { rootUrl } from "../../../constants/constants";
import ButtonForFunction from "../Components/ButtonForFunction";
import { userTypes } from "../../../constants/userTypeConstant";

const AddConsultantInformation = () => {
  const { addToast } = useToasts();
  const {consultantRegisterId} = useParams();
  const history = useHistory();
  const [nameTitle, setNameTitle] = useState([]);
  const [consParent, setConsParent] = useState([]);
  const [consType, setConsType] = useState([]);
  const [nameLabel, setNameLabel] = useState("Select Name Title");
  const [nameValue, setNameValue] = useState(0);
  const [parentLabel, setParentLabel] = useState("Select Parent Consultant");
  const [parentValue, setParentValue] = useState(0);
  const [typeLabel, setTypeLabel] = useState("Select Consultant Type");
  const [typeValue, setTypeValue] = useState(0);

  const userTypeId = localStorage.getItem('userType');

  const [emailError, setEmailError] = useState(true);
  const [consultantError, setConsultantError] = useState(false);
  const [parentError, setParentError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const [account, setAccount] = useState([]);
  const [residency, setResidency] = useState([]);
  const [branch, setBranch] = useState([]);
  const [visa, setVisa] = useState([]);

  const [accountLabel, setAccountLabel] = useState("Select Account Status");
  const [accountValue, setAccountValue] = useState(0);
  const [residencyLabel, setResidencyLabel] = useState(
    "Select Residency Status"
  );
  const [residencyValue, setResidencyValue] = useState(0);
  const [branchLabel, setBranchLabel] = useState("Select Branch");
  const [branchValue, setBranchValue] = useState(0);
  const [visaLabel, setVisaLabel] = useState("Select Visa Type");
  const [visaValue, setVisaValue] = useState(0);

  const [accountError, setAccountError] = useState(false);
  const [residencyError, setResidencyError] = useState(false);
  const [branchError, setBranchError] = useState(false);
  const [visaError, setVisaError] = useState(false);

  const [consultantData, setConsultantData] = useState({});

  const [work, setWork] = useState(false);
  const [workError, setWorkError] = useState(false);

  const [success, setSuccess] = useState(false);

  const [activetab, setActivetab] = useState("1");
  const [buttonStatus,setButtonStatus] = useState(false);

  // Profile Image States

  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [FileList1, setFileList1] = useState([]);
  const [profilePicError, setProfilePicError] = useState(false);

  // Cover Image States

  const [previewVisible2, setPreviewVisible2] = useState(false);
  const [previewImage2, setPreviewImage2] = useState("");
  const [previewTitle2, setPreviewTitle2] = useState("");
  const [FileList2, setFileList2] = useState([]);

  // Id or Passport States

  const [previewVisible3, setPreviewVisible3] = useState(false);
  const [previewImage3, setPreviewImage3] = useState("");
  const [previewTitle3, setPreviewTitle3] = useState("");
  const [FileList3, setFileList3] = useState([]);
  const [idPassportError, setIdPassportError] = useState(false);

  // Proof of Address States

  const [previewVisible4, setPreviewVisible4] = useState(false);
  const [previewImage4, setPreviewImage4] = useState("");
  const [previewTitle4, setPreviewTitle4] = useState("");
  const [FileList4, setFileList4] = useState([]);
  const [proofOfAddressError, setProofOfAddressError] = useState(false);

  // Proof of Right to Work States

  const [previewVisible5, setPreviewVisible5] = useState(false);
  const [previewImage5, setPreviewImage5] = useState("");
  const [previewTitle5, setPreviewTitle5] = useState("");
  const [FileList5, setFileList5] = useState([]);
  const [proofOfRightError, setProofOfRightError] = useState('');

  // Checking Put method



  useEffect(() => {
    get("NameTittleDD/index").then((res) => {
      setNameTitle(res);
    });

    get("ConsultantDD/index").then((res) => {
      setConsParent(res);
    });

    get("ConsultantTypeDD/index").then((res) => {
      setConsType(res);
    });

    get(`Consultant/Get/${consultantRegisterId}`).then(
      (res) => {
        console.log("fetching consultant info from api", res);
        setConsultantData(res);
        setNameLabel(res?.nameTittleId? res?.nameTitle?.name : 'Select Title');
        setNameValue(res?.nameTittleId? res?.nameTitle?.id : 0);
        setTypeLabel(res?.consultantTypeId !== null ? res?.consultantType?.name : null);
        setTypeValue(res?.consultantTypeId !== null ? res?.consultantType?.id : null);
        setParentLabel(res?.parentConsultantId !== null ? res?.parentConsultantName : 'Select Parent Consultant');
        setParentValue(res?.parentConsultantId !== null ? res?.parentConsultantId : 0);
        setAccountLabel(res?.accountStatusId !== null? res?.accountStatus?.statusName : 'Select Account Label' );
        setAccountValue(res?.accountStatusId !== null ? res?.accountStatus?.id : 0);
        setWork(`${res?.haveRightToWork}`);
        setResidencyLabel(
          res?.residencyStatusId !== null
            ? res?.residencyStatus?.name
            : "Select Residency Status"
        );
        setResidencyValue(
          res?.residencyStatusId !== null ? res?.residencyStatus?.id : 0
        );
        setBranchLabel(
          res?.branchId !== null ? res?.branch?.name : "Select Branch"
        );
        setBranchValue(res?.branchId !== null ? res?.branch?.id : 0);
        setVisaLabel(
          res?.visaTypeId !== null ? res?.visaStatus?.name : "Select Visa Type"
        );
        setVisaValue(res?.visaTypeId !== null ? res?.visaStatus?.id : 0);
      }
    );

    get("VisaTypeDD/Index").then((res) => {
      // console.log(res);
      setVisa(res);
    });

    get("BranchDD/index").then((res) => {
      // console.log(res);
      setBranch(res);
    });

    get("ResidencyStatusDD/index").then((res) => {
      // console.log(res);
      setResidency(res);
    });

    get(
      `AccountStatusDD/index/${consultantRegisterId}`
    ).then((res) => {
      // console.log(res);
      setAccount(res);
    });
  }, [success]);

  // Profile Image Code Start

  function getBase641(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel1 = () => {
    setPreviewVisible1(false);
  };

  const front = () => {
    history.push(`/consultantBankDetails/${consultantRegisterId}`);
  }
  const handlePreview1 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase641(file.originFileObj);
    }

    setPreviewImage1(file.url || file.preview);
    setPreviewVisible1(true);
    setPreviewTitle1(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange1 = ({ fileList }) => {
    setFileList1(fileList);
    setProfilePicError(false);
  };

  // dispatch(StoreStudentProfileImageData(FileList));

  // console.log('Profile Image of Consultant', FileList1[0]?.originFileObj);

  // Profile Image Code End

  // Cover Image Code Start

  function getBase642(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel2 = () => {
    setPreviewVisible2(false);
  };

  const handlePreview2 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase642(file.originFileObj);
    }

    setPreviewImage2(file.url || file.preview);
    setPreviewVisible2(true);
    setPreviewTitle2(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange2 = ({ fileList }) => {
    setFileList2(fileList);
  };

  // dispatch(StoreStudentProfileImageData(FileList));

  // console.log('Cover Image of Consultant', FileList2[0]?.originFileObj);

  // Cover Image Code End

  // Id or Passport Code Start

  function getBase643(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel3 = () => {
    setPreviewVisible3(false);
  };

  const handlePreview3 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase643(file.originFileObj);
    }

    setPreviewImage3(file.url || file.preview);
    setPreviewVisible3(true);
    setPreviewTitle3(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange3 = ({ fileList }) => {
    setFileList3(fileList);
    setIdPassportError(false);
  };

  // dispatch(StoreStudentProfileImageData(FileList));

  // console.log('Id or Passport of Consultant', FileList3[0]?.originFileObj);

  // Id or Passport Code End

  // Proof of Address Code Start

  function getBase644(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel4 = () => {
    setPreviewVisible4(false);
  };

  const handlePreview4 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase644(file.originFileObj);
    }

    setPreviewImage4(file.url || file.preview);
    setPreviewVisible4(true);
    setPreviewTitle4(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange4 = ({ fileList }) => {
    setFileList4(fileList);
    setProofOfAddressError(false);
  };

  // dispatch(StoreStudentProfileImageData(FileList));

  // console.log('Id or Passport of Consultant', FileList3[0]?.originFileObj);

  // Proof of Address Code End

  // Proof of Right to Work Code Start

  function getBase645(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel5 = () => {
    setPreviewVisible5(false);
  };

  const handlePreview5 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase645(file.originFileObj);
    }

    setPreviewImage5(file.url || file.preview);
    setPreviewVisible5(true);
    setPreviewTitle5(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange5 = ({ fileList }) => {
    setFileList5(fileList);
    setProofOfRightError('');
  };

  // dispatch(StoreStudentProfileImageData(FileList));

  // console.log('Id or Passport of Consultant', FileList3[0]?.originFileObj);

  // Proof of Right to Work Code End

  const nameTitleMenu = nameTitle?.map((titleOptions) => ({
    label: titleOptions?.name,
    value: titleOptions?.id,
  }));
  const consParentMenu = consParent?.map((consParentOptions) => ({
    label: consParentOptions?.name,
    value: consParentOptions?.id,
  }));
  const consTypeMenu = consType?.map((consTypeOptions) => ({
    label: consTypeOptions?.name,
    value: consTypeOptions?.id,
  }));

  const visaStatusName = visa?.map((v) => ({
    label: v.name,
    value: v.id,
  }));

  const branchOptions = branch?.map((b) => ({
    label: b.name,
    value: b.id,
  }));

  const residencyOptions = residency?.map((r) => ({
    label: r.name,
    value: r.id,
  }));

  const accountOptions = account?.map((a) => ({
    label: a.name,
    value: a.id,
  }));

  const selectVisaStatus = (label, value) => {
    setVisaError(false);
    setVisaLabel(label);
    setVisaValue(value);
  };

  const selectBranch = (label, value) => {
    setBranchError(false);
    setBranchLabel(label);
    setBranchValue(value);
  };

  const selectResidency = (label, value) => {
    setResidencyError(false);
    setResidencyLabel(label);
    setResidencyValue(value);
  };

  const selectAccount = (label, value) => {
    setAccountLabel(label);
    setAccountValue(value);
  };

  const selectNameTitle = (label, value) => {
    setTitleError(false);
    setNameLabel(label);
    setNameValue(value);
  };

  const selectParentCons = (label, value) => {
    setParentError(false);
    setParentLabel(label);
    setParentValue(value);
  };

  const selectConsType = (label, value) => {
    setConsultantError(false);
    setTypeLabel(label);
    setTypeValue(value);
  };

  const backToConsultantList = () => {
    history.push("/consultantList");
  };


  const toggle = (tab) => {
    setActivetab(tab);
    if (tab == "1") {
      history.push(`/consultantInformation/${consultantRegisterId}`);
    }

    if (tab == "2") {
      history.push(`/consultantBankDetails/${consultantRegisterId}`);
    }

    if (tab == "3") {
      history.push(`/consultantCommission/${consultantRegisterId}`);
    }

    if (tab == "4") {
      history.push(`/consultantConscent/${consultantRegisterId}`);
    }

  };

  // Have Right To Work Radio Button

  const handleWork = (event) => {
    console.log(event.target.value);
    setWork(event.target.value);
    setWorkError(false);
  };

  console.log(FileList5);

  const handleSubmit = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append(
      "consultantProfileImage",
      FileList1.length == 0 ? null : FileList1[0]?.originFileObj
    );
    subData.append(
      "consultantCoverImage",
      FileList2.length == 0 ? null : FileList2[0]?.originFileObj
    );
    subData.append(
      "idOrPassport",
      FileList3.length == 0 ? null : FileList3[0]?.originFileObj
    );
    subData.append(
      "proofOfAddress",
      FileList4.length == 0 ? null : FileList4[0]?.originFileObj
    );
    subData.append(
      "proofOfRightToWork",
      FileList5.length == 0 ? null : FileList5[0]?.originFileObj
    );

    // for (var x of subData) {
    //   console.log(x);
    // }

    // if (nameValue == 0) {
    //   setTitleError(true);
    // }

    // if (parentValue == 0) {
    //   setParentError(true);
    // }

    // if (typeValue == 0) {
    //   setConsultantError(true);
    // }

    if (accountValue == 0) {
      setAccountError(true);
    }

    else if (residencyValue == 0) {
      setResidencyError(true);
    }

    // else if (branchValue == 0) {
    //   setBranchError(true);
    // }

   else if (visaValue == 0) {
      setVisaError(true);
    }
   else if (work !== "false" && work !== "true") {
      setWorkError(true);
    }
    else if (FileList1.length < 1 && consultantData?.consultantProfileImageMedia == null) {
      setProfilePicError(true);
    }
   else  if (FileList3.length < 1 && consultantData?.idOrPassportMedia == null) {
      setIdPassportError(true);
    }
   else if (FileList4.length < 1 && consultantData?.proofOfAddressMedia == null) {
      setProofOfAddressError(true);
    }
    else if((work == 'true') && (FileList5.length < 1 && consultantData?.proofOfRightToWorkMedia == null)){
      
      setProofOfRightError('File is required');
   
    }
    else {
      setButtonStatus(true);
      put(`Consultant/Update`, subData).then((res) => {
        setButtonStatus(false);
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          setSuccess(!success);
          setFileList1([]);
          setFileList2([]);
          setFileList3([]);
          setFileList4([]);
          setFileList5([]);
          history.push(`/consultantBankDetails/${consultantRegisterId}`);
          
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
          <h3 className="text-white"> Consultant Information</h3>
          {
            !(userTypeId == userTypes?.Consultant) ?
            <div className="page-header-back-to-home">
            <span className="text-white" onClick={backToConsultantList}>
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Consultant
              List
            </span>
          </div>
          :
          null
          }
        </CardHeader>
      </Card>

      <Card>
        <CardBody>

          {/* nav tabs start */}

          <Nav tabs>
              <NavItem>
                <NavLink
                 
                  active={activetab === "1"}
                  onClick={() => toggle("1")}
                >
                  Information
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                 
                  active={activetab === "2"}
                  onClick={() => toggle("2")}
                >
                  Bank  Details
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                
                  active={activetab === "3"}
                  onClick={() => toggle("3")}
                >
                  Commission
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                
                  active={activetab === "4"}
                  onClick={() => toggle("4")}
                >
                  Conscent
                </NavLink>
              </NavItem>


            </Nav>

          {/* nav tabs end */}


          <Form onSubmit={handleSubmit} className="mt-5">
            <input
              type="hidden"
              name="id"
              id="id"
              value={consultantRegisterId}
            />

            {
              (consultantData?.id) ?
              <input
              type='hidden'
              name='parentConsultantId'
              id='parentConsultantId'
              value={consultantData?.parentConsultantId}
              />
              :
              null
            }

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Consultant Type <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={consTypeMenu}
                  value={{ label: typeLabel, value: typeValue }}
                  onChange={(opt) => selectConsType(opt.label, opt.value)}
                  name="consultantTypeId"
                  id="consultantTypeId"
                />

                {consultantError && (
                  <span className="text-danger">Consultant type is required</span>
                )}
              </Col>
            </FormGroup>

          {
            (!consultantData?.id === 1) ?
              <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Parent Consultant <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={consParentMenu}
                  value={{ label: parentLabel, value: parentValue }}
                  onChange={(opt) => selectParentCons(opt.label, opt.value)}
                  name="parentConsultantId"
                  id="parentConsultantId"
                />

                {parentError && (
                  <span className="text-danger">Parent consultant is required</span>
                )}
              </Col>
            </FormGroup>
            :
            null
          }

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Name Title <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={nameTitleMenu}
                  value={{ label: nameLabel, value: nameValue }}
                  onChange={(opt) => selectNameTitle(opt.label, opt.value)}
                  name="nameTittleId"
                  id="nameTittleId"
                />

                {titleError && (
                  <span className="text-danger">Name title is required</span>
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
                  defaultValue={consultantData?.firstName}
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
              <Col md="6">
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter Last Name"
                  defaultValue={consultantData?.lastName}
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
              <Col md="6">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  required
                  value={consultantData?.email}
                />

                {!emailError ? (
                  <span className="text-danger">Email already exists</span>
                ) : null}
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
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Enter Phone Number"
                  defaultValue={consultantData?.phoneNumber}
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Account Status <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={accountOptions}
                  value={{ label: accountLabel, value: accountValue }}
                  onChange={(opt) => selectAccount(opt.label, opt.value)}
                  name="AccountStatusId"
                  id="AccountStatusId"
                />

                {accountError && (
                  <span className="text-danger">Account status is required</span>
                )}
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Residency Status <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={residencyOptions}
                  value={{ label: residencyLabel, value: residencyValue }}
                  onChange={(opt) => selectResidency(opt.label, opt.value)}
                  name="ResidencyStatusId"
                  id="ResidencyStatusId"
                />

                {residencyError && (
                  <span className="text-danger">Residency Status is required</span>
                )}
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Branch <span className="text-danger"></span>
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={branchOptions}
                  value={{ label: branchLabel, value: branchValue }}
                  onChange={(opt) => selectBranch(opt.label, opt.value)}
                  name="BranchId"
                  id="BranchId"
                />

                {branchError && (
                  <span className="text-danger">Branch is required</span>
                )}
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Visa Status <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={visaStatusName}
                  value={{ label: visaLabel, value: visaValue }}
                  onChange={(opt) => selectVisaStatus(opt.label, opt.value)}
                  name="visaTypeId"
                  id="visaTypeId"
                />

                {visaError && (
                  <span className="text-danger">Visa status is required</span>
                )}
              </Col>
            </FormGroup>
            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Have Right To Work <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <FormGroup check inline>
                  <Input
                    className="form-check-input"
                    type="radio"
                    id="haveRightToWork"
                    onChange={handleWork}
                    name="haveRightToWork"
                    value="true"
                    checked={work == "true"}
                  />
                  <Label
                    className="form-check-label"
                    check
                    htmlFor="haveRightToWork"
                  >
                    Yes
                  </Label>
                </FormGroup>

                <FormGroup check inline>
                  <Input
                    className="form-check-input"
                    type="radio"
                    id="haveRightToWork"
                    onChange={handleWork}
                    name="haveRightToWork"
                    value="false"
                    checked={work == "false"}
                  />
                  <Label
                    className="form-check-label"
                    check
                    htmlFor="haveRightToWork"
                  >
                    No
                  </Label>
                </FormGroup>

                <br />

                {workError && (
                  <span className="text-danger">
                    Have right to work is required.
                  </span>
                )}
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Profile Image <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <div className="row">
                  {consultantData?.consultantProfileImageMedia?.fileUrl != null ? (
                    <div className="col-md-3">
                      <Image
                        width={104}
                        height={104}
                        src={
                          rootUrl +
                          consultantData?.consultantProfileImageMedia?.thumbnailUrl
                        }
                      />
                    </div>
                  ) : null}

                  <div className="col-md-3">
                    <Upload
                      listType="picture-card"
                      multiple={false}
                      fileList={FileList1}
                      onPreview={handlePreview1}
                      onChange={handleChange1}
                      beforeUpload={(file) => {
                        return false;
                      }}
                    >
                      {FileList1.length < 1 ? (
                        <div className="text-danger" style={{ marginTop: 8 }}>
                          <Icon.Upload />
                          <br />
                          <span>Upload  Here</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </Upload>
                    <Modal
                      visible={previewVisible1}
                      title={previewTitle1}
                      footer={null}
                      onCancel={handleCancel1}
                    >
                      <img
                        alt="example"
                        style={{ width: "100%" }}
                        src={previewImage1}
                      />
                    </Modal>
                  </div>
                </div>

                {profilePicError && (
                  <span className="text-danger">
                    Profile photo is required
                  </span>
                )}
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>Cover Image</span>
              </Col>
              <Col md="6">
                <div className="row">
                  {consultantData?.consultantCoverImageMedia?.fileUrl != null ? (
                    <div className="col-md-3">
                      <Image
                        width={104}
                        height={104}
                        src={
                          rootUrl +
                          consultantData?.consultantCoverImageMedia?.thumbnailUrl
                        }
                      />
                    </div>
                  ) : null}

                  <div className="col-md-3">
                    <Upload
                      listType="picture-card"
                      multiple={false}
                      fileList={FileList2}
                      onPreview={handlePreview2}
                      onChange={handleChange2}
                      beforeUpload={(file) => {
                        return false;
                      }}
                    >
                      {FileList2.length < 1 ? (
                        <div className="text-danger" style={{ marginTop: 8 }}>
                          <Icon.Upload />
                          <br />
                          <span>Upload Here</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </Upload>
                    <Modal
                      visible={previewVisible2}
                      title={previewTitle2}
                      footer={null}
                      onCancel={handleCancel2}
                    >
                      <img
                        alt="example"
                        style={{ width: "100%" }}
                        src={previewImage2}
                      />
                    </Modal>
                  </div>
                </div>
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Id Or Passport <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <div className="row">
                  {consultantData?.idOrPassportMedia?.fileUrl != null ? (
                    <div className="col-md-3">
                      <Image
                        width={104}
                        height={104}
                        src={
                          rootUrl + consultantData?.idOrPassportMedia?.thumbnailUrl
                        }
                      />
                    </div>
                  ) : null}

                  <div className="col-md-3">
                    <Upload
                      listType="picture-card"
                      multiple={false}
                      fileList={FileList3}
                      onPreview={handlePreview3}
                      onChange={handleChange3}
                      beforeUpload={(file) => {
                        return false;
                      }}
                    >
                      {FileList3.length < 1 ? (
                        <div className="text-danger" style={{ marginTop: 8 }}>
                          <Icon.Upload />
                          <br />
                          <span>Upload Here</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </Upload>
                    <Modal
                      visible={previewVisible3}
                      title={previewTitle3}
                      footer={null}
                      onCancel={handleCancel3}
                    >
                      <img
                        alt="example"
                        style={{ width: "100%" }}
                        src={previewImage3}
                      />
                    </Modal>
                  </div>
                </div>

                    {idPassportError && (
                      <span className="text-danger">File is required </span>
                    )}

              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Proof Of Address <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <div className="row">
                  {consultantData?.proofOfAddressMedia?.fileUrl ? (
                    <div className="col-md-3">
                      <Image
                        width={104}
                        height={104}
                        src={
                          rootUrl + consultantData?.proofOfAddressMedia?.thumbnailUrl
                        }
                      />
                    </div>
                  ) : null}

                  <div className="col-md-3">
                    <Upload
                      listType="picture-card"
                      multiple={false}
                      fileList={FileList4}
                      onPreview={handlePreview4}
                      onChange={handleChange4}
                      beforeUpload={(file) => {
                        return false;
                      }}
                    >
                      {FileList4.length < 1 ? (
                        <div className="text-danger" style={{ marginTop: 8 }}>
                          <Icon.Upload />
                          <br />
                          <span>Upload Here</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </Upload>
                    <Modal
                      visible={previewVisible4}
                      title={previewTitle4}
                      footer={null}
                      onCancel={handleCancel4}
                    >
                      <img
                        alt="example"
                        style={{ width: "100%" }}
                        src={previewImage4}
                      />
                    </Modal>
                  </div>
                </div>

                    {proofOfAddressError && (
                      <span className="text-danger">File is required</span>
                    )}

              </Col>
            </FormGroup>

            {work == "true" ? (
              <FormGroup row className="has-icon-left position-relative">
                <Col md="2">
                  <span>
                    Proof Of Right To Work{" "}
                    <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                  <div className="row">
                    {consultantData?.proofOfRightToWorkMedia?.fileUrl ? (
                      <div className="col-md-3">
                        <Image
                          width={104}
                          height={104}
                          src={
                            rootUrl +
                            consultantData?.proofOfRightToWorkMedia?.thumbnailUrl
                          }
                        />
                      </div>
                    ) : null}

                    <div className="col-md-3">
                      <Upload
                        listType="picture-card"
                        multiple={false}
                        fileList={FileList5}
                        onPreview={handlePreview5}
                        onChange={handleChange5}
                        beforeUpload={(file) => {
                          return false;
                        }}
                      >
                        {FileList5.length < 1 ? (
                          <div className="text-danger" style={{ marginTop: 8 }}>
                            <Icon.Upload />
                            <br />
                            <span>Upload Here</span>
                          </div>
                        ) : (
                          ""
                        )}
                      </Upload>
                      <Modal
                        visible={previewVisible5}
                        title={previewTitle5}
                        footer={null}
                        onCancel={handleCancel5}
                      >
                        <img
                          alt="example"
                          style={{ width: "100%" }}
                          src={previewImage5}
                        />
                      </Modal>
                    </div>
                  </div>

                  
                      <span className="text-danger">{proofOfRightError}</span>
                    

                </Col>
              </FormGroup>
            ) : null}

            <FormGroup
              className="has-icon-left position-relative"
              style={{ display: "flex", justifyContent: "space-between" }}
            ></FormGroup>
            <FormGroup
              row
              className="has-icon-left position-relative"
              style={{ display: "flex", justifyContent: "end" }}
            >
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
          <div className="d-flex justify-content-end">
            <Button color="warning" onClick={front}>
              Next Page

            </Button>

          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddConsultantInformation;
