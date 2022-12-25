import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, ButtonGroup, Card, CardBody, CardHeader, Col, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table, Form } from 'reactstrap';
import { useToasts } from "react-toast-notifications";




import get from '../../../../helpers/get';
import remove from '../../../../helpers/remove';
import put  from '../../../../helpers/put';
import post from '../../../../helpers/post';
import { ValueService } from 'ag-grid-community';
import Loader from '../../Search/Loader/Loader';


const ExamTestType = () => {

    const history = useHistory();
    
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [examTestType , setExamTestType] = useState([]);
    const [examTestTypeValue , setExamTestTypeValue] = useState('');
    const [loading,setLoading] = useState(true);

  const { addToast } = useToasts();



   
  



    useEffect(()=> {
   get(`ExamTestType/Index`).then((action)=>{

    setExamTestType(action);
    setLoading(false);
    
   
  
    }).catch();

  

    
    


},[success])


    const backToDashboard = () => {
        history.push('/');
    }

    // const toggleDanger = (name,id) => {
    //     localStorage.setItem('examTestTypeName',name);
    //     localStorage.setItem('examTestTypeValue',id);
       
    //     setDeleteModal(true)
    //    }


    // on Close Delete Modal
// const closeDeleteModal = () => {
//     setDeleteModal(false);
//     localStorage.removeItem('examTestTypeName');
//     localStorage.removeItem('examTestTypeValue');

// }

// on Close Modal
const closeModal = () => {
    setModalOpen(false);
    localStorage.removeItem('updateUniCountry')

}

// const handleDeleteUniCountry = (id) => {


  

//      remove(`ExamTestType/Delete/${id}`).then((action)=> {
//       setDeleteModal(false);
//       setSuccess(!success);
//        addToast(action, {
//          appearance: 'error',
//          autoDismiss: true,
//        })
//        localStorage.removeItem('examTestTypeName');
//        localStorage.removeItem('examTestTypeValue');
//     })
    
//       const newData = examTestType.filter( extp => extp?.id !== id);
//       setExamTestType(newData);
//       setExamTestTypeValue('');
//   }

  // const handleUpdate = (data) => {
  //   setModalOpen(true);
  //   setExamTestTypeValue(data?.name);
    
  //   localStorage.setItem('updateExamTestTypeValue',data.id);
 
    
  
   
  // }

  const handleUpdateSubmit = () => {


  
    const subData = {
      id: idVal,
      name: examTestTypeValue
    }
  
   

   

    put(`ExamTestType/Update`,subData).then((action)=> {
      setSuccess(!success);
      setModalOpen(false)
      addToast(action?.data?.message, {
        appearance: 'success',
        autoDismiss: true,
      })
  
  
     setExamTestTypeValue('');
    })
    localStorage.removeItem('updateExamTestTypeValue')
  
  
  }



  const handleSubmit = (e) => {

    e.preventDefault();
  
    const subdata = new FormData(e.target);


  
       post(`ExamTestType/Create`,subdata).then((action)=>{

       
  
          setSuccess(!success)
          setModalOpen(false)
          addToast(action?.data?.message, {
            appearance: 'success',
            autoDismiss: true,
          })
          setModalOpen(false);
          history.push({
           pathname: '/examTestTypeAttribute',
           examTestTypeId : action?.data?.result?.id 
          })
        

            setExamTestTypeValue('');
      });

     
  
  
  
  
  
  }

  // const handleCheckExamTestTypeAttribute = (id) => {
 
  //   localStorage.setItem('examTestTypeAttributeId',id);
  //   history.push('/examTestTypeAttribute');

  // }


  const idVal =localStorage.getItem('updateExamTestTypeValue');



    return (
        <div>
          {
            loading?
            <Loader/>
            :
            <div>
               <Card className="uapp-card-bg">
              <CardHeader className="page-header">
                <h3 className="text-white">Exam Test Type</h3>
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
           
              {/* <Button className="btn btn-uapp-add" onClick={() => setModalOpen(true)}> <i className="fas fa-plus"></i>  Add New</Button> */}
              <div className="ms-auto">
                <div>
                 <b> Total <span className="badge badge-primary">{examTestType?.length}</span> Exam Test Type Found   </b>
                 </div>
                 </div>
            </CardHeader>
            <CardBody>
    
              <div>
    
                <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal">
                  <ModalHeader>Add Exam Test Type</ModalHeader>
                  <ModalBody>
                    <Form onSubmit={handleSubmit}>


                    {
                      idVal ? 

                      <input
                      type='hidden'
                      value={idVal}
                      name='id'
                      id='id'


                      />

                      :
                      
                      null


                    }

                      <FormGroup row className="has-icon-left position-relative">
                        <Col md="4">
                          <span>Exam Test Type</span>
                        </Col>
                        <Col md="8">
                          <Input
                            type="text"
                            name="name"
                            id="name"
                            defaultValue={examTestTypeValue}
                            placeholder="Create exam test type"
                            onChange={(e) => setExamTestTypeValue(e.target.value)}
                          />
    
                        </Col>
                      </FormGroup>
    
                      <FormGroup className="has-icon-left position-relative" style={{ display: 'flex', justifyContent: 'space-between' }}>
    
                        <Button color="danger" className="mr-1 mt-3" onClick={closeModal}>Close</Button>
    
                        {
                          idVal ?
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
                
              </div>
              <div className="table-responsive">
              <Table className="table-sm table-bordered" >
              <thead className="thead-uapp-bg">
                  <tr style={{ textAlign: "center" }}>
                    <th>SL/NO</th>
                    <th> Name</th>
                    {/* <th className="text-center" >Attribute</th>
                    <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
    
                  {
                    examTestType?.map((exam, i) => <tr key={exam?.id}>
                      <th style={{ textAlign: "center" }} scope="row">{i + 1}</th>
                      <td style={{ textAlign: "center" }}>{exam?.name}</td>
                      {/* <td>               
                      <Button color="primary" onClick={()=>handleCheckExamTestTypeAttribute(exam.id)} className="mx-1 btn-sm">
                      {" "}
                      <i className="fas fa-eye"></i>{" "}
                    </Button>
                      </td>
                      <td>
                        <Button className="mx-2" onClick={() => toggleDanger(exam?.name, exam?.id)} color="danger"><i className="fas fa-trash-alt"></i></Button>
                        <Button onClick={()=> handleUpdate(exam)} className="mx-2" color="warning"><i className="fas fa-edit"></i></Button>
    
    
                        <Modal isOpen={deleteModal} toggle={closeDeleteModal} className="uapp-modal">
    
                          <ModalBody>
                            <p>Are You Sure to Delete this? Once Deleted it can't be Undone!</p>
                          </ModalBody>
    
                          <ModalFooter>
                            <Button color="danger" onClick={() => handleDeleteUniCountry(localStorage.getItem('examTestTypeValue'))}>YES</Button>
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
          }
       
            
        </div>
    );
};

export default ExamTestType;