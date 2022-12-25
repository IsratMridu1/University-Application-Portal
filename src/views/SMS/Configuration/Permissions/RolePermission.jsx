import React, { createRef, useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import Select from 'react-select';
import { useToasts } from "react-toast-notifications";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col, Row, Card, CardHeader, CardTitle, CardBody, UncontrolledTooltip } from 'reactstrap';

import { roleDataReducer } from '../../../../redux/reducers/SMS/RoleReducer';
import { useHistory } from 'react-router';
import post from '../../../../helpers/post';
import get from '../../../../helpers/get';
import { permissionList } from '../../../../constants/AuthorizationConstant';

const RolePermission = (props) => {

  const myForm = createRef();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [permissionName, setPermissionName] = useState([]);
  const [rolelabel, setRoleLabel] = useState('Select Role...');
  const [roleValue, setRoleValue] = useState('');
  const [confirm, setConfirm] = useState(false);
  let [checked, setChecked] = useState([]);
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const history = useHistory();
  const [roles,setRoles] = useState([]);

  const permissions = JSON.parse(localStorage.getItem('permissions'));

  useEffect(()=>{
    get(`UserRole/Index`)
    .then(res => {
      
        setRoles(res);
    })


  },[])

  

  // submitting form
  const handleSubmit = (event) => {
    event.preventDefault(); 
    const subData = new FormData();
    subData.append('RoleId',  roleValue);
    subData.append('CheckedArr',checked);
    //  watch form data values
    for (var value of subData.values()) {
  
    }
    // setModalOpen(true);

    

      setPermissionName([]);
     
    
      // posting form Data
       post(`RolePermission/Assign`,subData).then((action)=> {
        
        setChecked([]);
            addToast(action?.data?.message, {
              appearance: 'success',
              autoDismiss: true,
            })
      }) 
    
   
 
  }

  const roleName = roles?.map(role => ({label: role.name, value: role.id}));

  // onChange role 
  const selectRole = (label,value) => {
    setPermissionName([]);
    checked = [];
   
    setRoleLabel(label);
    setRoleValue(value);

    const returnValue = get(`RolePermission/GetCheckBoxes/${value}`).then((action)=>{

      setPermissionName(action);
      let defaultChecked = checked
      if(action.length > 0){
        for (let i = 0; i < action.length; i++) {
          const per = action[i];
          if(per.isChecked == true){
            const id = per.permissionId.toString();
            defaultChecked.push(id)
            setChecked([...defaultChecked])
          }

        }
      }

     });


  }



 
  // onChange checkbox
  const handleCheck = (e) => {

    let id = e.target.id;
    let val = e.target.checked;


    if(val == true){
    setChecked([...checked, id]);
    }else{
      const index = checked.indexOf(id);
      if (index > -1) {
        checked.splice(index, 1);
      }
    }
  }


  // on Select All Checkbox
  const handleSelectAll = e => {
    let newChecked = [];
    const val = e.target.checked;
    if(val == true){
      permissionName.map(per => {
        const perId = per.id.toString();
        newChecked.push(perId);
        document.getElementById(per.id).checked = true;  
      })
      setChecked([...newChecked]);
    }

    if(val == false){
      {
        permissionName.map(per => {
          document.getElementById(per.id).checked = false;  
        })
        setChecked([]);
      }
    }
   
  }

  // redirect to dashboard
  const backToDashboard = () => {
      history.push("/")
  }
  
  return (
    <div>
      
      <Card className='uapp-card-bg'>
        <CardHeader className="page-header ">
         
            <h3 className='text-white'>Assign Permissions</h3>
            <div className="page-header-back-to-home">
              <span onClick={backToDashboard} className='text-white'> <i className="fas fa-arrow-circle-left"></i> Back to Dashboard</span>
            </div>
         
        </CardHeader>
      </Card>

       <Card>
          <CardHeader>
          <div className="container test-score-div-1-style mt-1 mb-4">
            <span className="test-score-span-1-style">
              <b>Assign or Revoke Permissions for User Types.</b>
            </span>
            <br />
            <div>
              Select a user role to see the permissions of that user group. Checkboxes that are marked, each user from the selected can perform the operation. Each checkbox represents a specific operation/function. Please check multiple times while assigning permission to a user group.
            </div>
          </div>
          </CardHeader>
          <CardBody>
          <Form onSubmit={handleSubmit} ref={myForm}>
          <FormGroup row>
          <Col sm="6" md="4" lg="3">
            <Select
                  options={roleName}
                  value={{label: rolelabel, value: roleValue }}
                  onChange={opt => selectRole(opt.label, opt.value)}
                  name="type"
                  id="type"
            />
            </Col>
            </FormGroup>
         
            <FormGroup>

              <Row>
              <Col sm="12">
              {
                permissionName.length > 0 &&
                <div className="form-check">
                    <input className="form-check-input" onChange={(e)=>handleSelectAll(e)} type="checkbox" name="" />
                    <label className="form-check-label" htmlFor="">Select All</label>
                  </div>
              }
     
              </Col>
              {
                roleValue != null &&
                permissionName?.map(per =>
                
                  <Col xs="6" sm="4" md="3" key={per.id}>
                  <div className="form-check">
                    <input className="form-check-input" onChange={(e)=>handleCheck(e)} type="checkbox" name="" id={per.id} defaultChecked={per.isChecked} />
                    <label className="form-check-label" htmlFor="">{per.permissionName}</label>
                  </div>
                  </Col>
                  )
              }
              </Row>
            </FormGroup>

            <FormGroup style={{display: 'flex',justifyContent: 'space-between'}}>
                      <Row>

                        <Col>
                        {
                          permissions?.includes(permissionList?.Add_Permission) ?
                          <Button
                        type="submit"
                        className="mr-1 mt-3 badge-primary"
                      >
                        Submit
                      </Button>
                      :
                      null

                        }
                        </Col>

                      </Row>
                  </FormGroup>


            </Form>
            {/* <Modal isOpen={modalOpen} toggle={()=>setModalOpen(!modalOpen)} className="uapp-modal">
              <ModalBody>
                 <p>Are You Sure to Assign Selected Permissions?</p>
                 <Row className="mt-3">
                   <Col md="6" className="text-left">
                   <Button color="success" onClick={()=> setConfirm(!confirm)}>Yes</Button>
                   </Col>
                   <Col md="6" className="text-right">
                 <Button color="danger" onClick={()=> setModalOpen(false)}>Cancel</Button>
                   </Col>
                 </Row>
              </ModalBody>
            </Modal> */}
          </CardBody>

          </Card>
          
    </div>
  )
}

const mapStateToProps = state => ({

  roleList: state.roleDataReducer.roles

})

export default connect(mapStateToProps)(RolePermission);
