import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  Table,
  Form,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Axios from "axios";
import * as Icon from "react-feather";
import { Upload, Modal as AntdModal } from "antd";
import "antd/dist/antd.css";
import get from "../../../helpers/get";
import Select from "react-select";
import { rootUrl } from "../../../constants/constants";
import profileImage from "../../../assets/img/profile/user-uploads/user-07.jpg";
import { userTypes } from "../../../constants/userTypeConstant" 
import { Image } from "antd";
import { useToasts } from "react-toast-notifications";
import "antd/dist/antd.css";
import EditDivButton from "../Components/EditDivButton";
import CustomButtonRipple from "../Components/CustomButtonRipple";
import remove from "../../../helpers/remove";
import ButtonForFunction from "../Components/ButtonForFunction";
import post from "../../../helpers/post";
// import Pagination from "../../SMS/Pagination/Pagination.jsx";

// const userData = [{name: "Jubair", id:6, isChecked:false}, {name: "Rahul", id:2, isChecked:true}, {name: "Abir", id:3, isChecked:false}, {name: "Nahid", id:4, isChecked:true}];

const UniversityDetails = () => {
  const location = useLocation();
  const { id } = useParams();
  const { addToast } = useToasts();
  const [universityInfo, setUniversityInfo] = useState({});
  const [financialInfo, setFinancialInfo] = useState({});
  const [universityFeatures, setUniversityFeatures] = useState({});
  const [galleryData, setGalleryData] = useState([]);
  const [appDocument, setAppDocument] = useState([]);
  const [tempDocument, setTempDocument] = useState([]);
  // const [notAvl, setNotAvl] = useState('n/a');

  // for fake data
  // const [users, setUsers] = useState([]);

  // for intake filter
  const [intakeData, setIntakeData] = useState([]);
  const [intakeStatusData, setIntakeStatusData] = useState([]);
  const [intakeLabel, setIntakeLabel] = useState("Intake");
  const [intakeValue, setIntakeValue] = useState(0);
  const [statusLabel, setStatusLabel] = useState("Status");
  const [statusValue, setStatusValue] = useState(0);

  // subject list
  const [subList, setSubList] = useState([]);
  const [menus, setMenus] = useState([]);
  let [checked, setChecked] = useState([]);

  // for showing campus list
  const [campusList, setCampusList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [searchStr, setSearchStr] = useState("");
  const [callApi, setCallApi] = useState(false);
  const [serialNum, setSerialNum] = useState(1);
  // end here

  // For uploading Gallary
  const [FileList1, setFileList1] = useState([]);
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [fileError, setFileError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [galleryObj, setGalleryObj] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModal1, setDeleteModal1] = useState(false);
  const [deleteModal2, setDeleteModal2] = useState(false);

  // for adding campus
  const [modalOpen, setModalOpen] = useState(false);
  const [uniCountryLabel, setUniCountryLabel] = useState("Select Country");
  const [uniCountryValue, setUniCountryValue] = useState(0);
  const [countryError, setCountryError] = useState(false);
  const [uniStateLabel, setUniStateLabel] = useState("Select State");
  const [unistateValue, setUniStateValue] = useState(0);
  const [stateError, setStateError] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [universityStates, setUniversityStates] = useState([]);

  const [delGalName, setDelGalName] = useState("");
  const [delGalId, setDelGalId] = useState(0);
  const userType = localStorage.getItem('userType');



  const history = useHistory();

  useEffect(() => {
    // const uCountryId = 0;
    // const uStateId = 0;
    // const uTypeId = 0;
    // const providerId = 0;

    get(`University/Get/${id}`).then((res) => {
      setUniversityInfo(res);
      console.log("University Information", res);
    });

    // get(
    //   `UniversityCampus/index?page=${currentPage}&pageSize${dataPerPage}&universityId=${id}&search=${searchStr}`
    // ).then((res) => {
    //   setCampusList(res.models);
    //   setSerialNum(res?.firstSerialNumber);
    //   // setEntity(res?.totalEntity);
    //   setLoading(false);

    //   console.log('aaaaaa',res);
    // });

    // for getting university campus list
    get(`UniversityCampus/GetByUniversity/${id}`).then((res) => {
      setCampusList(res);
      setLoading(false);
    });

    // for getting financial information
    get(`FinancialInformation/GetByUniversity/${id}`).then((res) => {
      // console.log('fin Info',res);
      setFinancialInfo(res);
    });

    // for getting Features
    get(`UniversityFeatures/GetByUniversity/${id}`).then((res) => {
      setUniversityFeatures(res);
      console.log("features", res);
    });

    // for intake
    get("Intake/Index").then((res) => {
      setIntakeData(res);
    });

    get("IntakeStatus/GetAll").then((res) => {
      setIntakeStatusData(res);
    });

    // Subject get by university
    get(`Subject/GetByUniversity/${id}`).then((res) => {
      setSubList(res);
      console.log("Sublist", res);
      // setSubList(res);
    });

    // for university gallery
    get(`UniversityGallery/GetByUniversity/${id}`).then((res) => {
      console.log("gallery", res);
      setGallery(res);
    });

    get(`UniversityApplicationDocument/GetByUniversity/${id}`).then((res) => {
      setAppDocument(res);
    });

    get(`UniversityTemplateDocument/GetByUniversity/${id}`).then((res) => {
      console.log(res);
      setTempDocument(res);
    });

    get("UniversityCountryDD/Index").then((res) => {
      setCountryList(res);
    });

    // for fake data
    // setUsers(userData);
  }, [id, callApi, currentPage, dataPerPage, searchStr, success]);

  const countryDD = countryList.map((countryOptions) => ({
    label: countryOptions?.name,
    value: countryOptions?.id,
  }));

  // select University Country
  const selectUniCountry = (label, value) => {
    setCountryError(false);
    setUniCountryLabel(label);
    setUniCountryValue(value);
    setUniStateLabel("Select State");
    setUniStateValue(0);
    get(`UniversityStateDD/Index/${value}`).then((res) => {
      console.log("res", res);
      // setUniStateLabel(res.name)
      // setUniStateValue(res.id)
      setUniversityStates(res);
    });
  };

  const universityStateName = universityStates?.map((uniState) => ({
    label: uniState.name,
    value: uniState.id,
  }));

  // select University State
  const selectUniState = (label, value) => {
    setStateError(false);
    setUniStateLabel(label);
    setUniStateValue(value);
  };

  const handleSubmitCampus = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    
      if (uniCountryValue === 0) {
        setCountryError(true);
      } else if (unistateValue === 0) {
        setStateError(true);
      } else {
        post(`UniversityCampus/Create`, subdata).then((res) => {
          setSuccess(!success);
          setModalOpen(false);
          console.log("ressss", res);
          // setuniversityId(res?.data?.result?.universityId);
          if (res.status === 200 && res.data.isSuccess === true) {
            // setSubmitData(false);
            addToast(res.data.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setUniCountryLabel("Select Country");
            setUniCountryValue(0);
            setUniStateLabel("Select State");
            setUniStateValue(0);
          }
        });
      }
    
  };

  const backToDashboard = () => {
    if (location.subjectDataUniversityId != undefined) {
      history.push(`/subjectProfile/${location.subjectDataUniversityId}`);
    } else {
      history.push("/universityList");
    }
  };

  const intakeDropDown = intakeData?.map((intake) => ({
    label: intake?.name,
    value: intake?.id,
  }));

  const intakeStatusDropDown = intakeStatusData?.map((status) => ({
    label: status?.name,
    value: status?.id,
  }));

  const selectIntakeType = (label, value) => {
    setIntakeLabel(label);
    setIntakeValue(value);
    // handleSearch();
  };

  const selectStatusType = (label, value) => {
    setStatusLabel(label);
    setStatusValue(value);
    // handleSearch();
  };

  // on clear
  const handleClearSearch = () => {
    setIntakeLabel(" Intake...");
    setIntakeValue(0);
    setStatusLabel(" Status...");
    setStatusValue(0);
    // setCallApi((prev) => !prev);
  };

  // const selectSubjectName = (action) => {
  //   setMenus([]);
  //   checked = [];

  //     console.log("Action",action);
  //     setMenus(action);

  //     let defaultChecked = checked;
  //     if (action.length > 0) {
  //       for (let i = 0; i < action.length; i++) {
  //         const menu = action[i];
  //         if (menu.isChecked === true) {
  //           const id = menu.id.toString();
  //           defaultChecked.push(id);
  //           setChecked([...defaultChecked]);
  //         }
  //       }
  //     }
  //     console.log(menus);

  // };

  // on Select All Checkbox
  const handleSelectAll = (e) => {
    let newChecked = [];
    const val = e.target.checked;
    console.log("menus", menus);
    if (val === true) {
      menus.map((menu) => {
        const menuId = menu.id.toString();
        newChecked.push(menuId);
        document.getElementById(menu.id).checked = true;
      });
      setChecked([...newChecked]);
      console.log("selectChecked", checked);
    } else {
      setChecked([...checked]);
    }
    // else if(val === false){
    //   eslint-disable-next-line no-lone-blocks
    //   {
    //         menus.map((menu) => {
    //           document.getElementById(menu.id).checked = false;
    //         });
    //         setChecked([]);
    //       }
    // }
    // if (val === false) {
    //   {
    //     menus.map((menu) => {
    //       document.getElementById(menu.id).checked = false;
    //     });
    //     setChecked([]);
    //   }
    // }
  };

  // on De Select all
  const handleDeselectAll = (e) => {
    const val = e.target.checked;
    console.log("val1", val);
    if (val === true) {
      // eslint-disable-next-line no-lone-blocks
      {
        menus.map((menu) => {
          document.getElementById(menu.id).checked = false;
        });
        setChecked([]);
      }
    } else {
      setChecked([...checked]);
    }
    console.log("deSelectChecked", checked);
  };

  // handling checkbox
  const handleCheck = (e) => {
    let id = e.target.id;
    let val = e.target.checked;

    console.log("check id", id);
    console.log("checked", checked);

    if (val === true) {
      setChecked([...checked, id]);
    } else {
      // setChecked([]);
      const index = checked.indexOf(id);
      if (index > -1) {
        checked.splice(index, 1);
        setChecked([...checked]);
      }
    }
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tmpUsers = subList.map((sub) => {
        return { ...sub, isChecked: checked };
      });
      setSubList(tmpUsers);
      console.log("selectAll", tmpUsers);
    } else if (name === "allDeselect") {
      let tmpUsers = subList.map((sub) => {
        return { ...sub, isChecked: !checked };
      });
      setSubList(tmpUsers);
      console.log("dselectAll", tmpUsers);
    } else {
      let tmpUsers = subList.map((sub) =>
        sub.name === name ? { ...sub, isChecked: checked } : sub
      );
      setSubList(tmpUsers);
      console.log("singleSelect", tmpUsers);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subdata = new FormData(e.target);

    for (var value of subdata.values()) {
      console.log("values", value);
    }
  };

  const tableStyle = {
    overflowX: "scroll",
  };

  //  console.log('finalcialInfo', financialInfo?.avarageTutionFee);

  const handleProfileEdit = (id) => {
    // localStorage.removeItem("id");
    // localStorage.removeItem('editMethod');
    // localStorage.setItem("id", id);
    // localStorage.setItem('editMethod','put');
    history.push({
      pathname: `/addUniversity/${id}`,
      uuId: id,
    });
  };

  const handleChange1 = ({ fileList }) => {
    setFileList1(fileList);
    setFileError(false);
    console.log(fileList);
  };

  const handleCancel1 = () => {
    setPreviewVisible1(false);
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

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

  const handleView = (gallery) => {
    setGalleryObj(gallery);
    setViewModalOpen(true);
    console.log("gOBj", gallery);
  };

  const handleDelete = (gallery) => {
    console.log("gallery", gallery);
    setDelGalName(gallery?.mediaFileMedia?.fileName);
    setDelGalId(gallery?.id);
    setDeleteModal(true);
  };

  // on Close View Modal
  const closeViewModal = () => {
    // setGalleryObj({});
    setViewModalOpen(false);
  };

  // on Close Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setDelGalName("");
    setDelGalId(0);
  };

  const handleDeleteItem = (id) => {
    const returnValue = remove(`UniversityGallery/Delete/${id}`).then(
      (action) => {
        setDeleteModal(false);
        setSuccess(!success);
        addToast(action, {
          appearance: "error",
          autoDismiss: true,
        });
        setDelGalName("");
        setDelGalId(0);
      }
    );
  };

  const handleCampusEdit = (id) => {
    history.push(`/addUniversityCampus/${id}`);
  };

  const AuthStr = localStorage.getItem("token");

  const handleGalleryPost = (e) => {
    e.preventDefault();

    const subdata = new FormData(e.target);

    for (let i = 0; i < FileList1.length; i++) {
      subdata.append(`mediaFile`, FileList1[i]?.originFileObj);
    }

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "authorization": AuthStr,
      },
    };

    if (FileList1.length < 1) {
      setFileError(true);
    } else {
      setLoading(true);
      Axios.post(`${rootUrl}UniversityGallery/Create`, subdata, config).then(
        (res) => {
          setSuccess(!success);
          setFileList1([]);
          setFileError(false);
          setLoading(false);
          addToast(res.data.message, {
            appearance: "success",
            autoDismiss: true,
          });
          // history.push("/addUniversityApplicationDocument");
        }
      );
    }
  };

  const redirecttoCampDetails = (campusId) => {
    history.push({
      pathname: `/campusDetails/${campusId}`,
      uniDetailId: id,
    });
  };

  const redirectToSubjectProfile = (subjectId) => {
    history.push({
      pathname: `/subjectProfile/${subjectId}`,
      uniDetailId: id,
    });
  };

  // const handleAddUniversitySubject = () => {
  //   history.push(`/addUniversitySubject/${id}`);
  // }

  const handleAddUniversitySubject = () => {
    history.push(`/addUniProfileSubject/${id}`);
  };

  // on Close Modal
  const closeModal = () => {
    setUniCountryLabel("Select Country");
    setUniCountryValue(0);
    setUniStateLabel("Select State");
    setUniStateValue(0);
    setModalOpen(false);
  };

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">University Details</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToDashboard} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i>{" "}
              {location.subjectDataUniversityId != undefined
                ? "Back to Subject Details"
                : " Back to University List"}
            </span>
          </div>
        </CardHeader>
      </Card>

      <div className="uapp-employee-profile">
        {/* <Row>
          <Col md="12"> 
           <Card className="uapp-employee-profile-right" >
             <div className="uapp-profile-CardHeader" style={{ backgroundImage:`url(${rootUrl+universityInfo?.universityLogo?.fileUrl})`}}>
                <div className="uapp-circle-image margin-top-minus">
                  <img src={rootUrl+universityInfo?.universityLogo?.fileUrl} alt='university_image' />
                </div>    
                
                <h5> {universityInfo?.name}</h5>
                 <p> {providerInfo?.providerType?.name} </p>  
            </div>
              <CardBody>

                 <div>
                 <ul className="uapp-ul text-center">
                     <li> {providerInfo?.email} </li>
                     <li> {providerInfo?.phoneNumber} </li>
                   
                   </ul>
                 </div>

            </CardBody>
          </Card>

          
          </Col>
        </Row> */}

        <Row>
          <Col md="8">
            <Card>
              <CardBody>
                <div className="uapp-employee-cover-image">
                  <div className="bg-image">
                    <div className="uplode-cover-image">
                      <img
                        src={rootUrl + universityInfo?.coverPhoto?.fileUrl}
                        alt="cover_img"
                      />
                    </div>
                  </div>
                </div>

                <div className="uapp-employee-profile-image-edit">
                  <Row>
                    <Col>
                      <div className="uapp-employee-profile-image">
                        <div className="text-left">
                          <img
                            className="empProfileImg"
                            src={
                              rootUrl + universityInfo?.universityLogo?.fileUrl
                            }
                            alt="profile_img"
                          />
                        </div>
                      </div>
                    </Col>

                    <Col>
                      {/* <div className="uapp-employee-profile-Edit">
                        <div className="text-right">
                          <span> <i className="fas fa-pencil-alt"></i> </span>
                        </div>
                       </div> */}

                      <EditDivButton
                        className={"uapp-employee-profile-Edit"}
                        func={() => handleProfileEdit(id)}
                        permission={6}
                      />
                    </Col>
                  </Row>
                </div>

                <div className="uapp-employee-profile-generalInfo">
                  <Row>
                    <Col md="6">
                      <ul className="uapp-ul text-left">
                        <li>
                          <h4>
                            {universityInfo?.name} ({universityInfo?.shortName})
                            
                          </h4>
                          {
                            (userType == userTypes?.SystemAdmin)?
                            <h6 className='mt-2'>Contract Type: {universityInfo?.contractType?.name}</h6>
                            :
                            null
                          }
                        </li>

                        <li>{/* <h6>{employeeType.name}</h6> */}</li>
                      </ul>
                    </Col>

                    <Col md="6">
                      <ul className="uapp-ul text-right1">
                        <li>
                          <span>
                            {" "}
                            Foundation year : {universityInfo?.foundationYear}
                          </span>
                        </li>

                        <li>
                          <span>
                            {" "}
                            Global rank : {universityInfo?.globalRankNumber}
                          </span>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>

            <div className=" info-item mt-4">
              <Card>
                <CardBody>
                  <div className="hedding-titel d-flex justify-content-between">
                    <div>
                      <h5>
                        {" "}
                        <b>Description</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                    {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
                  </div>
                  <div>
                    <p className="pt-2">{universityInfo?.description}</p>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* gallery starts here */}

            <div className=" info-item mt-4">
              <Card>
                <CardBody>
                  <div className="hedding-titel d-flex justify-content-between">
                    <div>
                      <h5>
                        {" "}
                        <b>Gallery</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                    {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}
                  </div>
                  <div className="row mt-5">
                    <div className="col-md-8">
                      <div className="row row-cols-md-3 row-cols-sm-2 container-fluid">
                        {gallery.map((gall, i) => (
                          <div key={i} className="containerCustom pl-2 pb-2">
                            <img
                              src={rootUrl + gall?.mediaFileMedia?.thumbnailUrl}
                              alt="Avatar"
                              className="image"
                              style={{ width: "100%" }}
                            />
                            <div className="middle d-flex">
                              <Button
                                onClick={() => handleView(gall)}
                                className="bg-success"
                              >
                                View
                              </Button>
                              <Button
                                onClick={() => handleDelete(gall)}
                                className="bg-danger ml-1"
                              >
                                Delete
                              </Button>

                              <Modal
                                size="50%"
                                isOpen={viewModalOpen}
                                toggle={closeViewModal}
                                className="uapp-modal2"
                              >
                                <ModalBody>
                                  {/* <img
                              className="w-100 mx-auto"
                              src={
                                rootUrl + galleryObj?.mediaFileMedia?.fileUrl
                              }
                              alt=""
                            /> */}
                                  {galleryObj?.mediaFileMedia?.mediaType ===
                                  1 ? (
                                    <img
                                      src={
                                        rootUrl +
                                        galleryObj?.mediaFileMedia?.fileUrl
                                      }
                                      alt="gallery_image"
                                      className="image"
                                      style={{ width: "100%" }}
                                    />
                                  ) : galleryObj?.mediaFileMedia?.mediaType ===
                                    3 ? (
                                    <video
                                      src={
                                        rootUrl +
                                        galleryObj?.mediaFileMedia?.fileUrl
                                      }
                                      width="100%"
                                      height="100%"
                                      controls
                                    >
                                      The browser does not support videos.
                                    </video>
                                  ) : (
                                    <span>This format cannot be opened.</span>
                                  )}
                                </ModalBody>

                                <ModalFooter>
                                  <Button
                                    className=""
                                    color="danger"
                                    onClick={closeViewModal}
                                  >
                                    Close
                                  </Button>
                                </ModalFooter>
                              </Modal>

                              <Modal
                                isOpen={deleteModal}
                                toggle={closeDeleteModal}
                                className="uapp-modal"
                              >
                                <ModalBody>
                                  <p>
                                    Are You Sure to Delete this{" "}
                                    <b>{delGalName}</b>? Once Deleted it can't
                                    be Undone!
                                  </p>
                                </ModalBody>

                                <ModalFooter>
                                  <Button
                                    color="danger"
                                    onClick={() => handleDeleteItem(delGalId)}
                                  >
                                    YES
                                  </Button>
                                  <Button onClick={closeDeleteModal}>NO</Button>
                                </ModalFooter>
                              </Modal>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="customCard rounded">
                        <Form className="ml-2" onSubmit={handleGalleryPost}>
                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Input
                              type="hidden"
                              id="universityId"
                              name="universityId"
                              value={id}
                            />
                            {/* <Input type="hidden" id="Id" name="Id" value={selectedId} /> */}
                          </FormGroup>

                          <FormGroup>
                            <span>
                              Select Files{" "}
                              <span className="text-danger">*</span>{" "}
                            </span>
                            {loading ? (
                              <h4 className="text-center mt-4">Uploading...</h4>
                            ) : (
                              <div className="row mt-4">
                                {/* {universityData?.universityLogo ? (
                                  <div className="col-md-3">
                                    <Image
                                      width={104}
                                      height={104}
                                      src={
                                        rootUrl +
                                        universityData?.universityLogo
                                          ?.thumbnailUrl
                                      }
                                    />
                                  </div>
                                ) : null} */}

                                <div className="col-md-3">
                                  <Upload
                                    listType="picture-card"
                                    multiple={true}
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
                            )}
                            {fileError && (
                              <span className="text-danger">
                                At least one file is required
                              </span>
                            )}
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                            style={{ display: "flex", justifyContent: "end" }}
                          >
                            <Col md="5">
                              <CustomButtonRipple
                                type={"submit"}
                                className={"mr-1 mt-3 badge-primary"}
                                name={"Save"}
                                permission={6}
                              />
                            </Col>
                          </FormGroup>
                        </Form>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* gallery ends here */}

            {/* university information starts here */}
            <div className=" info-item mt-4">
              <Card>
                <CardBody>
                  <div className="hedding-titel d-flex justify-content-between">
                    <div>
                      <h5>
                        {" "}
                        <b>General Information</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                    <div
                      className="text-right edit-style  p-3"
                      onClick={() => handleProfileEdit(id)}
                    >
                      <span>
                        {" "}
                        <i className="fas fa-pencil-alt pencil-style"></i>{" "}
                      </span>
                    </div>
                  </div>
                  <Table className="table-bordered mt-4">
                    <tbody>
                      <tr>
                        <td width="40%">
                          <b>Name:</b>
                        </td>

                        <td width="60%">
                          {universityInfo?.name} ({universityInfo?.shortName})
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>University Type:</b>
                        </td>

                        <td width="60%">
                          {universityInfo?.universityType?.name}
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>Country:</b>
                        </td>

                        <td width="60%">
                          {universityInfo?.universityCountry?.name}
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>City:</b>
                        </td>

                        <td width="60%">{universityInfo?.universityCity}</td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>State:</b>
                        </td>

                        <td width="60%">
                          {universityInfo?.universityState?.name}
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>Global Rank:</b>
                        </td>

                        <td width="60%">{universityInfo?.globalRankNumber}</td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>Foundation Year:</b>
                        </td>

                        <td width="60%">{universityInfo?.foundationYear}</td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>Part Time Work Information:</b>
                        </td>

                        <td width="60%">
                          {universityInfo?.partTimeWorkInformation}
                        </td>
                      </tr>
                      
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </div>
            {/* university information ends here */}

            {/* camp list start */}
            <div className=" info-item mt-4">
              <Card>
                <CardBody>
                  <div className="hedding-titel d-flex justify-content-between">
                    <div>
                      <h5>
                        {" "}
                        <b>Campus List</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>

                    <ButtonForFunction
                      func={() => setModalOpen(true)}
                      className={"btn btn-uapp-add "}
                      icon={<i className="fas fa-plus"></i>}
                      name={" Add New Campus"}
                      permission={6}
                    />

                    {/* campus adding modal starts here */}

                    <Modal
                      isOpen={modalOpen}
                      toggle={closeModal}
                      className="uapp-modal2"
                      size="lg"
                    >
                      <ModalHeader style={{ backgroundColor: "#1d94ab" }}>
                        <span className="text-white">University Campus</span>
                      </ModalHeader>
                      <ModalBody>
                        <Form onSubmit={handleSubmitCampus}>
                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Input
                              type="hidden"
                              id="universityId"
                              name="universityId"
                              value={id}
                            />
                            {/* <Input
                              type="hidden"
                              id="Id"
                              name="Id"
                              value={selectedId}
                            /> */}
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="2">
                              <span>
                                Campus Name{" "}
                                <span className="text-danger">*</span>{" "}
                              </span>
                            </Col>
                            <Col md="6">
                              <Input
                                type="text"
                                name="Name"
                                id="Name"
                                placeholder="Enter Campus Name"
                                required
                              />
                              {/* <div className="form-control-position">
                                                <User size={15} />
                                            </div> */}
                            </Col>
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="2">
                              <span>
                                Campus Country{" "}
                                <span className="text-danger">*</span>{" "}
                              </span>
                            </Col>
                            <Col md="6">
                              <Select
                                options={countryDD}
                                value={{
                                  label: uniCountryLabel,
                                  value: uniCountryValue,
                                }}
                                onChange={(opt) =>
                                  selectUniCountry(opt.label, opt.value)
                                }
                                name="CampusCountryId"
                                id="CampusCountryId"
                              />

                              {countryError ? (
                                <span className="text-danger">
                                  Country is required
                                </span>
                              ) : null}
                            </Col>
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="2">
                              <span>
                                Campus State{" "}
                                <span className="text-danger">*</span>{" "}
                              </span>
                            </Col>
                            <Col md="6">
                              <Select
                                options={universityStateName}
                                value={{
                                  label: uniStateLabel,
                                  value: unistateValue,
                                }}
                                onChange={(opt) =>
                                  selectUniState(opt.label, opt.value)
                                }
                                name="CampusStateId"
                                id="CampusStateId"
                              />

                              {stateError ? (
                                <span className="text-danger">
                                  State is required
                                </span>
                              ) : null}
                            </Col>
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="2">
                              <span>
                                Campus City{" "}
                                <span className="text-danger">*</span>{" "}
                              </span>
                            </Col>
                            <Col md="6">
                              <Input
                                type="text"
                                name="CampusCity"
                                id="CampusCity"
                                placeholder="Enter Campus City Name"
                                required
                              />
                              {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                            </Col>
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="2">
                              <span>
                                Address Line
                                <span className="text-danger">*</span>{" "}
                              </span>
                            </Col>
                            <Col md="6">
                              <Input
                                type="text"
                                name="AddressLine"
                                id="AddressLine"
                                placeholder="Enter Address Line"
                                required
                              />
                              {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                            </Col>
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="2">
                              <span>Total Student </span>
                            </Col>
                            <Col md="6">
                              <Input
                                type="number"
                                name="TotalStudent"
                                id="TotalStudent"
                                placeholder="Enter Total Student"
                                required
                              />
                              {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                            </Col>
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="2">
                              <span>International Student </span>
                            </Col>
                            <Col md="6">
                              <Input
                                type="number"
                                name="InternationalStudent"
                                id="InternationalStudent"
                                placeholder="Enter International Student"
                                required
                              />
                              {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                            </Col>
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="2">
                              <span>Average Tution Fee </span>
                            </Col>
                            <Col md="6">
                              <Input
                                type="number"
                                name="AvarageTutionFee"
                                id="AvarageTutionFee"
                                placeholder="Avarage Tution Fee"
                                required
                              />
                              {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                            </Col>
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="2">
                              <span>Average Living Cost </span>
                            </Col>
                            <Col md="6">
                              <Input
                                type="number"
                                name="AvarageLivingCost"
                                id="AvarageLivingCost"
                                placeholder="Avarage Living Cost"
                                required
                              />
                              {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                            </Col>
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="2">
                              <span>Average Application Fee </span>
                            </Col>
                            <Col md="6">
                              <Input
                                type="number"
                                name="AvarageApplicationFee"
                                id="AvarageApplicationFee"
                                placeholder="Avarage Application Fee"
                                required
                              />
                              {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                            </Col>
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="2">
                              <span>Estimated Total Cost </span>
                            </Col>
                            <Col md="6">
                              <Input
                                type="number"
                                name="EstimatedTotalCost"
                                id="EstimatedTotalCost"
                                placeholder="Estimated Total Cost"
                                required
                              />
                              {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                            </Col>
                          </FormGroup>

                          <FormGroup
                            row
                            className="has-icon-left position-relative"
                          >
                            <Col md="2">
                              <span>Campus on Map </span>
                            </Col>
                            <Col md="6">
                              <Input
                                type="textarea"
                                rows="3"
                                name="EmbededMap"
                                id="EmbededMap"
                                placeholder="Location on Google Map"
                                // placeholder="Please type the src link only from the embed map"
                              />
                              <span className="text-danger">Note: Please type the "src" link only from the embed map</span>
                              {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                            </Col>
                          </FormGroup>

                          <FormGroup
                            className="has-icon-left position-relative"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Button
                              color="danger"
                              className="mr-1 mt-3"
                              onClick={closeModal}
                            >
                              Close
                            </Button>

                            {/* localStorage.getItem("updateUni") ? */}
                            {/* <Button color="warning" className="mr-1 mt-3" onClick={handleUpdateSubmit}>Update</Button> : */}

                            {/* <Button.Ripple
                        color="warning"
                        type="submit"
                        className="mr-1 mt-3"
                       
                      >
                        Submit
                      </Button.Ripple> */}

                            <CustomButtonRipple
                              color={"primary"}
                              type={"submit"}
                              className={"mr-1 mt-3"}
                              name={"Submit"}
                              permission={6}
                            />
                          </FormGroup>
                        </Form>
                      </ModalBody>
                    </Modal>

                    {/* campus adding modal ends here */}

                    {/* <div className="text-right edit-style  p-3" onClick={()=>handleCampusEdit(id)}>
                      <span>
                        {" "}
                        <i className="fas fa-pencil-alt pencil-style"></i>{" "}
                      </span>
                    </div> */}
                    {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div> */}
                  </div>
                  {campusList.length < 1 ? (
                    <p className="mt-4">There is no campus added here.</p>
                  ) : (
                    <>
                      {loading ? (
                        <h2 className="text-center">Loading...</h2>
                      ) : (
                        <div className="table-responsive pt-3">
                          <Table
                            className="table-sm striped"
                            style={tableStyle}
                          >
                            <thead className="">
                              <tr style={{ textAlign: "center" }}>
                                <th scope="row">#</th>
                                <th>Name</th>
                                <th>City</th>
                                <th>Student</th>
                                {/* <th>Cost</th> */}
                                <th
                                  style={{ width: "8%" }}
                                  className="text-center"
                                >
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {campusList?.map((campus, i) => (
                                <tr key={i} style={{ textAlign: "center" }}>
                                  <th scope="row">{serialNum + i}</th>

                                  <td>{campus?.name}</td>
                                  <td>{campus?.campusCity}</td>
                                  <td>
                                    Total Student = {campus?.totalStudent}{" "}
                                    {<br />}
                                    International Student ={" "}
                                    {campus?.internationalStudent}
                                  </td>
                                  {/* <td>{campus?.internationalStudent}</td> */}

                                  {/* <td>
                              Avg. Tution Fee = {campus?.avarageTutionFee} {<br />}
                              Avg. Living Cost = {campus?.avarageLivingCost} {<br />}
                              Avg. Application Fee = {campus?.avarageApplicationFee} {<br />}
                              Est. Total Cost = {campus?.estimatedTotalCost}
                            </td> */}

                                  <td
                                    style={{ width: "8%" }}
                                    className="text-center"
                                  >
                                    <ButtonGroup variant="text">
                                      {/* <Link to={`/campusDetails/${campus?.id}`}>
                                        <Button
                                          color="primary"
                                          className="mx-1 btn-sm"
                                        >
                                          {" "}
                                          <i className="fas fa-eye"></i>{" "}
                                        </Button>
                                      </Link> */}

                                      <ButtonForFunction
                                        func={() =>
                                          redirecttoCampDetails(campus?.id)
                                        }
                                        className={"mx-1 btn-sm"}
                                        color={"primary"}
                                        icon={<i className="fas fa-eye"></i>}
                                      />

                                      {/* <Button color="dark" className="mx-1 btn-sm">
                                  {" "}
                                  <i className="fas fa-edit"></i>{" "}
                                </Button>
                                <Button color="danger" className="mx-1 btn-sm">
                                  <i className="fas fa-trash-alt"></i>
                                </Button> */}
                                    </ButtonGroup>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      )}
                    </>
                  )}
                </CardBody>
              </Card>
            </div>
            {/* camp list end */}

            {/* all subject starts here */}
            <div className=" info-item mt-4">
              <Card>
                <CardBody>
                  <div className="hedding-titel d-flex justify-content-between">
                    <div>
                      <h5>
                        {" "}
                        <b>Subject List</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                    {/* <div className="text-right edit-style  p-3"> */}
                    <ButtonForFunction
                      func={handleAddUniversitySubject}
                      className={"btn btn-uapp-add "}
                      icon={<i className="fas fa-plus"></i>}
                      name={" Add New Subject"}
                      permission={6}
                    />
                    {/* </div> */}
                  </div>
                  {subList.length < 1 ? (
                    <p className="mt-4">There is no subject added here.</p>
                  ) : (
                    <>
                      {loading ? (
                        <h2 className="text-center">Loading...</h2>
                      ) : (
                        <div className="table-responsive pt-3">
                          <Table
                            className="table-sm striped"
                            style={tableStyle}
                          >
                            <thead className="">
                              <tr style={{ textAlign: "center" }}>
                                <th scope="row">#</th>
                                <th>Subject Name</th>
                                <th>Program Level</th>
                                <th>Department</th>
                                <th>Sub Department</th>
                                <th
                                  style={{ width: "8%" }}
                                  className="text-center"
                                >
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {subList?.map((sub, i) => (
                                <tr key={i} style={{ textAlign: "center" }}>
                                  <th scope="row">{serialNum + i}</th>

                                  <td>{sub?.name}</td>

                                  <td>{sub?.programLevel?.name}</td>

                                  <td>{sub?.department?.name}</td>

                                  <td>
                                    {sub?.subDepartment?.departmentinfo?.name}
                                  </td>

                                  <td
                                    style={{ width: "8%" }}
                                    className="text-center"
                                  >
                                    <ButtonGroup variant="text">
                                      {/* <Link to={`/subjectProfile/${sub?.id}`}>
                                        <Button
                                          color="primary"
                                          className="mx-1 btn-sm"
                                        >
                                          {" "}
                                          <i className="fas fa-eye"></i>{" "}
                                        </Button>
                                      </Link> */}

                                      <ButtonForFunction
                                        func={() =>
                                          redirectToSubjectProfile(sub?.id)
                                        }
                                        className={"mx-1 btn-sm"}
                                        color={"primary"}
                                        icon={<i className="fas fa-eye"></i>}
                                      />
                                      {/* <Button color="dark" className="mx-1 btn-sm">
                                  {" "}
                                  <i className="fas fa-edit"></i>{" "}
                                </Button>
                                <Button color="danger" className="mx-1 btn-sm">
                                  <i className="fas fa-trash-alt"></i>
                                </Button> */}
                                    </ButtonGroup>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      )}
                    </>
                  )}
                </CardBody>
              </Card>
            </div>
            {/* all subject ends here */}

            {/* intake filter */}

            {/* {subList.length < 1 ? null : (
              <Card className="uapp-employee-search mt-4">
                <CardBody className="search-card-body ms-3">
                  <div className="hedding-titel d-flex justify-content-between mb-4 mt-3">
                    <div>
                      <h5>
                        {" "}
                        <b>Subject Intake</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                    
                  </div>

                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Row>
                        <Col lg="5" md="4" sm="6" xs="6">
                          <Select
                            options={intakeDropDown}
                            value={{ label: intakeLabel, value: intakeValue }}
                            onChange={(opt) =>
                              selectIntakeType(opt.label, opt.value)
                            }
                            name="UniversityTypeId"
                            id="UniversityTypeId"
                          />
                        </Col>

                        <Col lg="5" md="4" sm="6" xs="6">
                          <Select
                            options={intakeStatusDropDown}
                            value={{ label: statusLabel, value: statusValue }}
                            onChange={(opt) =>
                              selectStatusType(opt.label, opt.value)
                            }
                            name="UniversityCountryId"
                            id="UniversityCountryId"
                          />
                        </Col>

                        <Col lg="2" md="4" sm="6" xs="6">
                         
                          <Button
                            type="submit"
                            className="btn btn-uapp-add btn btn-secondary"
                          >
                            Apply
                          </Button>
                        
                        </Col>
                      </Row>
                    </FormGroup>

                    <FormGroup>
                      <Row className="">
                        <Col lg="12" md="12" sm="12" xs="12">
                          <div
                            style={{ display: "flex", justifyContent: "end" }}
                          >
                            <div
                              className="mt-1 mx-1 d-flex btn-clear"
                              onClick={handleClearSearch}
                            >
                             
                              <span className="text-danger">
                                <i className="fa fa-times"></i> Clear
                              </span>
                            </div>

                            
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>

                     

                    <Input
                      type="hidden"
                      name="universityId"
                      id="universityId"
                      value={id}
                    />

                    <FormGroup>
                      <Row>
                        <Col sm="6" className="text-center">
                          

                          <div className="form-check">
                            <input
                              className="form-check-input"
                              onChange={handleChange}
                              type="checkbox"
                              checked={
                                subList.filter((sub) => sub?.isChecked !== true)
                                  .length < 1
                              }
                              disabled={
                                subList.filter((sub) => sub?.isChecked !== true)
                                  .length < 1
                              }
                              name="allSelect"
                            />
                            <label className="form-check-label" htmlFor="">
                              <b>Select all</b>
                            </label>
                          </div>
                        </Col>

                        <Col sm="6" className="text-center">
                          

                          <div className="form-check ms-auto">
                            <input
                              className="form-check-input"
                              onChange={handleChange}
                              type="checkbox"
                              checked={
                                subList.filter(
                                  (sub) => sub?.isChecked !== false
                                ).length < 1
                              }
                              disabled={
                                subList.filter(
                                  (sub) => sub?.isChecked !== false
                                ).length < 1
                              }
                              name="allDeselect"
                            />
                            <label className="form-check-label" htmlFor="">
                              <b>Deselect all</b>
                            </label>
                          </div>
                        </Col>
                        <br />
                        <br />
                        

                        {subList?.map((sub, i) => (
                          <Col
                            xs="6"
                            sm="4"
                            md="3"
                            key={i}
                            className=""
                          >
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                onChange={handleChange}
                                name={sub.name}
                                checked={sub?.isChecked || false}
                                
                                value={sub?.id}
                              />
                              <label className="form-check-label" htmlFor="">
                                {sub.name}
                              </label>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </FormGroup>

                    
                  </Form>
                </CardBody>
              </Card>
            )} */}

            <div className=" info-item mt-4">
              <Card>
                <CardBody>
                  <div className="hedding-titel d-flex justify-content-between mb-4">
                    <div>
                      <h5>
                        {" "}
                        <b>Application Documents</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                    {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div> */}
                  </div>

                  <Table className="table-sm table-bordered">
                    <thead className="thead-uapp-bg">
                      <tr style={{ textAlign: "center" }}>
                        <th>SL/NO</th>
                        <th>Name</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appDocument?.map((application, i) => (
                        <tr
                          key={application?.id}
                          style={{ textAlign: "center" }}
                        >
                          <th scope="row">{i + 1}</th>
                          <td>{application?.document?.name}</td>
                          <td>
                            {application?.applicationTypeId === 1
                              ? "Home"
                              : application?.applicationTypeId === 2
                              ? "EU/UK"
                              : "International"}
                          </td>

                          {/* <td>
                            <a
                              href={rootUrl + application?.document?.fileUrl}
                              target="_blank"
                              download
                            >
                              Download
                            </a>
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </div>

            <div className=" info-item mt-4">
              <Card>
                <CardBody>
                  <div className="hedding-titel d-flex justify-content-between mb-4">
                    <div>
                      <h5>
                        {" "}
                        <b>Template Documents</b>{" "}
                      </h5>

                      <div className="bg-h"></div>
                    </div>
                    {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div> */}
                  </div>

                  <Table className="table-sm table-bordered">
                    <thead className="thead-uapp-bg">
                      <tr style={{ textAlign: "center" }}>
                        <th>SL/NO</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>File</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tempDocument?.map((temp, i) => (
                        <tr key={temp?.id} style={{ textAlign: "center" }}>
                          <th scope="row">{i + 1}</th>
                          <td>{temp?.name}</td>
                          <td>{temp?.description}</td>
                          <td>
                            {temp?.applicationTypeId === 1
                              ? "Home"
                              : temp?.applicationTypeId === 2
                              ? "EU/UK"
                              : "International"}
                          </td>
                          <td>
                            <a
                              href={rootUrl + temp?.templateFile?.fileUrl}
                              target="_blank"
                              // download
                            >
                              Download
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </Col>

          <Col md="4">
          {
            (universityInfo?.contractTypeId !== 1) ?
            <>
           
            {
            

              (userType == userTypes?.SystemAdmin)?

              <Card className="uapp-employee-profile-right">
              <div className="uapp-profile-CardHeader">
                <div className="uapp-circle-image margin-top-minus">
                  {universityInfo?.provider?.providerLogoMedia?.fileUrl ==
                  null ? (
                    <img src={profileImage} alt="provider_img" />
                  ) : (
                    <img
                      src={
                        rootUrl +
                        universityInfo?.provider?.providerLogoMedia?.fileUrl
                      }
                      alt="provider_img"
                    />
                  )}
                </div>

                <h5>
                  {universityInfo?.provider?.name} (
                  {universityInfo?.provider?.providerViewId})
                </h5>
                <p> {universityInfo?.provider?.providerType?.name} </p>
              </div>
              <CardBody>
                <div>
                  <ul className="uapp-ul text-center">
                    <li> {universityInfo?.provider?.addressLine} </li>
                    <li> {universityInfo?.provider?.email} </li>
                    <li> {universityInfo?.provider?.phoneNumber} </li>
                  </ul>
                </div>
              </CardBody>
            </Card>

            :

            null
            }
            </>
            :
            <>
            <Card className="uapp-employee-profile-right">
              <div className="uapp-profile-CardHeader">
                <div className="uapp-circle-image margin-top-minus">
                  {universityInfo?.provider?.providerLogoMedia?.fileUrl ==
                  null ? (
                    <img src={profileImage} alt="provider_img" />
                  ) : (
                    <img
                      src={
                        rootUrl +
                        universityInfo?.provider?.providerLogoMedia?.fileUrl
                      }
                      alt="provider_img"
                    />
                  )}
                </div>

                <h5>
                  {universityInfo?.provider?.name} (
                  {universityInfo?.provider?.providerViewId})
                </h5>
                <p> {universityInfo?.provider?.providerType?.name} </p>
              </div>
              <CardBody>
                <div>
                  <ul className="uapp-ul text-center">
                    <li> {universityInfo?.provider?.addressLine} </li>
                    <li> {universityInfo?.provider?.email} </li>
                    <li> {universityInfo?.provider?.phoneNumber} </li>
                  </ul>
                </div>
              </CardBody>
            </Card>
            </>
          }
            {/* for showing provider information ends here */}

            {/* For showing financial cost */}

            <Card>
              <CardBody>
                <div className="hedding-titel d-flex justify-content-between mb-4">
                  <div>
                    <h5>
                      {" "}
                      <b>Financial Cost</b>{" "}
                    </h5>

                    <div className="bg-h"></div>
                  </div>
                  {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div> */}
                </div>

                {financialInfo === null ? (
                  <p>There is no financial information added here.</p>
                ) : (
                  <>
                    <div className="d-flex justify-content-between">
                      <span>Avarage Tution Fee</span>
                      <p>€{financialInfo?.avarageTutionFee}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span>Avarage Application Fee</span>
                      <p>€{financialInfo?.avarageApplicationFee}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span>Avarage Living Cost</span>
                      <p>€{financialInfo?.avarageLivingCost}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span>Estimated Total Cost</span>
                      <p>€{financialInfo?.estimatedTotalCost}</p>
                    </div>
                  </>
                )}
              </CardBody>
            </Card>
            {/* financial cost end here */}

            {/* features */}

            <Card>
              <CardBody>
                <div className="hedding-titel d-flex justify-content-between mb-4">
                  <div>
                    <h5>
                      {" "}
                      <b>Features</b>{" "}
                    </h5>

                    <div className="bg-h"></div>
                  </div>
                  {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div> */}
                </div>

                {universityFeatures === null ? (
                  <p>There is no feature added here.</p>
                ) : (
                  <>
                    <div className="d-flex justify-content-between">
                      <span>Accommodations</span>
                      <p>
                        {universityFeatures?.accommodations === false ? (
                          <i className=" danger fas fa-times-circle"></i>
                        ) : (
                          <i className="success fas fa-check-circle"></i>
                        )}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span>Conditional Offer Letter</span>
                      <p>
                        {universityFeatures?.conditionalOfferLetter ===
                        false ? (
                          <i className=" danger fas fa-times-circle"></i>
                        ) : (
                          <i className="success fas fa-check-circle"></i>
                        )}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span>Internship Participation</span>
                      <p>
                        {universityFeatures?.intershipParticipation ===
                        false ? (
                          <i className=" danger fas fa-times-circle"></i>
                        ) : (
                          <i className="success fas fa-check-circle"></i>
                        )}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span>Practical Training</span>
                      <p>
                        {universityFeatures?.practicalTraining === false ? (
                          <i className=" danger fas fa-times-circle"></i>
                        ) : (
                          <i className="success fas fa-check-circle"></i>
                        )}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span>Work While Studying</span>
                      <p>
                        {universityFeatures?.workWhileStudying === false ? (
                          <i className=" danger fas fa-times-circle"></i>
                        ) : (
                          <i className="success fas fa-check-circle"></i>
                        )}
                      </p>
                    </div>
                  </>
                )}
              </CardBody>
            </Card>

            {/* embedded map starts here */}

            <Card>
              <CardBody>
                <div className="hedding-titel d-flex justify-content-between mb-4">
                  <div>
                    <h5>
                      {" "}
                      <b>Embeded Map</b>{" "}
                    </h5>

                    <div className="bg-h"></div>
                  </div>
                  {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div> */}
                </div>

                {universityInfo?.locationOnGoogleMap === null ? (
                  <p>There is no embeded map added here.</p>
                ) : (
                  <>
                    <div className="">
                      <iframe
                        src={universityInfo?.locationOnGoogleMap}
                        width="100%"
                        height="300"
                        loading="lazy"
                        style={{ border: "0" }}
                        referrerpolicy="no-referrer-when-downgrade"
                        title="efef"
                      ></iframe>
                    </div>
                  </>
                )}
              </CardBody>
            </Card>

            {/* embedded map ends here */}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UniversityDetails;
