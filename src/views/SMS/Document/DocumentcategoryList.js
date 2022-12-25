import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import {
  Card,
  CardBody,
  CardHeader,
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

import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useToasts } from "react-toast-notifications";

import { Link } from "react-router-dom";

import get from "../../../helpers/get";
import post from "../../../helpers/post";

import remove from "../../../helpers/remove";
import put from "../../../helpers/put";
import ButtonForFunction from "../Components/ButtonForFunction";
import LinkSpanButton from "../Components/LinkSpanButton";
import Loader from "../Search/Loader/Loader";

const DocumentcategoryList = () => {
  const [uniTypeId, setUniTypeId] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const history = useHistory();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const [docuList, setDocuList] = useState([]);
  // const [postId, setPostId] = useState(0);
  const [updateState, setUpdateState] = useState({});

  const [docuName, setDocuName] = useState("");
  const [docuId, setDocuId] = useState(0);
  const [loading,setLoading] = useState(true);
  const [buttonStatus,setButtonStatus] = useState(false);

  // const [uName,setUName] = useState('');

  //  const onEditorStateChange = (editorState) => {

  //     setEditorState(editorState)
  //     setRawContent(convertToRaw(editorState.getCurrentContent()).blocks[0].text);
  //     setRawContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  //   };

  useEffect(() => {
    get(`DocumentCategory/Index`).then((action) => {
      setDocuList(action);
      setUniTypeId(action?.id);
      setLoading(false);
      console.log("docuCate", action);
    });
  }, [success]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const subdata = new FormData(event.target);
    // for (const vale of subdata.values())
    // {
    //   console.log(vale);

    // }

    if (!updateState?.id) {
      setUpdateState({});
      setButtonStatus(true);
      post(`DocumentCategory/Create`, subdata).then((res) => {
        setButtonStatus(false);
        setSuccess(!success);
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setModalOpen(false);
        setCategoryName("");
        setCategoryDescription("");
        setUpdateState({});
      });
    } else {
      setButtonStatus(true);
      put(`DocumentCategory/Update`, subdata).then((action) => {
        setButtonStatus(false);
        setSuccess(!success);
        setModalOpen(false);
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setUpdateState({});
      });
    }
  };

  const handleUpdate = (docu) => {
    setModalOpen(true);
    setCategoryName(docu?.name);
    setCategoryDescription(docu?.description);
    setUpdateState(docu);
  };

  const handleDeleteCategory = (id) => {
    setButtonStatus(true);
    const returnValue = remove(`Documentcategory/Delete/${id}`).then(
      (action) => {
        setButtonStatus(false);
        setDeleteModal(false);
        setSuccess(!success);
        // console.log(action);
        addToast(action, {
          appearance: "error",
          autoDismiss: true,
        });
        setDocuName('');
        setDocuId(0);
      }
    );
  };

  const toggleDanger = (name, id) => {
    setDocuName(name);
    setDocuId(id);
    setDeleteModal(true);
  };

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setUpdateState({});
  };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDocuName('');
    setDocuId(0);
    setDeleteModal(false);
  };

  // redirect to dashboard
  const backToDocumentList = () => {
    history.push("/documentList");
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
          <h3 className="text-white">Document Category List</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToDocumentList} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Document List
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
            name={" Add New Category"}
            permission={6}
          />

          <br />

          <div>
            {" "}
            <b>
              {" "}
              Total{" "}
              <span className="badge badge-primary">
                {docuList?.length}
              </span>{" "}
              Document Category Found{" "}
            </b>
          </div>
        </CardHeader>

        <CardBody>
          <Link to="/newform">
            {/* <Button className="btn btn-danger mt-2 mb-4" > <i className="fas fa-plus"></i>  Add New Page</Button> */}
          </Link>

          <div>
            <Modal
              isOpen={modalOpen}
              toggle={closeModal}
              className="uapp-modal"
            >
              <ModalHeader>Add Document Category</ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup row className="has-icon-left position-relative">
                    {updateState?.id ? (
                      <Input
                        type="hidden"
                        name="id"
                        id="id"
                        defaultValue={updateState?.id}
                      />
                    ) : null}
                  </FormGroup>

                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span>Category Name <span className="text-danger">*</span>{" "}</span>
                    </Col>
                    <Col md="8">
                      <Input
                        type="text"
                        required
                        name="name"
                        id="name"
                        defaultValue={updateState?.name}
                        placeholder="Write Document Name"
                        onChange={(e) => setCategoryName(e.target.value)}
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
                        rows="4"
                        name="description"
                        id="description"
                        defaultValue={updateState?.description}
                        placeholder="Write Description"
                        onChange={(e) => setCategoryDescription(e.target.value)}
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

                    {/* localStorage.getItem("updateUni") ? */}
                    {/* <Button color="warning" className="mr-1 mt-3" onClick={handleUpdateSubmit}>Update</Button> : */}
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
            <div></div>
          </div>

          <div className="table-responsive">
            <Table className="table-sm table-bordered">
              <thead className="thead-uapp-bg">
                <tr style={{ textAlign: "center" }}>
                  <th>SL/NO</th>
                  <th>Category Name</th>
                  <th>Description</th>
                  {/* <th className="text-center" >Count</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {docuList?.map((docu, i) => (
                  <tr key={docu?.id} style={{ textAlign: "center" }}>
                    <th scope="row">{i + 1}</th>
                    <td>{docu?.name}</td>
                    <td>{docu?.description}</td>
                    {/* <td className="text-center" >               

                    <LinkSpanButton
                      url={
                        {
                          pathname: '/universityList',
                          universityType: uniType?.id,
                          universityName: uniType?.name,
                        }
                      }
                      className={"badge badge-pill badge-primary"}
                      data={uniType?.universityCount}
                      permission={6}
                    />

                  </td> */}
                    <td>

                      <ButtonGroup>
                      <ButtonForFunction
                        func={() => handleUpdate(docu)}
                        className={"mx-1 btn-sm"}
                        color={"warning"}
                        icon={<i className="fas fa-edit"></i>}
                        permission={6}
                      />

                      <ButtonForFunction
                        className={"mx-1 btn-sm"}
                        func={() => toggleDanger(docu?.name, docu?.id)}
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
                            <b>{docuName}</b> ? Once
                            Deleted it can't be Undone!
                          </p>
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            color="danger"
                            onClick={() =>
                              handleDeleteCategory(docuId)
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

export default DocumentcategoryList;
