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
// import { EditorState, convertToRaw } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";

import { StoreUniversityCountryData } from "../../../redux/actions/SMS/UniversityAction/UniversityCountryAction";
import get from "../../../helpers/get";
import post from "../../../helpers/post";
import put from "../../../helpers/put";
import remove from "../../../helpers/remove";
import UniversityList from "./UniversityList";
import ButtonForFunction from "../Components/ButtonForFunction";
import { permissionList } from "../../../constants/AuthorizationConstant";
import LinkSpanButton from "../Components/LinkSpanButton";
import Loader from "../Search/Loader/Loader";
const AddUniversityCountry = (props) => {
  const univerSityCountries = props.univerSityCountryList[0];

  const [universityCountry, setUniversityCountry] = useState("");
  //   const [editorState, setEditorState] = useState(EditorState.createEmpty());
  //   const [rawContent,setRawContent] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [updateState, setUpdateState] = useState({});

  const [delUniCountryId, setDelUniCountryId] = useState(0);
  const [delUniCountryName, setDelUniCountryName] = useState("");

  const { addToast } = useToasts();
  const [loading,setLoading] = useState(true);
  const [buttonStatus,setButtonStatus] = useState(false);

  const permissions = JSON.parse(localStorage.getItem('permissions'));

  //  const onEditorStateChange = (editorState) => {
  //     setEditorState(editorState)
  //     // setRawContent(convertToRaw(editorState.getCurrentContent()).blocks[0].text);
  //     setRawContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  //   };

  useEffect(() => {
    const returnValue = get(`UniversityCountry/Index`)
      .then((action) => {
        dispatch(StoreUniversityCountryData(action));
        setLoading(false);
      })
      .catch();

    // const returnValue = get(`${rootUrl}/UniversityCountry/Index`).then(res => {
    //   dispatch(StoreUniversityCountryData(res))

    // })
  }, [success]);

  // useEffect(() => {
  //   window.addEventListener('error')
  // }, [])

  const handleSubmit = (event) => {
    event.preventDefault();

    const subdata = new FormData(event.target);

    // const subdata = {
    //   name: universityCountry
    // }

    if (!updateState?.id) {
      setUpdateState({});
      setButtonStatus(true);
      const returnValue = post(`UniversityCountry/Create`, subdata).then(
        (action) => {
          setButtonStatus(false);
          setSuccess(!success);
          setModalOpen(false);
          addToast(action?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setUniversityCountry("");
        }
      );
    } else {
      setButtonStatus(true);
      const returnvalue = put(`UniversityCountry/Update`, subdata).then(
        (action) => {
          setButtonStatus(false);
          setSuccess(!success);
          setModalOpen(false);
          addToast(action?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setUniversityCountry("");
          setUpdateState({});
        }
      );
    }
  };

  const handleUpdate = (country) => {
    setModalOpen(true);
    setUniversityCountry(country.name);
    setUpdateState(country);
  };

  const handleDeleteUniCountry = (id) => {
    setButtonStatus(true);
    const returnValue = remove(`UniversityCountry/Delete/${id}`).then(
      (action) => {
        setButtonStatus(false);
        setDeleteModal(false);
        setSuccess(!success);
        addToast(action, {
          appearance: "error",
          autoDismiss: true,
        });
        setDelUniCountryName("");
        setDelUniCountryId(0);
      }
    );
  };

  const toggleDanger = (name, id) => {
    setDelUniCountryName(name);
    setDelUniCountryId(id);
    setDeleteModal(true);
  };

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setUpdateState({});
  };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setDelUniCountryName("");
    setDelUniCountryId(0);
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
          <h3 className="text-white">University Countries</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToDashboard} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
            </span>
          </div>
        </CardHeader>
      </Card>

      {/* <Card>

                <CardBody>

                <Form>

                  <FormGroup row className="has-icon-left position-relative">


                    <Col md="2">
                      <span>University Description</span>
                    </Col>

                  
                    <Col md="12">

                    <Editor
                    
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={onEditorStateChange}
                        toolbarClassName="toolbar-class"
                    />
                    <textarea
                        disabled
                        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                        />

                    </Col>

                  </FormGroup>


                  </Form>

                </CardBody>

            </Card> */}

      <Card>
        <CardHeader>
          {
            permissions?.includes(permissionList?.Add_UniversityCountry) ?
            <ButtonForFunction
            className={"btn btn-uapp-add"}
            func={() => setModalOpen(true)}
            icon={<i className="fas fa-plus"></i>}
            name={" Add New Country"}
            permission={6}
          />
          :
          null
          }

          <div>
            {" "}
            <b>
              {" "}
              Total{" "}
              <span className="badge badge-primary">
                {univerSityCountries?.length}
              </span>{" "}
              University Country Found{" "}
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
              <ModalHeader>University Country</ModalHeader>
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
                        University Country Name{" "}
                        <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="8">
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={updateState?.name}
                        placeholder="Enter Country Name"
                        onChange={(e) => setUniversityCountry(e.target.value)}
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
                    localStorage.getItem("updateUniCountry") ?
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
          </div>
          <div className="table-responsive">
            <Table className="table-sm table-bordered">
              <thead className="thead-uapp-bg">
                <tr style={{ textAlign: "center" }}>
                  <th>SL/NO</th>
                  <th>Name</th>
                  <th className="text-center">Count</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {univerSityCountries?.map((uniCountry, i) => (
                  <tr key={uniCountry.id} style={{ textAlign: "center" }}>
                    <th scope="row">{i + 1}</th>
                    <td>{uniCountry.name}</td>
                    <td className="text-center">
                    <LinkSpanButton
                      url={
                        {
                          pathname: '/universityList',
                          universityCountry: uniCountry?.id,
                          name: uniCountry?.name
                          
                        }
                      }
                      className={"badge badge-pill badge-primary"}
                      data={uniCountry?.universityCount}
                      permission={6}
                    
                    />
                    </td>
                    <td>
                      <ButtonGroup>
                     

                      {
                        permissions?.includes(permissionList?.Update_UniversityCountry) ?
                        <ButtonForFunction
                        func={() => handleUpdate(uniCountry)}
                        className={"mx-1 btn-sm"}
                        color={"warning"}
                        icon={<i className="fas fa-edit"></i>}
                       
                      />
                      :
                      null
                      }
                       {
                        permissions?.includes(permissionList?.Delete_UniversityCountry) ?
                        <ButtonForFunction
                        className={"mx-1 btn-sm"}
                        func={() =>
                          toggleDanger(uniCountry.name, uniCountry.id)
                        }
                        color={"danger"}
                        icon={<i className="fas fa-trash-alt"></i>}
                        permission={6}
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
                            <b>{delUniCountryName}</b> ?
                            Once Deleted it can't be Undone!
                          </p>
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            color="danger"
                            onClick={() =>
                              handleDeleteUniCountry(delUniCountryId)
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
const mapStateToProps = (state) => ({
  univerSityCountryList: state.universityCountryDataReducer.universityCountries,
});
export default connect(mapStateToProps)(AddUniversityCountry);
