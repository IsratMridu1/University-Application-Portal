import React from 'react';
import  { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, CardBody, CardHeader, Col, Form, FormGroup, Modal, ModalBody, ModalFooter, Row, Table } from 'reactstrap';
import Select from "react-select";
import { Link, useHistory } from 'react-router-dom';
import remove from '../../../../helpers/remove';
import { useToasts } from 'react-toast-notifications';
import get from '../../../../helpers/get';
import post from '../../../../helpers/post';
import ButtonForFunction from '../../Components/ButtonForFunction';
import LinkButton from '../../Components/LinkButton';

const AssignTeam = (props) => {



  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#9e9e9e',
      minHeight: '30px',
      height: '40px',
      boxShadow: state.isFocused ? null : null,
      
    }),

    menu: () => ({
      
      overflowY: 'auto'
      
    }),
   
   

    // valueContainer: (provided, state) => ({
    //   ...provided,
    //   height: '30px',
    //   padding: '0 6px'
    // }),

    // input: (provided, state) => ({
    //   ...provided,
    //   margin: '0px',
    // }),
    // indicatorSeparator: state => ({
    //   display: 'none',
    // }),
    // indicatorsContainer: (provided, state) => ({
    //   ...provided,
    //   height: '30px',
    // }),
  };

    const {id, success, setSuccess} = props;
    const history = useHistory();
    const [branchEmployee, setBranchEmployee] = useState([]);
    const [serialNum,setSerialNum] = useState(1);
  
    const [employeeModal, setEmployeeModal] = useState(false);
    const {addToast} = useToasts();
    const [menus, setMenus] = useState([]);
    let [checked, setChecked] = useState([]);
    const [branchTeamLabel, setBranchTeamLabel] = useState("Select team");
    const [branchTeamValue, setBranchTeamValue] = useState();
    const [branchTeam, setBranchTeam] = useState([]);
    const [branchEmployeeCheckbox, setBranchEmployeeCheckbox] = useState([]);
    const [deleteId, setDeleteId] = useState('');
    const [buttonStatus,setButtonStatus] = useState(false);
      
   
    

    const handleAddBranchEmployee = () => {
        
        history.push(`/branchEmployeeInformation/${id}`);
      };

      useEffect(()=>{
        get(`BranchTeam/GetbyBranch/${id}`).then((res) => {
            
            setBranchTeam(res);
          });

          get(`BranchEmployee/GetbyBranch/${id}`).then((res) => {
        
            setBranchEmployee(res);
        
          });
      
      },[success, id])

      const handleEditBranchEmployee = (id) => {
        history.push(`branchEmployeeInformation/${id}`);
      };

      const toggleDeleteEmployee = (id) => {
        setDeleteId(id?.id);
        setEmployeeModal(true);
      }

      const closeDeleteEmployeeModal = () => {
        setEmployeeModal(false);
      }

      // const handleDeleteEmployee = (id) =>{
      //   handleDeleteBranchEmployee(id);
    
      // }

      const handleDeleteBranchEmployee = () => {
        setButtonStatus(true);
        remove(`BranchEmployee/Delete/${deleteId}`).then((res) => {
          setButtonStatus(false);
          addToast(res, {
            appearance: "error",
            autoDismiss: true
          });
         setSuccess(!success);
         setEmployeeModal(false);
        });
        
      };

      const closeEmployeeModal = () => {
        setEmployeeModal(false);
      }


      const gotoEmployeeProfile = (data) => {

     
        history.push(`/branchEmployeeProfile/${id}/${data?.id}`);
        
  
      }


       // on Select Role
  const selectBranchTeamName = (label, value) => {
    setMenus([]);
    checked = [];
    setBranchTeamLabel(label);
    setBranchTeamValue(value);
    

    get(`BranchTeamEmployee/GetUnassigned/${value}`).then((action) => {
     
      setMenus(action);
      setSuccess(!success);
      let defaultChecked = checked;
      if (action.length > 0) {
        for (let i = 0; i < action.length; i++) {
          const menu = action[i];
          if (menu.isChecked === true) {
            const id = menu.id.toString();
            defaultChecked.push(id);
            setChecked([...defaultChecked]);
          }
        }
      }
    });
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
  
    const subdata = new FormData(e.target);
    subdata.append('teamId',branchTeamValue);
    subdata.append('checkedArray',checked);
   
    // for( let val of subData.values()){
  
    // }
    setButtonStatus(true);
    post('BranchTeamEmployee/Create',subdata)
    .then(res => {
     setButtonStatus(false);
      history.push(`/branchProfile/${id}`);
      addToast(res?.data?.message,{
        appearance: 'success',
        autoDismiss: true
      })
      setSuccess(!success);
      setMenus([]);
    checked = [];
      setBranchTeamLabel('Select Team');
      
    })

  }

    // handling checkbox
    const handleCheck = (e) => {
        let id = e.target.id;
        let val = e.target.checked;
    
        if (val === true) {
          setChecked([...checked, id]);
        } else {
          const index = checked.indexOf(id);
          if (index > -1) {
            checked.splice(index, 1);
          }
        }
      };

      const branchTeamName = branchTeam?.map((branch) => ({
        label: branch.name,
        value: branch.id,
      }));
    
      // on Select All Checkbox
  const handleSelectAll = (e) => {
    let newChecked = [];
    const val = e.target.checked;
    if (val === true) {
      menus.map((menu) => {
        const menuId = menu.id.toString();
        newChecked.push(menuId);
        document.getElementById(menu.id).checked = true;
      });
      setChecked([...newChecked]);
    }

    if (val === false) {
      {
        menus.map((menu) => {
          document.getElementById(menu.id).checked = false;
        });
        setChecked([]);
      }
    }
  };

  const redirectToUpdateBranchEmployee = (branchId, employeeId) => {
    history.push(`/branchEmployeeInformation/${branchId}/${employeeId}`);
  }


    return (
        <div>
              <Card>
              <div className="container mt-3 d-flex justify-content-between">

                <div>

                     <span className='branch-title-style'>Branch Employee</span>
                </div>

               <div>
               <Button
                  onClick={handleAddBranchEmployee}
                  className="btn btn-uapp-add "
                >
                  {" "}
                  <i class="fas fa-plus"></i> Add New Employee{" "}
                </Button>
               </div>

                {/* <ButtonForFunction 
                className={"btn btn-uapp-add "} /> */}


              </div>

              {branchEmployee.length > 0 ? (
                <div className="table-responsive container mt-3">
                  <Table className="table-sm table-bordered">
                    <thead className="thead-uapp-bg">
                      <tr style={{ textAlign: "center" }}>
                        <th>SL/NO</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {branchEmployee?.map((employee, i) => (
                        <tr key={employee.id} style={{ textAlign: "center" }}>
                          <td>{serialNum + i}</td>
                          <td>{employee?.firstName}</td>
                          <td>{employee?.lastName}</td>
                          <td>{employee?.email}</td>
                          <td>{employee?.phoneNumber}</td>
                          <td>
                            <ButtonGroup variant="text">

                            <Button color='primary' className='mx-1 btn-sm' onClick={()=>gotoEmployeeProfile(employee)}>
                            <i className="fas fa-eye"></i>
                            </Button>

                              <Button
                                color="warning"
                                onClick={() =>
                                  redirectToUpdateBranchEmployee(id, employee?.id)
                                }
                                className="mx-1 btn-sm"
                              >
                                <i class="fas fa-edit"></i>
                              </Button>
                              
                              {/* <LinkButton
                              icon={ <i class="fas fa-edit"></i>}
                              className={"mr-1 btn-sm"}
                              color={"warning"}
                              url={`/branchEmployeeInformation/${id}/${employee?.id}`}
                              /> */}

                              <Button
                                color="danger"
                                onClick={() =>
                                  toggleDeleteEmployee(employee)
                                }
                                className="mx-1 btn-sm"
                              >
                                <i class="fas fa-trash-alt"></i>
                              </Button>
                            </ButtonGroup>
                            <Modal
                              isOpen={employeeModal}
                              toggle={closeDeleteEmployeeModal}
                              className="uapp-modal"
                            >
                              <ModalBody>
                                <p>
                                  Are You Sure to Delete this ? Once Deleted it
                                  can't be Undone!
                                </p>
                              </ModalBody>

                              <ModalFooter>
                                <Button
                                  color="danger"
                                  onClick={handleDeleteBranchEmployee}
                                  disabled={buttonStatus}
                                >
                                  YES
                                </Button>
                                <Button onClick={closeEmployeeModal}>NO</Button>
                              </ModalFooter>
                            </Modal>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <h5 className="text-center mt-3">Employee Data Not Found</h5>
              )}

             
            </Card>

            <Card>
                <CardHeader>
                    <p className='fw-bold'>Assign Team Employee</p>
                </CardHeader>

                <CardBody>

                <Form onSubmit={handleSubmit}>

                    <FormGroup row>
                            <Col sm="6" md="4" lg="3">
                                <Select
                                    styles={customStyles}
                                    options={branchTeamName}
                                    value={{label: branchTeamLabel, value: branchTeamValue }}
                                    onChange={opt => selectBranchTeamName(opt.label, opt.value)}
                                    name="type"
                                    id="type"
                                />
                                </Col>
                    </FormGroup>


                    <FormGroup>

                                <Row>
                                <Col sm="12">
                                {
                                    menus.length > 0 &&
                                    <div className="form-check">
                                        <input className="form-check-input" onChange={(e)=>handleSelectAll(e)} type="checkbox" name="" />
                                        <label className="form-check-label" htmlFor="">Select All</label>
                                    </div>
                                }
                        
                                </Col>
                                {
                                    branchTeamValue &&
                                    menus?.map(menu =>
                                    
                                    <Col xs="6" sm="4" md="3" key={menu.id}>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" onChange={(e)=>handleCheck(e)} name="" id={menu.id} defaultChecked={menu.isChecked}  />
                                        <label className="form-check-label" htmlFor="">{menu.firstName}{' '}{menu.lastName}</label>
                                    </div>
                                    </Col>
                                    )
                                }
                                </Row>
                        </FormGroup>
                

                    <FormGroup style={{display: 'flex',justifyContent: 'space-between'}}>
                            <Row>

                                <Col>
                                <Button
                                type="submit"
                                className="mr-1 mt-3 badge-primary"
                                disabled={buttonStatus}
                            >
                                Submit
                            </Button>
                                </Col>

                            </Row>
                        </FormGroup>


                    </Form>
                  
                </CardBody>

            </Card>
            
        </div>
    );
};

export default AssignTeam;