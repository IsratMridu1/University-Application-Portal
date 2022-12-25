import React, { createRef, useEffect, useState } from 'react'
import { connect } from "react-redux";
import { Table } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col, Row, Card, CardHeader, CardTitle, CardBody, } from 'reactstrap';
import { User } from "react-feather"
import { useToasts } from "react-toast-notifications";

import { useDispatch } from 'react-redux';
import {StorePermissionsData} from '../../../../redux/actions/SMS/PermissionsAction/PermissionsAction';
import { useHistory } from 'react-router';
import get from '../../../../helpers/get';
import post from '../../../../helpers/post';
import remove from '../../../../helpers/remove';
import put from '../../../../helpers/put';

const Permissions = (props) => {

  const myForm = createRef();
  const [success, setSuccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [permissionName, setPermissionName] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState('');
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const permissionList = props.permissionList[0];
  const history = useHistory();


  useEffect(() => {
    const returnValue=get(`Permission/Index`).then((data)=>{
  
      dispatch(StorePermissionsData(data))
    })
   }, [success])



   const changingPermissionName = (v) => {
      setPermissionName(v)
      setSelected(v)
   }



  const handleSubmit = (event) => {
    event.preventDefault();

    const subdata = {
      Name: permissionName
    }

    const returnValue = post(`Permission/Create`,subdata).then((action)=>{

      setSuccess(!success)
      setModalOpen(false)
      addToast(action, {
        appearance: action == 'Permission Added Successfully' ? 'success': 'error',
        autoDismiss: true,
      })
      setPermissionName('')
      setSelected('')
  });


  }

  const toggleDanger = (p) => {
  
    localStorage.setItem('delPermissionId',p.id)
    localStorage.setItem('delPermissionName',p.name)
    setDeleteModal(true)

  }

  const handleDeletePermission = (id) => {

    const returnValue = remove(`Permission/Delete/${id}`).then((action)=> {
      setDeleteModal(false);
      setSuccess(!success);
       addToast(action, {
         appearance: action == 'Permission Deleted Successfully' ? 'warning': 'error',
         autoDismiss: true,
       })
       localStorage.removeItem('delPermissionId')
       localStorage.removeItem('delPermissionName')
    })
  }

  const handleUpdate = (p) => {

    setModalOpen(true)
    setSelected(p.name)
    localStorage.setItem('updatePermission',p.id)
  }

  const handleUpdateSubmit = () => {

    const id = localStorage.getItem('updatePermission');

    const subData = {
      Name: selected,
      Id: id
    }

    const returnvalue = put(`Permission/Update`,subData).then((action)=> {
      setSuccess(!success)
      setModalOpen(false)
      addToast(action, {
        appearance: action == 'Updated Successfully' ? 'success': 'error',
        autoDismiss: true,
      })
      setSelected('')
      localStorage.removeItem('updatePermission')
    })




  }

  const closeModal = () => {
    setModalOpen(false)
    setSelected('');
    localStorage.removeItem('updatePermission')
  }

  
   // redirect to dashboard
   const backToDashboard = () => {
    history.push("/")
}


  return (
    <div>

      <Card>
              <CardHeader className="page-header">
              
          <h3>Add Permissions</h3>
                  <div className="page-header-back-to-home">
                    <span onClick={backToDashboard}> <i className="fas fa-arrow-circle-left"></i> Back to Dashboard</span>
                  </div>
              
              </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add New Permissions</CardTitle>
          <Button color="success" onClick={() => setModalOpen(true)}>Add Permissions</Button>
        </CardHeader>
        <CardBody>

          <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} className="uapp-modal">
            <ModalHeader>Add Permissions</ModalHeader>
            <ModalBody>
              <Form ref={myForm} onSubmit={handleSubmit}>

                <Input
                  type="number"
                  name="Id"
                  id="Id"
                  hidden
                />

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>Permissions Name</span>
                  </Col>
                  <Col md="8">
                    <Input
                      type="text"
                      name="Name"
                      id="Name"
                      value={selected}
                      placeholder="Permissions Name"
                      onChange={(e) => changingPermissionName(e.target.value)}
                    />
                    <div className="form-control-position">
                      {/* <User size={15} /> */}
                    </div>
                  </Col>
                </FormGroup>

                <FormGroup className="has-icon-left position-relative" style={{ display: 'flex', justifyContent: 'space-between' }}>

                  <Button color="danger" className="mr-1 mt-3" onClick={() => closeModal()}>Close</Button>

                  {
                    localStorage.getItem("updatePermission") ?
                      <Button color="warning" className="mr-1 mt-3" onClick={handleUpdateSubmit}>Update</Button> :
                      <Button.Ripple
                        color="primary"
                        type="submit"
                        className="mr-1 mt-3"

                      >
                        Submit
                      </Button.Ripple>

                  }

                </FormGroup>

              </Form>
            </ModalBody>
          </Modal>


          <Table>
            <thead>
              <tr>
                <th>SL/NO</th>
                <th>Permissions Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                permissionList?.map((permission, i) => <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{permission.name}</td>
                  <td>

                    <Button onClick={() => toggleDanger(permission)} color="danger" className="mr-2 btn-sm"><i className="fas fa-trash-alt"></i></Button>
                    <Button onClick={() => handleUpdate(permission)} color="warning" className=" btn-sm"> <i className="fas fa-edit"></i> </Button>

                    <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)} className="uapp-modal">

                      <ModalBody>
                        <p>Are You Sure to Delete this {localStorage.getItem('delPermissionName')} ? Once Deleted it can't be Undone!</p>
                      </ModalBody>

                      <ModalFooter>
                        <Button onClick={() => handleDeletePermission(localStorage.getItem('delPermissionId'))} color="danger">YES</Button>
                        <Button onClick={() => setDeleteModal(false)}>NO</Button>
                      </ModalFooter>

                    </Modal>
                  </td>
                </tr>

                )}


            </tbody>
          </Table>


        </CardBody>
      </Card>


    </div>
  )
}
const mapStateToProps = state => ({

  permissionList: state.permissionsDataReducer.permissions,
  // permissionObject: state.permissionsDataReducer.permissionObject,
})

export default connect(mapStateToProps)(Permissions);
