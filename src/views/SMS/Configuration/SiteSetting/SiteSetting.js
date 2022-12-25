import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { Card, CardBody, CardHeader, ButtonGroup,  Button,  Col, Row, Table } from 'reactstrap';

import { useHistory, useLocation } from 'react-router';
import {   Form, FormGroup, Input } from 'reactstrap';
import { useToasts } from "react-toast-notifications";


import get from '../../../../helpers/get.js';

import { Link } from 'react-router-dom';
import FavIconFile from './FavIconFile.js';
import LogoFile from './LogoFile.js';
import { rootUrl } from '../../../../constants/constants.js';

const EmployeeList = (props) => {

    const history = useHistory();

    const [loading,setLoading] = useState(false);
    const [siteSettingInfo, setSiteSettingInfo] = useState([]);
 

 
    const employeeTypeList = props.employeeTypeList[0];
   
    const { addToast } = useToasts();
   

    

    const employeeTypeName = employeeTypeList?.map(empt => ({label: empt.name, value: empt.id}));
   

  useEffect(()=>{
      get(`SiteSetting/Get`)
      .then(res => {
          console.log([res]);
          setSiteSettingInfo([res]);
        
       
      })

  },[])

  const handleUpdate = () => {
    history.push('/updateSiteSetting');
  }
  

     // redirect to dashboard
    const backToDashboard = () => {
    history.push("/")
    }

   
    return (
      <div>
        <Card className="uapp-card-bg">
              <CardHeader className="page-header">

            <h3 className="text-white">Site Setting List</h3>
            <div className="page-header-back-to-home" >
              <span onClick={backToDashboard} className="text-white"> <i class="fas fa-arrow-circle-left"></i> Back to Dashboard</span>
                  </div>
              
              </CardHeader>
            </Card>

      

            <Card>

                <CardBody>
    
                <Row className="mb-3">
                
              <Col lg="6" md="5" sm="6" xs="4">
           
                    </Col>



              <Col lg="6" md="7" sm="6" xs="8">
               
                    </Col>
                </Row>
                {
                  siteSettingInfo[0]? 
                  null 
                  :
                  <Link to='/addSiteSetting'>
                  <Button color="primary mb-4">Add Site Setting </Button>
                  </Link>
                }
             
                {
                    loading ?
                    <h2 className="text-center">Loading...</h2>
                :
                <div>
                  {/* <Table className="table-sm table-bordered" >
                    <thead className="thead-uapp-bg">
                    <tr>
                        <th>SL/NO</th>
                        <th>Connection Strings</th>
                        <th>Site Short Name</th>
                        <th>Site Full Name</th>
                       
                        <th>Backup Path</th>
                        <th className="text-center">Action</th>
                     
                    </tr>
                    </thead>
                    <tbody>

                    {
                        siteSettingInfo[0]? 
                        
                   <tr>
                   <td>{siteSettingInfo.length}</td>
                   <td>{siteSettingInfo[0]?.connectionStrings}</td>
                   <td>{siteSettingInfo[0]?.siteShortName}</td>
       
                   <td>{siteSettingInfo[0]?.siteFullName}</td>
                  
                   <td>{siteSettingInfo[0]?.backupPath}</td>
                   <td className="text-center">
                       
                     <ButtonGroup variant="text">
                      
                      <Link>
                      <Button color="warning" onClick={handleUpdate}  className=" btn-sm"> <i class="fas fa-edit"></i> </Button>
                      </Link>
                     </ButtonGroup>
                   </td>
                   
                 </tr>
                 :
            
              
                 null
             
                    }


              
              

                   </tbody>
                  </Table> */}

                  {/* New Display pattern of site setting */}

                  <Form  className="mt-5"   >

                       

                        
                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span className='fw-bold'>Uapp Logo File</span>
                                    </Col>
                                    <Col md="6">
                                <img src={`${rootUrl}${siteSettingInfo[0]?.uappLogoUrl}`} alt='logoImg' className='img-fluid' />
                                       
                                    </Col>
                                </FormGroup>
                            
                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span className='fw-bold'>Uapp Favicon File</span>
                                    </Col>
                                    <Col md="6">
                                         <img src={`${rootUrl}${siteSettingInfo[0]?.uappfaviconUrl}`} className='img-fluid' alt='faviconImg' />
                                   
                                    </Col>
                                </FormGroup>

                                

                                
                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span className='fw-bold'>Connection Strings</span>
                                    </Col>
                                    <Col md="6">
                                    {/* <Input
                                        type="text"
                                        name="connectionStrings"
                                        id="connectionStrings"
                                        placeholder='Enter Connection Strings'
                                        required
                                        defaultValue={siteSettingInfo[0]?.connectionStrings} 
                                        disabled
                                       
                                       
                                        
                                    /> */}
                                    <span className='pe-2'>:</span> <span>{siteSettingInfo[0]?.connectionStrings}</span>
                                 
                                    </Col>
                                </FormGroup>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span className='fw-bold'>Site Short Name</span>
                                    </Col>
                                    <Col md="6">
                                  
                                    <span className='pe-2'>:</span>  <span>{siteSettingInfo[0]?.siteShortName}</span>
                                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                                    </Col>
                                </FormGroup>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span className='fw-bold'>Site Full Name</span>
                                    </Col>
                                    <Col md="6">
                                  
                                    <span className='pe-2'>:</span>  <span>{siteSettingInfo[0]?.siteFullName}</span>
                                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                                    </Col>
                                </FormGroup>

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span className='fw-bold'>Email Block</span>
                                    </Col>
                                    <Col md="6" className='ms-3'>
                                    {
                                      siteSettingInfo[0]?.emailBlock ? 
                                     <>
                                       <span className='pe-2'>:</span> <span>Yes</span>
                                     </>
                                      :
                                      <>
                                        <span className='pe-2'>:</span> <span>No</span>
                                      </>
                                    }
                                    
                                
                                    </Col>
                                </FormGroup>
                               
                        

                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span className='fw-bold'>Notification Block:</span>
                                    </Col>
                                    <Col md="6"  className='ms-3'>
                                    {
                                      siteSettingInfo[0]?.notificationBlock ? 
                                      <>
                                       <span className='pe-2'>:</span><span>Yes</span>
                                      </>
                                     
                                      :
                                      <>
                                        <span className='pe-2'>:</span> <span>No</span>
                                      </>
                                    
                                    }
                               
                                
                                    </Col>
                                </FormGroup>

                              


                                <FormGroup row className="has-icon-left position-relative">
                                    <Col md="2">
                                    <span className='fw-bold'>Backup Path</span>
                                    </Col>
                                    <Col md="6">
                                  
                                     <span className='pe-2'>:</span><span>{siteSettingInfo[0]?.backupPath}</span>
                                   
                                    </Col>
                                </FormGroup>

                               


                                <FormGroup className="has-icon-left position-relative" style={{ display: 'flex', justifyContent: 'space-between' }}>

                                    <Button.Ripple
                                    type="submit"
                                    className="mr-1 mt-3 badge-primary"
                                    onClick={handleUpdate}
                                    >
                                    Update
                                    </Button.Ripple>

                                </FormGroup>

                        </Form>




{/*  */}

                </div>
                }

                

                </CardBody>
            </Card>
        </div>
    )
}

const mapStateToProps = state => ({
  employeeTypeList: state.employeeTypeDataReducer.employeeType
})
export default connect(mapStateToProps)(EmployeeList);

