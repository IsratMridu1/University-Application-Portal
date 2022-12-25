import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Card, CardBody, CardHeader, Nav, NavItem, NavLink, TabContent, TabPane,Form, FormGroup, Col, Input, Button } from 'reactstrap';
import get from '../../../helpers/get';
import post from '../../../helpers/post';
import { useToasts } from "react-toast-notifications";
import put from '../../../helpers/put';
import ButtonForFunction from '../Components/ButtonForFunction';

const PersonalStatement = () => {



    const history = useHistory();

    const [activetab, setActivetab] = useState("8");

    const {addToast} = useToasts();

    const [statement, setStatement] = useState('');
    const [id, setId] = useState(0);
    const [stringData,setStringData] = useState(0);
    const {applicationStudentId, update} = useParams();
    const [buttonStatus,setButtonStatus] = useState(false);

    

   

    useEffect(()=>{

      get(`PersonalStatement/GetByStudentId/${applicationStudentId}`)
      .then(res => {
        console.log(res,'Personal Statement Check');
        setStatement(res?.statement);
        setId(res?.id);
      })

    },[])

    function countWords(str) {
      const arr = str.split(' ');
    
      return arr.filter(word => word !== '').length;
    }


    const backToStudentProfile = () => {
      history.push(`/studentProfile/${applicationStudentId}`);
  }

  const handleStringData = (e) => {
        setStringData(countWords(e.target.value));
       
  }
  
 console.log(stringData);

    const previousPage = () => {
      history.push(`/addReference/${applicationStudentId}/${1}`);
    }

    const goNext = () =>{
      history.push(`/addOtherInformation/${applicationStudentId}`);
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
          history.push(`/addExperience/${applicationStudentId}/${1}`);
        }
      
        if (tab == "7") {
          history.push(`/addReference/${applicationStudentId}/${1}`);
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

      const handlePersonalStatement = (event) => {
        event.preventDefault();

        const subData = new FormData(event.target);

        if(statement == null || statement == 'undefined'){
          setButtonStatus(true);
          post('PersonalStatement/Create',subData)
          .then(res => {
            setButtonStatus(false);
            if(res?.status == 200 && res?.data?.isSuccess == true){
              addToast(res?.data?.message,{
                appearance: 'success',
                autoDismiss: true
                
              })
              history.push(`/addOtherInformation/${applicationStudentId}`);
            }
            else{
              addToast(res?.data?.message, {
                appearance: "error",
                autoDismiss: true,
              });
            }
  
          })
          
         }
  

       else if(update || id){
        setButtonStatus(true);
        put('PersonalStatement/Update',subData)
        .then(res => {
          setButtonStatus(false);
          if(res?.status == 200 && res?.data?.isSuccess == true){
            addToast(res?.data?.message,{
              appearance: 'success',
              autoDismiss: true
            })
            
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        })

       }

    
       else{
        setButtonStatus(true);
        post('PersonalStatement/Create',subData)
        .then(res => {
          setButtonStatus(true);
          if(res?.status == 200 && res?.data?.isSuccess == true){
            addToast(res?.data?.message,{
              appearance: 'success',
              autoDismiss: true
              
            })
            history.push(`/addOtherInformation/${applicationStudentId}`);
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


    return (
        <div>

        <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Personal Statement</h3>
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

      

          <Form onSubmit={handlePersonalStatement} className="mt-5">


          
          {

            (update || id) ?

            <input
            type='hidden'
            name='id'
            id='id'
            value={id}

            />

            :

            null


          }
                
          <input 
          type='hidden'
          name='studentId'
          id='studentId'
          value={applicationStudentId}
          />

          <FormGroup row className="has-icon-left position-relative">
          <Col md="2">
          <span>
             Personal Statement <span className="text-danger">*</span>{" "}
          </span>
        </Col>
        <Col md="6">
    

        <Input type="textarea" name="statement" id="statement" rows={15}
        defaultValue={statement} onChange={handleStringData}
        />

        <div className='text-right'>
          <span>{stringData} / min word-300</span>
        </div>
      

      </Col>


        </FormGroup>

      
        <FormGroup row
        className="has-icon-left position-relative"
        style={{ display: "flex", justifyContent: "end" }}
      >
        
    <Col md="5">
    
    <Button.Ripple
    type="submit"
    className="mr-1 mt-3 badge-primary"
    disabled ={(stringData < 300 || buttonStatus) }
  >
    Submit
  </Button.Ripple>
 
    </Col>
 
       
      </FormGroup>

       
      </Form>
      

      <FormGroup
      className="has-icon-left position-relative"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
   

      <ButtonForFunction
      className={"mr-1 mt-3 btn-warning"}
      name={'Previous'}
      icon={<i className="fas fa-arrow-left-long mr-1"></i>}
      func={previousPage}
      />

      <Button.Ripple
        type="submit"
        className="mr-1 mt-3 btn-warning"
        onClick={goNext}
        disabled = {statement == 'false' ? true : false}
      >
        Next
        <i className="fas fa-arrow-right-long ml-1"></i>
      </Button.Ripple>
    </FormGroup>
   
           
       
      </CardBody>
    </Card>
        
            
        </div>
    );
};

export default PersonalStatement;