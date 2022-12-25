import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Card, CardBody, CardHeader, Nav, NavItem, NavLink, TabContent, TabPane,Form, FormGroup, Col, Input, Button, Row, Modal, ModalBody, ModalFooter } from 'reactstrap';
import get from '../../../helpers/get';
import post from '../../../helpers/post';
import { useToasts } from "react-toast-notifications";
import remove from '../../../helpers/remove';
import put from '../../../helpers/put';
import ButtonForFunction from '../Components/ButtonForFunction';

const Experience = () => {


    const history = useHistory();
    const {applicationStudentId, update} = useParams();

    const handleDate = e =>{
      var datee = e;
      var utcDate = new Date(datee);
      var localeDate = utcDate.toLocaleString("en-CA");
      const x = localeDate.split(",")[0];
      return x;
    }

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

 
  


    useEffect(()=>{

      get(`Experience/GetByStudentId/${applicationStudentId}`)
      .then(res => {
        console.log(res);
        setInfo(res);

     
        

      })

    },[])
   

    const onPreviousPage = () => {
      history.push(`/addTestScore/${applicationStudentId}/${1}`);
    }

    const backToStudentProfile = () => {
      history.push(`/studentProfile/${applicationStudentId}`);
  }
  

    const toggle = (tab) => {
        setActivetab(tab);
        if (tab == "1") {
          history.push(`/addStudentApplicationInformation/${applicationStudentId}/${1}`);
        }
      
        if (tab == "2") {
          history.push(`/addStudentInformation/${applicationStudentId}/${1}`);
        }
      
        if (tab == "3") {
          history.push(`/addStudentContactInformation/${applicationStudentId}/${1}`);
        }
      
        if (tab == "4") {
          history.push(`/addStudentEducationalInformation/${applicationStudentId}/${1}`);
        }
      
        if (tab == "5") {
          history.push(`/addTestScore/${applicationStudentId}/${1}`);
        }
      
        if (tab == "6") {
          history.push(`/addExperience/${applicationStudentId}`);
        }
      
        if (tab == "7") {
          history.push(`/addReference/${applicationStudentId}`);
        }
      
        if (tab == "8") {
          history.push(`/addPersonalStatement/${applicationStudentId}`);
        }
        if (tab == "9") {
          history.push(`/addOtherInformation/${applicationStudentId}`);
        }
        if (tab == "10") {
          history.push(`/uploadDocument/${applicationStudentId}`);
        }
        if (tab == "11") {
          history.push(`/studentDeclaration/${applicationStudentId}`);
        }

        
      };

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

       if(value.id){
         setButtonStatus(true);
        put('Experience/Update',subData)
        .then(res => {
          setButtonStatus(false);
          addToast(res?.data?.message,{
            appearance: 'success',
            autoDismiss: true
          });
          setValue({});
          get(`Experience/GetByStudentId/${applicationStudentId}`)
          .then(res => {
           
            setInfo(res);
            
    
          })
          setShowForm(false);

        })

       }

       else{
        setButtonStatus(true);
        post('Experience/Create',subData)
        .then(res => {
          setButtonStatus(false);
          addToast(res?.data?.message,{
            appearance: 'success',
            autoDismiss: true
          })
          setShowForm(false);
          get(`Experience/GetByStudentId/${applicationStudentId}`)
          .then(res => {
           
            setInfo(res);
            
    
          })



        })
       }

      }


      
const toggleDanger = (id) => {
    setDelData(id);
   
 
  setDeleteModal(true)
}

const handleDeletePermission = () => {
  setButtonStatus(true);
  remove(`Experience/Delete/${delData?.id}`)
  .then(res => {
    setButtonStatus(false);
    addToast(res,{
      appearance:'error',
      autoDismiss: true
    })
    setDeleteModal(false);
    get(`Experience/GetByStudentId/${applicationStudentId}`)
      .then(res => {
        console.log(res);
        setInfo(res);
        

      })

  })

  

 

 
}

