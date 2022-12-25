import React, { createRef, useState } from 'react'
import { connect  } from 'react-redux'
import { useHistory } from 'react-router';
import Select from 'react-select';
import { useToasts } from "react-toast-notifications";
import { Button, Modal,  ModalBody,  Form, FormGroup,    Col, Row, Card, CardHeader,  CardBody,  } from 'reactstrap';
import get from '../../../../helpers/get';
import post from '../../../../helpers/post';
import { permissionList } from '../../../../constants/AuthorizationConstant';
import { useEffect } from 'react';


const RoleMenu = (props) => {

    const myForm = createRef();
    
    const [modalOpen, setModalOpen] = useState(false);
    const [rolelabel, setRoleLabel] = useState('Select Role...');
    const [roleValue, setRoleValue] = useState('');
    const [menus, setMenus] = useState([]);
    const [confirm, setConfirm] = useState(false);
    let [checked, setChecked] = useState([]);
    const { addToast } = useToasts();
    const history = useHistory();
    const permissions = JSON.parse(localStorage.getItem('permissions'));
    const [roles,setRoles] = useState([]);


  // submitting form
  const handleSubmit = (event) => {
    event.preventDefault(); 
    setModalOpen(true);
    // //  watch form data values
    // for (var value of subData.values()) {
  
    //  }
  
    
  }

  useEffect(()=>{
    get(`UserRole/Index`)
    .then(res => {
      
        setRoles(res);
    })


  },[])




    // on Select Role
    const selectRole = (label,value) => {

        setMenus([]);
        checked = [];
        setRoleLabel(label);
        setRoleValue(value);


        const returnValue = get(`RoleMenuItem/GetCheckBoxes/${value}`).then((action)=> {
       
            setMenus(action);
        

            let defaultChecked = checked
                if(action.length > 0){
                    for (let i = 0; i < action.length; i++) {
                    const menu = action[i];
                    if(menu.isChecked == true){
                        const id = menu.id.toString();
                        defaultChecked.push(id)
                        setChecked([...defaultChecked])
                    }

                    }
                 }
        })
    }


    // handling checkbox
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
      menus.map(menu => {
        const menuId = menu.id.toString();
        newChecked.push(menuId);
        document.getElementById(menu.id).checked = true;  
      })
      setChecked([...newChecked]);
    }

    if(val == false){
      {
        menus.map(menu => {
          document.getElementById(menu.id).checked = false;  
        })
        setChecked([]);
      }
    }
   
  }


  const handleConfirm = () => {
 
    setMenus([]);
      const subData = new FormData();
      subData.append('RoleId',  roleValue);
      subData.append('CheckedArr',checked);
      // posting form Data
      post(`RoleMenuItem/Assign`,subData).then((action)=> {
        console.log('checking role menu action',action)
   
        setChecked([]);
            addToast(action?.data?.message, {
              appearance: 'success',
              autoDismiss: true,
            })
            setModalOpen(false)
      }) 
  }
    


     // redirect to dashboard
    const backToDashboard = () => {
        history.push("/")
    }
    



    const roleName = roles?.map(role => ({label: role.name, value: role.id}));
    return (
        <div>
            <Card className='uapp-card-bg'>
                <CardHeader className="page-header">
                
                    <h3 className='text-white'>Assign Menu</h3>
                    <div className="page-header-back-to-home">
                    <span onClick={backToDashboard} className='text-white'> <i className="fas fa-arrow-circle-left"></i> Back to Dashboard</span>
                    </div>
                
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                <div className="container test-score-div-1-style mt-1 mb-4">
            <span className="test-score-span-1-style">
              <b>Assign or Revoke Menu for User Types.</b>
            </span>

            <br />
            <div>
              Select a user role to see the assigned menu items for that user. Checkboxes can contain cascading menus. If the parent is not selected, the submenu will not be shown in the menu bar. Please discuss this with the developers before assigning the menu to the user. Or contact the administrator.
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
                                    menus.length > 0 &&
                                    <div className="form-check">
                                        <input className="form-check-input" onChange={(e)=>handleSelectAll(e)} type="checkbox" name="" />
                                        <label className="form-check-label" htmlFor="">Select All</label>
                                    </div>
                                }
                        
                                </Col>
                                {
                                    roleValue &&
                                    menus?.map(menu =>
                                    
                                    <Col xs="6" sm="4" md="3" key={menu.id}>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" onChange={(e)=>handleCheck(e)} name="" id={menu.id} defaultChecked={menu.isChecked}  />
                                        <label className="form-check-label" htmlFor="">{menu.menuItem}</label>
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
                                    permissions?.includes(permissionList?.Asign_Menu) ? 
                                    <Button.Ripple
                                type="submit"
                                className="mr-1 mt-3 badge-primary"
                            >
                                Submit
                            </Button.Ripple>
                            :
                            null
                                }
                                </Col>

                            </Row>
                        </FormGroup>


                    </Form>
                    <Modal isOpen={modalOpen} toggle={()=>setModalOpen(!modalOpen)} className="uapp-modal">
                        <ModalBody>
                            <p>Are You Sure to Assign Selected Menus?</p>
                            <Row className="mt-3">
                            <Col md="6" className="text-left">
                            <Button color="success" onClick={handleConfirm}>Yes</Button>
                            </Col>
                            <Col md="6" className="text-right">
                            <Button color="danger" onClick={()=> setModalOpen(false)}>Cancel</Button>
                            </Col>
                            </Row>
                        </ModalBody>
                    </Modal>
                </CardBody>

            </Card>
        </div>
    )
}
const mapStateToProps = state => ({
    roleList: state.roleDataReducer.roles
})
export default connect(mapStateToProps)(RoleMenu);
