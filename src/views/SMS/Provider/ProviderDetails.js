import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Pagination from "../../SMS/Pagination/Pagination.jsx";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import { rootUrl } from "../../../constants/constants";
import get from "../../../helpers/get";
import remove from "../../../helpers/remove.js";
import { useToasts } from "react-toast-notifications";
import { Image } from "antd";
import { Upload } from "antd";
import * as Icon from "react-feather";
import LinkButton from "../Components/LinkButton.js";
import Form from "../../core/country/pages/form.js";
import Select from "react-select";
import "antd/dist/antd.css";
import put from "../../../helpers/put.js";
import ButtonForFunction from "../Components/ButtonForFunction.js";
import { permissionList } from "../../../constants/AuthorizationConstant.js";
import LinkSpanButton from "../Components/LinkSpanButton.js";

const ProviderDetails = () => {
  const { id } = useParams();
  // localStorage.setItem("providerId", id);
  const [providerInfo, setProviderInfo] = useState({});
  const [universityList, setUniversityList] = useState([]);
  const [providerId, setProviderId] = useState(0);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const [deleteData, setDeleteData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const [entity, setEntity] = useState(0);
  const [callApi, setCallApi] = useState(false);
  const [serialNum, setSerialNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchStr, setSearchStr] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [stateList, setstateList] = useState([0]);

  const [providerList, setProviderList] = useState([]);
  const [proId, setProId] = useState();

  const [uniTypeLabel, setUniTypeLabel] = useState("Select University Type...");
  const [uniTypeValue, setUniTypeValue] = useState(0);
  const [uniCountryLabel, setUniCountryLabel] = useState(
    "Select University Country..."
  );
  const [uniCountryValue, setUniCountryValue] = useState(0);
  const [uniStateLabel, setUniStateLabel] = useState(
    "Select University State..."
  );
  const [unistateValue, setUniStateValue] = useState(0);
  const [providerLabel, setProviderLabel] = useState("Select Provider...");
  const [providerValue, setProviderValue] = useState(0);
  const [admissionManager, setAdmissionManager] = useState([]);
  const [adminData, setAdminData] = useState({});

  const [title, setTitle] = useState([]);
  const [titleLabel, setTitleLabel] = useState("Select");
  const [titleValue, setTitleValue] = useState(0);
  const [titleError, setTitleError] = useState(false);

  const [managerName, setManagerName] = useState('');
  const [managerId, setManagerId] = useState(0);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [FileList, setFileList] = useState([]);
  const [buttonStatus,setButtonStatus] = useState(false);

  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    const uCountryId = 0;
    const uStateId = 0;
    const uTypeId = 0;

    get(`Provider/Get/${id}`).then((res) => {
      setProviderInfo(res);
      setProId(res?.providertype?.id);
    });
    get(
      `University/Index?page=${currentPage}&pagesize=${dataPerPage}&providerId=${id}&universityCountryId=${
        uCountryId ? uCountryId : uniCountryValue
      }&universityStateId=${
        uStateId ? uStateId : unistateValue
      }&universityTypeId=${
        uTypeId ? uTypeId : uniTypeValue
      }&search=${searchStr}`
    ).then((action) => {
      console.log("unilist", action?.models);
      setUniversityList(action?.models);
      setLoading(false);
      setEntity(action?.totalEntity);
      setSerialNum(action?.firstSerialNumber);
    });

    get(`AdmissionManager/GetbyProvider/${id}`).then((res) => {
      setAdmissionManager(res);
    });

    get(`ProviderAdmin/GetbyProvider/${id}`).then((res) => {
      console.log('providerAdminInfo',res);
      
      setAdminData(res);
      setTitleLabel(res?.nameTittle?.name);
      setTitleValue(res?.nameTittle?.id);
    });

    get("NameTittle/GetAll").then((res) => {
      setTitle(res);
    });
  }, [
    currentPage,
    dataPerPage,
    searchStr,
    uniCountryValue,
    uniTypeValue,
    unistateValue,
    id,
    success,
  ]);

  const history = useHistory();

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
  };

  const backToDashboard = () => {
    history.push("/providerList");
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setManagerId(0);
    setManagerName('');
    setDeleteData({});
  };

  const toggleDelete = (manager) => {
    setManagerId(manager?.id);
    setManagerName(manager?.firstName);
    setDeleteData(manager);
    setDeleteModal(true);
  };

  const handleDelete = () => {
    remove(`AdmissionManager/Delete/${deleteData?.id}`).then((res) => {
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteData({});
      setDeleteModal(false);
      setManagerId(0);
      setManagerName('');
      setSuccess(!success);
    });
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

  const updateAdmissionManager = (ids, id) => {
    history.push(`/updateAdmissionManager/${ids}/${id}`);
  };

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const updateProviderAdmin = () => {
    setModalOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append("providerAdmin", FileList[0]?.originFileObj);

    // for(var x of subData.values()){
    //     console.log(x);
    // }
    setButtonStatus(true);

    put(`ProviderAdmin/Update`, subData).then((res) => {
      setButtonStatus(false);
      if (res?.status == 200 && res?.data?.isSuccess == true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setFileList([]);
        setModalOpen(false);
        setSuccess(!success);
      }
      else{
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  const handleAddUniversity = (e) => {
    e.preventDefault();
    // localStorage.removeItem("proProfileId");
    // localStorage.removeItem("id");
    // localStorage.setItem("proProfileId", id);
    history.push({
      pathname: `/addProviderUniversity/${id}`,
      providerProfileId: id,
    });
  };

  const redirectToAssignPage = (managerId) =>{
    history.push(`/assignUniversity/${id}/${managerId}`);
  }

  const redirectToProviderAdmissionManager = (managerId, id) => {
    history.push(`/providerAdmissionManager/${managerId}/${id}`)
  }

  return (
    <div>
      <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal">
        <ModalHeader>Update Provider Admin</ModalHeader>

        <ModalBody>
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="providerId" id="providerId" value={id} />

            <input type="hidden" name="id" id="id" value={adminData?.id} />

            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>
                  {" "}
                  Title
                  <span className="text-danger">*</span>{" "}
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
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>
                  {" "}
                  First Name
                  <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  defaultValue={adminData?.firstName}
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>
                  {" "}
                  Last Name
                  <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  defaultValue={adminData?.lastName}
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>
                  Profile Photo <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <div className="row d-flex">
                  {adminData?.providerAdminMedia !== null ? (
                    <div className="col-md-6">
                      <Image
                        width={104}
                        height={104}
                        src={
                          rootUrl + adminData?.providerAdminMedia?.thumbnailUrl
                        }
                      />
                    </div>
                  ) : null}

                  <div className="col-md-6">
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
                          <div className="text-danger" style={{ marginTop: 8 }}>
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
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="9">
                <div className="d-flex justify-content-end">
                  <Button color='danger' onClick={()=>setModalOpen(false)} className='mr-1 mt-3'>
                        Cancel
                  </Button>
                  <Button className="ml-1 mt-3" color="primary" disabled={buttonStatus}>
                    Update
                  </Button>
                </div>
              </Col>
            </FormGroup>
          </form>
        </ModalBody>
      </Modal>

      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Provider Details</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToDashboard} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Provider List
            </span>
          </div>
        </CardHeader>
      </Card>

      <div className="uapp-employee-profile">
        <Row>
          <Col md="8">
            <Card className="uapp-employee-profile-right">
              <div className="uapp-profile-CardHeader">
                <div className="uapp-circle-image margin-top-minus">
                  <img
                    src={
                      rootUrl + providerInfo?.providerLogoMedia?.thumbnailUrl
                    }
                    alt="provider_profile"
                  />
                </div>

                <h5> {providerInfo?.name}</h5>
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
           <Col md='4'>
           <Card className="uapp-employee-profile-right">
              <div className="uapp-profile-CardHeader">
                <div className="uapp-circle-image margin-top-minus">
                  <img
                    src={
                      rootUrl + adminData?.providerAdminMedia?.thumbnailUrl
                    }
                    alt="provider_profile"
                  />
                </div>

                <h5 className="pb-2">{adminData?.nameTittle?.name} {' '} {adminData?.firstName} {' '} {adminData?.lastName}</h5>
                {/* <p> {providerInfo?.providerType?.name} </p> */}
              </div>
              <CardBody>
                <div className="d-flex justify-content-center">
                  <ul className="uapp-ul text-center ms-4">
                    <li> {adminData?.email} </li>
                    <li> {adminData?.phoneNumber} </li>
                  </ul>

                  <div style={{position: 'relative', left: '55px'}}>
                {permissions?.includes(
                  permissionList?.Update_Provider_Admin
                ) ? (
                  <LinkButton
                    // name={"Edit"}
                    func={updateProviderAdmin}
                    color={'primary'}
                    icon={<i className="fas fa-edit"></i>}
                    className={'btn-sm'}
                  />
                ) : null}
              </div>
                </div>

               

              </CardBody>
            </Card>
            </Col>
        </Row>

        <Row>
          <Col md="8">
            <Card>
              <CardBody>
                <Row className="mb-3">
                  <Col lg="5" md="5" sm="4" xs="4">
                  <div className="ms-3 mb-4 hedding-titel">
                <h5> <b>University List</b> </h5>
                 
                <div className="bg-h"></div>
                </div>
                    <ButtonForFunction
                      func={handleAddUniversity}
                      className={"ml-3 btn btn-uapp-add "}
                      icon={<i className="fas fa-plus"></i>}
                      name={" Add New University"}
                      permission={6}
                    />
                  </Col>

                  <Col lg="7" md="7" sm="8" xs="8"></Col>
                </Row>

                <div className="table-responsive container mt-3">
                  <Table className="table-sm table-bordered">
                    <thead className="thead-uapp-bg">
                      <tr style={{ textAlign: "center" }}>
                        <th>Logo</th>
                        <th>Name</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {universityList?.map((university, i) => (
                        <tr
                          key={university?.id}
                          style={{ textAlign: "center" }}
                        >
                          <td>
                            {" "}
                            <img
                              className="Uapp-c-image"
                              src={`${
                                rootUrl +
                                university?.universityLogo?.thumbnailUrl
                              }`}
                              alt="logo"
                            />{" "}
                          </td>
                          <td>
                            {university.name} ({university.shortName})
                          </td>
                          <td>{university?.universityType?.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  <Pagination
                    dataPerPage={dataPerPage}
                    totalData={entity}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                </div>
              </CardBody>
            </Card>

            <Card className="p-3">
            <div className="ms-3 mb-4 hedding-titel">
                <h5> <b>Admission Manager</b> </h5>
                 
                <div className="bg-h"></div>
                </div>

              {permissions?.includes(permissionList?.Add_Admission_manager) ? (
                <Link to={`/addAdmissionManager/${id}`}>
                  <Button className="btn btn-uapp-add mt-2 ml-3">
                    {" "}
                    <i class="fas fa-plus"></i> Add Admission Manager{" "}
                  </Button>
                </Link>
              ) : null}

              {admissionManager.length < 1 && (
                <h5 className="text-center mt-3 mb-4">
                  Admission Manager Not Found.
                </h5>
              )}
              {admissionManager.length > 0 && (
                <div className="table-responsive container mt-3">
                  <Table className="table-sm table-bordered">
                    <thead className="thead-uapp-bg">
                      <tr style={{ textAlign: "center" }}>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Assigned University</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admissionManager?.map((manager, i) => (
                        <tr key={manager.id} style={{ textAlign: "center" }}>
                          <td>
                            <span className="me-1">{manager?.firstName}</span>
                            {manager?.lastName}
                          </td>
                          <td>{manager?.email}</td>
                          <td>
                            {" "}
                            <span
                              className="badge badge-secondary"
                              style={{ cursor: "pointer" }}
                            >
                              {/* <Link className="text-decoration-none" to = {`campusSubjectList/${campus?.id}`}> 
                                 <span> View </span>
                                 </Link> */}

                              {/* <LinkSpanButton
                                url={`assignUniversity/${id}/${manager?.id}`}
                                className={"text-decoration-none"}
                                data={"View"}
                                permission={6}
                              /> */}
                              <span onClick={()=>redirectToAssignPage(manager?.id)} className="text-decoration-none">View</span>
                            </span>{" "}
                          </td>
                          <td>
                            <ButtonGroup>
                          {/* <Link to={`/providerAdmissionManager/${manager?.id}/${id}`}>
                           <Button color="primary" className="btn-sm me-1">
                       
                          <i className="fas fa-eye"></i>
                         
                           </Button>
                           </Link> */}

                           <ButtonForFunction
                            func={()=>redirectToProviderAdmissionManager(manager?.id, id)}
                            className={"mx-1 btn-sm"}
                            color = {"primary"}
                            icon={<i className="fas fa-eye"></i>} 
                           />
                            
                          
                            {permissions?.includes(
                              permissionList?.Update_Admission_manager
                            ) ? (
                              // <Button color="warning">
                              // <i
                              //   className="fas fa-edit"
                              //   onClick={() =>
                              //     updateAdmissionManager(manager?.id, id)
                              //   }
                              // ></i>
                              // </Button>

                            <ButtonForFunction
                              func={()=>updateAdmissionManager(manager?.id, id)}
                              className={"mx-1 btn-sm"}
                              color = {"warning"}
                              icon={<i className="fas fa-edit"></i>} 
                            />

                            ) : null}

                            {permissions?.includes(
                              permissionList?.Delete_Admission_manager
                            ) ? (
                              <Button color="danger" className="mx-1 btn-sm">
                              <i
                                className="fas fa-trash-alt"
                                onClick={() => toggleDelete(manager)}
                              ></i>
                              </Button>
                            ) : null}

                            </ButtonGroup>

                            <Modal
                              isOpen={deleteModal}
                              toggle={closeDeleteModal}
                              className="uapp-modal"
                            >
                              <ModalBody>
                                <p>
                                  Are You Sure to Delete this <b>{managerName}</b> ? Once Deleted it
                                  can't be Undone!
                                </p>
                              </ModalBody>

                              <ModalFooter>
                                <Button color="danger" onClick={handleDelete}>
                                  YES
                                </Button>
                                <Button color="primary" onClick={closeDeleteModal}>NO</Button>
                              </ModalFooter>
                            </Modal>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card>
          </Col>

          <Col md="4">
            

            <Card className="p-3">
              <h6> Notice</h6>
              <span className="bg-wg bg-width"></span>

              <div className="notice-item card-widget mt-3 ">
                <div className="notice-titel">
                  <h6> Super Admin</h6>
                  <span> 10/12/2021</span>
                </div>
                <div className="notice-description">
                  <span>
                    {" "}
                    No Qualifications required !! University of Suffolk London &
                    Manchester Campus, Oct 2021 Intake.{" "}
                  </span>
                  <div className="uapp-read-more-btn">
                    <a className="" href="javascript:void(0)">
                      {" "}
                      Read More{" "}
                      <span>
                        {" "}
                        <i className="fas fa-long-arrow-alt-right"></i>{" "}
                      </span>{" "}
                    </a>
                  </div>
                </div>
              </div>

              <div className="notice-item card-widget mt-3 ">
                <div className="notice-titel">
                  <h6> Super Admin</h6>
                  <span> 10/12/2021</span>
                </div>
                <div className="notice-description">
                  <span>
                    {" "}
                    No Qualifications required !! University of Suffolk London &
                    Manchester Campus, Oct 2021 Intake.{" "}
                  </span>
                  <div className="uapp-read-more-btn">
                    <a className="" href="javascript:void(0)">
                      {" "}
                      Read More{" "}
                      <span>
                        {" "}
                        <i className="fas fa-long-arrow-alt-right"></i>{" "}
                      </span>{" "}
                    </a>
                  </div>
                </div>
              </div>

          {/* <Card className="p-3">

<h6> Notice</h6>
<span className="bg-wg bg-width"></span>


  <div className="notice-item card-widget mt-3 ">
    <div className="notice-titel">
      <h6> Super Admin</h6>
      <span> 10/12/2021</span>
      </div>
       <div className="notice-description"> 
           <span> No Qualifications required !! University of Suffolk London & Manchester Campus, Oct 2021 Intake. </span>
           <div className="uapp-read-more-btn">
            <a className="" href="javascript:void(0)"> Read More <span> <i className="fas fa-long-arrow-alt-right"></i> </span> </a>
          </div>
      </div>
  </div>


  <div className="notice-item card-widget mt-3 ">
    <div className="notice-titel">
      <h6> Super Admin</h6>
      <span> 10/12/2021</span>
      </div>
       <div className="notice-description"> 
           <span> No Qualifications required !! University of Suffolk London & Manchester Campus, Oct 2021 Intake. </span>
           <div className="uapp-read-more-btn">
            <a className="" href="javascript:void(0)"> Read More <span> <i className="fas fa-long-arrow-alt-right"></i> </span> </a>
          </div>
      </div>
  </div>



  <div className="notice-item card-widget mt-3 ">
    <div className="notice-titel">
      <h6> Super Admin</h6>
      <span> 10/12/2021</span>
      </div>
       <div className="notice-description"> 
          
           <span> No Qualifications required !! University of Suffolk London & Manchester Campus, Oct 2021 Intake. </span>
           <div className="uapp-read-more-btn">
            <a className="" href="javascript:void(0)"> Read More <span> <i className="fas fa-long-arrow-alt-right"></i> </span> </a>
          </div>
      </div>
  </div>


  <div className="notice-item card-widget mt-3 ">
    <div className="notice-titel">
      <h6> Super Admin</h6>
      <span> 10/12/2021</span>
      </div>
       <div className="notice-description"> 
           <span> No Qualifications required !! University of Suffolk London & Manchester Campus, Oct 2021 Intake. </span>
          <div className="uapp-read-more-btn">
            <a className="" href="javascript:void(0)"> Read More <span> <i className="fas fa-long-arrow-alt-right"></i> </span> </a>
          </div>
         
      </div>
  </div>

  

</Card> */}

          
              <div className="notice-item card-widget mt-3 ">
                <div className="notice-titel">
                  <h6> Super Admin</h6>
                  <span> 10/12/2021</span>
                </div>
                <div className="notice-description">
                  <span>
                    {" "}
                    No Qualifications required !! University of Suffolk London &
                    Manchester Campus, Oct 2021 Intake.{" "}
                  </span>
                  <div className="uapp-read-more-btn">
                    <a className="" href="javascript:void(0)">
                      {" "}
                      Read More{" "}
                      <span>
                        {" "}
                        <i className="fas fa-long-arrow-alt-right"></i>{" "}
                      </span>{" "}
                    </a>
                  </div>
                </div>
              </div>

              <div className="notice-item card-widget mt-3 ">
                <div className="notice-titel">
                  <h6> Super Admin</h6>
                  <span> 10/12/2021</span>
                </div>
                <div className="notice-description">
                  <span>
                    {" "}
                    No Qualifications required !! University of Suffolk London &
                    Manchester Campus, Oct 2021 Intake.{" "}
                  </span>
                  <div className="uapp-read-more-btn">
                    <a className="" href="javascript:void(0)">
                      {" "}
                      Read More{" "}
                      <span>
                        {" "}
                        <i className="fas fa-long-arrow-alt-right"></i>{" "}
                      </span>{" "}
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProviderDetails;
