import React, { useEffect, useState } from 'react';
import {  Link, useParams } from 'react-router-dom';
import { Image } from 'antd';
import "antd/dist/antd.css";
import Select from "react-select";
import { useToasts } from 'react-toast-notifications';
import 
{ 
    Card, 
    CardBody, 
    CardHeader, 
    ButtonGroup, 
    CardTitle, 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Form, 
    FormGroup, 
    Label, Input, 
    FormText, Col, Row, Table, 
    Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

import { useHistory, useLocation } from 'react-router';
// import coverImage from '../../../../assets/img/profile/user-uploads/cover.jpg'
// import profileImage from '../../../../assets/img/profile/user-uploads/user-07.jpg'
import coverImage from '../../../assets/img/profile/user-uploads/cover.jpg';
import profileImage from '../../../assets/img/profile/user-uploads/user-07.jpg'
import get from '../../../helpers/get';
import { rootUrl } from '../../../constants/constants';
import put from '../../../helpers/put';
import EditDivButton from '../Components/EditDivButton';
import LinkButton from '../Components/LinkButton';
import ButtonForFunction from '../Components/ButtonForFunction';
import { userTypes } from '../../../constants/userTypeConstant';


const ConsultantProfile = () => {
    const location = useLocation();
    const history = useHistory();
    const {id} = useParams();

    const userTypeId = localStorage.getItem('userType');

    const [consultantData, setConsultantData] = useState({});
    const [registrationDate, setRegistrationDate] = useState('');

    const [serialNum, setSerialNum] = useState(1);

    const [statusType, setStatusType] = useState([]);
    const [statusLabel, setStatusLabel] = useState("Account Status");
    const [statusValue, setStatusValue] = useState(0);

    const [priceRangeList, setPriceRangeList] = useState([]);
    const [commissionGroupList, setCommissionGrouplist] = useState([]);

    const [success, setSuccess] = useState(false);

    const {addToast} = useToasts();

    useEffect(()=>{

      get(`Consultant/Profile/${id}`)
      .then(res => {
        console.log('Consultant Profile Data Check', res);
        setConsultantData(res);
        setStatusLabel(res?.accountStatus?.statusName);
        setStatusValue(res?.accountStatus?.id);

        var datee =res?.createdOn;
      var utcDate = new Date(datee);
      var localeDte = utcDate.toLocaleString("en-CA");
      var localeDte2 = localeDte.split(",")[0];
      var localeDte3 = localeDte2.replace('/', '-');
      
      console.log(localeDte);
      setRegistrationDate(localeDte3.replace('/', '-'));


      })


      get(`AccountStatusDD/index/${id}`)
      .then(res =>{

        setStatusType(res);

      })


      get(`GroupPriceRange/ByConsultant/${id}`).then((res) => {
        console.log("priceList", res);
        setPriceRangeList(res);
      });

      get(`ConsultantCommissionGroup/Index/${id}`).then(
        (res) => {
          console.log("consultantCommissionList", res);
          setCommissionGrouplist(res);
        }
      );


    },[success, id])

    const statusTypeMenu = statusType?.map(statusTypeOptions => ({label:statusTypeOptions?.name, value:statusTypeOptions?.id}));


    const selectStatusType = (label, value) => {
  
     
      setStatusLabel(label);
      setStatusValue(value);

      const accountStatusData = {

        id: parseInt(id),
        accountStatusId: value

      }

      console.log('aaaaaaaaaaaa',accountStatusData);

      put('Consultant/statuschange',accountStatusData)
      .then(res => {

        addToast(res?.data?.message,{
          appearance: 'success',
          autoDismiss: true
        });
        setSuccess(!success);
        

      })
      
    }

    // redirect to dashboard
        const backToConsultantList = () => {
          history.push("/consultantList")
        }


        const handleUpdateBankDetailsFromProfile = () =>{

          

          history.push(`/consultantBankDetails/${id}`);
        }


        const handleUpdateConsultantProfile = () =>{

          

          history.push(`/consultantInformation/${id}`);

        }



        const tableStyle = {
          overflowX: 'scroll',
        };

        const handleDate = (e) => {
          var datee = e;
          var utcDate = new Date(datee);
          var localeDate = utcDate.toLocaleString("en-CA");
          const x = localeDate.split(",")[0];
          return x;
        };

        const redirectToApplications = (consultantId) => {
          history.push({
            pathname: "/applications",
            consultantIdFromConsultantList: consultantId,
          });
        };

    return (
        <div>
          <Card className="uapp-card-bg">
            <CardHeader className="page-header">

              <h3 className="text-white">Consultant Profile</h3>
              {
                  !(userTypeId == userTypes?.Consultant)?
                  <div className="page-header-back-to-home" >
                <span onClick={backToConsultantList} className="text-white"> <i className="fas fa-arrow-circle-left"></i> Back to Consultant List</span>
              </div>
              :
              null

              }

            </CardHeader>
          </Card>

        <div className="uapp-employee-profile">
        <Row>

          <Col md="8">
            <div className="uapp-employee-profile-left">
            <Card>
              <CardBody>
                  <div className="uapp-employee-cover-image">
                    <div className="bg-image" >  
                    <img src = {rootUrl+consultantData?.consultantCoverImageMedia?.fileUrl} alt='cover_img'/> 
                    <div className="uplode-cover-image">
                      <span> <i className="fas fa-camera" > </i ></span>
                      </div>               
                  </div>
                </div>



                <div className="uapp-employee-profile-image-edit">
                  <Row>
                    <Col> 
                  <div className="uapp-employee-profile-image">
                  <div className="text-left">
                    
                     <img className="empProfileImg"  src={rootUrl+consultantData?.consultantProfileImageMedia?.fileUrl} alt='img-desc'/>
                  </div>
                  </div>  
                  </Col>

                    <Col> 
                      <EditDivButton
                        className={"uapp-employee-profile-Edit"}
                        func={handleUpdateConsultantProfile}
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
                          
                            <h4>{consultantData?.nameTitle?.name} {consultantData?.firstName} {consultantData?.lastName} ({consultantData?.viewId})</h4>
                          </li>

                           <li> 
                        
                          </li>

                          
                        </ul>

                    </Col> 

                    <Col md="6"> 
                   <ul className="uapp-ul text-right">
                   <div className='d-flex justify-content-end mb-2'>
                   <Select className=' w-50'
                  options={statusTypeMenu}
                  value={{ label: statusLabel, value: statusValue }}
                  onChange={(opt) => selectStatusType(opt.label, opt.value)}
                  name="consultantTypeId"
                  id="consultantTypeId"
                />
                   </div>
                          <li> 
                            <span> Email : {consultantData?.email}</span>
                          </li>
                          
                          <li> 
                            <span> Phone Number : {consultantData?.phoneNumber}</span>
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
                  <div className="hedding-titel">
                    <h5> <b>General Information</b>  </h5>
                    <div className="bg-h"></div>
                  </div>
                    <Table className="table-bordered mt-4" >
                    <tbody>
                      <tr>
                        <td width="40%">
                         <b> Title:</b>
                        </td>

                        <td width="60%">
                         {consultantData?.nameTitle?.name} 
                        </td>
                      </tr>
                      <tr>
                        <td width="40%">
                         <b> Name:</b>
                        </td>

                        <td width="60%">
                         {consultantData?.firstName} {consultantData?.lastName}
                        </td>
                      </tr>
                      <tr>
                        <td width="40%">
                         <b> Consultant Type:</b>
                        </td>

                        <td width="60%">
                         {consultantData?.consultantType?.name}
                        </td>
                      </tr>
                      <tr>
                        <td width="40%">
                          <b>Branch:</b>
                        </td>

                        <td width="60%">
                          {consultantData?.branch?.name}
                        </td>
                      </tr>
                      <tr>
                        <td width="40%">
                         <b> Account Status:</b>
                        </td>

                        <td width="60%">
                         {consultantData?.accountStatus?.statusName}
                        </td>
                      </tr>
                      <tr>
                        <td width="40%">
                         <b> Residency Status: </b>
                        </td>

                        <td width="60%">
                          {consultantData?.residencyStatus?.name}
                        </td>
                      </tr>
                      <tr>
                        <td width="40%">
                          <b>Visa Status: </b>
                        </td>

                        <td width="60%">
                          {consultantData?.visaStatus?.name}
                        </td>
                      </tr>
                      <tr>
                        <td width="40%">
                          <b>Registration Date:</b>
                        </td>

                        <td width="60%">
                         {registrationDate}
                        </td>
                      </tr>
                      <tr>
                        <td width="40%">
                          <b>Have Right To Work:</b>
                        </td>

                        <td width="60%">
                         {consultantData?.haveRightToWork == null ? 'No' : 'Yes'}
                        </td>
                      </tr>
                      

                      </tbody>
                    </Table>
               </CardBody>
            </Card>
        </div>




        <div className=" info-item mt-4">
          <Card>  
               <CardBody>
                  <div className="hedding-titel">
                    <h5> <b>Contact Information</b> </h5>
                    <div className="bg-h"></div>
                  </div>



                        <Table className="table-bordered mt-4" >
                    <tbody>
                      <tr>
                        <td width="40%">
                        <b> Phone Number:</b>
                        </td>

                        <td width="60%">
                          {consultantData?.phoneNumber}
                        </td>
                      </tr>
                      <tr>
                        <td width="40%">
                        <b>Email:</b>
                        </td>

                        <td width="60%">
                        {consultantData?.email}
                        </td>
                      </tr>

                      </tbody>
                    </Table>
               </CardBody>
            </Card>
        </div>


             {/* Bank Details */}
             <div className=" info-item mt-4">
         
               <Card>
              
               <div className="hedding-titel d-flex justify-content-between">
               <div>
               <h5> <b>Bank Details</b> </h5>
                
               <div className="bg-h"></div>
               </div>
               

               </div>
              
           

             
              <div className='row'>

              {

                consultantData?.bankDetails?.map((data,i) => 
                
                  <div className='col-md-6 col-sm-12'  key={i}>

                   <Card>
                   <CardBody className='consultant-card-shadow-style d-flex justify-content-between'>
                   <div className='p-3'>
                   
                   <b>Account Name:</b> <span>{data?.accountName}</span>
                   <br/>
                   <b>Account Number:</b> <span>{data?.accountNumber}</span>
                   <br/>
                   <b>Bank Address:</b> <span>{data?.bankAddress}</span>
                   <br/>
                   <b>Bank Name:</b> <span>{data?.bankName}</span>
                   <br/>
                   <b>BIC:</b> <span>{data?.bic}</span>
                   <br/>
                   <b>Sort Code:</b> <span>{data?.sortCode}</span>
                   <br/>
                   <b>Swift:</b> <span>{data?.swift}</span>
                   </div>

                   <div className='edit-style mt-md-3'>
               <span> <i className="fas fa-pencil-alt pencil-style" onClick={handleUpdateBankDetailsFromProfile}></i> </span>
             </div>
                   </CardBody>
                   </Card>
                   
                  </div>


                  )

              }


              </div>
             
                   </Card>
           
           </div>

           {/* commission starts here */}

           <div className=" info-item mt-4">
         
               <Card>
              
               <div className="hedding-titel d-flex justify-content-between">
               <div>
               <h5> <b>Current Commission Group {
                priceRangeList.length > 0 ?
                <>
                  :{" "}
                    {priceRangeList[0]?.commissionGroup?.name}
                </>
                :
                null
                }
                </b> </h5>
                
               <div className="bg-h"></div>
               </div>
               

               </div>
              
           

             
               {
                priceRangeList.length < 1 ?
                <p className="mt-4">There is no data available here.</p>
                :
                <div className="table-responsive container mt-4">
                  <Table id="table-to-xls">
                    <thead>
                      <tr style={{ textAlign: "center" }}>
                        <th>#</th>
                        <th>Price Range</th>
                        <th>Range From</th>
                        <th>Range To</th>
                        <th>Commission Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {priceRangeList?.map((range, i) => (
                        <tr key={range.id} style={{ textAlign: "center" }}>
                          <th scope="row">{1 + i}</th>

                          <td>{range?.priceRangeName}</td>

                          <td>{range?.rangeFrom}</td>

                          <td>{range?.rangeTo}</td>

                          <td>{range?.commissionAmount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
               }
             
                   </Card>
           
           </div>

           {/* commission history starts here */}

           {
            commissionGroupList.length > 1 ?
            <div className=" info-item mt-4">
         
               <Card>
              
               <div className="hedding-titel d-flex justify-content-between">
               <div>
               <h5> <b>Consultant Commission Group History</b> </h5>
                
               <div className="bg-h"></div>
               </div>
               

               </div>
              
           

             
               <span className="ml-3 mt-3">
                <b>Assigned Commission Groups</b>
              </span>
              <div className="table-responsive container mt-2">
                <Table id="table-to-xls">
                  <thead>
                    <tr style={{ textAlign: "center" }}>
                      <th>#</th>
                      <th>Name</th>
                      <th>Applications</th>
                      <th>Status</th>
                      <th>Date Range</th>
                      {/* <th>Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {commissionGroupList?.map((commission, i) => (
                      <tr key={commission?.id} style={{ textAlign: "center" }}>
                        <th scope="row">{1 + i}</th>
                        <td>{commission?.commissionGroup?.name}</td>

                        <td>{commission?.applicationCount}</td>

                        <td>
                          {commission?.isActive == false
                            ? "Deactivated"
                            : "Active"}
                        </td>

                        <td>
                          {handleDate(commission?.createdOn)}
                          {" to "}
                          {handleDate(commission?.updatedOn)}
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
             
                   </Card>
           
           </div>
           :
           null
           }

           {/* commission history ends here */}

           {/* commission ends here */}

        <div className=" info-item mt-4">
        <Card >
        <div className="hedding-titel">
        <h5> <b>Documents</b> </h5>
        <div className="bg-h"></div>
      </div>
         
            <div className='row text-center'>

            <div className ='col-md-4 col-sm-12'>

            <Card className='shadow-lg'>  
            <CardBody>

            <Image
            width={180} height={104}
            src={rootUrl+consultantData?.idOrPassportMedia?.fileUrl}
          />
          
          <br/>
          <br/>

            <b>Id or Passport</b>
          
            </CardBody>
         </Card>
            
            </div>

            <div className ='col-md-4 col-sm-12'>

            <Card className='shadow-lg'>  
            <CardBody>

            <Image
            width={180} height={104}
            src={rootUrl+consultantData?.proofOfAddressMedia?.fileUrl}
          />
          
          <br/>
          <br/>

            <b>Proof of Address</b>
          
            </CardBody>
         </Card>
            
            </div>

            <div className ='col-md-4 col-sm-12'>

            <Card className='shadow-lg'>  
            <CardBody>

            <Image
                    width={180} height={104}
                    src={rootUrl+consultantData?.proofOfRightToWorkMedia?.fileUrl}
                  />
          
          <br/>
          <br/>

            <b>Proof of Right to Work</b>
          
            </CardBody>
         </Card>
            
            </div>


            </div>
            </Card>
        </div>
              
              </div>
          </Col>



          <Col md="4"> 
           <Card className="uapp-employee-profile-right">
             <div className="uapp-profile-CardHeader">
                <div className="uapp-circle-image margin-top-minus">
                     
                      {
                        consultantData?.parentConsultant?.consultantProfileImageMedia == null ?
                        <img src={profileImage} alt='profile_img'/>
                        :
                        <img src={rootUrl+consultantData?.parentConsultant?.consultantProfileImageMedia?.fileUrl} alt='profile_img'/>
                        
                      }
                     
                </div>    
                
                <h5>{consultantData?.parentConsultant?.nameTitle?.name} {consultantData?.parentConsultant?.firstName} {consultantData?.parentConsultant?.lastName} </h5>
                 <p> {consultantData?.parentConsultant?.consultantType?.name} </p>  
            </div>
              <CardBody>

                 <div>
                   <ul className="uapp-ul text-center">
                      <li> {consultantData?.parentConsultant?.accountStatus?.statusName} </li>
                      <li> {consultantData?.parentConsultant?.branch?.name} </li>
                      <li> {consultantData?.parentConsultant?.email} </li>
                      <li> {consultantData?.parentConsultant?.phoneNumber} </li>
                    </ul>                                     
                 </div>

            </CardBody>
        </Card>

        
        <Card>  
             <CardBody>
                <div className="hedding-titel mb-3">
                  <h5> <b>Important Notice</b> </h5>
                  <div className="bg-h"></div>
                </div>

                <div className='d-flex justify-content-between'>

                  <LinkButton
                   url={`/studentListByConsultant/${id}`}
                   className={"btn btn-uapp-add "}
                   name={"Student"}
                   permission={6}
                  />


                  {/* <LinkButton
                    url={`/applicationsByConsultant/${id}`}
                    className={"btn btn-uapp-add "}
                    name={"Application"}
                    permission={6}
                  /> */}

                  <ButtonForFunction
                    func={() => redirectToApplications(id)}
                    className={"btn btn-uapp-add "}
                    name={"Application"}
                    permission={6}
                  />


                  <ButtonForFunction
                    className={"btn btn-uapp-add "}
                    name={"Transaction"}
                    permission={6}
                  />
                  
                </div>

                   
             </CardBody>
          </Card>
   

            <Card className="p-3">

                <h6> Notice</h6>
                <span className="bg-wg bg-width"></span>
           
            
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

          </Col>
        </Row>
        </div>

        </div>
    );
};

export default ConsultantProfile;