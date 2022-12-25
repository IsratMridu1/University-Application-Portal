import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import 'antd/dist/antd.css';
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
  ButtonGroup,
} from "reactstrap";
import { Upload, Modal as Modals } from "antd";
import * as Icon from "react-feather";
import { useToasts } from "react-toast-notifications";
import get from "../../../helpers/get";
import post from "../../../helpers/post";
import put from "../../../helpers/put";
import remove from "../../../helpers/remove";
import ButtonForFunction from "../Components/ButtonForFunction";
import { permissionList } from "../../../constants/AuthorizationConstant";
import Loader from "../Search/Loader/Loader";

const AddCountry = () => {
  const [country, setCountry] = useState("");
  const [code, setCode] = useState("");
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [updateState, setUpdateState] = useState({});
  const [countries, setCountries] = useState([]);

  const [delCountryId, setDelCountryId] = useState(0);
  const [delCountryName, setDelCountryName] = useState("");

  const { addToast } = useToasts();
  const [loading,setLoading] = useState(true);
  const [buttonStatus,setButtonStatus] = useState(false);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [FileList, setFileList] = useState([]);
  const [imgError, setImgError] = useState(false);

  const permissions = JSON.parse(localStorage.getItem('permissions'));

  useEffect(() => {
    get("Country/Index").then((res) => {
      console.log("country", res);
      setCountries(res);
      setLoading(false);
    });
  }, [success]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const subdata = new FormData(event.target);

    // const subdata = {
    //   name: universityCountry
    // }

    if (!updateState?.id) {
      setUpdateState({});
      setButtonStatus(true);
      const returnValue = post(`Country/Create`, subdata).then((action) => {
        setButtonStatus(false);
        setSuccess(!success);
        setModalOpen(false);
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setCountry("");
        setCode("");
      });
    } else {
      setButtonStatus(true);
      const returnvalue = put(`Country/Update`, subdata).then((action) => {
        setButtonStatus(false);
        setSuccess(!success);
        setModalOpen(false);
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setCountry("");
        setCode("");
        setUpdateState({});
      });
    }
  };


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

  const handleUpdate = (country) => {
    setModalOpen(true);
    setCountry(country?.name);
    setCode(country?.code);
    console.log(country);
    setUpdateState(country);
  };

  const handleDeletecountry = (id) => {
    setButtonStatus(true);
    const returnValue = remove(`Country/Delete/${id}`).then((action) => {
      setButtonStatus(false);
      setDeleteModal(false);
      setSuccess(!success);
      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });
      setDelCountryId(0);
      setDelCountryName("");
    });
  };

  const toggleDanger = (name, id) => {
    setDelCountryName(name);
    setDelCountryId(id);
    setDeleteModal(true);
  };

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setUpdateState({});
  };
  const closeModal2 = () => {
    setModalOpen2(false);
  
  };

  const uploadFileCountry  = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);
    subData.append('countryfile',FileList?.length < 1? null : FileList[0]?.originFileObj);
    if(FileList?.length < 1){
      setImgError(true);
    }
    else{
      setButtonStatus(true);
    post(`Country/CreateFromExcel`,subData)
    .then(res => {
      setButtonStatus(false);
      if(res?.status == 200 && res?.data?.isSuccess ==true){
        addToast(res?.data?.message,{
          appearance:'success',
          autoDismiss: true
        })
        setSuccess(!success);
        setModalOpen2(false);
      }
      else{
        addToast(res?.data?.message,{
          appearance:'error',
          autoDismiss: true
        })
      }
    })
    }


  }

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setDelCountryId(0);
    setDelCountryName("");
  };

  // redirect to dashboard
  const backToDashboard = () => {
    history.push("/");
  };
  return (
    <div>
      {
        loading?
        <Loader/>
        :
        <div>
          <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Country List</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToDashboard} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          {
            permissions?.includes(permissionList?.Add_Country) ?
           <>
           
          <div>
          <ButtonForFunction
            className={"btn btn-uapp-add mr-1"}
            func={() => setModalOpen(true)}
            icon={<i className="fas fa-plus"></i>}
            name={" Add New Country"}
            
          />

          <ButtonForFunction
          className={"btn btn-uapp-add ml-1"}
          func={() => setModalOpen2(true)}
          icon={<i className="fas fa-plus mr-1"></i>}
          name={"Add New Country From Excel"}
          disable={buttonStatus}
          
        />
          </div>

           </>


          
          : 
          null
          }

       
          <div>
            {" "}
            <b>
              {" "}
              Total{" "}
              <span className="badge badge-primary">
                {countries?.length}
              </span>{" "}
              Country Found{" "}
            </b>
          </div>
        </CardHeader>
        <CardBody>
          <div>
            <Modal
              isOpen={modalOpen}
              toggle={closeModal}
              className="uapp-modal"
            >
              <ModalHeader>Country</ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  {updateState?.id ? (
                    <Input
                      type="hidden"
                      name="id"
                      id="id"
                      defaultValue={updateState?.id}
                    />
                  ) : null}

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span>
                        Country Name <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="8">
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={updateState?.name}
                        placeholder="Enter Country Name"
                        onChange={(e) => setCountry(e.target.value)}
                        required
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span>
                        Country Code <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="8">
                      <Input
                        type="text"
                        name="code"
                        id="code"
                        defaultValue={updateState?.code}
                        placeholder="Enter Country Code"
                        onChange={(e) => setCode(e.target.value)}
                        required
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup
                    className="has-icon-left position-relative"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      color="danger"
                      className="mr-1 mt-3"
                      onClick={closeModal}
                    >
                      Close
                    </Button>

                    {/* {
                    localStorage.getItem("updatecountry") ?
                      <Button color="warning" className="mr-1 mt-3" onClick={handleUpdateSubmit}>Update</Button> : */}
                    <Button
                      color="primary"
                      type="submit"
                      className="mr-1 mt-3"
                      // onClick={(e) => handleSubmit(e)}
                      disabled={buttonStatus}
                    >
                      Submit
                    </Button>

                    {/* } */}
                  </FormGroup>
                </Form>
              </ModalBody>
            </Modal>
            <Modal
              isOpen={modalOpen2}
              toggle={closeModal2}
              className="uapp-modal"
            >
              <ModalHeader>Upload Document</ModalHeader>
              <ModalBody>
                <Form onSubmit={uploadFileCountry}>
                  {updateState?.id ? (
                    <Input
                      type="hidden"
                      name="id"
                      id="id"
                      defaultValue={updateState?.id}
                    />
                  ) : null}

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="3">
                      <span>
                        Document <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="3">
                    <>
                          <Upload
                          accept=".xlsx, .xls"
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
                                <span>Upload Here</span>
                              </div>
                            ) : (
                              ""
                            )}
                          </Upload>
                          <Modals
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
                          </Modals>
                        </>
                        {
                          imgError ?
                          <span className="text-danger">File is required</span>
                          :
                          null
                        }
                    </Col>
                  </FormGroup>

                  

                  <FormGroup
                    className="has-icon-left position-relative"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      color="danger"
                      className="mr-1 mt-3"
                      onClick={closeModal2}
                    >
                      Close
                    </Button>

                    
                    <Button
                      color="primary"
                      type="submit"
                      className="mr-1 mt-3"
                  
                      disabled={buttonStatus}
                    >
                      Submit
                    </Button>

                 
                  </FormGroup>
                </Form>
              </ModalBody>
            </Modal>
          </div>
          <div className="table-responsive">
            <Table className="table-sm table-bordered">
              <thead className="thead-uapp-bg">
                <tr style={{ textAlign: "center" }}>
                  <th>SL/NO</th>
                  <th>Name</th>
                  {/* <th className="text-center">Count</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {countries?.map((country, i) => (
                  <tr key={country?.id} style={{ textAlign: "center" }}>
                    <th scope="row">{i + 1}</th>
                    <td>{country?.name}</td>
                    {/* <td className="text-center">
                      <span className="badge badge-pill badge-primary">
                        {" "}
                        {country?.universityCount}{" "}
                      </span>
                    </td> */}
                    <td>
                      <ButtonGroup>
                      {
                        permissions?.includes(permissionList?.Update_Country)?
                        <ButtonForFunction
                        func={() => handleUpdate(country)}
                        className={"mx-1 btn-sm"}
                        color={"warning"}
                        icon={<i className="fas fa-edit"></i>}
                     
                      />
                      :
                      null
                      }

                     {
                        permissions?.includes(permissionList?.Delete_Country) ?
                       <ButtonForFunction
                       className={"mx-1 btn-sm"}
                       func={() => toggleDanger(country.name, country.id)}
                       color={"danger"}
                       icon={<i className="fas fa-trash-alt"></i>}
                      
                     />
                     :
                     null
                     }

                     
                      </ButtonGroup>

                      <Modal
                        isOpen={deleteModal}
                        toggle={closeDeleteModal}
                        className="uapp-modal"
                      >
                        <ModalBody>
                          <p>
                            Are You Sure to Delete this{" "}
                            <b>{delCountryName}</b> ?
                            Once Deleted it can't be Undone!
                          </p>
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            color="danger"
                            onClick={() =>
                              handleDeletecountry(delCountryId)
                            }
                            disabled={buttonStatus}
                          >
                            YES
                          </Button>
                          <Button onClick={closeDeleteModal}>NO</Button>
                        </ModalFooter>
                      </Modal>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
        </div>
      }
    </div>
  );
};

export default AddCountry;
