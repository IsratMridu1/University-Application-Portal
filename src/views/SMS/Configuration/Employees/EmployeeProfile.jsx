import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router';
import { useParams } from 'react-router';
import { Card, CardBody, CardHeader, ButtonGroup, CardTitle, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col, Row, Table, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

import coverImage from '../../../../assets/img/profile/user-uploads/cover.jpg'
import profileImage from '../../../../assets/img/profile/user-uploads/user-07.jpg'
import get from '../../../../helpers/get';
import ReactToPrint from 'react-to-print';
import { rootUrl } from '../../../../constants/constants';
import EditDivButton from '../../Components/EditDivButton';
import { permissionList } from '../../../../constants/AuthorizationConstant';

const EmployeeProfile = () => {

  const {id} = useParams()
  const history = useHistory();
  const [employeeDetails, setemployeeDetails] = useState({});
  const [employeeImgDetails, setemployeeImgDetails] = useState({});
  const [employeeType, setemployeeType] = useState({});

  const permissions = JSON.parse(localStorage.getItem('permissions'));


 

  useEffect(() => {

     get(`Employee/Profile/${id}`).then((action) => {
      setemployeeDetails(action);
      
      setemployeeImgDetails(action.profileImageMedia);
      setemployeeType(action.employeeType);
    })
  }, [])


  const redirect = () => {
    history.push(`/staffGeneralInfo/${id}`)
  }
  

  // redirect to dashboard
  const backToDashboard = () => {
    history.push("/staffList")
  }

  const componentRef = useRef();

  return (

    <div ref={componentRef}>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">

        <div className='d-flex align-items-center'>
              <div className='mt-1'>
                <h3 className="text-white">Staff Profile</h3>
              </div>
              <div className='ml-2'>
              <ReactToPrint
                trigger={() => <span className="text-white cursor-pointer" title="Print to pdf"><i className="fas fa-print"></i></span>}
                content={() => componentRef.current}
              />
              </div>
            </div>

            <div className="page-header-back-to-home" >
              <span onClick={backToDashboard} className="text-white"> <i className="fas fa-arrow-circle-left"></i> Back to Staff List</span>
            </div>

        </CardHeader>
      </Card>



      <div className="uapp-employee-profile">
        <Row>

          <Col md="12">
            <div className="uapp-employee-profile-left">
            <Card>
              <CardBody>
                  <div className="uapp-employee-cover-image">
                    <div className="bg-image">   
                    <div className="uplode-cover-image">
                      <img src={rootUrl+employeeDetails?.coverImageMedia?.fileUrl} alt='cover_img'/>
                    </div>               
                  </div>
                </div>



                <div className="uapp-employee-profile-image-edit">
                  <Row>
                    <Col> 
                  <div className="uapp-employee-profile-image">
                  <div className="text-left">
                     <img className="empProfileImg"  src={rootUrl+employeeDetails?.profileImageMedia?.fileUrl} alt='profile_img'/>
                  </div>
                  </div>  
                  </Col>

                  <Col> 
                 

                  {
                    permissions?.includes(permissionList?.Update_Staff) ?
                    <EditDivButton
                    className={"uapp-employee-profile-Edit"}
                    func={()=> redirect(id)}
                    
                  />
                  :
                  null
                  }

                      </Col> 
                  </Row>            
                 </div>     


                    <div className="uapp-employee-profile-generalInfo"> 
                     <Row>
                       <Col md="6"> 

                        <ul className="uapp-ul text-left">
                          <li> 
                            <h4>{employeeDetails?.firstName} {employeeDetails?.lastName}</h4>
                          </li>

                        </ul>

                    </Col> 

                    <Col md="6"> 
                   <ul className="uapp-ul text-right1">
                          <li> 
                            <span> Email : {employeeDetails?.email}</span>
                          </li>
                          
                          <li> 
                            <span> Phone Number : {employeeDetails?.phoneNumber}</span>
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
                    <h5> <b>General Information</b> </h5>
                    <div className="bg-h"></div>
                  </div>
                    <Table className="table-bordered mt-4" >
                    <tbody>
                      <tr>
                        <td width="40%">
                          <b>Name:</b>
                        </td>

                        <td width="60%">
                          {employeeDetails?.firstName} {employeeDetails?.lastName}
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>Staff type:</b>
                        </td>

                        <td width="60%">
                          {employeeDetails?.employeeTypeName}
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>Nationality:</b>
                        </td>

                        <td width="60%">
                          {employeeDetails?.nationalityName}
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
                        <span><b>Address type:</b></span>
                        </td>

                        <td width="60%">
                         {employeeDetails?.contactInfo?.addressType?.name}
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                        <span><b>Phone number:</b></span>
                        </td>

                        <td width="60%">
                         {employeeDetails?.phoneNumber}
                        </td>
                      </tr>
                      
                      <tr>
                        <td width="40%">
                        <span><b>Cell phone number:</b></span>
                        </td>

                        <td width="60%">
                         {employeeDetails?.contactInfo?.cellPhoneNumber}
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>Email:</b>
                        </td>

                        <td width="60%">
                        {employeeDetails?.email}
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>Country:</b>
                        </td>

                        <td width="60%">
                        {employeeDetails?.contactInfo?.country?.name}
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>City:</b>
                        </td>

                        <td width="60%">
                        {employeeDetails?.contactInfo?.city}
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>State:</b>
                        </td>

                        <td width="60%">
                        {employeeDetails?.contactInfo?.state}
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>Zip code:</b>
                        </td>

                        <td width="60%">
                        {employeeDetails?.contactInfo?.zipCode}
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>Address line:</b>
                        </td>

                        <td width="60%">
                        {employeeDetails?.contactInfo?.addressLine}
                        </td>
                      </tr>

                      </tbody>
                    </Table>
               </CardBody>
            </Card>
        </div>

              
      </div>
    </Col>

        </Row>
      </div>

    </div>
  )
}
const mapStateToProps = state => ({

})
export default connect(mapStateToProps)(EmployeeProfile);
