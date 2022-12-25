import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Card, CardBody, CardHeader, Nav, NavItem, NavLink, TabContent, TabPane,Form, FormGroup, Col, Input, Button, Row, Modal, ModalBody, ModalFooter } from 'reactstrap';
import get from '../../../../helpers/get';
import post from '../../../../helpers/post';
import { useToasts } from "react-toast-notifications";
import remove from '../../../../helpers/remove';
import put from '../../../../helpers/put';
import ButtonForFunction from '../../Components/ButtonForFunction';

const StudentExperience = () => {

    const history = useHistory();
    const {id} = useParams();
    const [activetab, setActivetab] = useState("6");
    const [working, setWorking] = useState(false);
    const [endDate, setEndDate] = useState('');
    const [delData, setDelData] = useState({});

    const [info, setInfo] = useState([]);
    const {addToast} = useToasts();

    const [deleteModal, setDeleteModal] = useState(false);
    const [showForm,setShowForm]=useState(false);
    const [value, setValue] = useState({}); 

    const [sDate, setSDate] = useState('');
    const [eDate, setEDate] = useState('');
    const [buttonStatus,setButtonStatus] = useState(false);

    const handleChange = (e) => {
      
        let isChecked = e.target.checked;
        setWorking(isChecked);
        console.log(isChecked);
       
      } 

    const handleRegisterStudent = (event) => {
        event.preventDefault();

        const subData = new FormData(event.target);
        subData.append('isStillWorking',working);
        {
          (value?.end) ?
            subData.append('endDate',null)
            :
            subData.append('endDate',endDate)
          
        }

        for( var a of subData.values()){
          console.log(a);
        }
         setButtonStatus(true);
        post('Experience/Create',subData)
        .then(res => {
          setButtonStatus(false);
          addToast(res?.data?.message,{
            appearance: 'success',
            autoDismiss: true
          })
          history.push(`/studentReference/${id}`);
         

        })
  

      }


    

    return (
        <div>
        <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Experience Information</h3>
          <div className="page-header-back-to-home">
            <span className="text-white" >
              {" "}
              44% Completed
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
      <CardBody>
      
      <Form onSubmit={handleRegisterStudent} className="mt-5">

            
                
            <input 
            type='hidden'
            name='studentId'
            id='studentId'
            value={id}
            />

         
          <FormGroup row className="has-icon-left position-relative">
          <Col md="2">
            <span>
              Job Title <span className="text-danger">*</span>{" "}
            </span>
          </Col>
          <Col md="6">
           <Input
              type="text"
              name="jobTitle"
              id="jobTitle"
              placeholder="Enter Job Title"
              required
           
            />

       
          </Col>
        </FormGroup>

          <FormGroup row className="has-icon-left position-relative">
          <Col md="2">
            <span>
              Employment Details <span className="text-danger">*</span>{" "}
            </span>
          </Col>
          <Col md="6">
           <Input
              type="text"
              name="employeementDetails"
              id="employeementDetails"
              placeholder="Enter Employment Details"
              required
             
            />

       
          </Col>
        </FormGroup>

          <FormGroup row className="has-icon-left position-relative">
          <Col md="2">
            <span>
              Company Name <span className="text-danger">*</span>{" "}
            </span>
          </Col>
          <Col md="6">
           <Input
              type="text"
              name="companyName"
              id="companyName"
              placeholder="Enter Company Name"
              required
            
            />

       
          </Col>
        </FormGroup>

          <FormGroup row className="has-icon-left position-relative">
          <Col md="2">
            <span>
              Start Date <span className="text-danger">*</span>{" "}
            </span>
          </Col>
          <Col md="6">
           <Input
              type="date"
              name="startDate"
              id="startDate"
            
              
            />

       
          </Col>
        </FormGroup>

          <FormGroup row className="has-icon-left position-relative">
          <Col md="2">
            <span>
              Still Working? <span className="text-danger">*</span>{" "}
            </span>
          </Col>
          <Col md="6" className='ml-4'>
           <Input
              type="checkbox"
            
           
              onChange={handleChange}
              
           
            />

           

       
          </Col>
        </FormGroup>

        {
            !working  ?

            <FormGroup row className="has-icon-left position-relative">
            <Col md="2">
              <span>
                End Date <span className="text-danger">*</span>{" "}
              </span>
            </Col>
            <Col md="6">
             <Input
                type="date"
               
                
                onChange={(e)=> setEndDate(e.target.value)}
           
                
                
              />

         
            </Col>
          </FormGroup>

          :

          null




        }

       

        <div className='row'>
            <div className='col-md-8 d-flex justify-content-end'>
            <ButtonForFunction
            type={'submit'}
            className={"mr-1 mt-3 badge-primary"}
            name={'Save & Next'}
            disable={buttonStatus}
    />

            </div>

        </div>

   
        
         
        </Form>

        

        
       
      </CardBody>
    </Card>
            
        </div>
    );
};

export default StudentExperience;