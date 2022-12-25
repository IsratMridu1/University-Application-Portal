import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import Select from "react-select";
import ButtonForFunction from '../Components/ButtonForFunction';
import post from '../../../helpers/post';
import { useToasts } from "react-toast-notifications";
import get from '../../../helpers/get';
import put from '../../../helpers/put';

const AddDegree = () => {

    const {degreeName, eduLabel, educationId, id} = useParams();

    const history = useHistory(); 
    const {addToast} = useToasts();

    const [data,setData] = useState({});

    const [education, setEducation] = useState([]);
    const [educationLabel, setEducationLabel] = useState('Select Education Level');
    const [educationValue, setEducationValue] = useState(0);
    const [educationError, setEducationError] = useState(false);
    const [errorMessage,setErrorMessage] = useState('Education level is required');
    const [buttonStatus,setButtonStatus] = useState(false);


    useEffect(()=> {


        get('EducationLevelDD/Index')
        .then(res => {
            console.log('Cehecking Education Data from get method', res);
            setEducation(res);
        })

        if(educationId){
          get(`EducationLevel/Get/${educationId}`)
          .then(res => {
            console.log(res,'fgfggfg');
            setData(res);
            setEducationLabel(res?.name);
            setEducationValue(res?.id);
          })

        }

    },[]);



    const educationName = education?.map((edu) => ({
        label: edu.name,
        value: edu.id,
      }));


             // select  Education Level
  const selectEducationLevel = (label, value) => {

    setEducationError(false);
    setEducationLabel(label);
    setEducationValue(value);
   
  }

    //   Submit Form Data

    const handleSubmit = (event) => {

        event.preventDefault();
        const subData = new FormData(event.target);

        if(educationValue == 0){
            setEducationError(true);
        }

        else{

            if(degreeName !== undefined && eduLabel !== undefined && educationId !== undefined && id !== undefined){
              setButtonStatus(true);
                put(`Degree/Update`,subData)
                .then( res => {
                  setButtonStatus(false);
                    if(res?.status ==200 && res?.data?.isSuccess == true){
                        addToast(res?.data?.message,{
                            appearance: 'success',
                            autoDismiss: true
                        })
                        history.push('/degreeList');
    
                    }
    
                })

            }

            else{
                setButtonStatus(true);
                post('Degree/Create',subData)
                .then( res => {
                    setButtonStatus(false);
                    if(res?.status ==200 && res?.data?.isSuccess == true){
                        addToast(res?.data?.message,{
                            appearance: 'success',
                            autoDismiss: true
                        })
                        history.push('/degreeList');
    
                    }
    
                })

            }
           

        }

    }



    // back to dashboard

    const backToDashboard = () => {

        history.push('/degreeList');
    }

    return (
        <div>

<Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Degree Information</h3>
          <div className="page-header-back-to-home">
            <span className="text-white" onClick={backToDashboard}>
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Degree List
            </span>
          </div>
        </CardHeader>
      </Card>


        
        {/* Degree Form To Submit Data */}
      
      <Card>
        <CardBody>
       
       
              <Form onSubmit={handleSubmit}  className="mt-5">

                {
                    (degreeName !== undefined && eduLabel !== undefined && educationId !== undefined && id !== undefined) ?

                    <input
                    type='hidden'
                    name='id'
                    id='id'
                    value={id}
                    />

                    :

                    null
                }


              <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Name <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                   <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder='Enter Name'
                      required
                      defaultValue={degreeName}
                      
                     
                    />
  
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                <span>
                Education Level <span className="text-danger">*</span>{" "}
                </span>
                </Col>
                <Col md="6">
    

                <Select
                      options={educationName}
                      defaultValue={{ label: eduLabel !== undefined ? eduLabel : educationLabel, value: educationId !== undefined ? educationId : educationValue}}
                      onChange={(opt) => selectEducationLevel(opt.label, opt.value)}
                      name="educationLevelId"
                      id="educationLevelId"
                      required

                    />
                     {
                    educationError ? 
                    <span className='text-danger'>{errorMessage}</span>

                    : 
                    null
                 }
                    
                   
      
                 </Col>
                


                </FormGroup> 

                

            
                <FormGroup row
                className="has-icon-left position-relative"
                style={{ display: "flex", justifyContent: "end" }}
              >
                
            <Col md="5">
            
           

          <ButtonForFunction
          type={'submit'}
          name={"Submit"}
          className={"mr-1 mt-3 badge-primary"}
          disable={buttonStatus}

          />
          
         
            </Col>
         
               
              </FormGroup>

             
              </Form>
         
       
        </CardBody>
      </Card>


            
        </div>
    );
};

export default AddDegree;