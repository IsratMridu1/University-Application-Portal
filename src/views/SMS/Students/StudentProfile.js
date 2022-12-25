import React, { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {  Card, CardBody, Input, CardHeader,Label, Col,  Row, Table, Form, FormGroup, Button } from 'reactstrap';
import get from '../../../helpers/get';
// import coverImage from '../../../../assets/img/profile/user-uploads/cover.jpg';
import coverImage from '../../../assets/img/UappLogo.png';
// import profileImage from '../../../../assets/img/profile/user-uploads/user-07.jpg';
import profileImage from '../../../assets/img/profile/user-uploads/user-07.jpg';
import ReactToPrint from 'react-to-print';
import { rootUrl } from '../../../constants/constants';
import EditDivButton from '../Components/EditDivButton';
import ButtonForFunction from '../Components/ButtonForFunction';
import LinkButton from '../Components/LinkButton';
import axios from 'axios'
import { userTypes } from '../../../constants/userTypeConstant';

const StudentProfile = () => {

    const [studentDetails, setStudentDetails] = useState({});
    const [date, setDate] = useState("");
    const [isHaveDisability, setIsHaveDisability] = useState(false);
    const [isHaveCriminalConvictions, setIsHaveCriminalConvictions] = useState(false);
    const [educationInfos, setEducationInfos] = useState([]);
    const [serialNum, setSerialNum] = useState(1);
    const [gMatResult, setGMatResult]  =useState({});
    const [greResult,setGreResult] = useState({});
    const [studentTestScore, setStudentTestScore] = useState([]);
    const [experience, setExperience] = useState([]);
    const [reference,setReference] = useState([]);

    const history = useHistory();
    const {sId} = useParams();

    console.log("userType", parseInt(localStorage.getItem("userType")));

    useEffect(()=>{
       get(`StudentProfile/Get/${sId}`).then(res=>{
        console.log("profileData",res);
        setStudentDetails(res);
        setIsHaveDisability(res?.profileOtherInfo?.isHaveDisability);
        setIsHaveCriminalConvictions(res?.profileOtherInfo?.isHaveCriminalConvictions);
        setEducationInfos(res?.educationInfos);
        console.log("eduInfo", res?.educationInfos)
        setGMatResult(res?.gmatScoreInfo);
        setGreResult(res?.greScoreInfo);
        setStudentTestScore(res?.studentTestScoreInfo);
        setExperience(res?.experienceinfo);
        setReference(res?.referenceInfo);

        var datee =res?.dateOfBirth;
        var utcDate = new Date(datee);
        var localeDte = utcDate.toLocaleString("en-CA");
        var bDate = localeDte?.split(",");
        setDate(bDate[0]);
       })
    },[])

    const backToStudentList = () =>{
        history.push('/studentList');
    }


    // get User Ip address

    const getData = async () => {
      const res1 = await axios.get('https://api.ipify.org?format=json')
      console.log(res1?.data,'data1');

      const res2 = await axios.get('https://api.ipify.org?format=json')
      console.log(res2?.data,'data2');

      const res3 = await axios.get('https://api.ipdata.co')
      console.log(res3,'data3');

      
      // https://api.ipdata.co


    
    }
    

    const getIp = () => {
       getData();
    }

    const tableStyle = {
      overflowX: 'scroll',
    };

    const handleEditFromProfilePage = (data) =>{
      
      
  

      history.push(`/addStudentApplicationInformation/${data?.id}/${1}`);
    }


    const handleUpdatePersonalStatement = (data) => {

      console.log('Checking Personal Statement Data',data);
     
  

      history.push(`/addPersonalStatement/${data?.id}/${1}`);

    }

    const handleUpdatePersonalInformation = (data) => {

      console.log('Updating Personal Information',data);

     
  

      history.push(`/addStudentInformation/${data?.id}/${1}`);

    }

    const handleUpdateTestScores = (data) => {
      console.log('Test Score Update', data);

      
  

      history.push(`/addTestScore/${data?.id}/${1}`);

    }

    const handleUpdateContactInformation = (data) => {

      console.log('Updating Contact Information',data);

      
  

      history.push(`/addStudentContactInformation/${data?.id}/${1}`);


    }

    const handleUpdateOtherInformation = (data) => {

      console.log('Updating Other Information', data);

      
  

      history.push(`/addOtherinformation/${data?.id}/${1}`);


    }

    const handleUpdateEducationalInformation = (data) => {


      console.log('Updating Educational Information', data);

      
  

      history.push(`/addStudentEducationalInformation/${data?.id}/${1}`);



    }

    const handleUpdateGREAndGMATScores = (data) => {
      console.log('Test Score Update', data);

      

     
  

      history.push(`/addTestScore/${data?.id}/${1}`);

    }

    const handleUpdateExperience = (data) => {

      console.log('Experience Update', data);

      
  

      history.push(`/addExperience/${data?.id}/${1}`);


    }

    const handleUpdateReference = (data) => {

      console.log('Reference Update', data);

     
  

      history.push(`/addReference/${data?.id}/${1}`);



    }

    const componentRef = useRef();

    const handleDate = e =>{
      var datee = e;
      var utcDate = new Date(datee);
      var localeDate = utcDate.toLocaleString("en-CA");
      const x = localeDate.split(",")[0];
      return x;
    }

    return (
        <div ref={componentRef}>
        <Card className="uapp-card-bg">
          <CardHeader className="page-header">

            <div className='d-flex align-items-center'>
              <div className='mt-1'>
                <h3 className="text-white">Student Profile</h3>
              </div>
              <div className='ml-2'>
              <ReactToPrint
                trigger={() => <span className="text-white cursor-pointer" title="Print to pdf"><i className="fas fa-print"></i></span>}
                content={() => componentRef.current}
              />
              </div>
            </div>
            
            <div className="page-header-back-to-home" >
              <span onClick={backToStudentList} className="text-white"> <i className="fas fa-arrow-circle-left"></i> Back to Student List</span>
            </div>

          </CardHeader>
        </Card>

        <div className="uapp-employee-profile">
          <Row>

            <Col md="8">
              <div className="uapp-employee-profile-left">
              <Card>
                <CardBody>
                    <div className="uapp-employee-cover-image">
                      <div className="bg-image" style={{ backgroundImage: `url(${coverImage})`, width: '100%' , backgroundSize: 'contain'}}>   
                                    
                    </div>
                  </div>



                  <div className="uapp-employee-profile-image-edit">
                    <Row>
                      <Col> 
                    <div className="uapp-employee-profile-image">
                    <div className="text-left">
                       <img className="empProfileImg"  src={rootUrl+studentDetails?.profileImage?.fileUrl} alt='profile_img'/>
                    </div>
                    </div>  
                    </Col>

                     <Col> 
                      <EditDivButton
                        className={"uapp-employee-profile-Edit"}
                        func={()=>handleEditFromProfilePage(studentDetails)}
                        permission={6}
                      />
                     </Col> 
                    </Row>            
                   </div>     


                      <div className="uapp-employee-profile-generalInfo"> 
                       <Row>
                         <Col md="6"> 

                          <ul className="uapp-ul text-left">
                            <li> 
                              <h4>{studentDetails?.nameTittle} {studentDetails?.firstName} {studentDetails.lastName} ({studentDetails?.studentViewId})</h4>
                            </li>

                             <li> 
                              {/* <h6>{employeeType.name}</h6> */}
                            </li>


                          </ul>

                      </Col> 

                      <Col md="6"> 
                     <ul className="uapp-ul text-right1">
                            <li> 
                              <span> Email : {studentDetails?.email}</span>
                            </li>

                            <li> 
                              <span> Phone Number : {studentDetails?.phoneNumber}</span>
                            </li>

                          </ul>
                      </Col> 
                    </Row> 
                    </div> 
                  </CardBody>
                </Card>

                {/* personal statement */}
                <div className=" info-item mt-4">
                  <Card>  
                   <CardBody>
                    <div className="hedding-titel d-flex justify-content-between">
                    <div>
                    <h5> <b>Personal Statement</b> </h5>
                     
                    <div className="bg-h"></div>
                    </div>

                    <EditDivButton
                      className={"text-right edit-style  p-3"}
                      func={()=>handleUpdatePersonalStatement(studentDetails)}
                      permission={6}
                    />

                    </div>
                    <div>
                      <p className='pt-2'>{studentDetails?.profilePersonalStatement?.statement}</p>
                    </div>
                   </CardBody>
                  </Card>
                </div>

            {/* personal info */}
            <div className=" info-item mt-4">
              <Card>  
                 <CardBody>
                 <div className="hedding-titel d-flex justify-content-between">
                 <div>
                 <h5> <b>Personal Information</b> </h5>
                  
                 <div className="bg-h"></div>
                 </div>

                 <EditDivButton
                    className={"text-right edit-style  p-3"}
                    func={()=>handleUpdatePersonalInformation(studentDetails)}
                    permission={6}
                 />

                 </div>
                      <Table className="table-bordered mt-4" >
                      <tbody>
                        <tr>
                          <td width="40%">
                            <b>Title:</b>
                          </td>

                          <td width="60%">
                            {studentDetails?.nameTittle}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Name:</b>
                          </td>

                          <td width="60%">
                            {studentDetails?.firstName} {studentDetails?.lastName}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Gender:</b>
                          </td>

                          <td width="60%">
                            {studentDetails?.gender}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Date of birth:</b>
                          </td>

                          <td width="60%">
                            {date}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Birth country:</b>
                          </td>

                          <td width="60%">
                            {studentDetails?.birthCountry}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Nationality:</b>
                          </td>

                          <td width="60%">
                            {studentDetails?.nationality}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Marital status:</b>
                          </td>

                          <td width="60%">
                            {studentDetails?.maritalStatus}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Passport no:</b>
                          </td>

                          <td width="60%">
                            {studentDetails?.passportNumber}
                          </td>
                        </tr>
                        

                        </tbody>
                      </Table>
                 </CardBody>
              </Card>
          </div>



          {/* contact info */}
          <div className=" info-item mt-4">
            <Card>  
                 <CardBody>
                 <div className="hedding-titel d-flex justify-content-between">
                 <div>
                 <h5> <b>Contact Information</b> </h5>
                  
                 <div className="bg-h"></div>
                 </div>

                 <EditDivButton
                  className={"text-right edit-style  p-3"}
                  func={()=>handleUpdateContactInformation(studentDetails)}
                  permission={6}
                 />


                 </div>

                    <Table className="table-bordered mt-4" >
                      <tbody>
                        <tr>
                          <td width="40%">
                           <span> <b>Address type:</b></span>
                          </td>

                          <td width="60%">
                          {studentDetails?.studentContactInfos?.addressTypeName}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                          <span> <b>Phone number:</b></span>
                          </td>

                          <td width="60%">
                          {studentDetails?.phoneNumber}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                           <span> <b>Cell phone number:</b></span>
                          </td>

                          <td width="60%">
                          {studentDetails?.studentContactInfos?.cellPhoneNumber}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                           <span> <b>Email:</b></span>
                          </td>

                          <td width="60%">
                          {studentDetails?.email}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                           <span> <b>Country:</b></span>
                          </td>

                          <td width="60%">
                          {studentDetails?.studentContactInfos?.country}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                           <span> <b>City:</b></span>
                          </td>

                          <td width="60%">
                          {studentDetails?.studentContactInfos?.city}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                           <span> <b>State:</b></span>
                          </td>

                          <td width="60%">
                          {studentDetails?.studentContactInfos?.state}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                           <span> <b>Zip code:</b></span>
                          </td>

                          <td width="60%">
                          {studentDetails?.studentContactInfos?.zipCode}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                           <span> <b>Address line:</b></span>
                          </td>

                          <td width="60%">
                          {studentDetails?.studentContactInfos?.addressLine}
                          </td>
                        </tr>

                        </tbody>
                      </Table>
                 </CardBody>
              </Card>
          </div>

          {/* other info */}
          <div className=" info-item mt-4">
            <Card>  
                 <CardBody>
                 <div className="hedding-titel d-flex justify-content-between">
                 <div>
                 <h5> <b>Other Information</b> </h5>
                  
                 <div className="bg-h"></div>
                 </div>
                 

                  <EditDivButton
                     className={"text-right edit-style  p-3"}
                     func={()=>handleUpdateOtherInformation(studentDetails)}
                     permission={6}
                  />

                 </div>

                    <Table className="table-bordered mt-4" >
                      <tbody>
                        <tr>
                          <td width="40%">
                          <span> <b>Have disability:</b></span>
                          </td>

                          <td width="60%">
                            {
                              isHaveDisability ? <span>Yes</span> : <span>No</span>
                            }
                          </td>
                        </tr>

                          {
                            isHaveDisability ?
                            <tr>
                              <td width="40%">
                               <span> <b>Disability description:</b></span>
                              </td>

                              <td width="60%">
                                {studentDetails?.profileOtherInfo?.disabilityDescription}
                              </td>
                            </tr>
                              :
                              null
                          }

                        <tr>
                          <td width="40%">
                          <span> <b>Have criminal convictions:</b></span>
                          </td>

                          <td width="60%">
                            {
                              isHaveCriminalConvictions ? <span>Yes</span> : <span>No</span>
                            }
                          </td>
                        </tr>

                        {
                            isHaveCriminalConvictions ?
                            <tr>
                              <td width="40%">
                               <span> <b>Criminal convictions description:</b></span>
                              </td>

                              <td width="60%">
                                {studentDetails?.profileOtherInfo?.criminalConvictionsDescription}
                              </td>
                            </tr>
                              :
                              null
                          }
                        

                        </tbody>
                      </Table>
                 </CardBody>
              </Card>
          </div>
          
          {/* educational info */}
          <div className=" info-item mt-4">
            <Card>  
                 <CardBody>
                 <div className="hedding-titel d-flex justify-content-between">
                 <div>
                 <h5> <b>Educational Information</b> </h5>
                  
                 <div className="bg-h"></div>
                 </div>
                 
                  <EditDivButton
                    className={"text-right edit-style  p-3"}
                    func={()=>handleUpdateEducationalInformation(studentDetails)}
                    permission={6}
                  />

                 </div>

                    <div className="table-responsive pt-3">
                    <Table className="table-sm striped" style={tableStyle}>
                      <thead className="">
                        <tr style={{ textAlign: "center" }}>
                          <th>#</th>
                          <th>Institute</th>
                          <th>Program Level</th>
                          <th>Subject</th>
                          <th>Duration</th>
                          <th>Grade</th>
                          <th>Still Studying</th>
                          <th>Study Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {educationInfos?.map((edu, i) => (
                          <tr key={i} style={{ textAlign: "center" }}>
                            <th scope='row'>{serialNum + i}</th>
                            <td>
                              {edu?.nameOfInstitution}
                            </td>

                            <td>
                              {edu?.educationLevelName}
                            </td>
                        
                            <td>
                              {edu?.qualificationSubject}
                            </td>
                        
                            <td>
                              {edu?.duration}
                            </td>
                        
                            <td>
                              {edu?.finalGrade}
                            </td>
                            <td>
                              {edu?.stillStudying === false ? <span>No</span> : <span>Yes</span>}
                            </td>
                            <td>
                              {/* {edu?.attendedInstitutionFrom} to  
                              {
                                edu?.stillStudying === true ? <span>{edu?.attendedInstitutionTo}</span>
                                : <span>still studying</span>
                              } */}
                              {
                                edu?.stillStudying === false ?
                                <div>
                                  {handleDate(edu?.attendedInstitutionFrom)} to {handleDate(edu?.attendedInstitutionTo)}
                                </div>
                                :
                                <div>
                                  {handleDate(edu?.attendedInstitutionFrom)} to {<div>
                                    ongoing
                                  </div>}
                                </div>
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
              

                    </div>
                 </CardBody>
              </Card>
          </div>


          <div className=" row info-item mt-4">

          <div className='col-md-6 mt-2' style={{ textAlign: "left" }}>
          <Card className="test-score-card-style2">
            <CardBody className="">

            <div className="hedding-titel d-flex justify-content-between mb-1">
            <div>
            <h5> <b>GRE Information</b> </h5>
             
            <div className="bg-h"></div>
            </div>
            
                <EditDivButton
                  className={"text-right edit-style  p-3"}
                  func={()=>handleUpdateGREAndGMATScores(studentDetails)}
                  permission={6}
                />

            </div>

            <h6>Quantitative Score: {greResult?.quantitativeScore}</h6>
            <h6>Quantitative Rank: {greResult?.quantitativeRank}</h6>
            <h6>Verbal Score: {greResult?.verbalScore}</h6>
            <h6>Verbal Rank: {greResult?.verbalRank}</h6>
            <h6>Writing Score: {greResult?.writingScore}</h6>
            <h6>Writing Rank: {greResult?.writingRank}</h6>

               
        
            </CardBody>

          

       

           

          </Card>


        </div>

        <div className='col-md-6 mt-2' style={{ textAlign: "left" }}>
        <Card className=" test-score-card-style2">
          <CardBody className="">

          <div className="hedding-titel d-flex justify-content-between mb-1">
          <div>
          <h5> <b>GMAT Information</b> </h5>
           
          <div className="bg-h"></div>
          </div>

           <EditDivButton
              className={"text-right edit-style  p-3"}
              func={()=>handleUpdateGREAndGMATScores(studentDetails)}
              permission={6}
            />

          </div>

          

          <h6>Quantitative Score: {gMatResult?.quantitativeScore}</h6>
          <h6>Quantitative Rank: {gMatResult?.quantitativeRank}</h6>
          <h6>Verbal Score: {gMatResult?.verbalScore}</h6>
          <h6>Verbal Rank: {gMatResult?.verbalRank}</h6>
          <h6>Total Score: {gMatResult?.totalScore}</h6>
          <h6>Total Rank: {gMatResult?.totalRank}</h6>
          <h6>Writing Score: {gMatResult?.writingScore}</h6>
          <h6>Writing Rank: {gMatResult?.writingRank}</h6>

             
      
          </CardBody>

         

     

         

        </Card>


      </div>

        </div>


          <div className=" info-item mt-4">
            <Card>  
                 <CardBody>
                 <div className="hedding-titel d-flex justify-content-between">
                 <div>
                 <h5> <b>Test Scores</b> </h5>
                  
                 <div className="bg-h"></div>
                 </div>
                 
                  <ButtonForFunction
                     className={"p-3"}
                     func={()=>handleUpdateTestScores(studentDetails)}
                     name={'View Test Scores'}
                     color={'primary'}
                     permission={6}
                  />
                 
                  

                 </div>

                

                  



                 </CardBody>
              </Card>
           </div>


           <div className=" info-item mt-4">
           <Card>  
                <CardBody>
                <div className="hedding-titel d-flex justify-content-between">
                <div>
                <h5> <b>Experience</b> </h5>
                 
                <div className="bg-h"></div>
                </div>

                 <EditDivButton
                    className={"text-right edit-style  p-3"}
                    func={()=>handleUpdateExperience(studentDetails)}
                    permission={6}
                  />

                </div>

                   <div className="table-responsive pt-3">
                   <Table className="table-sm striped" style={tableStyle}>
                     <thead className="">
                       <tr style={{ textAlign: "center" }}>
                         <th>#</th>
                         <th>Company Name</th>
                         <th>Job Title</th>
                         <th>Employment Details</th>
                         <th>Start Date</th>
                         <th>End Date</th>
                         <th>Still Working?</th>
                         
            
                       </tr>
                     </thead>
                     <tbody>
                       {experience?.map((ex, i) => (
                         <tr key={i} style={{ textAlign: "center" }}>
                           <th scope='row'>{serialNum + i}</th>
                           <td>
                             {ex?.companyName}
                           </td>

                           <td>
                             {ex?.jobTitle}
                           </td>
                       
                           <td>
                             {ex?.employeementDetails}
                           </td>
                       
                           <td>
                             {handleDate(ex?.startDate)}
                           </td>
                       
                           <td>
                             {(ex?.isStillWorking)? <span>Not Available</span> : <span>{handleDate(ex?.endDate)}</span> }
                           </td>
                           <td>
                             {(ex?.isStillWorking)? <span>Yes</span> : <span>No</span>}
                           </td>
                          
                         </tr>
                       ))}
                     </tbody>
                   </Table>
             

                   </div>
                </CardBody>
             </Card>
         </div>


         <div className=" info-item mt-4">
           <Card>  
                <CardBody>
                <div className="hedding-titel d-flex justify-content-between">
                <div>
                <h5> <b>Reference</b> </h5>
                 
                <div className="bg-h"></div>
                </div>

                  <EditDivButton
                    className={"text-right edit-style  p-3"}
                    func={()=>handleUpdateReference(studentDetails)}
                    permission={6}
                  />

                </div>

                   <div className="table-responsive pt-3">
                   <Table className="table-sm striped" style={tableStyle}>
                     <thead className="">
                       <tr style={{ textAlign: "center" }}>
                         <th>#</th>
                         <th>Address Line</th>
                         <th>City</th>
                         <th>Country</th>
                         <th>Email</th>
                         <th>Institute Company</th>
                         <th>Phone Number</th>
                         <th>Reference Name</th>
                         <th>Reference Type</th>
                         <th>State</th>
                         
            
                       </tr>
                     </thead>
                     <tbody>
                       {reference?.map((ref, i) => (
                         <tr key={i} style={{ textAlign: "center" }}>
                           <th scope='row'>{serialNum + i}</th>
                           <td>
                             {ref?.addressLine}
                           </td>

                           <td>
                             {ref?.city}
                           </td>
                       
                           <td>
                             {ref?.country}
                           </td>
                       
                           <td>
                             {ref?.emailAddress}
                           </td>

                           <td>
                             {ref?.institute_Company}
                           </td>

                           <td>
                             {ref?.phoneNumber}
                           </td>

                           <td>
                             {ref?.referenceName}
                           </td>

                           <td>
                             {ref?.referenceTypeName}
                           </td>

                           <td>
                             {ref?.state}
                           </td>
                       
                         
                         
                          
                         </tr>
                       ))}
                     </tbody>
                   </Table>
             

                   </div>
                </CardBody>
             </Card>
         </div>


           

        </div>
      </Col>



            <Col md="4"> 
             <Card className="uapp-employee-profile-right">
               <div className="uapp-profile-CardHeader">
                  <div className="uapp-circle-image margin-top-minus">
                    <img src={rootUrl+studentDetails?.consultant?.consultantProfileImageMedia?.thumbnailUrl} alt="consultant_photo"/>
                  </div>    

                  <h5>{studentDetails?.consultant?.firstName} {studentDetails?.consultant?.lastName}</h5>
                   <p> Consultant </p>  
              </div>
                <CardBody>

                   <div>
                   <ul className="uapp-ul text-center">
                       <li> {studentDetails?.consultant?.email} </li>
                       <li> {studentDetails?.consultant?.phoneNumber} </li>
                       {/* <li> 80-82 Nelson st, Whitechapel, E12DY, london United Kingdom </li> */}
                     </ul>
                   </div>

              </CardBody>
          </Card>

              <Card className="p-3">

                  <div className="hedding-titel d-flex justify-content-between">
                    <div>
                    <h5> <b>Notice</b> </h5>
                     
                    <div className="bg-h"></div>
                    </div>

                    {/* <EditDivButton
                      className={"text-right edit-style  p-3"}
                      func={()=>handleUpdatePersonalStatement(studentDetails)}
                      permission={6}
                    /> */}

                    </div>


                    <div className="notice-item card-widget mt-3 ">
                      <div className="notice-titel">
                        <h6> Super Admin</h6>
                        <span> 10/12/2021</span>
                        </div>
                         <div className="notice-description"> 
                             <span> No Qualifications required !! University of Suffolk London & Manchester Campus, Oct 2021 Intake. </span>
                             <div className="uapp-read-more-btn">
                              <a className="" href="javascript:void(0)"> Read More <span> <i className="fas fa-long-arrow-alt-right"></i> </span> </a>
                            </div>
                        </div>
                    </div>


                    <div className="notice-item card-widget mt-3 ">
                      <div className="notice-titel">
                        <h6> Super Admin</h6>
                        <span> 10/12/2021</span>
                        </div>
                         <div className="notice-description"> 
                             <span> No Qualifications required !! University of Suffolk London & Manchester Campus, Oct 2021 Intake. </span>
                             <div className="uapp-read-more-btn">
                              <a className="" href="javascript:void(0)"> Read More <span> <i className="fas fa-long-arrow-alt-right"></i> </span> </a>
                            </div>
                        </div>
                    </div>



                    <div className="notice-item card-widget mt-3 ">
                      <div className="notice-titel">
                        <h6> Super Admin</h6>
                        <span> 10/12/2021</span>
                        </div>
                         <div className="notice-description"> 

                             <span> No Qualifications required !! University of Suffolk London & Manchester Campus, Oct 2021 Intake. </span>
                             <div className="uapp-read-more-btn">
                              <a className="" href="javascript:void(0)"> Read More <span> <i className="fas fa-long-arrow-alt-right"></i> </span> </a>
                            </div>
                        </div>
                    </div>


                    <div className="notice-item card-widget mt-3 ">
                      <div className="notice-titel">
                        <h6> Super Admin</h6>
                        <span> 10/12/2021</span>
                        </div>
                         <div className="notice-description"> 
                             <span> No Qualifications required !! University of Suffolk London & Manchester Campus, Oct 2021 Intake. </span>
                            <div className="uapp-read-more-btn">
                              <a className="" href="javascript:void(0)"> Read More <span> <i className="fas fa-long-arrow-alt-right"></i> </span> </a>
                            </div>

                        </div>
                    </div>
        
              </Card>

              {
                parseInt(localStorage.getItem("userType")) === userTypes?.Student ?
                <Card className='p-3'>

              <div className="hedding-titel d-flex justify-content-between">
                    <div>
                    <h5> <b>Concent</b> </h5>
                     
                    <div className="bg-h"></div>
                    </div>

                    {/* <EditDivButton
                      className={"text-right edit-style  p-3"}
                      func={()=>handleUpdatePersonalStatement(studentDetails)}
                      permission={6}
                    /> */}

                    </div>

              <div className="notice-item card-widget mt-3 ">
                      
                         <div className="text-center"> 
                             <span>Consent Is Not Signed Yet. </span>
                             
                             <div>

                             <ButtonForFunction
                             func={getIp}
                              name={'Sign Consent'}
                              className={'badge-primary mt-2'}
                              />
                              
                              
                              
                            </div>
                        </div>
              </div>

              </Card>
              :
              <Card className='p-3'>

              <div className="hedding-titel d-flex justify-content-between">
                    <div>
                    <h5> <b>Concent</b> </h5>
                     
                    <div className="bg-h"></div>
                    </div>

                    {/* <EditDivButton
                      className={"text-right edit-style  p-3"}
                      func={()=>handleUpdatePersonalStatement(studentDetails)}
                      permission={6}
                    /> */}

                    </div>

              <div className="notice-item card-widget mt-3 ">
                      
                         <div className="notice-description"> 
                             <span>Consent Signed On, </span>
                             <br/>
                             <span>Date: </span>
                             <br/>
                             <span>From: IP</span>
                             <div className="text-center mt-2">
                              <Button className='badge-primary'>Download</Button>
                            
                            </div>
                        </div>
              </div>

              </Card>
              }

              </Col>
              </Row>
              </div>


      {/*<Card>*/}

      {/*    <CardBody>*/}

      {/*        <Row>*/}

      {/*            <Col md="8">*/}
      {/*            <img className="empProfileImg" src={`${rootUrl}/${finalImg}`}></img>*/}
      {/*            </Col>*/}

      {/*            <Col md="4">*/}

      {/*            </Col>*/}

      {/*        </Row>*/}


      {/*    </CardBody>*/}

      {/*</Card>*/}
 </div>
 );
};

export default StudentProfile;