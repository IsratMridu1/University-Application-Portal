import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory, useLocation } from 'react-router-dom';
import { Button, ButtonGroup, Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Row, Table, Form, FormGroup } from 'reactstrap';
import get from '../../../helpers/get';
import Select from "react-select";
import { rootUrl } from '../../../constants/constants';
import profileImage from '../../../assets/img/profile/user-uploads/user-07.jpg'
import EditDivButton from '../Components/EditDivButton';
import ButtonForFunction from '../Components/ButtonForFunction';

const SubjectProfile = () => {

    const [subjectData, setSubjectData] = useState({});
    const [campList, setCampList] = useState([]);
    const [serialNum, setSerialNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [campData, setCampData] = useState(null);
    const [campusId, setCampusId] = useState(undefined);
    

    const location = useLocation();
    const history = useHistory();
    const {subjId} = useParams();

   

    // handle back to subject list and campus subject list from subject profile
    const backToSubjectList = () =>{
      if(location?.campId != undefined){
        history.push(`/campusSubjectList/${location?.campId}`);
      }
      else if(location.uniSubList != undefined){
        history.push(`/universitySubjectList/${location.uniSubList}`);
      }
      else if(location.unnniId != undefined){
        history.push(`/universitySubjectList/${location.unnniId}`);
      }
      else if(location.uniDetailId != undefined){
        history.push(`/universityDetails/${location.uniDetailId}`)
      }
      else{
        history.push('/subjectList');
      } 
    }

    useEffect(()=>{
      setCampusId(location?.campId);
      get(`Subject/Profile/${subjId}`)
      .then(res=>{
        console.log(res);
        setSubjectData(res);
        setCampList(res?.campusSubjects);
        setLoading(false);
      });

      if(campusId != undefined){
            get(`UniversityCampus/Get/${campusId}`)
            .then(res=>{
                
                setCampData(res);
            })
        }
        else{
            return;
        }
        // localStorage.removeItem("campIdSubProfile");
    },[campusId, subjId])

  

    const handleProfileEdit = () => {
      history.push({
        pathname: `/addSubject/${subjectData?.id}`,
        subjectId: subjId,
        uniSubList: location.uniSubList
      })
    }

    const handleRedirectUniProfile = (subjectData) => {
      console.log("subData", subjectData?.id);
      history.push({
        pathname: `/universityDetails/${subjectData?.university?.id}`,
        subjectDataUniversityId: subjectData?.id
      })
    }

    return (
        <div>
          <Card className="uapp-card-bg">
            <CardHeader className="page-header">

              <h3 className="text-white">Subject Details</h3>
              <div className="page-header-back-to-home" >
                <span onClick={backToSubjectList} className="text-white"> <i className="fas fa-arrow-circle-left"></i>{" "}
                {
                  location?.campId != undefined ? "Back to Campus Subject List"
                  :
                  location.uniSubList != undefined || location.unnniId != undefined ? "Back to University Subject List"
                  :
                  location.uniDetailId != undefined ? "Back to University Details"
                  :
                  "Back to Subject List"
                }
                </span>
              </div>

            </CardHeader>
          </Card>

         <div className="uapp-employee-profile">

          {/* <Row>
           <Col md="12"> 
            <Card className="uapp-employee-profile-right" >
             <div className="uapp-profile-CardHeader">
                  
                
                <h5> {subjectData?.name}</h5>
                 <p> {subjectData?.providerType?.name} </p>  
            </div>
              <CardBody>

                 <div>
                 <ul className="uapp-ul text-center">
                     <li> {subjectData?.email} </li>
                     <li> {subjectData?.phoneNumber} </li>
                   
                   </ul>
                 </div>

            </CardBody>
          </Card>

          
           </Col>
         </Row> */}



         <Row>

          <Col md='8'>

          <Card>
                <CardBody>
                    



                  <div className="">
                    <Row>
                      <Col> 
                        <div>
                        <div className="text-left">
                            <h4 className='ms-2'>{subjectData?.name}</h4>
                        </div>
                        </div>  
                      </Col>

                     <Col> 
                      <EditDivButton
                        func={handleProfileEdit}
                        className={"uapp-employee-profile-Edit"}
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
                                <span> Program : {subjectData?.programLevel?.name} </span>
                            </li>

                             <li> 
                                <span> Duration : {subjectData?.duration}</span>
                            </li>


                          </ul>

                      </Col> 

                      <Col md="6"> 
                     <ul className="uapp-ul text-right1">
                            <li> 
                              {/* <span> Programm : {subjectData?.programLevel?.name} </span> */}
                            </li>

                            <li> 
                              {/* <span> Duration : {subjectData?.duration}</span> */}
                            </li>

                          </ul>
                      </Col> 
                    </Row> 
                    </div> 
                  </CardBody>
                </Card>

                <div className=" info-item mt-4">
                  <Card>  
                   <CardBody>
                    <div className="hedding-titel d-flex justify-content-between">
                    <div>
                    <h5> <b>Description</b> </h5>
                     
                    <div className="bg-h"></div>
                    </div>
                    {/* <div className="text-right edit-style  p-3" >
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                  </div> */}

                    </div>
                    <div>
                      <p className='pt-2'>{subjectData?.description}</p>
                    </div>
                   </CardBody>
                  </Card>
                </div>

                

                {/* subject information starts here */}
                <div className=" info-item mt-4">
              <Card>  
                 <CardBody>
                 <div className="hedding-titel d-flex justify-content-between">
                 <div>
                 <h5> <b>General Information</b> </h5>
                  
                 <div className="bg-h"></div>
                 </div>
                 <div className="text-right edit-style  p-3">
                 {/* <span> <i className="fas fa-pencil-alt pencil-style"></i> </span> */}
               </div>

                 </div>
                      <Table className="table-bordered mt-4" >
                      <tbody>
                        
                        <tr>
                          <td width="40%">
                            <b>Name:</b>
                          </td>

                          <td width="60%">
                            {subjectData?.name}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Program:</b>
                          </td>

                          <td width="60%">
                            {subjectData?.programLevel?.name}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Duration:</b>
                          </td>

                          <td width="60%">
                            {subjectData?.duration}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Department:</b>
                          </td>

                          <td width="60%">
                            {subjectData?.department?.name}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Sub-Department:</b>
                          </td>

                          <td width="60%">
                            {subjectData?.subDepartment?.name}
                          </td>
                        </tr>
                        
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
               </div>
                {/* university information ends here */}
            
            {/* camp list start */}
            {
              !campData  ?
                 <>
                  <div className=" info-item mt-4">
                    <Card>  
                      <CardBody>
                      <div className="hedding-titel d-flex justify-content-between">
                      <div>
                      <h5> <b>Campus List</b> </h5>

                      <div className="bg-h"></div>
                      </div>
                      {/* <div className="text-right edit-style  p-3">
                      <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                    </div> */}
                   </div>  
                  <>
                 {
                  campList.length<1 ? <p className='mt-4'>This subject is not added to any campus.</p>
                  :
                  <>
                  {loading ? (
                      <h2 className="text-center">Loading...</h2>
                    ) :
                    <div className="table-responsive pt-3">
                    <Table className="table-sm striped">
                      <thead className="">
                        <tr style={{ textAlign: "center" }}>
                          <th scope='row'>#</th>
                          <th>Name</th> 
                          <th>Address</th>
                          <th>Student</th>
                          
                    <th style={{ width: "8%" }} className="text-center">
                      Action
                    </th>
                        </tr>
                      </thead>
                      <tbody>
                        {campList?.map((campus, i) => (
                          <tr key={i} style={{ textAlign: "center" }}>
                            <th scope='row'>{serialNum + i}</th>
                            
                            <td>
                              {campus?.universityCampus?.name}
                            </td>
                            <td>
                              {campus?.universityCampus?.addressLine}{","} {campus?.universityCampus?.campusCity}
                            </td>
                            <td>
                              Total Student = {campus?.universityCampus?.totalStudent} {<br />}
                              International Student = {campus?.universityCampus?.internationalStudent}
                            </td>
                    
                            
                            <td style={{ width: "8%" }} className="text-center">
                              <ButtonGroup variant="text">
                              <Link to= {`/campusDetails/${campus?.campusId}`}>
                                <Button color="primary" className="mx-1 btn-sm">
                                  {" "}
                                  <i className="fas fa-eye"></i>{" "}
                                </Button>
                                </Link>
                                {/* <Button color="dark" className="mx-1 btn-sm">
                                  {" "}
                                  <i className="fas fa-edit"></i>{" "}
                                </Button>
                                <Button color="danger" className="mx-1 btn-sm">
                                  <i className="fas fa-trash-alt"></i>
                                </Button> */}
                              </ButtonGroup>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
              

                    </div>
                    }
                  </>
                 }
                </>
                
                 </CardBody>
              </Card>
          </div>
                    </>
                    :
                    null
            }
            {/* camp list end */}

      
         
            <br /><br /><br />
            <br /><br /><br />

          </Col>

      


          <Col md='4'>

            {/* for showing university information starts here */}
            <Card className="uapp-employee-profile-right">
             <div className="uapp-profile-CardHeader">
                <div className="uapp-circle-image margin-top-minus">
                     
                      {
                        subjectData?.university?.universityLogo?.fileUrl == null ?
                        <img src={profileImage} alt='university_img'/>
                        :
                        <img src={rootUrl+subjectData?.university?.universityLogo?.fileUrl} alt='university_img'/>
                        
                      }
                     
                </div>    
                
                <div className='d-flex justify-content-center'>
                  <h5>{subjectData?.university?.name} ({subjectData?.university?.shortName})</h5>
                  <div>
                  <ButtonForFunction
                    func={() => handleRedirectUniProfile(subjectData)}
                    color={"primary"}
                    className={"mx-1 btn-sm my-auto"}
                    icon={<i className="fas fa-eye"></i>}
                    permission={6}
                  />
                  </div>
                </div>

                 <p> {subjectData?.university?.universityType?.name} </p>  
            </div>
              <CardBody>

                 <div>
                    <ul className="uapp-ul text-center">
                      {
                        subjectData?.university?.universityCity && subjectData?.university?.universityState?.name && subjectData?.university?.universityCountry?.name ?
                        <li>
                          {subjectData?.university?.universityCity}{","} {subjectData?.university?.universityState?.name}{","} {subjectData?.university?.universityCountry?.name}
                        </li>
                        :
                        <p>No data available</p>
                      }
                    </ul> 
                 
                     {/* <span> Address : {subjectData?.university?.universityCity}{","} {subjectData?.university?.universityState?.name}{","} {subjectData?.university?.universityCountry?.name}</span>
                     <br/>
                     {
                        subjectData?.university?.universityCity && subjectData?.university?.universityState?.name && subjectData?.university?.universityCountry?.name ? 
                        <span> {subjectData?.university?.universityCity}{","} {subjectData?.university?.universityState?.name}{","} {subjectData?.university?.universityCountry?.name}</span>
                        :
                        <p>No data available</p>
                     } */}
                     
                 </div>

             </CardBody>
           </Card>
            {/* for showing university information ends here */}

           {/* for showing campus information starts here */}
           {
             campData ? 
             <Card>
              <CardBody>

              <div className="hedding-titel d-flex justify-content-between mb-4">
                 <div>
                 <h5> <b>Campus</b> </h5>
                  
                 <div className="bg-h"></div>
                 </div>
                 {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div> */}

                 </div>

                 <div className="uapp-ul text-center">
                    <h5>{campData?.name}</h5>
                    <p>{campData?.addressLine}{","} {campData?.campusCity}</p>                 
                 </div>

                 </CardBody>
             </Card>
             :
             null
           }
            {/* for showing campus information ends here */}

            {/* For showing tution fee */}
          
              <Card>
                <CardBody>

                <div className="hedding-titel d-flex justify-content-between mb-4">
                 <div>
                 <h5> <b>Tution Fee</b> </h5>
                  
                 <div className="bg-h"></div>
                 </div>
                 {/* <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div> */}

                 </div>
                  
                 {
                    subjectData?.subjectFee ?
                    <>
                     <div className='d-flex justify-content-between'>
                       <span>EU Tution Fee</span>
                       <p>€{subjectData?.subjectFee?.eU_TutionFee}</p>
                     </div>
                     
                     <div className='d-flex justify-content-between'>
                        <span>International Tution Fee</span>
                        <p>€{subjectData?.subjectFee?.internationalTutionFee}</p>
                     </div>
                     
                     <div className='d-flex justify-content-between'>
                        <span>Local Tution Fee</span>
                        <p>€{subjectData?.subjectFee?.localTutionFee}</p>
                     </div>
                    </>
                    :
                    <p>No data available</p>
                 }


                </CardBody>
              </Card>
              {/* tution fee ends here */}

              {/* features */}
              
              {/* <Card>
                <CardBody>

                <div className="hedding-titel d-flex justify-content-between mb-4">
                 <div>
                 <h5> <b>Features</b> </h5>
                  
                 <div className="bg-h"></div>
                 </div>
                 <div className="text-right edit-style  p-3">
                 <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
               </div>

                 </div>


              
                </CardBody>
              </Card> */}

              <div className=" info-item mt-4">
              <Card>
                <CardBody>

                <div className="hedding-titel d-flex justify-content-between mb-4">
                 <div>
                 <h5> <b>Delivery Pattern</b> </h5>
                  
                 <div className="bg-h"></div>
                 </div>
               

                 </div>

                 {
                   subjectData?.deliveryPatterns?.map((val,i) => 
                   <li key={i}>
                    {val?.deliveryPattern?.name}
                   </li>)
                }

                </CardBody>
              </Card>
            </div>


              <div className=" info-item mt-4">
              <Card>
                <CardBody>

                <div className="hedding-titel mb-4">
                 <div>
                 <h5> <b>Document Group</b> </h5>
                  
                 <div className="bg-h"></div>
                 </div>

                <div className='mt-2'>
                  <Table className="table-sm striped">
                      <thead className="">
                        <tr style={{ textAlign: "center" }}>
                          <th scope='row'>#</th>
                          <th>Title</th> 
                          <th>Details</th>
                          <th>Application Type</th>
                          
                  
                        </tr>
                      </thead>
                      <tbody>
                        {subjectData?.subjectRequireDocuments?.map((sub, i) => (
                          <tr key={i} style={{ textAlign: "center" }}>
                            <th scope='row'>{serialNum + i}</th>
                            
                            <td>
                              {sub?.documentGroup?.title}
                            </td>
                            <td>
                              {sub?.documentGroup?.details}
                            </td>
                            <td>
                              {sub?.applicationTypeId ==1 ? 'Home' : sub?.applicationTypeId == 2? 'EU_UK' : 'International' }
                            </td>
                    
                            
                           
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                
                </div>

                


                 </div>

                </CardBody>
              </Card>
            </div>

              <div className=" info-item mt-4">
              <Card>
                <CardBody>

                <div className="hedding-titel mb-4">
                 <div>
                 <h5> <b>Subject Requirement</b> </h5>
                  
                 <div className="bg-h"></div>
                 </div>

                <div className='mt-2'>
                <Table className="table-bordered mt-4" >
                      <tbody>
                        
                        <tr>
                          <td width="40%">
                            <b>Name:</b>
                          </td>

                          <td width="60%">
                            {subjectData?.subjectRequirementProfile?.educationLevel?.name}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Description:</b>
                          </td>

                          <td width="60%">
                            {subjectData?.subjectRequirementProfile?.educationLevel?.description}
                          </td>
                        </tr>

                        <tr>
                          <td width="40%">
                            <b>Result Percentage:</b>
                          </td>
                          <td width="60%">
                            {subjectData?.subjectRequirementProfile?.requiredResultInPercent}%
                          </td>

                        
                        </tr>

                      </tbody>
                      </Table>
                
                </div>

                


                 </div>

                </CardBody>
              </Card>
            </div>



          </Col>

        </Row>
      </div>


            
        </div>
    );
};

export default SubjectProfile;