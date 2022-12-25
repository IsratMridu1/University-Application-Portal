import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router';
import { Card, CardBody, CardHeader,   Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col, Row, InputGroup, Table } from 'reactstrap';


import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useToasts } from "react-toast-notifications";
import { useDispatch } from 'react-redux';


import { StoreUniversitytypeData } from '../../../redux/actions/SMS/UniversityAction/UniversityTypeAction';
import { Link } from 'react-router-dom';
import get from '../../../helpers/get';
import post from '../../../helpers/post';

import remove from '../../../helpers/remove';
import put from '../../../helpers/put';
import ButtonForFunction from '../Components/ButtonForFunction';
import { permissionList } from '../../../constants/AuthorizationConstant';
import loader from '../../../assets/img/load.gif';

const AddConsultantType = () => {

    const history = useHistory();
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [consultants, setConsultants] = useState([]);
    const [consultantType,setConsultantType] = useState('');
    const [postId, setPostId] = useState(0);
    const [consName,setConsName] = useState('');
    const [loading,setLoading] = useState(true);
    const [buttonStatus,setButtonStatus] = useState(false);

    const permissions = JSON.parse(localStorage.getItem("permissions"));

    const { addToast } = useToasts();

    useEffect(()=>{
        get('ConsultantType/Index').then(res=>{
            console.log("consultantList", res);
            setConsultants(res);
            setLoading(false);
        })
    },[success])

    // on Close Modal
    const closeModal = () => {
      setConsultantType('');
      setConsName('');
      setModalOpen(false);
    }

    const toggleDanger = (name,id) => {
        localStorage.setItem('consTypeName',name)
        localStorage.setItem('consTypeId',id)
       
        setDeleteModal(true)
       }

    // on Close Delete Modal
    const closeDeleteModal = () => {
       setDeleteModal(false);
       localStorage.removeItem('consTypeName')
       localStorage.removeItem('consTypeId')
    }

    const handleDeleteUniType = (id) => {
        const returnValue = remove(`ConsultantType/Delete/${id}`).then((action)=> {
          console.log("delRes",action);
          setDeleteModal(false);
          setSuccess(!success);
          // console.log(action);
           addToast(action, {
             appearance: 'error',
             autoDismiss: true,
           })
           localStorage.removeItem('delUniTypeName')
           localStorage.removeItem('delUniTypeId')
        })
      }

      const handleUpdate = (type) => {
        setModalOpen(true);
        setConsultantType(type.name);
        // localStorage.setItem('updateUni',type.id)
        // console.log(type);
        get(`ConsultantType/Get/${type}`)
        .then(res=> {
          setPostId(res.id);
          setConsName(res.name);
        }) 
      }

    const handleSubmit = (event) => {
        event.preventDefault();
        const subdata = new FormData(event.target);
        
        if(postId === 0){
          setButtonStatus(true);
            post(`ConsultantType/Create`,subdata)
            .then(res => {
              addToast(res?.data?.message, {
                appearance: 'success',
                autoDismiss: true,
              })
              setModalOpen(false);
              setSuccess(!success);
              setButtonStatus(false);
            })
        }
        else{
            setButtonStatus(true);
            put(`ConsultantType/Update`,subdata).then((action)=> {
                setSuccess(!success);
                setModalOpen(false)
                addToast(action?.data?.message, {
                  appearance: 'success',
                  autoDismiss: true,
                })
                setConsultantType('');
                setConsName('');
                setPostId(0);
                setButtonStatus(false);
              })
        }  
      }

    // redirect to dashboard
    const backToDashboard = () => {
     history.push("/")
    }

    return (
        <div>
           {
            loading ?

            <div className='text-center'>
              <img className='img-fluid' src={loader} />

            </div>
            :

            <div>
               <Card className='uapp-card-bg'>
              <CardHeader className="page-header">              
                <h3 className="text-white">Consultant Type</h3>
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

          {/* <ButtonForFunction 
            className={"btn btn-uapp-add"}
            func={() => {
              setModalOpen(true);
              setConsName('');
              setPostId(0);
            }}
            icon={<i className="fas fa-plus"></i>}
            name={" Add New"}
            permission={6}
          /> */}

          <br/>
         
          <div> <b> Total <span className="badge badge-primary">{consultants?.length}</span> Consultant Type Found </b></div>
        </CardHeader>
        
        <CardBody>

          <div>

            <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal">
              <ModalHeader>Consultant Type</ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit} >
                     {
                      postId>0 ?
                      <Input
                        type="hidden"
                        name="id"
                        id="id"
                        defaultValue={postId}
                      />
                      :
                      null
                     }
                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span>Consultant Type Name</span>
                    </Col>
                    <Col md="8">
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={consName}
                        
                        placeholder="Create Consultant Type"
                        // onChange={(e) => setUniversityType(e.target.value)}
                      />

                    </Col>
                  </FormGroup>

                  <FormGroup className="has-icon-left position-relative" style={{ display: 'flex', justifyContent: 'space-between' }}>

                    <Button color="danger" className="mr-1 mt-3" onClick={closeModal}>Close</Button>

                    
                    
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
            <div>

            </div>
          </div>
          <div className="table-responsive">
          <Table className="table-sm table-bordered" >
          <thead className="thead-uapp-bg">
              <tr style={{ textAlign: "center" }}>
                <th>SL/NO</th>
                <th>Consultant Type Name</th>
                <th>Count</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              {
                consultants?.map((consultant, i) => <tr key={consultant?.id} style={{ textAlign: "center" }}>
                  <th scope="row">{i + 1}</th>
                  <td>{consultant?.name}</td>
                  <td className="text-center" >               
                   {/* <Link to ={{
                     pathname: '/universityList',
                     universityType: uniType?.id,
                     universityName: uniType?.name,

                   }}> 
                   <span className="badge badge-pill badge-primary"> {uniType?.universityCount} </span>
                   </Link> */}
                   <span className="badge badge-pill badge-primary"> {consultant?.consultantCount} </span>
                  </td>
                  <td>
                    
                    {/* <ButtonForFunction 
                      className={"mx-1 btn-sm"}
                      func={() => toggleDanger(consultant?.name, consultant?.id)}
                      color={"danger"}
                      icon={<i className="fas fa-trash-alt"></i>}
                      permission={6}
                    /> */}


                   {
                      permissions?.includes(permissionList?.Edit_Consultant_type) ?
                     <ButtonForFunction 
                     func={()=> handleUpdate(consultant?.id)}
                     className={"mx-1 btn-sm"}
                     color={"warning"}
                     icon={<i className="fas fa-edit"></i>}
                  
                   />
                   :
                   null
                   }


                    {/* <Modal isOpen={deleteModal} toggle={closeDeleteModal} className="uapp-modal">

                      <ModalBody>
                        <p>Are You Sure to Delete this <b>{localStorage.getItem('consTypeName')}</b> ? Once Deleted it can't be Undone!</p>
                      </ModalBody>

                      <ModalFooter>
                        <Button color="danger" onClick={() => handleDeleteUniType(localStorage.getItem('consTypeId'))}>YES</Button>
                        <Button onClick={closeDeleteModal}>NO</Button>
                      </ModalFooter>

                    </Modal> */}
                  </td>
                </tr>)
              }

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

export default AddConsultantType;