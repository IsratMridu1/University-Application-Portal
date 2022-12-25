import React, { createRef, useEffect, useState } from "react";
// import 'react-dropzone-uploader/dist/styles.css'
import { connect, useSelector } from "react-redux";
import Select from "react-select";
import { useHistory, useLocation, useParams } from "react-router";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Row,
  InputGroup,
  Table,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import Axios from "axios";

import { rootUrl } from "../../../constants/constants";
import { padding } from "@mui/system";
import get from "../../../helpers/get";
import PicturesWall from "./UniversityLogo";
import CoverPicturesWall from "./UniversityCover";
import put from "../../../helpers/put";
import { useToasts } from "react-toast-notifications";
import ButtonForFunction from "../Components/ButtonForFunction";

import * as Icon from "react-feather";
import { Upload, Modal as AntdModal } from "antd";
import "antd/dist/antd.css";
import { Image } from "antd";
import { permissionList } from "../../../constants/AuthorizationConstant";
import { userTypes } from "../../../constants/userTypeConstant";

const AddUniversity = (props) => {
  // const univerSityCountries = props.univerSityCountryList[0];
  const [univerSityCountries, setUniverSityCountries] = useState([]);
  // const universityTypes = props.univerSityTypeList[0];
  const [universityTypes, setUniversitiesType] = useState([]);
  // const universityStates = props.univerSityStateList[0];
  const [universityStates, setUniversityStates] = useState([]);

  const permissions = JSON.parse(localStorage.getItem('permissions'));

  const [activetab, setActivetab] = useState("1");
  const [description, setDescription] = useState("");
  const [googleMap, setGoogleMap] = useState("");
  const [uniTypeLabel, setUniTypeLabel] = useState("Select University Type");
  const [uniTypeValue, setUniTypeValue] = useState(0);
  const [uniTypeError, setUniTypeError] = useState(false);
  const [provider, setProvider] = useState([]);
  const [uniCountryLabel, setUniCountryLabel] = useState(
    "Select University Country"
  );
  const [uniCountryValue, setUniCountryValue] = useState(0);
  const [uniCountryError, setUniCountryError] = useState(false);

  const [uniStateLabel, setUniStateLabel] = useState(
    "Select University State"
  );
  const [unistateValue, setUniStateValue] = useState(0);
  const [uniStateError, setUniStateError] = useState(false);

  const [contractTypeDD, setContractTypeDD] = useState([]);
  const [contractTypeLabel, setContractTypeLabel] = useState("Select Contract Type");
  const [contractTypeValue, setContractTypeValue] = useState(0);
  const [contractTypeError, setContractTypeError] = useState(false);

  const [logoFiles, setLogoFiles] = useState([]);
  const [coverFiles, setCoverFiles] = useState([]);

  const [exactCoverFile, setExactCoverFile] = useState({});
  const [exactLogoFile, setExactLogoFile] = useState({});

  // const [coverDropzoneError, setCoverDropzoneError] = useState("");
  const [coverDropzoneError, setCoverDropzoneError] = useState(false);
  // const [logoDropzoneError, setLogoDropzoneError] = useState("");
  const [logoDropzoneError, setLogoDropzoneError] = useState(false);

  const [submitData, setSubmitData] = useState(false);

  const AuthStr = localStorage.getItem("token");

  const [logoFile, setLogoFile] = useState({});
  const [coverFile, setCoverFile] = useState({});
  const [universityData, setUniversityData] = useState({});
  const [uniId, setUniId] = useState(undefined);
  const [check, setCheck] = useState(true);

  const [buttonStatus,setButtonStatus] = useState(false);

  const [universityId, setUniversityId] = useState(undefined);

  const method = localStorage.getItem("editMethod");

  const { addToast } = useToasts();
  const {univerId} = useParams();
  const location = useLocation();

  console.log("uniIds", universityId, uniId, univerId);

  // For uploading university logo
  const [FileList1, setFileList1] = useState([]);
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");

  // For uploading university cover image
  const [FileList2, setFileList2] = useState([]);
  const [previewVisible2, setPreviewVisible2] = useState(false);
  const [previewImage2, setPreviewImage2] = useState("");
  const [previewTitle2, setPreviewTitle2] = useState("");

  const [providerValue, setProviderValue] = useState(0);

  const userType = localStorage.getItem("userType");
  const referenceId = localStorage.getItem("referenceId");

  const handleChange1 = ({ fileList }) => {
    setFileList1(fileList);
    setLogoDropzoneError(false);
    console.log(fileList);
  };

  const handleChange2 = ({ fileList }) => {
    setFileList2(fileList);
    setCoverDropzoneError(false);
    console.log(fileList);
  };

  function getBase64(file) {
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

  const handleCancel2 = () => {
    setPreviewVisible2(false);
  };

  const handlePreview1 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage1(file.url || file.preview);
    setPreviewVisible1(true);
    setPreviewTitle1(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handlePreview2 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage2(file.url || file.preview);
    setPreviewVisible2(true);
    setPreviewTitle2(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  useEffect(()=>{
    get(`ProviderHelper/GetProviderId/${userType}/${referenceId}`).then(res=>{
      console.log("providerHelper",typeof(res));
        setProviderValue(res != 0 ? res : 0);
        // if(res != 0){
        //   localStorage.setItem("providerValue", res);
        // }
    })
  },[userType, referenceId])

  console.log("providervalue", typeof(providerValue));

  useEffect(() => {
    get("ProviderDD/Index")
      .then((res) => {
        setProvider(res);
        console.log(res, "ppppppp");
      })
      .catch();
    get("UniversityCountryDD/Index")
      .then((res) => {
        setUniverSityCountries(res);
      })
      .catch();
    get("UniversityTypeDD/Index")
      .then((res) => {
        setUniversitiesType(res);
      })
      .catch();
    // get("UniversityState/Index")
    //   .then((res) => {
    //     setUniversityStates(res);
    //   })
    //   .catch();
    get("ContractTypeDD/Index")
      .then((res) => {
        setContractTypeDD(res);
        // console.log("contract type", res);
      })
      .catch();

    if (universityId != undefined) {
      get(`University/get/${universityId}`).then((res) => {
        console.log("uniIddata", res);
        setContractTypeLabel(res?.contractType?.name);
        setContractTypeValue(res?.contractType?.id);
        setUniversityData(res);
        setProviderTypeLabel(res?.provider?.name);
        setProviderTypeValue(res?.provider?.value);
        setUniTypeLabel(res?.universityType?.name);
        setUniTypeValue(res?.universityType?.id);
        setUniCountryLabel(res?.universityCountry?.name);
        setUniCountryValue(res?.universityCountry?.id);
        setUniStateLabel(res?.universityState?.name);
        setUniStateValue(res?.universityState?.id);
        setUniId(res?.id);
        setCheck(false);
      });
    }

    if (univerId != undefined) {
      get(`University/get/${univerId}`).then((res) => {
        console.log("uniIddata", res);
        setContractTypeLabel(res?.contractType?.name);
        setContractTypeValue(res?.contractType?.id);
        setUniversityData(res);
        setProviderTypeLabel(res?.provider?.name);
        setProviderTypeValue(res?.provider?.value);
        setUniTypeLabel(res?.universityType?.name);
        setUniTypeValue(res?.universityType?.id);
        setUniCountryLabel(res?.universityCountry?.name);
        setUniCountryValue(res?.universityCountry?.id);
        setUniStateLabel(res?.universityState?.name);
        setUniStateValue(res?.universityState?.id);
        setUniId(res?.id);
        setCheck(false);
      });
    }

  }, [universityId, univerId]);

  // const logoResult =  useSelector((state) => state.UniversityLogoImageReducer.universityLogoImage);
  // const coverResult = useSelector((state)=> state.UniversityCoverImageReducer.universityCoverImage);

  const [providerTypeLabel, setProviderTypeLabel] =
    useState("Select Provider");
  const [providerTypeValue, setProviderTypeValue] = useState(0);
  const [providerTypeError, setProviderTypeError] = useState(false);

  const selectProviderType = (label, value) => {
    setProviderTypeError(false);
    setProviderTypeLabel(label);
    setProviderTypeValue(value);
  };

  const providerMenu = provider.map((providerOptions) => ({
    label: providerOptions.name,
    value: providerOptions.id,
  }));

  const selectContractType = (label, value) => {
    setContractTypeError(false);
    setContractTypeLabel(label);
    setContractTypeValue(value);
  }

  const contractMenu = contractTypeDD.map((contract) => ({
    label: contract?.name,
    value: contract?.id,
  }));

  // Logo file handle
  const updateLogoFiles = (incommingFiles) => {
    if (incommingFiles.length > 1) {
      setLogoDropzoneError("Max 1 file");
    } else {
      setLogoFiles(incommingFiles);
      setExactLogoFile(incommingFiles[0]?.file);
      setLogoDropzoneError("");
    }
    // setFiles(incommingFiles);
    //     setExactFile(incommingFiles[0]?.file)
    //     setDropzoneError('');
  };

  const handleLogoFile = (e) => {
    setLogoFile(e.target.files[0]);
  };
  const handleCoverFile = (e) => {
    setCoverFile(e.target.files[0]);
  };

  // remove logo file
  const onDeleteLogo = (id) => {
    setLogoFiles([]);
    setExactLogoFile({});
  };

  // Cover file handle
  const updateCoverFiles = (incommingFiles) => {
    if (incommingFiles.length > 1) {
      setCoverDropzoneError("Max 1 file");
    } else {
      setCoverFiles(incommingFiles);
      setExactCoverFile(incommingFiles[0]?.file);
      setCoverDropzoneError("");
    }
    // setFiles(incommingFiles);
    //     setExactFile(incommingFiles[0]?.file)
    //     setDropzoneError('');
  };

  // remove cover file
  const onDeleteCover = (id) => {
    setCoverFiles([]);
    setExactCoverFile({});
  };

  const myForm = createRef();

  const history = useHistory();


  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    // subdata.append("UniversityLogoFile", logoResult[0]?.originFileObj);
    // subdata.append("CoverImageFile", coverResult[0]?.originFileObj);

    subdata.append(
      "UniversityLogoFile",
      FileList1.length == 0 ? null : FileList1[0]?.originFileObj
    );
    subdata.append(
      "CoverImageFile",
      FileList2.length == 0 ? null : FileList2[0]?.originFileObj
    );

    //  watch form data values
    // for (var value of subdata.values()) {

    // }
    console.log("providerTypeValue",providerTypeValue);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        'authorization': AuthStr,
      },
    };

    if (providerValue === 0) {
      if(providerTypeValue == 0){
        setProviderTypeError(true);

      }
      
      // if(providerTypeValue === 0){
      //   console.log("providerTypeValue",providerTypeValue);
      // setProviderTypeError(true);
      // }
      else if (uniTypeValue === 0) {
        setUniTypeError(true);
      }
      else if(contractTypeValue === 0){
        setContractTypeError(true);
      }
      else if (uniCountryValue === 0) {
        setUniCountryError(true);
      }
      else if (unistateValue === 0) {
        setUniStateError(true);
      }
      else if (FileList1.length < 1 && check) {
        setLogoDropzoneError(true);
      }
      // if(FileList1.length>=1 && uniId != undefined ){
      //   setLogoDropzoneError(false);
      // }
      else if (FileList2.length < 1 && check) {
        setCoverDropzoneError(true);
      }
      // if(FileList2.length>=1 && uniId != undefined)
      // {
      //   setCoverDropzoneError(false);
      // }
      else {
        if (uniId != undefined) {
          setButtonStatus(true);
          put("University/Update", subdata, config).then((res) => {
            console.log("1st put response", res);
            setButtonStatus(false);
            if (res?.status == 200 && res?.data?.isSuccess == true) {
              addToast(res?.data?.message, {
                appearance: "success",
                autoDismiss: true,
              });
              
              history.push(`/addUniversityCampus/${uniId}`);
            }
            else{
              addToast(res?.data?.message, {
                appearance: "error",
                autoDismiss: true,
              });
            }
          });
        } else {
          setButtonStatus(true);
          Axios.post(`${rootUrl}University/Create`, subdata, config).then(
            (res) => {
              console.log("unipostData", res);
              setButtonStatus(false);
  
              // localStorage.setItem("id", res.data.result.id);
              const uniID = res?.data?.result?.id;
              setUniversityId(uniID);
  
              if (res.status === 200 && res.data.isSuccess === true) {
                setSubmitData(true);
                addToast(res?.data?.message, {
                  appearance: "success",
                  autoDismiss: true,
                });
                history.push({
                  pathname: `/addUniversityCampus/${uniID}`,
                  id: uniID,
                });
              }
            }
          );
        }
    }
    
    }
    else{
      // if(providerTypeValue == 0){
      //   setProviderTypeError(true);

      // }
      
      // if(providerTypeValue === 0){
      //   console.log("providerTypeValue",providerTypeValue);
      // setProviderTypeError(true);
      // }
       if (uniTypeValue === 0) {
        setUniTypeError(true);
      }
      else if(contractTypeValue === 0){
        setContractTypeError(true);
      }
      else if (uniCountryValue === 0) {
        setUniCountryError(true);
      }
      else if (unistateValue === 0) {
        setUniStateError(true);
      }
      else if (FileList1.length < 1 && check) {
        setLogoDropzoneError(true);
      }
      // if(FileList1.length>=1 && uniId != undefined ){
      //   setLogoDropzoneError(false);
      // }
      else if (FileList2.length < 1 && check) {
        setCoverDropzoneError(true);
      }
      // if(FileList2.length>=1 && uniId != undefined)
      // {
      //   setCoverDropzoneError(false);
      // }
      else {
        if (uniId != undefined) {
          setButtonStatus(true);
          put("University/Update", subdata, config).then((res) => {
            console.log("1st put response", res);
            setButtonStatus(false);
            if (res?.status == 200 && res?.data?.isSuccess == true) {
              addToast(res?.data?.message, {
                appearance: "success",
                autoDismiss: true,
              });
              
              history.push(`/addUniversityCampus/${uniId}`);
            }
            else{
              addToast(res?.data?.message, {
                appearance: "error",
                autoDismiss: true,
              });
            }
          });
        } else {
          setButtonStatus(true);
          Axios.post(`${rootUrl}University/Create`, subdata, config).then(
            (res) => {
              console.log("unipostData", res);
              setButtonStatus(false);
  
              // localStorage.setItem("id", res.data.result.id);
              const uniID = res?.data?.result?.id;
  
              if (res.status === 200 && res.data.isSuccess === true) {
                setSubmitData(true);
                addToast(res?.data?.message, {
                  appearance: "success",
                  autoDismiss: true,
                });
                history.push({
                  pathname: `/addUniversityCampus/${uniID}`,
                  id: uniID,
                });
              }
            }
          );
        }
    }
    }
  };

  // select University Type
  const selectUniType = (label, value) => {
    setUniTypeError(false);
    setUniTypeLabel(label);
    setUniTypeValue(value);
  };

  const searchStateByCountry = (countryValue) => {
    get(`UniversityStateDD/Index/${countryValue}`).then((res) => {
      setUniversityStates(res);
    });
  };

  // select University Country
  const selectUniCountry = (label, value) => {
    setUniCountryError(false);
    setUniCountryLabel(label);
    setUniCountryValue(value);
    setUniStateLabel("Select University State");
    setUniStateValue(0);

    searchStateByCountry(value);

  };

  // select University State
  const selectUniState = (label, value) => {
    setUniStateError(false);
    setUniStateLabel(label);
    setUniStateValue(value);
  };
  // tab toggle
  const toggle = (tab) => {
    setActivetab(tab);
    if(univerId != undefined){
      if (tab == "2") {
        history.push(`/addUniversityCampus/${univerId}`);
      }
      if (tab == "3") {
        history.push(`/addUniversityFinancial/${univerId}`);
      }
      if (tab == "4") {
        history.push(`/addUniversityFeatures/${univerId}`);
      }
      if (tab == "5") {
        history.push(`/addUniversityGallery/${univerId}`);
      }
      if (tab == "6") {
        history.push(`/addUniversityTestScore/${univerId}`);
      }
      if (tab == "7") {
        history.push(`/addUniversityApplicationDocument/${univerId}`);
      }
      if (tab == "8") {
        history.push(`/addUniversityTemplateDocument/${univerId}`);
      }
      if (tab == "9") {
        history.push(`/addUniversityCommission/${univerId}`);
      }
    }
    else{
      if (tab == "2") {
        history.push(`/addUniversityCampus/${universityId}`);
      }
      if (tab == "3") {
        history.push(`/addUniversityFinancial/${universityId}`);
      }
      if (tab == "4") {
        history.push(`/addUniversityFeatures/${universityId}`);
      }
      if (tab == "5") {
        history.push(`/addUniversityGallery/${universityId}`);
      }
      if (tab == "6") {
        history.push(`/addUniversityTestScore/${universityId}`);
      }
      if (tab == "7") {
        history.push(`/addUniversityApplicationDocument/${universityId}`);
      }
      if (tab == "8") {
        history.push(`/addUniversityTemplateDocument/${universityId}`);
      }
      if (tab == "9") {
        history.push(`/addUniversityCommission/${universityId}`);
      }
    }
    
  };

  const universityTypeName = universityTypes?.map((uniType) => ({
    label: uniType.name,
    value: uniType.id,
  }));
  const universityCountryName = univerSityCountries?.map((uniCountry) => ({
    label: uniCountry.name,
    value: uniCountry.id,
  }));
  const universityStateName = universityStates?.map((uniState) => ({
    label: uniState.name,
    value: uniState.id,
  }));

  // redirect to dashboard
  const backToUniList = () => {
    if(location.uuId != undefined){
      history.push(`/universityDetails/${location.uuId}`)
    }
    else{
      history.push("/universityList");
    }
  };

  // redirect to Next Page
  const onNextPage = () => {
    const uniID = universityId;
    if (uniId != undefined){
      history.push(`/addUniversityCampus/${uniId}`);
    }
    else{
      history.push({
        pathname: `/addUniversityCampus/${uniID}`,
        id: uniID,
      });
    }
  };

  const handleCancelAdd = () => {
    history.push("/universityList");
  }

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">University Information</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToUniList} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i>{" "}
              {
                location.uuId != undefined ?
                "Back to University Details"
                :
                "Back to University List"
              }
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          <Nav tabs>
            <NavItem>
              <NavLink active={activetab === "1"} onClick={() => toggle("1")}>
                University Information
              </NavLink>
            </NavItem>
            <NavItem>
              {submitData || univerId ? (
                <NavLink active={activetab === "2"} onClick={() => toggle("2")}>
                  Campus Information
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "2"}>
                  Campus Information
                </NavLink>
              )}
            </NavItem>

            {/* {
                                    submitData ?
                                    <NavLink
                                    active={activetab === '3'}
                                    onClick={() =>toggle('3')}
                                    >
    
                                    Financial Information
                                    </NavLink> :
                                     <NavLink disabled
                                     active={activetab === '3'}
                                     >
     
                                     Financial Information
                                     </NavLink>

                                } */}

            {/* <NavItem>
              <NavLink disabled active={activetab === "3"}>
                Financial Information
              </NavLink>
            </NavItem> */}

            <NavItem>
              {submitData || univerId ? (
                <NavLink active={activetab === "3"} onClick={() => toggle("3")}>
                  Financial
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "3"}>
                  Financial
                </NavLink>
              )}
            </NavItem>

            {/* <NavItem>
              <NavLink disabled active={activetab === "4"}>
                Features
              </NavLink>
            </NavItem> */}

            <NavItem>
              {submitData || univerId ? (
                <NavLink active={activetab === "4"} onClick={() => toggle("4")}>
                  Features
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "4"}>
                  Features
                </NavLink>
              )}
            </NavItem>

            {/* <NavItem>
              <NavLink disabled active={activetab === "5"}>
                University Gallery
              </NavLink>
            </NavItem> */}

            <NavItem>
              {submitData || univerId ? (
                <NavLink active={activetab === "5"} onClick={() => toggle("5")}>
                  Gallery
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "5"}>
                  Gallery
                </NavLink>
              )}
            </NavItem>

            <NavItem>
              {submitData || univerId ? (
                <NavLink active={activetab === "6"} onClick={() => toggle("6")}>
                  Test Score
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "6"}>
                  Test Score
                </NavLink>
              )}
            </NavItem>

            {/* <NavItem>
              <NavLink disabled active={activetab === "6"}>
                Application Document
              </NavLink>
            </NavItem> */}

            <NavItem>
              {submitData || univerId ? (
                <NavLink active={activetab === "7"} onClick={() => toggle("7")}>
                  Application Document
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "7"}>
                  Application Document
                </NavLink>
              )}
            </NavItem>

            <NavItem>
              {submitData || univerId ? (
                <NavLink active={activetab === "8"} onClick={() => toggle("8")}>
                  Template Document
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "8"}>
                  Template Document
                </NavLink>
              )}
            </NavItem>

            <NavItem>
              {submitData || univerId ? (
                <NavLink active={activetab === "9"} onClick={() => toggle("9")}>
                  Commission
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "9"}>
                  Commission
                </NavLink>
              )}
            </NavItem>

            {/* <NavItem>
              <NavLink disabled active={activetab === "7"}>
                Required Document 
              </NavLink>
            </NavItem> */}

            {/* <NavItem>
              {submitData || JSON.parse(localStorage.getItem("id")) ? (
                <NavLink active={activetab === "7"} onClick={() => toggle("7")}>
                  Required Document
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "7"}>
                  Required Document
                </NavLink>
              )}
            </NavItem> */}
          </Nav>

          <TabContent activeTab={activetab}>
            <TabPane tabId="1">
              <Form ref={myForm} onSubmit={handleSubmit} className="mt-5">
              <div className="hedding-titel d-flex justify-content-between mb-4">
                      <div>
                        <h5> <b>University Information</b> </h5>

                        <div className="bg-h"></div>
                      </div>
                        {/* <div className="text-right edit-style  p-3" >
                        <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                        </div> */}

                    </div>
                {
                  // method == 'put' ?
                  uniId != undefined ? (
                    <>
                      <input type="hidden" name="id" id="id" value={uniId} />

                      <input
                        type="hidden"
                        name="providerId"
                        id="providerId"
                        value={universityData?.providerId}
                      />
                    </>
                  ) : null
                }
               {
                 uniId === undefined &&  providerTypeValue === 0 ?
                 <Input
                   type="hidden"
                   name="providerId"
                   id="providerId"
                   value={providerValue}
                 />
                 :null
               }

                {
                  !(userType == userTypes?.ProviderAdmin || userType == userTypes?.AdmissionManager) ?
                  <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Provider <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={providerMenu}
                      value={{
                        label: providerTypeLabel,
                        value: providerTypeValue,
                      }}
                      onChange={(opt) =>
                        selectProviderType(opt.label, opt.value)
                      }
                      name="providerId"
                      id="providerId"
                    />

                    {providerTypeError && (
                      <span className="text-danger">
                        Provider is required
                      </span>
                    )}
                  </Col>
                </FormGroup>
                :
                null
                }

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      University Name <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="Name"
                      id="Name"
                      defaultValue={universityData?.name}
                      placeholder="Write University Name"
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
                      University Short Name{" "}
                      <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="ShortName"
                      id="ShortName"
                      defaultValue={universityData?.shortName}
                      placeholder="Write University Short Name"
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
                      University Type <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={universityTypeName}
                      value={{ label: uniTypeLabel, value: uniTypeValue }}
                      onChange={(opt) => selectUniType(opt.label, opt.value)}
                      name="UniversityTypeId"
                      id="UniversityTypeId"
                    />

                    {uniTypeError ? (
                      <span className="text-danger">
                        University type is required
                      </span>
                    ) : null}

                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Contract Type <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={contractMenu}
                      value={{ label: contractTypeLabel, value: contractTypeValue }}
                      onChange={(opt) => selectContractType(opt.label, opt.value)}
                      name="contractTypeId"
                      id="contractTypeId"
                    />

                    {contractTypeError ? (
                      <span className="text-danger">
                        Contract type is required
                      </span>
                    ) : null}

                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      University Country <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={universityCountryName}
                      value={{ label: uniCountryLabel, value: uniCountryValue }}
                      onChange={(opt) => selectUniCountry(opt.label, opt.value)}
                      name="UniversityCountryId"
                      id="UniversityCountryId"
                    />

                    {uniCountryError && (
                      <span className="text-danger">
                        University country is required
                      </span>
                    )}

                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      University State <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={universityStateName}
                      value={{ label: uniStateLabel, value: unistateValue }}
                      onChange={(opt) => selectUniState(opt.label, opt.value)}
                      name="UniversityStateId"
                      id="UniversityStateId"
                    />

                    {uniStateError && (
                      <span className="text-danger">
                        University state is required
                      </span>
                    )}

                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      University City <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="UniversityCity"
                      id="UniversityCity"
                      defaultValue={universityData?.universityCity}
                      placeholder="Write University City Name"
                      required
                    />
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Global Rank </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="number"
                      name="GlobalRankNumber"
                      id="GlobalRankNumber"
                      defaultValue={universityData?.globalRankNumber}
                      placeholder="Write University Global Rank"
                      required
                    />
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Foundation Year </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="FoundationYear"
                      id="FoundationYear"
                      defaultValue={universityData?.foundationYear}
                      placeholder="Write University Foundation Year"
                      required
                    />
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>University Description</span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="textarea"
                      name="Description"
                      id="Description"
                      rows="3"
                      // value={description}
                      defaultValue={universityData?.description}
                      placeholder="Write Description"
                      onChange={(e) => setDescription(e.target.value)}
                    />

                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Location </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="location"
                      id="location"
                      defaultValue={universityData?.location}
                      placeholder="Write University Location"
                      required
                    />
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>University on Map</span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="textarea"
                      name="locationOnGoogleMap"
                      id="locationOnGoogleMap"
                      rows="3"
                      // value={description}
                      defaultValue={universityData?.locationOnGoogleMap}
                      placeholder="Location on Google Map"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <span className="text-danger">Note: Please type the "src" link only from the embed map</span>

                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Part Time Work Information </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="textarea"
                      name="PartTimeWorkInformation"
                      id="PartTimeWorkInformation"
                      rows="3"
                      defaultValue={universityData?.partTimeWorkInformation}
                      placeholder="Write Part Time Work Information"
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
                      Logo <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <div className="row">
                      {universityData?.universityLogo ? (
                        <div className="col-md-3">
                          <Image
                            width={104}
                            height={104}
                            src={
                              rootUrl +
                              universityData?.universityLogo?.thumbnailUrl
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
                            <div
                              className="text-danger"
                              style={{ marginTop: 8 }}
                            >
                              <Icon.Upload />
                              <br />
                              <span>Upload</span>
                            </div>
                          ) : (
                            ""
                          )}
                        </Upload>
                        <AntdModal
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
                        </AntdModal>
                      </div>
                    </div>


                    {logoDropzoneError && (
                      <span className="text-danger">
                        Logo is required
                      </span>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Cover Photo{" "}
                      <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <div className="row">
                      {universityData?.coverPhoto ? (
                        <div className="col-md-3">
                          <Image
                            width={104}
                            height={104}
                            src={
                              rootUrl + universityData?.coverPhoto?.thumbnailUrl
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
                            <div
                              className="text-danger"
                              style={{ marginTop: 8 }}
                            >
                              <Icon.Upload />
                              <br />
                              <span>Upload</span>
                            </div>
                          ) : (
                            ""
                          )}
                        </Upload>
                        <AntdModal
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
                        </AntdModal>
                      </div>
                    </div>

                    {/* <CoverPicturesWall/> */}

                    {coverDropzoneError && (
                      <span className="text-danger">
                        Cover photo is required
                      </span>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup
                  row
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {/* <Button.Ripple
                    type="submit"
                    className="mr-1 mt-3 badge-primary"
                  >
                    Submit
                  </Button.Ripple> */}
                  <Col md="1">
                  <ButtonForFunction
                      func={handleCancelAdd}
                      className={"mr-0 mt-3"}
                      name={"Cancel"}
                      color={"danger"}
                    />
                  </Col>

                  <Col md="4">
                    {
                      permissions?.includes(permissionList?.Add_University || permissionList?.Update_University) ?
                      <ButtonForFunction
                      type={"submit"}
                      className={"mr-0 mt-3 badge-primary"}
                      name={"Save"}
                      disable={buttonStatus}
                    
                    />
                    :
                    null
                    }
                  </Col>
                </FormGroup>
              </Form>

              <FormGroup
                className="has-icon-left position-relative"
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "end",
                }}
              >
                {/* <ButtonForFunction
                  func={onPreviousPage}
                  color={"warning uapp-form-button float-right"}
                  name={"Previous Page"}
                  permission={6}
                /> */}

                
                  <ButtonForFunction
                  func={onNextPage}
                  disable = {(uniId == undefined) ? true : false}
                  color={"warning uapp-form-button float-right"}
                  name={"Next Page"}
                  permission={6}
                />
                
              </FormGroup>

            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};
const mapStateToProps = (state) => ({
  univerSityTypeList: state.universityTypeDataReducer.universityTypes,
  univerSityCountryList: state.universityCountryDataReducer.universityCountries,
  univerSityStateList: state.universityStateDataReducer.universityStates,
});
export default connect(mapStateToProps)(AddUniversity);
