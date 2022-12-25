import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Card, CardBody, CardHeader, Nav, NavItem, NavLink, TabContent, TabPane,Form, FormGroup, Col, Input, Button } from 'reactstrap';
import get from '../../../../helpers/get';
import post from '../../../../helpers/post';
import { useToasts } from "react-toast-notifications";
import put from '../../../../helpers/put';
import ButtonForFunction from '../../Components/ButtonForFunction';

const StudentPersonalStatementForm = () => {

    
    const history = useHistory();

    const [activetab, setActivetab] = useState("8");

    const {addToast} = useToasts();

    const [statement, setStatement] = useState('');
    const [id, setId] = useState(0);
    const [stringData,setStringData] = useState(0);
    const {idVal} = useParams();
    const [buttonStatus,setButtonStatus] = useState(false);

    function countWords(str) {
        const arr = str.split(' ');
      
        return arr.filter(word => word !== '').length;
      }
  
  
    
  
    const handleStringData = (e) => {
          setStringData(countWords(e.target.value));
         
    }
    
  const handlePersonalStatement = (event) => {
          event.preventDefault();
  
          const subData = new FormData(event.target);
              setButtonStatus(true);
             post('PersonalStatement/Create',subData)
            .then(res => {
              setButtonStatus(false);
              console.log(res);
              if(res?.status == 200 && res?.data?.isSuccess == true){
                addToast(res?.data?.message,{
                  appearance: 'success',
                  autoDismiss: true
                  
                })
                history.push(`/studentOtherInformation/${idVal}`);
              }
              else{
                addToast(res?.data?.message, {
                  appearance: "error",
                  autoDismiss: true,
                });
              }
    
            })
            
        }


    return (
        <div>

        <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Personal Statement</h3>
          <div className="page-header-back-to-home">
            <span className="text-white" >
              {" "}
              60% Completed
            </span>
          </div>
        </CardHeader>
      </Card>


      <Card>
      <CardBody>
      
     
          <Form onSubmit={handlePersonalStatement} className="mt-5">

     
          <input 
          type='hidden'
          name='studentId'
          id='studentId'
          value={idVal}
          />

          <FormGroup row className="has-icon-left position-relative">
          <Col md="2">
          <span>
             Personal Statement <span className="text-danger">*</span>{" "}
          </span>
        </Col>
        <Col md="6">
    

        <Input type="textarea" name="statement" id="statement" rows={15}
         onChange={handleStringData}
        />

        <div className='text-right'>
          <span>{stringData} / min word-300</span>
        </div>
      

      </Col>


        </FormGroup>

      
        <div className='row'>
            <div className='col-md-8 d-flex justify-content-end'>
            <Button
                type="submit"
                className="mr-1 mt-3 badge-primary"
                disabled ={(stringData < 300 || buttonStatus)}
                >
                Save & Next
               </Button>

            </div>

        </div>

       
      </Form>
      

      </CardBody>
    </Card>
        
            
        </div>
    );
};

export default StudentPersonalStatementForm;