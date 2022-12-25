import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Nav, NavItem, NavLink, TabContent, TabPane, Label } from 'reactstrap';
import Select from "react-select";
import get from '../../../helpers/get';
import post from '../../../helpers/post';
import { useToasts } from "react-toast-notifications";
import put from '../../../helpers/put';
import ButtonForFunction from '../Components/ButtonForFunction';
import { userTypes } from '../../../constants/userTypeConstant';


const StudentDeclaration = () => {

  const {applicationStudentId, update} = useParams();

   
    const history = useHistory();
    const [activetab, setActivetab] = useState("11");
    const [conscentData,setConscentData] = useState({});
   
    const {addToast} = useToasts();

    const [apiInfo,setAPiInfo] = useState('');
    const [singTime,setSignTime] = useState([]);
    const userTypeId = localStorage.getItem('userType');
    const [success,setSuccess] = useState(false);
    const [buttonStatus,setButtonStatus] = useState(false);

    useEffect(()=>{

        get(`StudentConsent/Get/${applicationStudentId}`)
        .then(res =>{ 
            console.log(res,'resStudentData');
            setConscentData(res);
        })

        fetch(`https://geolocation-db.com/json/`)
        .then(res => res?.json())
        .then(data => {
          console.log(data);
          setAPiInfo(data)
        });

    },[success])

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
        if (tab == "9") {
          history.push(`/addOtherInformation/${applicationStudentId}/${1}`);
        }
        if (tab == "10") {
          history.push(`/uploadDocument/${applicationStudentId}/${1}`);
        }
        if (tab == "11") {
          history.push(`/studentDeclaration/${applicationStudentId}/${1}`);
        }

    }

    const handleTerms = (event) => {

        const subData = new FormData();
  
        subData.append('StudentId', applicationStudentId);
        subData.append('IpAddress',apiInfo?.IPv4);
        post('StudentConsent/Sign',subData)
        .then(res => {
          if(res?.status == 200 && res?.data?.isSuccess == true){
            addToast(res?.data?.message,{
              appearance: 'success',
              autoDismiss: true
            })
            setSuccess(!success);
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        })
      }


      const sendEmail = () => {
        setButtonStatus(true);
        put(`StudentConsent/SendEmail/${applicationStudentId}`)
        .then(res => {
          setButtonStatus(false);
            if(res?.status == 200 && res?.data?.isSuccess == true){
                addToast("Email Sending is in Process",{
                    appearance: 'success',
                    autoDismiss: true
                })
                setSuccess(!success);

            }
            else{
              addToast(res?.data?.message, {
                appearance: "error",
                autoDismiss: true,
              });
            }
        })
      }

      function formatDate(string){
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toString([],options);
    }


    return (
        <div>

<Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Student Declaration</h3>
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

      {

update?

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

:

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

}


  

        <div className="container">

<div>
<div >
  <h5 className="mb-3">
    {" "}
    <b className="bg-u">Student Declaration</b>{" "}
  </h5>


</div>
    <span className="conscentText-style">I hereby agree and accept that SMS Higher Education Group (SMSHEG) have the authority of processing personal data contained in this form or other data which SMSHEG may obtain from other people and sources. I agree also to the processing of such data for any purposes connected with my University Admission requirements or any legitimate reason including communication with me following the completion of my admission and enrolment. In addition, I agree to allow SMSHEG processing personal data described as Special Category Data as defined under the General Data Protection Regulation. The processing to be undertaken for any purposes as indicated in the declaration above. In addition to the Privacy Notice linked to this form please also see our Corporate Privacy Policy on our website; <Link to='/https://smsheg.co.uk/404' target='_blank'>https://smsheg.co.uk/privacypolicy.</Link></span>

    <br/>
    <br/>
    <span className="conscentText-style">1. I understand and accept this statement.</span>

    <br/>

    <span className="conscentText-style">2. I have submitted all documents relevant to my application including all qualifications studied either in the UK or overseas. I take full responsibility and accountability for the originality of the certificates.</span>

    <br/>

    <span className="conscentText-style">3. I certify that the qualifications submitted for admission purposes are certified and awarded to me and I have given permission to SMSHEG to verify and cross check them. I understand that proving a false declaration is totally unacceptable and is deemed to be malpractice and/or fraud.</span>

    <br/>

    <span className="conscentText-style">4. My contact information is up-to-date and will inform the University I apply to of any change, and I will notify the University promptly of any changes to the information which I have submitted an application on enrolment.</span>

    <br/>

    <span className="conscentText-style">5. We provide guidance and support to our students, no one is allowed to help the students in their coursework.</span>
    
    <br/>

    <span className="conscentText-style">6. Everybody needs to follow the universities’ guidelines and respect their decisions.</span>

    <br/>

    <span className="conscentText-style">7. Our registered student cannot be passed at to any other agency or third party.</span>

    <br/>

    <span className="conscentText-style">8. Follow the university guidelines, only offer our listed courses to the students.</span>

    <br/>

    <span className="conscentText-style">9. Do not make any prior commitment to the student regarding interview, admission, student finance, courses.</span>

    <br/>

    <span className="conscentText-style">10. Do not compare with the policy of other agency or organisation and only follow our guidelines.</span>

    <br/>

    <span className="conscentText-style">11. Do not engage in any activity likely to damage SMS Higher Education Group’s or our partner’s reputations, the activity must be prohibited which likely to damage the academic or professional reputation of any university or other entity associated with the course.</span>

    <br/>

    <span className="conscentText-style">12. Always ensure to advice is given in a professional and accurate manner.</span>

    <br/>

    <span className="conscentText-style">13. Anyone not able to follow any of these conditions, their contract will be immediately terminated and might miss out from any outstanding commissions and bonuses.</span>
    
    <br/>

    <span className="conscentText-style">14. I confirm my email address is accurate and can be considered as my signature.</span>

</div>

           


</div>
{
             (conscentData == null || conscentData?.isDeclared == false) ?
             <div className="conscentSign-style ms-md-3 py-1 mt-2">
            <span className="inner-term-style">Terms and Conditions has not Signed yet !!!!</span>
          </div>
          :
          <div className="conscentSign-style2 ms-md-3 py-1 mt-2 text-white">
            <span className="inner-term-style">Terms and Conditions Signed Successfully.</span>
          </div>

          }
          

          <div className=" mt-1">
     
              {
                (userTypeId == userTypes?.SystemAdmin || userTypeId == userTypes?.Admin || userTypeId == userTypes?.ComplianceManager) ?
                <>
                
                {
                  (conscentData == null || conscentData?.consentSignStatusId == 1) ?
                   <div className="mb-1 text-right">
                   <Button color="primary"
                   onClick={sendEmail}
                   disabled={buttonStatus}
                   >
                       Send Email
                   </Button>
               </div>
               :
                (conscentData !== null && conscentData?.consentSignStatusId  == 2) ?
                <div className="mb-1 text-right">
                  
                 
                       <span className="text-info"> Email is sent with credentails </span>
                       <Button color="primary"
                   onClick={sendEmail}
                   disabled={buttonStatus}
                   >
                       Send Email Again
                   </Button>
               </div>
               :
                 (conscentData !== null && conscentData?.consentSignStatusId  == 3) ?

                 <div className="mb-1 text-right">
                  
                 
                  <span>Conscent Signed on: <span className="fw-style">{formatDate(conscentData?.consentSignTime)}</span></span>
                    <br/>
                  <span>Conscent Signed FromIp:<span className="fw-style"> {conscentData?.consentFromIp}</span></span>
                
               </div>
               :
               null

                 }
                
                </>

                 :
                 (userTypeId == userTypes?.Student) ? 
                 
                 
                 (conscentData == null || conscentData?.isDeclared == false) ?
                   <div className="mt-1 text-right">
                    <Button color="primary" onClick={handleTerms}>
                        Accept Terms and Conditions
                    </Button>
                </div>

               :

               <div className="mb-1 text-left ms-md-4  ">
                  
                 
                  <span>Conscent Signed on: <span className="fw-style">{formatDate(conscentData?.consentSignTime)}</span></span>
                    <br/>
                  <span>Conscent Signed FromIp:<span className="fw-style"> {conscentData?.consentFromIp}</span></span>
           
                </div>
                 

                 

                 :
                 null
              }

              </div>
        <div>
          <Link style={{marginLeft: '10px'}} to={`/uploadDocument/${applicationStudentId}/1`}>
          <Button color='warning'>
          <i className="fas fa-arrow-left-long mr-1"></i>
            Previous
          </Button>
          </Link>
          
        </div>

        </CardBody>
    </Card>
            
        </div>
    );
};

export default StudentDeclaration;