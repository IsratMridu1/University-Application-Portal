import React, { useEffect, useState } from 'react';
import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Table,
  } from "reactstrap";
  import Select from "react-select";
import { useHistory, useLocation } from 'react-router-dom';
import get from '../../../../helpers/get';
import post from '../../../../helpers/post';
import remove from '../../../../helpers/remove';
import { useToasts } from 'react-toast-notifications';

const ExamTestTypeAttribute = () => {


    const history = useHistory();
    const location = useLocation();

    const examTestTypeAttributeId = localStorage.getItem('examTestTypeAttributeId');

    
     if(location?.examTestTypeId){
      localStorage.setItem('examTestTypeAttributeId',location?.examTestTypeId);
     }

    const [examTestTypeAttribute, setExamTestTypeAttribute] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [fieldType, setFieldType] = useState([]);
    const [fieldTypeLabel, setFieldTypeLabel] = useState('Field type');
    const [fieldTypeValue, setFieldTypeValue] = useState('');
    const {addToast} = useToasts();


    useEffect(()=>{
        // get('ExamTestTypeAttribute/Index')
        // .then(res => {
        
        //     setExamTestTypeAttribute(res?.data?.result);

        // })


        get('FieldType/GetAll')
        .then(res => {
          
          setFieldType(res);
        })


        get(`ExamTestTypeAttribute/GetByExamTestType/${localStorage.getItem('examTestTypeAttributeId')}`)
        .then(res => {
          
          setExamTestTypeAttribute(res);
        })

        // get(`ExamTestTypeAttribute/GetByExamTestType/${examTestTypeAttributeId}`)
        // .then(res => {
       
        // })

    },[])

  
    
    const backToList = () => {
        history.push('/examTestType');
    }

    
    const toggleDanger = (name,id) => {
        
       
        setDeleteModal(true)
       }

           // on Close Delete Modal
const closeDeleteModal = () => {
    setDeleteModal(false);
  

}


const fieldTypeList = fieldType?.map((field) => ({
  label: field.name,
  value: field.id,
}));


     // select  field type
const selectFieldType = (label, value) => {
setFieldTypeLabel(label);
setFieldTypeValue(value);



}

const handleSubmit = (e) => {

  e.preventDefault();
  const subData = new FormData(e.target);

  for(var y of subData.values()){

  }

  post('ExamTestTypeAttribute/Create',subData)
  .then(res => {
   
    addToast(res?.data?.message,{
      appearance: 'error',
      autoDismiss: true

    })
    get(`ExamTestTypeAttribute/GetByExamTestType/${localStorage.getItem('examTestTypeAttributeId')}`)
    .then(res => {
    
      setExamTestTypeAttribute(res);
    })
  })
}

const handleDelete = (data) => {

  
  remove(`ExamTestTypeAttribute/Delete/${data?.id}`)
  .then(res => {
   
    setDeleteModal(false);
    addToast(res,{
      appearance: 'error',
      autoDismiss: true
    })
    get(`ExamTestTypeAttribute/GetByExamTestType/${localStorage.getItem('examTestTypeAttributeId')}`)
    .then(res => {
     
      setExamTestTypeAttribute(res);
    })
  }) 

}


    return (
        <div >

        <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Exam Test Type Attribute Details </h3>
          <div className="page-header-back-to-home">
            <span className="text-white"  onClick={backToList}>
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Exam Test Type List
            </span>
          </div>
        </CardHeader>
      </Card>

      <div className=''>
      <Card>
        <Row className='pt-3'>
      
          <Col md="4">
          <Card className="uapp-card-bg mx-2">
          <CardHeader className="page-header">
            <h3 className="text-white">Add Attribute</h3>
           
          </CardHeader>
        </Card>
          

          <Form className="mt-5 mx-3" onSubmit={handleSubmit}>
           

          <input
          
          type='hidden'
          name='examTestTypeId'
          id='examTestTypeId'
          value={localStorage.getItem('examTestTypeAttributeId')}
          />
        
         <FormGroup row className="has-icon-left position-relative">
           <Col md="4">
             <span>
              Name <span className="text-danger">*</span>{" "}
             </span>
           </Col>
           <Col md="8">
             <Input
               type="text"
               name="name"
               id="name"
               placeholder="Enter name"
               required
             
             />
         
           </Col>
         </FormGroup>
      
         
       

         <FormGroup row className="has-icon-left position-relative">
           <Col md="4">
             <span>
                Field Type <span className="text-danger">*</span>{" "}
             </span>
           </Col>
           <Col md="8">
             <Select
             options={fieldTypeList}
             value={{ label: fieldTypeLabel, value: fieldTypeValue }}
             onChange={(opt) => selectFieldType(opt.label, opt.value)}
               name="fieldTypeId"
               id="fieldTypeId"
               required
             />

         
           </Col>
         </FormGroup>
       
        
         
         
       

        


         <FormGroup
           className="has-icon-left position-relative"
           style={{ display: "flex", justifyContent: 'end' }}
         >
           <Button.Ripple
             type="submit"
             className="mr-1 mt-3 badge-primary"
           >
             Submit
           </Button.Ripple>
           
          
         </FormGroup>
         
       </Form>
          
            
           
            
          </Col>
          <Col md="8">
            
            <div className="table-responsive page-header ">
            <Table className="table-sm table-bordered" >
            <thead className="thead-uapp-bg" >
                <tr style={{ textAlign: "center" }}>
                
                  <th> Name</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
  
                {
                  examTestTypeAttribute?.map((exam, i) => <tr key={exam?.id}>
                  
                    <td>{exam?.name}</td>
                    <td>{exam?.fieldTypeName}</td>
                   

                   
                    <td>
                      <Button className="mx-2" onClick={() => toggleDanger(exam?.name, exam?.id)} color="danger"><i className="fas fa-trash-alt"></i></Button>
                      <Modal isOpen={deleteModal} toggle={closeDeleteModal} className="uapp-modal">
    
                      <ModalBody>
                        <p>Are You Sure to Delete this? Once Deleted it can't be Undone!</p>
                      </ModalBody>

                      <ModalFooter>
                        <Button color="danger" onClick={()=> handleDelete(exam)}>YES</Button>
                        <Button onClick={closeDeleteModal}>NO</Button>
                      </ModalFooter>

                    </Modal>
                     
  
                    </td>
                  </tr>)
                }
  
              </tbody>
            </Table>
            </div>
              
               
              
            
          </Col>
        
        </Row>
        </Card>
       
      </div>
            
        </div>
    );
};

export default ExamTestTypeAttribute;