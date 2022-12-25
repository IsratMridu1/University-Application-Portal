import React from 'react';
import {
    Col,
    Row
  } from 'reactstrap';

const SuperAdmin = () => {

  const currentUser = JSON?.parse(localStorage.getItem('current_user'));


    return (
        <React.Fragment>
        {/* <div className="animated fadeIn">
          <div className="uapp-dashboard">
  
            <div className="uapp-user-name">
              <Row>
                <Col sm='9' xs="12">
                  <h2>Welcome, {currentUser?.displayName}.</h2>
                </Col>
  
                <Col sm="3" xs="12 text-sm-right">
                  <button className="uapp-btn btn">Add New Action</button>
                </Col>
              </Row>
            </div>
  
  
  
            <div className="uapp-user-card mt-4">
              <div className="row">
  
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <div className="uapp-primary-card uapp-card">
                    <div className="card-body">
                    <p>  <span> <i class="fas fa-angle-double-right"></i> </span> 500</p>
                      <h5> Total Application </h5>
                    </div>
                  </div>
                </div>
  
  
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <div className="uapp-info-card uapp-card">
                    <div className="card-body">
                    <p>  <span> <i class="fas fa-angle-double-right"></i> </span> 500</p>
                      <h5> Total Application </h5>
                    </div>
                  </div>
                </div>
  
  
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <div className="uapp-purple-card uapp-card">
                    <div className="card-body">
                    <p>  <span> <i class="fas fa-angle-double-right"></i> </span> 500</p>
                      <h5> Total Application </h5>
                    </div>
                  </div>
                </div>
  
  
  
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <div className="uapp-warning-card uapp-card">
                    <div className="card-body">
                    <p>  <span> <i class="fas fa-angle-double-right"></i> </span> 500</p>
                      <h5> Total Application </h5>
                    </div>
                  </div>
                </div>
  
  
  
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <div className="uapp-danger-card uapp-card">
                    <div className="card-body">
                    <p>  <span> <i class="fas fa-angle-double-right"></i> </span> 500</p>
                      <h5> Total Application </h5>
                    </div>
                  </div>
                </div>
  
                <div className="col-lg-2 col-md-4 col-sm-6">
                  <div className="uapp-secondary-card uapp-card">
                    <div className="card-body">
                      <p>  <span> <i class="fas fa-angle-double-right"></i> </span> 500</p>
                      <h5> Total Application </h5>
                    </div>
                  </div>
                </div>
  
  
              </div>
  
             
            </div>
  
            <div className="uapp-dashboard-activity">
              <div className="row">
                <div className="col-lg-8 col-md-8 col-12">
  
                  <div className="card">
                    <div class="db-card-header no-border-bottom card-header">
                      <span>
                        <h5 class="uapp-dachboard-head">New Application</h5>
                      </span>
                      <span class="db-app-count">70</span>
                    </div>
  
                    <div className="card-body">
  
  
                      <div class="table-responsive">
                        <table class="table table-sm table-hover">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Student ID</th>
                              <th>University</th>
                              <th>Status</th>
                              <th>Date</th>
                              <th>Consultant</th>
                              <th>Admission Officer</th>
                              <th>Actions</th>
                            </tr></thead>
                          <tbody>
                            <tr class="borderBottom">
                              <td>Claudia Iuliana Ivan</td>
                              <td>STD00880</td>
                              <td>Canterbury Christ Church University London- LSC</td>
                              <td>New application</td>
                              <td>20/09/21</td>
                              <td>D Andreescu</td>
                              <td>Kaium</td>
                              <td>
                                <a class="uapp-actions-icon" href="#"> <span>Details </span>  <i class="fa fa-info-circle"></i></a>
                              </td>
                            </tr>
  
                            <tr class="borderBottom">
                              <td>Carmen Simeanu</td>
                              <td>STD00949</td>
                              <td>New College Durham – LSC</td>
                              <td>New application</td>
                              <td>19/09/21</td>
                              <td>BEATRICE</td>
                              <td>Kaium</td>
                              <td>
                                <a class="btn uapp-actions-icon" href="#"><span>Details </span>  <i class="fa fa-info-circle"></i></a>
                              </td>
                            </tr>
  
                            <tr class="borderBottom">
                              <td>Carmen Simeanu</td>
                              <td>STD00949</td>
                              <td>New College Durham – LSC</td>
                              <td>New application</td>
                              <td>19/09/21</td>
                              <td>BEATRICE</td>
                              <td>Kaium</td>
                              <td>
                                <a class=" uapp-actions-icon" href="#"><span>Details </span>  <i class="fa fa-info-circle"></i></a>
                              </td>
                            </tr>
                            <tr class="borderBottom">
                              <td>Tanya  Lazarova</td>
                              <td>STD00574</td>
                              <td>London Metropolitan University - Main Campus</td>
                              <td>New application</td>
                              <td>18/09/21</td>
                              <td>Daniela</td>
                              <td>Afsana</td>
                              <td>
                                <a class="uapp-actions-icon" href="#"> <span>Details </span>  <i class="fa fa-info-circle"></i></a>
                              </td>
                            </tr>
                            <tr class="borderBottom">
                              <td>MIHAIL IORDACHI</td>
                              <td>STD00156</td>
                              <td>London Metropolitan University - Main Campus</td>
                              <td>New application</td>
                              <td>17/09/21</td>
                              <td>Mihaiela-Florita </td>
                              <td>Afsana</td>
                              <td>
                                <a class="uapp-actions-icon" href="#"> <span>Details </span> <i class="fa fa-info-circle"></i></a>
                              </td>
                            </tr>
  
                          </tbody>
                        </table>
                      </div>
  
                    </div>
                  </div>
  
  
                </div>
                <div className="col-lg-4 col-md-4 col-12">
  
                  <div className="card">
                    <div class="db-card-header include-btn  no-border-bottom card-header">
                      <h5 class="uapp-dachboard-head">Notice</h5>
                      <span class="uapp-float-right">
                        <button type="button" class="uapp-sm-btn btn-sm uapp-sm-btn-bg btn">View All</button>
                      </span>
                    </div>
  
                    <div className="card-body">
  
                    <div class="uapp-message-wrap uapp-notice">
                      <div class="uapp-msg-head">
                        <span class="msg-sender-name">Super Admin</span>
                        <span class="msg-send-time uapp-float-right">27/07/21</span>
                        </div>
                        <div class="uapp-msg-body msg-width">
                          <h6>No Qualifications required !! University of Suffolk London &amp; Manchester Campus, Oct 2021 Intake.</h6>
                          <span class="uapp-float-right">
                        <button type="button" class="uapp-sm-btn btn-sm uapp-sm-btn-bg btn">View </button>
                      </span>
                      </div>
                    </div>
  
  
                    <div class="uapp-message-wrap uapp-notice">
                      <div class="uapp-msg-head">
                        <span class="msg-sender-name">Super Admin</span>
                        <span class="msg-send-time uapp-float-right">27/07/21</span>
                        </div>
                        <div class="uapp-msg-body msg-width">
                          <h6>No Qualifications required !! University of Suffolk London &amp; Manchester Campus, Oct 2021 Intake.</h6>
                          <span class="uapp-float-right">
                        <button type="button" class="uapp-sm-btn btn-sm uapp-sm-btn-bg btn">View </button>
                      </span>
                      </div>
                    </div>
  
  
  
                    <div class="uapp-message-wrap uapp-notice">
                      <div class="uapp-msg-head">
                        <span class="msg-sender-name">Super Admin</span>
                        <span class="msg-send-time uapp-float-right">27/07/21</span>
                        </div>
                        <div class="uapp-msg-body msg-width">
                          <h6>No Qualifications required !! University of Suffolk London &amp; Manchester Campus, Oct 2021 Intake.</h6>
                          <span class="uapp-float-right">
                        <button type="button" class="uapp-sm-btn btn-sm uapp-sm-btn-bg btn">View</button>
                      </span>
                      </div>
                    </div>
  
  
  
  
                    </div>
                  </div>
  
                </div>
              </div>
  
            </div>
  
          </div>
        </div> */}

        <div className='mt-5 text-center'>
          <h3>Dashboard Is Under Maintenance. Stay Tuned for Further Notification</h3>

        </div>
  
      </React.Fragment>
    );
};

export default SuperAdmin;