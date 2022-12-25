import React, { useState } from 'react';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table, Nav, NavItem, NavLink,
  Modal, ModalBody, ModalFooter, ModalHeader,
  Tooltip,
  Input
} from 'reactstrap';
import Select from "react-select";
import "../../../../../assets/scss/pages/dashboard-analytics.scss"
import CardComponent from '../../Component/CardComponent';

const ProviderAdmin = () => {

    const token = JSON.parse(localStorage.getItem('current_user'));

    const customStyles2 = {
      control: (provided, state) => ({
        ...provided,
        background: '#fff',
        borderColor: '#9e9e9e',
        minHeight: '33px',
        height: '33px',
        boxShadow: state.isFocused ? null : null,
        paddingBottom: '20px',
         
      })

    };

    const [month,setMonth] = useState([]);
    const [monthLabel,setMonthLabel] = useState('Select Month');
    const [monthValue,setMonthValue] = useState(0);

    const [year,setYear] = useState([]);
    const [yearLabel,setYearLabel] = useState('Select Year');
    const [yearValue,setYearValue] = useState(0);


    
    return (
        <React.Fragment>
        <div className="animated fadeIn">
          <div className="uapp-dashboard">
  
            <div className="uapp-user-name">
              <Row>
                <Col sm='9' xs="12">
                  <h2>Welcome, {token?.displayName}.</h2>
                </Col>
  
               
              </Row>
            </div>
  
  
  
            <div className="uapp-user-card mt-4">
              <div className="row">
  
                <div className="col-lg-2 col-md-4 col-sm-6">
                  {/* <div className="uapp-primary-card uapp-card">
                    <div className="card-body">
                    <p>  <span> <i class="fas fa-angle-double-right"></i> </span> 500</p>
                      <h5> Total Application </h5>
                    </div>
                  </div> */}

                  <CardComponent
                  style={'uapp-primary-card'}
                  icon={<i class="fas fa-angle-double-right"></i>}
                  count={500}
                  title={'Total Application-1'}
                  />
                </div>

                <div className="col-lg-2 col-md-4 col-sm-6">
                <CardComponent
                  style={'uapp-secondary-card'}
                  icon={<i class="fas fa-angle-double-right"></i>}
                  count={600}
                  title={'Total Application-2'}
                  />
                </div>

                <div className="col-lg-2 col-md-4 col-sm-6">
                <CardComponent
                  style={'uapp-purple-card'}
                  icon={<i class="fas fa-angle-double-right"></i>}
                  count={700}
                  title={'Total Application-3'}
                  />
                </div>

                <div className="col-lg-2 col-md-4 col-sm-6">
                <CardComponent
                  style={'uapp-danger-card'}
                  icon={<i class="fas fa-angle-double-right"></i>}
                  count={800}
                  title={'Total Application-4'}
                  />
                </div>

                <div className="col-lg-2 col-md-4 col-sm-6">
                <CardComponent
                  style={'uapp-warning-card'}
                  icon={<i class="fas fa-angle-double-right"></i>}
                  count={900}
                  title={'Total Application-5'}
                  />
                </div>

                <div className="col-lg-2 col-md-4 col-sm-6">
                <CardComponent
                  style={'uapp-info-card'}
                  icon={<i class="fas fa-angle-double-right"></i>}
                  count={1000}
                  title={'Total Application-6'}
                  />
                </div>


  
  
  
              </div>
  
             
            </div>
  
            <div className="uapp-dashboard-activity">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
  
                  <div className="card" style={{height: '350px'}}>
                    
  
                    <div className="card-body">

                    <span>
                        <h5 class="uapp-dachboard-head">New Application</h5>
                      </span>
                      <span class="db-app-count">70</span>
  
               
  
                    </div>
                  </div>
  
  
                </div>
                <div className="col-lg-6 col-md-6 col-12">
  
                <div className="card" style={{height: '106px'}}>
                    
  
                    <div className="card-body">

                    <span>
                        <h5 class="uapp-dachboard-head">Universities</h5>
                      </span>
                      <span class="db-app-count">70</span>
  
               
  
                    </div>
                  </div>

                <div className="card" style={{height: '106px'}}>
                    
  
                    <div className="card-body">

                    <span>
                        <h5 class="uapp-dachboard-head">Admission Managers</h5>
                      </span>
                      <span class="db-app-count">70</span>
  
               
  
                    </div>
                  </div>

                <div className="card" style={{height: '106px'}}>
                    
  
                    <div className="card-body">

                    <span>
                        <h5 class="uapp-dachboard-head">Admission Officers</h5>
                      </span>
                      <span class="db-app-count">70</span>
  
               
  
                    </div>
                  </div>
  
                </div>
              </div>

              {/* Progress Report Card */}
              <div className='row'>

                <div className='col-lg-12 col-md-12 col-12'>
                  
                <div className="card" >
                    
  
                    <div className="card-body">

                    <span>
                        <h5 class="uapp-dachboard-head">Progress Report</h5>
                      </span>

                      <Card className='mt-3'>

                        

                          <div className='d-flex flex-wrap justify-content-between'>

                            <div className='d-flex'>
                              <span className='mt-1 me-1' style={{fontSize: '16px', fontWeight: '500'}}>Daily</span>
                              <Input
                              className='ms-1'
                              type='date'
                              
                              />
                            </div>

                            <div className='d-flex'>
                              <span className='mt-1 me-1' style={{fontSize: '16px', fontWeight: '500'}}>Monthly</span>
                              <Select
                              styles={customStyles2}
                              value={{ label: monthLabel, value: monthValue }}
                              className='ms-1'
                              name="UniversityTypeId"
                              id="UniversityTypeId"
                            />
                            </div>

                            <div className='d-flex'>
                              <span className='mt-1 me-1' style={{fontSize: '16px', fontWeight: '500'}}>Yearly</span>
                              <Select
                              styles={customStyles2}
                              value={{ label: yearLabel, value: yearValue }}
                              className='ms-1'
                              name="UniversityTypeId"
                              id="UniversityTypeId"
                            />
                            </div>

                          </div>

                          <hr/>




                       

                      </Card>
                      
  
               
  
                    </div>
                  </div>

                </div>

              </div>
  
            </div>
  
          </div>
        </div>
  
      </React.Fragment>
    );
};

export default ProviderAdmin;