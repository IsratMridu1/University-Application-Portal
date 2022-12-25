import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Button, ButtonGroup, Card, CardBody, CardHeader, Col, Form, FormGroup, Modal, ModalBody, ModalFooter, Row, Table } from 'reactstrap';
import get from '../../../../helpers/get';
import Select from "react-select";
import post from '../../../../helpers/post';
import { useToasts } from 'react-toast-notifications';
import { fontGrid } from '@mui/material/styles/cssUtils';
import remove from '../../../../helpers/remove';

const BranchTeamEmployeeInformation = () => {
    const history = useHistory();
    const {branchId,teamId} = useParams();
    const [teamDetails, setTeamDetails] = useState([]);
    const serialNum = 1;
    const [menus, setMenus] = useState([]);
    let [checked, setChecked] = useState([]);
    const [branchTeamLabel, setBranchTeamLabel] = useState("Select team");
    const [branchTeamValue, setBranchTeamValue] = useState();
    const [branchTeam, setBranchTeam] = useState([]);
    const {addToast} = useToasts();
    const [deleteModal,setDeleteModal] = useState(false);
    const [delData, setDelData] = useState({});
    const [success, setSuccess] = useState(false);
    const [buttonStatus,setButtonStatus] = useState(false);
   
    

    

    useEffect(()=> {
      get(`BranchTeamEmployee/GetEmployee/${teamId}`)
      .then(res => {
        
        setTeamDetails(res)
      })

      get(`BranchTeam/GetbyBranch/${branchId}`).then((res) => {
        
        setBranchTeam(res);
      });

      get(`BranchTeamEmployee/GetUnassigned/${teamId}`).then(action => {
        selectBranchTeamName(action)
       
      })

    },[success])
    const backToBranchList = () => {
      history.push(`/branchProfile/${branchId}`)

    }

    const gotoEmployeeProfile = (data) => {

      
      history.push(`/branchEmployeeProfile/${branchId}/${data?.id}`)
      

    }

    const selectBranchTeamName = (action) => {
      setMenus([]);
      checked = [];
      // setBranchTeamLabel(label);
      // setBranchTeamValue(value);
     
  
     
     
        setMenus(action);
  
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
    
    };

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

      const closeDeleteModal = () => {
        setDeleteModal(false);
      }

      const toggleDanger = (data) => {

        setDelData(data);
        
        setDeleteModal(true);
      }

      const handleDeleteEmployee = () => {
        setButtonStatus(true);
        remove(`BranchTeamEmployee/Delete/${delData?.teamEmployeeId}`)
        .then(res => {
          setButtonStatus(false);
          addToast(res,{
            appearance: 'error',
            autoDismiss: true
          })
        })
        
        setDeleteModal(false);
        setDelData({});
        history.push(`/branchProfile/${branchId}`)
         
      }


  const handleConfirm = (e) => {
    e.preventDefault();
 
    setMenus([]);
      const subData = new FormData();
      subData.append('teamId',  teamId);
      subData.append('CheckedArray',checked);
      
      // posting form Data
     post(`BranchTeamEmployee/Create`,subData).then((action)=> {
   
       if(action?.status == 200 && action?.data?.isSuccess  == true){
         setChecked([]);
            addToast(action?.data?.message, {
              appearance:  'success',
              autoDismiss: true,
            })
         
       }
       else{
        addToast(action?.data?.message, {
          appearance:  'error',
          autoDismiss: true,
        })
       }

          
      }) 

      // for( let val of subData.values()){
     
      // }




  }
    
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
  
    return (
        <div>
            <Card className="uapp-card-bg">
        <CardHeader className="page-header">

          <h3 className="text-white">Team Employee Details</h3>
          <div className="page-header-back-to-home" >
            <span onClick={backToBranchList} className="text-white"> <i className="fas fa-arrow-circle-left"></i> Back to Branch Profile</span>
          </div>

        </CardHeader>
      </Card>

    
      <Card>

    {
      teamDetails.length > 0 ? 
      <div className="table-responsive container mt-3">
      <Table className="table-sm table-bordered" >
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
          {
            teamDetails?.map((details,i) => <tr key={details?.id} style={{ textAlign: "center" }}>
              

           
            <td>{serialNum + i}</td>
            <td>{details?.firstName}</td>
            <td>{details?.lastName}</td>
            <td>{details?.email}</td>
            <td>{details?.phoneNumber}</td>
            <td>
              <Button color='primary' className='mr-1' onClick={()=>gotoEmployeeProfile(details)}>
              <i className="fas fa-eye"></i>
              </Button>
              <Button color='danger' className='ml-1' onClick={()=>toggleDanger(details)}>
              Remove
              </Button>
              <Modal isOpen={deleteModal} toggle={closeDeleteModal} className="uapp-modal2">
    
              <ModalBody>
                <p>Are You Sure to Remove this Employee from the Team ?</p>
              </ModalBody>

              <ModalFooter>
                <Button color="danger"   onClick={handleDeleteEmployee} disabled={buttonStatus}>YES</Button>
                <Button onClick={closeDeleteModal}>NO</Button>
              </ModalFooter>

            </Modal>
            </td>
           
          
          
         
            
           
           
          </tr>)

          }

        


        </tbody>
      </Table>

    </div>  
    :

    <h5 className='text-center py-3'>Team Details Not Found</h5>
    }

        
      </Card>

      {/* <div>
                <Card>
                  <CardHeader className="page-header">
                    <h3>Assign Employee</h3>
                    <div className="page-header-back-to-home"></div>
                  </CardHeader>

                  <CardHeader>Select Team Member</CardHeader>

                  <CardBody>
                    <Form
                      onSubmit={handleConfirm}
                    
                      className="pb-5 mb-5">

                        <input
                        type='hidden'
                        name='branchId'
                        id='branchId'
                        value={branchId}
                        
                        />

                 

                      <FormGroup>
                        <Row>
                          <Col sm="12">
                            {menus.length > 0 && (
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  onChange={(e) => handleSelectAll(e)}
                                  type="checkbox"
                                  name=""
                                />
                                <label className="form-check-label" htmlFor="">
                                  Select All
                                </label>
                              </div>
                            )}
                          </Col>
                          {
                            menus?.map((menu) => (
                              <Col xs="6" sm="4" md="3" key={menu.id}>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    onChange={(e) => handleCheck(e)}
                                    name=""
                                    id={menu.id}
                                    defaultChecked={menu.isChecked}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor=""
                                  >
                                    {menu.firstName}
                                  </label>
                                  <label
                                    className="form-check-label"
                                    htmlFor=""
                                  >
                                    {menu.lastName}
                                  </label>
                                </div>
                              </Col>
                            ))}
                        </Row>
                      </FormGroup>

                      <FormGroup
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Row>
                          <Col>
                            <Button.Ripple
                              type="submit"
                              className="mr-1 mt-3 badge-primary"
                            >
                              Submit
                            </Button.Ripple>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Form>
                  </CardBody>
                </Card>
              </div> */}
            
        </div>
    );
};

export default BranchTeamEmployeeInformation;