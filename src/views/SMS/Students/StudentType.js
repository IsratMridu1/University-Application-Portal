import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, ButtonGroup, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import { useToasts } from "react-toast-notifications";
import { useDispatch } from 'react-redux';
import {CreateDepartment, DeleteDepartment, GetDepartments, UpdateDepartment} from '../../../redux/actions/SMS/UniversitySubject/DepartmentAction';
import get from '../../../helpers/get';
import post from '../../../helpers/post';

import remove from '../../../helpers/remove';
import put from '../../../helpers/put';
import ButtonForFunction from '../Components/ButtonForFunction';

const StudentType = () => {

    const history = useHistory();

  
    const dispatch = useDispatch();
    
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const {addToast} = useToasts();
    const [department,setdepartment] = useState('');
    const [description,setDescription] = useState('');
    const [departmentInfo, setDepartmentInfo] = useState([]);
    const [studentTypeInfo, setStudentTypeInfo] = useState([]);
    const [info, setInfo] = useState({});
   
 
    const [id,setId] = useState('');


    useEffect(()=>{
        get('StudentType/Index')
        .then(res => {
            console.log(res);
            setStudentTypeInfo(res);

        })

    },[])


      // redirect to dashboard
      const backToDashboard = () => {
        history.push("/")
    }

    
// on Close Modal
   const closeModal = () => {
    setModalOpen(false);
 
  }

  const gotoList = (id) => {
    history.push(`/studentListByType/${id}`);
  }

  const AddModalOpen= (id) => {
  
    console.log(id);
    
   if(id !=='add'){
    get(`StudentType/Get/${id}`)
    .then(res => {
      console.log(res);
        setInfo(res);
    })

   }
  else{
   setInfo({});
  }

  
  setModalOpen(true);
}


  const handleSubmit = (e) => {
    e.preventDefault();
    const subdata = new FormData(e.target);
   
   if(!info?.id){
    post(`StudentType/Create`,subdata).then((res)=>{
      setSuccess(!success)
      setModalOpen(false)
   
      addToast(res?.data?.message, {
        appearance:  'success',
        autoDismiss: true,
      })
      get(`StudentType/index`)
      .then(res =>{
        
        setStudentTypeInfo(res);
      } )
    
  });
   }

   else{
     put('StudentType/Update',subdata)
     .then(res => {
       console.log(res);
       if(res?.status == 200 && res?.data?.isSuccess == true){
        setSuccess(!success)
        setModalOpen(false)
     
        addToast(res?.data?.message, {
          appearance:  'success',
          autoDismiss: true,
        })
        get(`StudentType/index`)
        .then(res =>{
          
          setStudentTypeInfo(res);
        } )
       }
       else{
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
     

     })
   }


      
  }


  const handleUpdateSubmit = () => {
    const id = localStorage.getItem('updatedep');
    const subData = {
      id: id,
      name: department
    }
  //  const returnvalue = update(`${rootUrl}/Department/Update`,subData).then((action)=> {
  //     setSuccess(!success);
  //     setModalOpen(false)
  //     addToast(action, {
  //       appearance: action =='Department updated successfully.' ? 'success': 'error',
  //       autoDismiss: true,
  //     })
  //     setdepartment('');
  //    localStorage.removeItem('depName')
  
  //   })

    dispatch(UpdateDepartment(subData, (action) => {
      setSuccess(!success);
      setModalOpen(false)
      addToast(action, {
        appearance: action =='Department updated successfully.' ? 'success': 'error',
        autoDismiss: true,
      })
      setdepartment('');
     localStorage.removeItem('depName')
    }))
  
  
  }


const toggleDanger = (id) => {
    localStorage.setItem('studentTypeId',id)
  
    setDeleteModal(true)
   }
   
   // on Close Delete Modal
const closeDeleteModal = () => {
    setDeleteModal(false);
    localStorage.removeItem('studentTypeId')
   
  
  }

  const handleDelete = (id) =>{
      
    remove(`StudentType/Delete/${id}`)
    .then(res => {
     
      addToast(res, {
        appearance:  'error',
        autoDismiss: true,
      })
      const newState = studentTypeInfo.filter(data => data.id != id);
      setStudentTypeInfo(newState);
      setDeleteModal(false);

    })
  }

    return (
        <div>
            
            <Card className="uapp-card-bg">
              <CardHeader className="page-header">
                <h3 className="text-white">Student Type List</h3>
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
            name={' Add New'}
            icon={<i className="fas fa-plus"></i>}
            className={"btn btn-uapp-add"}
            func={()=>AddModalOpen('add')}

            /> */}


                  <div className='ms-auto'> <b> Total <span className="badge badge-primary"> {studentTypeInfo.length}</span> Student Type  Found </b></div>
            </CardHeader>
             <CardBody>

             <div>

<Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal">
  <ModalHeader>Add Student Type </ModalHeader>
  <ModalBody>
    <Form onSubmit={handleSubmit}>
     
      <FormGroup row className="has-icon-left position-relative">
        <Col md="4">
          <span>Student Type</span>
        </Col>
        <Col md="8">

            {
                info.id ? 
                <input
                type='hidden'
                name='id'
                id='id'
                value={info?.id}
                />
                :
                null
            }


          <Input
            type="text"
            name="name"
            id="name"
            defaultValue={info?.name}
          
            placeholder="Create Student Type"
          />

        </Col>
      </FormGroup>
     

      <FormGroup className="has-icon-left position-relative" style={{ display: 'flex', justifyContent: 'space-between' }}>

        <Button color="danger" className="mr-1 mt-3" onClick={closeModal}>Close</Button>

   
          <Button.Ripple
            color="primary"
            type="submit"
            className="mr-1 mt-3"
           
          >
            Submit
          </Button.Ripple>

      

      </FormGroup>

    </Form>
  </ModalBody>

</Modal>
<div>

</div>
</div>


<div className="table-responsive">
          <Table className="table-sm table-bordered text-center" >
          <thead className="thead-uapp-bg">
              <tr style={{ textAlign: "center" }}>
                <th>SL/NO</th>
                <th> Name</th>
                <th> Student Count</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {
                studentTypeInfo.map((type,index) =><tr key={index}
                type ={type}
                >
                  
                  <th scope='row'>{index+1}</th>
                  <td>{type?.name}</td>
                  <td>
                  <span className='badge badge-pill badge-primary' style={{cursor: 'pointer'}} onClick={()=> gotoList(type?.id)}>{type?.studentCount}</span> 
                  </td>
                  {/* <td>
                  <ButtonGroup variant="text">

                         <ButtonForFunction
                         className={"btn-sm mx-2"}
                         func={() => toggleDanger(type?.id)}
                         color={'danger'}
                         icon={<i className="fas fa-trash-alt"></i>}

                         />
                       
                      
                         <ButtonForFunction
                         className={"btn-sm"}
                         color={"warning"}
                         func={()=> AddModalOpen(type?.id)}
                         icon={<i className="fas fa-edit"></i>}
                         />
                          
                          </ButtonGroup>

                  
                  <Modal isOpen={deleteModal} toggle={closeDeleteModal} className="uapp-modal">

                      <ModalBody>
                        <p>Are You Sure to Delete this {localStorage.getItem('depName')} ? Once Deleted it can't be Undone!</p>
                      </ModalBody>

                      <ModalFooter>
                        <Button color="danger" onClick={() => handleDelete(localStorage.getItem('studentTypeId'))}>YES</Button>
                        <Button onClick={closeDeleteModal}>NO</Button>
                      </ModalFooter>

                  </Modal>


                  </td> */}
                    
                




                </tr>)
              }

              

            </tbody>
          </Table>
          </div>

         </CardBody>
      </Card>
            
            
        </div>
    );
};

export default StudentType;