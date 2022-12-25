import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Card, CardBody, CardHeader, Nav, NavItem, NavLink, TabContent, TabPane,Form, Label, FormGroup, Col, Input, Button } from 'reactstrap';
import get from '../../../helpers/get';
import { useToasts } from "react-toast-notifications";
import post from '../../../helpers/post';
import put from '../../../helpers/put';
import ButtonForFunction from '../Components/ButtonForFunction';

const OtherInformation = () => {

    const styleLabelBold = {
        // fontWeight: "bold"
      };


   
      const {applicationStudentId, update} = useParams();

   
      

    const history = useHistory();

    const [disability, setDisability] = useState(false);

    const [crime, setCrime] = useState(false);

    const [id, setId] = useState(0);

    const [activetab, setActivetab] = useState("9");

  

    const {addToast} = useToasts();

    const [data, setData] = useState({});
    const [buttonStatus,setButtonStatus] = useState(false);

    useEffect(()=>{

      get(`OtherInformation/GetByStudentId/${applicationStudentId}`)
      .then(res => {
        console.log('checking Other information', res);
        setDisability(`${res?.isHaveDisability}`);
        setCrime(`${res?.isHaveCriminalConvictions}`);
        setData(res);
        setId(res?.id);
      })

    },[])

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
          history.push(`/addExperience/${applicationStudentId}/${1}`);
        }

        if (tab == "7") {
          history.push(`/addReference/${applicationStudentId}/${1}`);
        }

        if (tab == "8") {
          history.push(`/addPersonalStatement/${applicationStudentId}/${1}`);
        }
        if (tab == "10") {
          history.push(`/uploadDocument/${applicationStudentId}`);
        }
        if (tab == "11") {
          history.push(`/studentDeclaration/${applicationStudentId}`);
        }
        
      };

      const handleOtherInformation = (event) => {

        event.preventDefault();

        const subData = new FormData(event.target);

        if(update){
          setButtonStatus(true);
          put('OtherInformation/Update',subData)
          .then(res => {
            setButtonStatus(false);
            if(res?.status ==200 ){
              addToast(res?.data?.message,{
                appearance:'success',
                autoDismiss:true
              })
              
            }
          })

        }

        else if(id){
          setButtonStatus(true);
          put('OtherInformation/Update',subData)
          .then(res => {
            setButtonStatus(false);
            if(res?.status ==200 ){
              addToast(res?.data?.message,{
                appearance:'success',
                autoDismiss:true
              })
              
            }
          })

        }

        else{
          setButtonStatus(true);
          post('OtherInformation/Create', subData)
        .then(res => {
          setButtonStatus(false);
          if(res?.status == 200 && res?.data?.isSuccess == true){
            addToast(res?.data?.message,{
              appearance:'success',
              autoDismiss:true
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
      }

      const handleDisability = (event) => {
        console.log(event.target.value);
        setDisability(event.target.value);
    }



      const handleCrime = (event) => {
        console.log(event.target.value);
        setCrime(event.target.value);
    }
  

    const previousPage = () => {
      history.push(`/addPersonalStatement/${applicationStudentId}/${1}`);
    }

    const nextPage = () => {
      history.push(`/uploadDocument/${applicationStudentId}`);
    }


    return (
        <div>

        <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Other Information</h3>
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
      <NavLink   active={activetab === "1"} onClick={() => toggle("1")}>
        Application
      </NavLink>
    </NavItem>

        <NavItem>
          <NavLink  active={activetab === "2"} onClick={() => toggle("2")}>
            Personal
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink  active={activetab === "3"} onClick={() => toggle("3")}>
            Contact
          </NavLink>
        </NavItem>

     

        <NavItem>
          <NavLink  active={activetab === "4"} onClick={() => toggle("4")}>
            Educational
          </NavLink>
        </NavItem>
     

        <NavItem>
          <NavLink  active={activetab === "5"} onClick={() => toggle("5")}>
            Test Score
          </NavLink>
        </NavItem>
       
        <NavItem>
          <NavLink  active={activetab === "6"} onClick={() => toggle("6")}>
            Experience
          </NavLink>
        </NavItem>
       
        <NavItem>
          <NavLink  active={activetab === "7"} onClick={() => toggle("7")}>
            Reference
          </NavLink>
        </NavItem>
       
        <NavItem>
          <NavLink  active={activetab === "8"} onClick={() => toggle("8")}>
            Personal Statement
          </NavLink>
        </NavItem>
       
        <NavItem>
          <NavLink  active={activetab === "9"} onClick={() => toggle("9")}>
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

          <Form onSubmit={handleOtherInformation} className="mt-5">

          <input
          type='hidden'
          name='id'
          id='id'
          value={id}
          
          />

            
                
          <input 
          type='hidden'
          name='studentId'
          id='studentId'
          value={applicationStudentId}
          />

          <FormGroup row className="has-icon-left position-relative">
          <Col md="2">
            <span>
              Have Disability? <span className="text-danger">*</span>{" "}
            </span>
          </Col>
          <Col md="6">

          
          <FormGroup check inline>
          <Input className="form-check-input" type="radio" id="isHaveDisability" onChange={handleDisability} name="isHaveDisability" value='true' checked={disability == 'true'} />
          <Label className="form-check-label" check htmlFor="isHaveDisability" style={styleLabelBold}>Yes</Label>

          </FormGroup>

          <FormGroup check inline>
          <Input className="form-check-input" type="radio" id="isHaveDisability" onChange={handleDisability} name="isHaveDisability" value='false' checked={disability == 'false'} />
          <Label className="form-check-label" check htmlFor="isHaveDisability" style={styleLabelBold}>No</Label>

          </FormGroup>



          
          </Col>
        </FormGroup>

        
        
          {

            disability === 'true' ? 

            <FormGroup row className="has-icon-left position-relative">
            <Col md="2">
            <span>
               Disability Description <span className="text-danger">*</span>{" "}
            </span>
          </Col>
          <Col md="6">
      
  
          <Input type="textarea" name='DisabilityDescription' id='DisabilityDescription' rows={4}
          defaultValue={data?.disabilityDescription}
          required
          />

  
        </Col>
  
  
          </FormGroup>

          :

          null


          }
        

        


          <FormGroup row className="has-icon-left position-relative">
          <Col md="2">
            <span>
              Have Criminal Convictions? <span className="text-danger">*</span>{" "}
            </span>
          </Col>
          <Col md="6">

          
          <FormGroup check inline>
          <Input className="form-check-input" type="radio" id="isHaveCriminalConvictions" onChange={handleCrime} name="isHaveCriminalConvictions" value='true' checked={crime == 'true'} />
          <Label className="form-check-label" check htmlFor="isHaveCriminalConvictions" style={styleLabelBold}>Yes</Label>

          </FormGroup>

          <FormGroup check inline>
          <Input className="form-check-input" type="radio" id="isHaveCriminalConvictions" onChange={handleCrime} name="isHaveCriminalConvictions" value='false' checked={crime == 'false'} />
          <Label className="form-check-label" check htmlFor="isHaveCriminalConvictions" style={styleLabelBold}>No</Label>

          </FormGroup>



          
          </Col>
        </FormGroup>

      {
         crime === 'true' ?

         <FormGroup row className="has-icon-left position-relative">
         <Col md="2">
         <span>
            Criminal convictions Description <span className="text-danger">*</span>{" "}
         </span>
       </Col>
       <Col md="6">
   
 
       <Input type="textarea" name='CriminalConvictionsDescription' id='CriminalConvictionsDescription' rows={4} defaultValue={data?.criminalConvictionsDescription} required  />
 
 
     </Col>
 
 
       </FormGroup>

       :

       null


      }

      
      <FormGroup row
      className="has-icon-left position-relative"
      style={{ display: "flex", justifyContent: "end" }}
    >
      
  <Col md="5">
  
 

      <ButtonForFunction
      name={'Submit'}
      className={"mr-1 mt-3 badge-primary"}
      type={'submit'}
      disable={buttonStatus}
      />

  </Col>

     
    </FormGroup>
      </Form>
      
      <FormGroup
      className="has-icon-left position-relative"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
    

      <ButtonForFunction
      name={'Previous'}
      className={"mr-1 mt-3 btn-warning"}
      func={previousPage}
      icon={<i className="fas fa-arrow-left-long mr-1"></i>}
      />
      
      <Button
      
      className="mr-1 mt-3 btn-warning"
      onClick={nextPage}
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

export default OtherInformation;