const handleUpdate = (id) => {
 

  console.log(id);

  setShowForm(true);
  get(`Experience/Get/${id}`)
  .then(res => {
    setValue(res);

    // 

    var datee =res?.startDate;
var utcDate = new Date(datee);
var localeDte = utcDate.toLocaleString("en-CA");
var localeDte2 = localeDte.split(",")[0];
var localeDte3 = localeDte2.replace('/', '-');

console.log(localeDte);
setSDate(localeDte3.replace('/', '-'));

    var datee99 =res?.endDate;
var utcDate99 = new Date(datee99);
var localeDte99 = utcDate99.toLocaleString("en-CA");
var localeDte299 = localeDte99.split(",")[0];
var localeDte399 = localeDte299.replace('/', '-');

// console.log(localeDte);
setEDate(localeDte399.replace('/', '-'));




    // 
    
    console.log(res);
    setWorking(res.isStillWorking);

  })
   
   
}

console.log('trying', sDate?.split(",")[0]);

  // redirect to Next Page
  const onNextPage = () => {
    
    history.push(`/addReference/${applicationStudentId}`
     
    );
  };


  const onShow=()=>{
    setShowForm(true);

  
  }




    return (
        <div>
        <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Experience Information</h3>
          <div className="page-header-back-to-home">
            <span className="text-white" onClick={backToStudentProfile}>
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Student Profile
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
      <CardBody>
      
     
       <Nav tabs>

       <NavItem>
       <NavLink  active={activetab === "1"} onClick={() => toggle("1")}>
         Application 
       </NavLink>
     </NavItem>

         <NavItem>
           <NavLink  active={activetab === "2"} onClick={() => toggle("2")}>
             Personal 
           </NavLink>
         </NavItem>

         <NavItem>
           <NavLink   active={activetab === "3"} onClick={() => toggle("3")}>
             Contact 
           </NavLink>
         </NavItem>

        
         <NavItem>
           <NavLink   active={activetab === "4"} onClick={() => toggle("4")}>
             Educational 
           </NavLink>
         </NavItem>

         <NavItem>
           <NavLink   active={activetab === "5"} onClick={() => toggle("5")}>
             Test Score
           </NavLink>
         </NavItem>

         <NavItem>

           <NavLink   active={activetab === "6"} onClick={() => toggle("6")}>
             Experience 
           </NavLink>
         </NavItem>

         <NavItem>

           <NavLink   active={activetab === "7"} onClick={() => toggle("7")}>
             Reference
           </NavLink>
         </NavItem>

         <NavItem>

           <NavLink   active={activetab === "8"} onClick={() => toggle("8")}>
             Personal Statement
           </NavLink>
         </NavItem>

         <NavItem>

           <NavLink   active={activetab === "9"} onClick={() => toggle("9")}>
             Others
           </NavLink>
         </NavItem>

         <NavItem>
           <NavLink  active={activetab === "10"} onClick={() => toggle("10")}>
             Documents
           </NavLink>
         </NavItem>

         <NavItem>
           <NavLink  active={activetab === "11"} onClick={() => toggle("11")}>
             Declaration
           </NavLink>
         </NavItem>
        

       </Nav>

       
          <div className='row'>
        
      
          {
            info?.map((inf, i) => <div className='col-md-6 mt-2' key={inf.id} style={{ textAlign: "left" }}>
              <Card className="CampusCard shadow-style test-score-card-style-2">
                <CardBody className="shadow">

                

                <Row>
                  <Col md="4">
                      <h5 className='test-score-title-styles'>Company Name: {inf?.companyName}   </h5>
                      
                      <p className="bank-account-info-text">Eployment Details: {inf?.employeementDetails} </p>
                     
                      
                  </Col>

                    <Col md="5">
                      <p  className="bank-account-info-text">Job Title : {inf?.jobTitle} </p>
                      <p  className="bank-account-info-text">From : {handleDate(inf?.startDate)} </p>
                      {
                        !inf?.isStillWorking ?

                        <p className="bank-account-info-text">To : {handleDate(inf?.endDate)} </p>

                        :

                        <p className="bank-account-info-text">Currently Working</p>
                      }
                     
                 
                      
             
                  
                  
                  
                  </Col>

                  <Col md="3">

                  <div className="CampusCardAction">
                  <div className=""> 
                     <Button type="button" color='primary' className="bankCard-style" onClick={() => handleUpdate(inf.id)} disabled={buttonStatus}> <i className="fas fa-edit"></i> </Button>
                  </div>

                  <div className=""> 
                     <Button type="button" color='danger' className="bankCard-style" onClick={()=>toggleDanger(inf)} ><i className="fas fa-trash-alt"></i></Button>
                  </div>
                 </div>

                  </Col>


                </Row>           
            
                </CardBody>

                <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)} className="uapp-modal">
                  <ModalBody>
                    <p>Are You Sure to Delete this ? Once Deleted it can't be Undone!</p>
                  </ModalBody>

                  <ModalFooter>
                    <Button onClick={handleDeletePermission} color="danger" disabled={buttonStatus}>YES</Button>
                    <Button onClick={() => setDeleteModal(false)}>NO</Button>
                  </ModalFooter>
               </Modal>

              </Card>
            </div>)

          }

          </div>
   
          {
            (info.length < 1 || showForm) ?
            
            <Form onSubmit={handleRegisterStudent} className="mt-5">

            
                
            <input 
            type='hidden'
            name='studentId'
            id='studentId'
            value={applicationStudentId}
            />

           {
            (value?.id)?

            <input
            type='hidden'
            name='id'
            id='id'
            value={value.id}
            />

            :

            null


           }

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
              defaultValue={value.jobTitle}
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
              defaultValue={value.employeementDetails}
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
              defaultValue={value.companyName}
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
              defaultValue={sDate}
              
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
              defaultChecked={value.isStillWorking}
           
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
                defaultValue={eDate}
                
                
              />

         
            </Col>
          </FormGroup>

          :

          null




        }

       

        {
          (value.id) ?

          <FormGroup row
          className="has-icon-left position-relative"
          style={{ display: "flex", justifyContent: "end" }}
        >
          
      <Col md="5">
      
    

    <ButtonForFunction
    type={'submit'}
    className={"mr-1 mt-3 badge-primary"}
    name={'Update'}
    disable={buttonStatus}
    />
   
      </Col>
   
         
        </FormGroup>

        :

        <FormGroup row
        className="has-icon-left position-relative"
        style={{ display: "flex", justifyContent: "end" }}
      >
        
    <Col md="5">
    
   

  <ButtonForFunction
    type={'submit'}
    className={"mr-1 mt-3 badge-primary"}
    name={'Submit'}
    disable={buttonStatus}
    />
 
    </Col>
 
       
      </FormGroup>

        }
        
         
        </Form>

        :

        <>
          

        <FormGroup className="has-icon-left position-relative" style={{ display: 'flex',width:"100%", justifyContent: 'space-between' }}>

       
        <Button onClick={onShow} color="primary uapp-form-button">Add Another</Button>
    
        </FormGroup>
    

        
        </>

        
          }

          <FormGroup className="has-icon-left position-relative" style={{ display: 'flex',width:"100%", justifyContent: 'space-between' }}>

       
          

          <ButtonForFunction
          name={'Previous'}
          func={onPreviousPage}
          className={'ms-md-1 mt-3 btn-warning'}
          icon={<i className="fas fa-arrow-left-long mr-1"></i>}
          />


          <Button onClick={onNextPage} className="me-md-1 mt-3 btn-warning"
          
          >
  
          Next
          <i className="fas fa-arrow-right-long ml-1"></i>
          </Button>
          </FormGroup>
       
      </CardBody>
    </Card>
            
        </div>
    );
};

export default Experience;