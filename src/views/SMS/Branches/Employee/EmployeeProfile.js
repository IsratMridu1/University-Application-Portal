import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import get from '../../../../helpers/get';
import ReactToPrint from 'react-to-print';
import { rootUrl } from '../../../../constants/constants';

const EmployeeProfile = () => {

    const {branchId,employeeId} = useParams();
    const [info,setInfo] = useState({});
    const history = useHistory();
    const componentRef = useRef();
    


    useEffect(()=>{

        get(`BranchEmployee/Get/${employeeId}`)
        .then(res => {
            
            setInfo(res);
        })

    },[])

    const backToDashboard = () => {
        history.push(`/branchProfile/${info?.branchId}`);
    }

    const redirect = () => {
        history.push(`/branchEmployeeInformation/${info?.branchId}/${employeeId}`);
    }
    
    

    return (
        <div>
              <Card className="uapp-card-bg">
        <CardHeader className="page-header">

        <div className='d-flex align-items-center'>
              <div className='mt-1'>
                <h3 className="text-white">Branch Employee Profile</h3>
              </div>
              <div className='ml-2'>
              <ReactToPrint
                trigger={() => <span className="text-white cursor-pointer" title="Print to pdf"><i className="fas fa-print"></i></span>}
                content={() => componentRef.current}
              />
              </div>
            </div>

            <div className="page-header-back-to-home" >
              <span onClick={backToDashboard} className="text-white"> <i className="fas fa-arrow-circle-left"></i> Back to Branch Profile</span>
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
                      <img src={rootUrl+info?.coverImageMedia?.fileUrl}  alt='cover_img'/>
                    </div>               
                  </div>
                </div>



                <div className="uapp-employee-profile-image-edit">
                  <Row>
                    <Col> 
                  <div className="uapp-employee-profile-image">
                  <div className="text-left">
                     <img className="empProfileImg"  src={rootUrl+info?.profileImageMedia?.fileUrl} alt='profile_img'/>
                  </div>
                  </div>  
                  </Col>

                  <Col> 
                 

               
                   
                   <div className='text-right'>

                   <div className="uapp-employee-profile-Edit" onClick={redirect}>
                    
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                    </div>
                   </div>
                 

                      </Col> 
                  </Row>            
                 </div>     


                    <div className="uapp-employee-profile-generalInfo"> 
                     <Row>
                       <Col md="6"> 

                        <ul className="uapp-ul text-left">
                          <li> 
                            <h4>{info?.firstName} {info?.lastName}</h4>
                          </li>

                        </ul>

                    </Col> 

                    <Col md="6"> 
                   <ul className="uapp-ul text-right1">
                          <li> 
                            <span> Email : {info?.email}</span>
                          </li>
                          
                          <li> 
                            <span> Phone Number : {info?.phoneNumber}</span>
                          </li>

                        </ul>
                    </Col> 
                  </Row> 
                  </div> 
              </CardBody>
              </Card>

          
      </div>
    </Col>

        </Row>

      </div>

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
                          {info?.firstName} {info?.lastName}
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>Employee type:</b>
                        </td>

                        <td width="60%">
                          {info?.employeType?.name}
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>Email:</b>
                        </td>

                        <td width="60%">
                          {info?.email}
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>Phone Number:</b>
                        </td>

                        <td width="60%">
                          {info?.phoneNumber}
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>Nationality:</b>
                        </td>

                        <td width="60%">
                          {info?.nationality?.name}
                        </td>
                      </tr>
                      </tbody>
                    </Table>
               </CardBody>
            </Card>
        </div>

            
        </div>
    );
};

export default EmployeeProfile;