import React, { useEffect, useState } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    ButtonGroup,
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Button,
  
    Input,
  
    Col,
    Row,
    Table,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
  } from "reactstrap";
  import { useHistory, useLocation } from "react-router";
import get from '../../../helpers/get';
import { Link } from 'react-router-dom';



const SubjectFeeInformation = () => {

    // for tab
    const [activetab, setActivetab] = useState("2");
    const [loading, setLoading] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [subjectFee, setSubjectFee] = useState([]);

    const location = useLocation();
    const history = useHistory();

    // redirect to dashboard
    const backToDashboard = () => {
      history.push("/");
    };

     // tab toggle
    const toggleTab = (tab) => {
      setActivetab(tab);
      if(tab === "1"){
        history.push("/subjectList");
      }
      if (tab === "2") {
        history.push("/subjectFeeInfo");
      }
    };

    // toggle dropdown
    const toggle = () => {
        setDropdownOpen((prev) => !prev);
      };

    useEffect(()=>{
        get("SubjectFeeStructure/Index").then(res=>{
            
            setSubjectFee(res);
        })
    },[]);

    return (
        <div>
            <Card className="uapp-card-bg">
                <CardHeader className="page-header">
                  <h3 className="text-white">Subject List</h3>
                  <div className="page-header-back-to-home">
                    <span onClick={backToDashboard} className="text-white">
                      {" "}
                      <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
                    </span>
                  </div>
                </CardHeader>
            </Card>

            <Nav tabs>
                <NavItem>
                  <NavLink active={activetab === "1"} onClick={() => toggleTab("1")}>
                    Subjects informations
                  </NavLink>
                </NavItem>
                <NavItem>
                  
                    <NavLink active={activetab === "2"} onClick={() => toggleTab("2")}>
                      Subject fee informations
                    </NavLink>
                
                </NavItem>
           </Nav>

           <Card className="uapp-employee-search">
        <CardBody>
          <Row className="mb-3">
            <Col lg="6" md="5" sm="6" xs="4">
              
            </Col>

            <Col lg="6" md="7" sm="6" xs="8">
              <Row>
                <Col lg="5" md="6"></Col>
                <Col lg="2" md="3" sm="5" xs="5" className="mt-2">
                  
                </Col>
                <Col md="3" sm="7" xs="7">
                  
                </Col>
                <Col lg="2">
                  <Dropdown
                    className="uapp-dropdown"
                    style={{ float: "right" }}
                    isOpen={dropdownOpen}
                    toggle={toggle}
                  >
                    <DropdownToggle caret>
                      <i className="fas fa-ellipsis-v"></i>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Export All</DropdownItem>
                      {/* <DropdownItem divider /> */}
                      <DropdownItem>Export Excel</DropdownItem>
                      <DropdownItem>Export PDF</DropdownItem>
                      <DropdownItem>Export CSV</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </Col>
              </Row>
            </Col>
          </Row>

          {loading ? (
            <h2 className="text-center">Loading...</h2>
          ) : (
            <div className="table-responsive">
              <Table className="table-sm table-bordered">
                <thead className="thead-uapp-bg">
                  <tr style={{ textAlign: "center" }}>
                    <th>SL/NO</th>
                    <th>Subject Name</th>
                    <th>Local Tution Fee</th>
                    <th>International Tution Fee</th>
                    <th>EU Tution Fee</th>
                    <th style={{ width: "8%" }} className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subjectFee?.map((sub, i) => (
                    <tr key={sub.id} style={{ textAlign: "center" }}>
                      <td>{1 + i}</td>
                      <td>
                        {sub?.subject?.name}
                      </td>
                      <td>{sub?.localTutionFee}</td>

                      <td>
                        {sub?.internationalTutionFee}
                      </td>

                      <td>
                        {sub?.eU_TutionFee}
                      </td>

                      <td style={{ width: "8%" }} className="text-center">
                        <ButtonGroup variant="text">
                        <Link to= "">
                          <Button color="primary" className="mx-1 btn-sm">
                            {" "}
                            <i className="fas fa-eye"></i>{" "}
                          </Button>
                        </Link>

                          <Link to="">
                            <Button color="dark" className="mx-1 btn-sm">
                              {" "}
                              <i className="fas fa-edit"></i>{" "}
                            </Button>
                          </Link>
                        </ButtonGroup>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              

            </div>
          )}



        </CardBody>
      </Card>


        </div>
    );
};

export default SubjectFeeInformation;