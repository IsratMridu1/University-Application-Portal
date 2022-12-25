import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Nav, NavItem, NavLink, TabContent, TabPane, Label } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import post from '../../../helpers/post';
import { useToasts } from "react-toast-notifications";
import Select from "react-select";
import get from '../../../helpers/get';
import ButtonForFunction from '../Components/ButtonForFunction';
import { userTypes } from '../../../constants/userTypeConstant';
import axios from 'axios';
import { rootUrl } from '../../../constants/constants';



const StudentRegister = () => {



  const history = useHistory();

  const { addToast } = useToasts();

  const referenceId = localStorage.getItem('referenceId');
  const userTypeId = localStorage.getItem('userType');

  const [studentType, setStudentType] = useState([]);
  const [studentTypeLabel, setStudentTypeLabel] = useState('Select Student Type');
  const [studentTypeValue, setStudentTypeValue] = useState(0);

  const [consultant, setConsultant] = useState([]);
  const [consultantLabel, setconsultantLabel] = useState('Select Consultant');
  const [consultantValue, setConsultantValue] = useState(0);

  const [consultantError, setConsultantError] = useState(false);
  const [studentError, setStudentError] = useState(false);

  
   const [canSubmit,setCanSubmit] = useState(true);
   const [emailError,setEmailError] = useState(''); 
   const [email,setEmail] = useState('');

   const [pass,setPass] = useState('');
   const [passError,setPassError] = useState('');
   const [buttonStatus,setButtonStatus] = useState(false);


  useEffect(() => {


    get('StudentTypeDD/Index')
      .then(res => {
        console.log(res);
        setStudentType(res);
      })

    get('ConsultantDD/index')
      .then(res => {
        console.log(res);
        setConsultant(res);
      })

  }, [])

  const handleEmail = () => {

    axios.get(`${rootUrl}EmailCheck/Validate/${email}`)
    .then(res => {
      console.log('checking onBlur email value', res);
      if(res?.data?.isSuccess === false && res?.data?.result === false){
        setEmailError(res?.data?.message);
      }
      else{
        setEmailError(res?.data?.message);
        setCanSubmit(false);
      }

    })

  }


  const studentTypeName = studentType?.map((student) => ({
    label: student.name,
    value: student.id,
  }));

  const handlePass = (e) => {
    setPassError('')
    setPass(e.target.value);
}

  // select  Student type
  const selectStudentType = (label, value) => {

    setStudentError(false);
    setStudentTypeLabel(label);
    setStudentTypeValue(value);

  }



  const consultantName = consultant?.map((cons) => ({
    label: cons.name,
    value: cons.id,
  }));



  // select  consultant
  const selectConsultant = (label, value) => {

    setConsultantError(false);
    setconsultantLabel(label);
    setConsultantValue(value);

  }

  const cancelForm = () => {
    history.push('/studentList');
  }





  const backToStudentList = () => {

    history.push('/studentList');
  }



  const handleRegisterStudent = (event) => {

    event.preventDefault();
    if(userTypeId == userTypes?.Consultant){
      if (studentTypeValue == 0) {
        setStudentError(true);
      }
      else if(pass.length <6){
        setPassError('Password length can not be less than six digits');
      }
      else {
        const subdata = new FormData(event.target);
        setButtonStatus(true);
        post('Student/Register', subdata)
          .then(res => {
            setButtonStatus(false);
           
            if(res?.status === 200 && res?.data?.isSuccess === true){
              console.log('hello', res);
             
              addToast(res?.data?.message, {
                appearance: 'success',
                autoDismiss: true
              })
              history.push(`/studentApplication/${res?.data?.result?.id}`);
            }
           
          })
      }
    }
    else{
      if (studentTypeValue == 0) {
        setStudentError(true);
      }
  
      else if (consultantValue == 0) {
        setConsultantError(true);
      }
      else if(pass.length <6){
        setPassError('Password length can not be less than six digits');
      }
      else {
        setButtonStatus(true);
        const subdata = new FormData(event.target);
        post('Student/Register', subdata)
          .then(res => {
            setButtonStatus(false);
            console.log('hello', res);
         
            addToast(res?.data?.message, {
              appearance: res?.data?.isSuccess == true? 'success' : 'error',
              autoDismiss: true
            })
           if(res?.status == 200 && res?.data?.isSuccess == true){
            history.push(`/studentApplication/${res?.data?.result?.id}`);
           }
           else{
            return;
           }
          })
      }
    }
   
  }





  return (
    <div>

      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Register Student</h3>
          <div className="page-header-back-to-home">
            <span className="text-white" onClick={backToStudentList}>
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Student List
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>

        <span style={{fontSize: '17px'}}><b>Create Student Account</b></span>
        <br/>
        <span>Provide Information Below To Create Student Account.</span>

          <Form onSubmit={handleRegisterStudent} className="mt-4">


           

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Student Type <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={studentTypeName}
                  value={{ label: studentTypeLabel, value: studentTypeValue }}
                  onChange={(opt) => selectStudentType(opt.label, opt.value)}
                  name="studentTypeId"
                  id="studentTypeId"


                />
                {
                  studentError &&
                  <span className='text-danger'>Student type is required</span>
                }




              </Col>
            </FormGroup>


            {/* Conditional rendering on consultant type start */}
            {

              !(userTypeId == userTypes?.Consultant) ?

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Consultant <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={consultantName}
                      value={{ label: consultantLabel, value: consultantValue }}
                      onChange={(opt) => selectConsultant(opt.label, opt.value)}
                      name="consultantId"
                      id="consultantId"


                    />

                    {
                      consultantError &&
                      <span className='text-danger'>Consultant is required</span>
                    }



                  </Col>
                </FormGroup>

                :


                <input
                  type='hidden'
                  name='consultantId'
                  id='consultantId'
                  value={referenceId}

                />


            }
            {/* Conditional rendering on consultant type end */}



            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  First Name <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter First Name"
                  required
                />


              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Last Name <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter Last Name"
                  required
                />


              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Email <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  required
                 
                  onChange={(e)=> setEmail(e.target.value)}
                  onBlur={handleEmail}
                />
                <span className='text-danger'>{emailError}</span>



              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Password <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  required
                  onChange={handlePass}
                />
                <span className='text-danger'>{passError}</span>

              </Col>
            </FormGroup>




            <FormGroup row
              className="has-icon-left position-relative"
              
            >

             <Col md='8'>

              <div
              style={{ display: "flex", justifyContent: "end" }}
              >
                 <ButtonForFunction
                className={'mr-1 mt-3'}
                func={cancelForm}
                color={'danger'}
                name={'Cancel'}
              />


              <ButtonForFunction

                className={'mr-1 mt-3 badge-primary'}
                name={'Submit'}
                type={'submit'}
                disable={canSubmit || buttonStatus}

              />

              </div>
            

             </Col>

            </FormGroup>
          </Form>

        </CardBody>
      </Card>


    </div>
  );
};

export default StudentRegister;