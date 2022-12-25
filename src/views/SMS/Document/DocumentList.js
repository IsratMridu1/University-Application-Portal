import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
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
import Select from 'react-select';

import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";

import get from "../../../helpers/get";
import post from "../../../helpers/post";
import put from "../../../helpers/put";
import remove from "../../../helpers/remove";
import ButtonForFunction from "../Components/ButtonForFunction";
import CustomButtonRipple from "../Components/CustomButtonRipple";
import Loader from "../Search/Loader/Loader";

const DocumentList = () => {
  const [documentName, setDocumentName] = useState("");
  const [documentDes, setDocumentDes] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [documentData, setDocumentdata] = useState([]);
  const [docuDD, setDocuDD] = useState([]);
  const [docuLabel, setDocuLabel] = useState('Select Document Category');
  const [docuValue, setDocuValue] = useState(0);
  const [categoryError, setCategoryError] = useState(false);
  const [application, setApplication] = useState(null);
  const [applicationError, setApplicationError] = useState(false);
  const [updateDocument, setUpdateDocument] =useState(undefined);
  const [delDocuId, setDelDocuId] = useState(0);
  const [delDocuName, setDelDocuName] = useState("");
  const { addToast } = useToasts();
  const [loading,setLoading] = useState(true);
  const [buttonStatus,setButtonStatus] = useState(false);

  useEffect(() => {
    get("Document/Index").then((res) => {
      console.log("doc data", res);
      setDocumentdata(res);
      setLoading(false);
    });

    get("DocumentCategoryDD/Index").then((res) => {
      console.log("dd", res);
      setDocuDD(res);
    });
  }, [success]);

  const docuCategory = docuDD.map((docu) => ({
    label: docu?.name,
    value: docu?.id,
  }));

  const selectDocumentDD = (label, value) => {
    setDocuLabel(label);
    setDocuValue(value);
    setCategoryError(false);
  }

  const handleUpdate = (document) => {
    setModalOpen(true);
    console.log(document, document?.documentCategory?.id);
    setDocuLabel(document?.documentCategory?.name)
    setDocuValue(document?.documentCategory?.id);
    setDocumentName(document?.name);
    setDocumentDes(document?.description);
    setApplication(`${document?.isVaryForApplication}`);
    // localStorage.setItem("updateDocument", document?.id);
    setUpdateDocument(document?.id);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    // for(var i of subData){
    //     console.log(i);
    // }

    // const subdata = {
    //   name: universityCountry
    // }

    if(docuValue === 0){
      setCategoryError(true);
    }
   else if (application === null) {
      setApplicationError(true);
    }
    else{
      if (updateDocument != undefined) {
        console.log(localStorage.getItem("updateDocument"));
        setButtonStatus(true);
        const returnvalue = put(`Document/Update`, subData).then((action) => {
          setButtonStatus(false);
          setSuccess(!success);
          setModalOpen(false);
          addToast(action?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setDocumentName("");
          setDocumentDes("");
          setDocuLabel("Select Document Category");
          setDocuValue(0);
          setApplication(null);
          setUpdateDocument(undefined);
        });
      } else {
        setUpdateDocument(undefined);
          setButtonStatus(true);
        const returnValue = post(`Document/Create`, subData).then((action) => {
          setButtonStatus(false);
          setSuccess(!success);
          setModalOpen(false);
          addToast(action?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
  
          setDocumentName("");
          setDocumentDes("");
          setDocuLabel("Select Document Category")
          setDocuValue(0);
          setApplication(null);
        });
      }
    }
    
  };

  const handleUpdateSubmit = () => {
    const id = localStorage.getItem("updateDocument");

    const subData = {
      id: id,
      name: documentName,
    };

    //    const returnvalue = put(`UniversityCountry/Update`,subData).then((action)=> {
    //       setSuccess(!success);
    //       setModalOpen(false)
    //       addToast(action?.data?.message, {
    //         appearance: 'success',
    //         autoDismiss: true,
    //       })
    //       setUniversityCountry('');
    //      localStorage.removeItem('updateUniCountry')
    //     })
  };

  const handleDeleteDocument = (id) => {
    setButtonStatus(true);
    const returnValue = remove(`Document/Delete/${id}`).then((action) => {
      setButtonStatus(false);
      setDeleteModal(false);
      setSuccess(!success);
      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });
      setDelDocuName('');
      setDelDocuId(0);
    });
  };

  const toggleDanger = (name, id) => {
    setDelDocuName(name);
    setDelDocuId(id);
    setDeleteModal(true);
  };

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setDocumentName("");
    setDocumentDes("");
    setDocuLabel("Select Document Category")
    setDocuValue(0);
    setApplication(null);
    setUpdateDocument(undefined);
  };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDelDocuName("");
    setDelDocuId(0);
    setDeleteModal(false);
  };

  // redirect to dashboard
  const backToDashboard = () => {
    history.push("/");
  };

  const handleApplication = (event) => {
    console.log(event.target.value);
    setApplication(event.target.value);
    setApplicationError(false);
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
          <h3 className="text-white">Document List</h3>
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
          <ButtonForFunction
            className={"btn btn-uapp-add"}
            func={() => setModalOpen(true)}
            icon={<i className="fas fa-plus"></i>}
            name={" Add New Document"}
            permission={6}
          />

          {/* <div> <b> Total <span className="badge badge-primary">{univerSityCountries?.length}</span> University Country Found   </b></div> */}
        </CardHeader>
        <CardBody>
          <div>
            <Modal
              isOpen={modalOpen}
              toggle={closeModal}
              className="uapp-modal2"
            >
              <ModalHeader>Add Document</ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  {updateDocument != undefined ? (
                    <input
                      type="hidden"
                      name="id"
                      id="id"
                      value={updateDocument}
                    />
                  ) : null}

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span>Category <span className="text-danger">*</span>{" "}</span>
                    </Col>
                    <Col md="8">
                      <Select
                        options={docuCategory}
                        value={{ label: docuLabel, value: docuValue }}
                        onChange={(opt) =>
                          selectDocumentDD(opt.label, opt.value)
                        }
                        name="documentCategoryId"
                        id="documentCategoryId"
                      />

                      {categoryError && (
                        <span className="text-danger">
                          Category is required.
                        </span>
                      )}

                    </Col>
                  </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="4">
                <span>
                  Applicable? <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="8">
                <FormGroup check inline>
                  <Input
                    className="form-check-input"
                    type="radio"
                    id="isVaryForApplication"
                    onChange={handleApplication}
                    name="isVaryForApplication"
                    value="true"
                    checked={application == "true"}
                  />
                  <Label
                    className="form-check-label"
                    check
                    htmlFor="isVaryForApplication"
                  >
                    Yes
                  </Label>
                </FormGroup>

                <FormGroup check inline>
                  <Input
                    className="form-check-input"
                    type="radio"
                    id="isVaryForApplication"
                    onChange={handleApplication}
                    name="isVaryForApplication"
                    value="false"
                    checked={application == "false"}
                  />
                  <Label
                    className="form-check-label"
                    check
                    htmlFor="isVaryForApplication"
                  >
                    No
                  </Label>
                </FormGroup>

                <br />

                {applicationError && (
                  <span className="text-danger">
                    Is vary for application is required.
                  </span>
                )}
              </Col>
            </FormGroup>

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span>Name <span className="text-danger">*</span>{" "}</span>
                    </Col>
                    <Col md="8">
                      <Input
                        type="text"
                        required
                        name="name"
                        id="name"
                        value={documentName}
                        placeholder="Enter name"
                        onChange={(e) => setDocumentName(e.target.value)}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span>Description <span className="text-danger">*</span>{" "}</span>
                    </Col>
                    <Col md="8">
                      <Input
                        type="textarea"
                        required
                        rows="6"
                        name="description"
                        id="description"
                        value={documentDes}
                        placeholder="Write Description"
                        onChange={(e) => setDocumentDes(e.target.value)}
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
                    localStorage.getItem("updateDocument") ?
                      <Button color="warning" className="mr-1 mt-3" onClick={handleUpdateSubmit}>Update</Button> : */}

                    <CustomButtonRipple
                      color={"primary"}
                      type={"submit"}
                      className={"mr-1 mt-3"}
                      name={"Submit"}
                      permission={6}
                      isDisabled={buttonStatus}
                    />

                    {/* }  */}
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
                  <th>Description</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {documentData?.map((document, i) => (
                  <tr key={document?.id} style={{ textAlign: "center" }}>
                    <th scope="row">{i + 1}</th>
                    <td>{document?.name}</td>
                    <td className="text-center">{document?.description}</td>
                    <td className="text-center">{document?.documentCategory?.name}</td>

                    <td>

                      <ButtonGroup>
                        <ButtonForFunction
                          func={() => handleUpdate(document)}
                          className={"mx-1 btn-sm"}
                          color={"warning"}
                          icon={<i className="fas fa-edit"></i>}
                          permission={6}
                          
                        />
  
                        <ButtonForFunction
                          className={"mx-1 btn-sm"}
                          func={() => toggleDanger(document?.name, document?.id)}
                          color={"danger"}
                          icon={<i className="fas fa-trash-alt"></i>}
                          permission={6}
                        />
                      </ButtonGroup>


                      <Modal
                        isOpen={deleteModal}
                        toggle={closeDeleteModal}
                        className="uapp-modal"
                       >
                        <ModalBody>
                          <p>
                            Are You Sure to Delete this{" "}
                            <b>{delDocuName}</b> ? Once
                            Deleted it can't be Undone!
                          </p>
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            color="danger"
                            onClick={() =>
                              handleDeleteDocument(delDocuId)
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

export default DocumentList;
