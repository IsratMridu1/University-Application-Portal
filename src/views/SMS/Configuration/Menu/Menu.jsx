import React, { useState, useEffect, createRef } from 'react'
import {Alert} from "reactstrap"
import Select from 'react-select';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col, Row, Card, CardHeader, CardTitle, CardBody, UncontrolledTooltip } from 'reactstrap';
import { User, Type } from "react-feather"
import { connect, useDispatch } from "react-redux";


import { StoreParentMenuItem } from '../../../../redux/actions/SMS/MenuActions/MenuActions';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router';
import get from '../../../../helpers/get';
import post from '../../../../helpers/post';
import CustomButtonRipple from '../../Components/CustomButtonRipple';

const Menu = (props) => {

   const parentMenuitems = props.parentMenuItems[0];
  
  
   const dispatch = useDispatch();
   const myForm = createRef();
   const [title,setTitle] = useState('');
   const [navLink,setNavLink] = useState('');
   const [type,setType] = useState('Select Type...');
   const [parentTitle,setParentTitle] = useState('Select Parent...');
   const [parentValue,setParentValue] = useState(null);
   const [displayOrder,setDisplayOrder] = useState(0);
   const [icon,setIcon] = useState(null);
   const [parentId,setParentId] = useState(null);
   const { addToast } = useToasts();
   const history = useHistory();

const userType = localStorage.getItem('current_user');
  //  get menu list and store into redux store
   useEffect(()=> {
    const returnvalue = get(`RoleMenuItem/Index/${userType?.displayUserType}`).then((action)=> {
    
      localStorage.setItem("menu", JSON.stringify(action));

      
      dispatch(StoreParentMenuItem(action))
    })
   },[dispatch])



   const handleSubmit = (event) => {
     event.preventDefault();
   

     const subData = new FormData(event.target)
   

    //  watch form data values
    //  for (var value of subData.values()) {
  
    //  }

    //  post form data and notify the response to user
     const returnValue = post(`MenuItem/Create`,subData).then((action)=> {

       addToast(action?.data?.message, {
        appearance: 'success',
        autoDismiss: true,
      });
     })


   }

   const handleDisplayOrder = (v) => {
     setDisplayOrder(v)
   }

   const selectMenuTypeName = (label, value) => {
     setType(label)
   }

   const selectparentMenutitles = (label,value) => {
    setParentTitle(label)
    setParentValue(value)
   }

   const menuType = ['item', 'collapse'];
   const menuTypeName = menuType.map(m => ({label: m, value: m}))
 
   const parentMenutitles = parentMenuitems?.map(pm => ({label: pm.title, value: pm.id}))

    // redirect to dashboard
    const backToDashboard = () => {
      history.push("/")
  }
  

  return (
    <div>

      <Card className='uapp-card-bg'>
              <CardHeader className="page-header">
              
                  <h3 className='text-white'>Assign Menu</h3>
                  <div className="page-header-back-to-home">
                    <span onClick={backToDashboard} className='text-white'> <i class="fas fa-arrow-circle-left"></i> Back to Dashboard</span>
                  </div>
              
              </CardHeader>
      </Card>
      <Card>
          <CardHeader>
            <CardTitle>Create Menu</CardTitle>
          </CardHeader>
          <CardBody>
      <Form onSubmit={handleSubmit} ref={myForm}>

                  <FormGroup row>
                    <Col md="2">
                    <i id="titleTooltip" class="fas fa-info-circle menuIcon"></i>
                      <span className="pl-2">Title</span>
                    </Col>
                    <UncontrolledTooltip
                    placement="top"
                    target="titleTooltip"

                  >
                    Your Menu Title
                  </UncontrolledTooltip>
                    <Col md="10" lg="6">
                      <Input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Menu Title"
                        onChange={(e)=>setTitle(e.target.value)}
                        required
                      />

                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                   <i id="iconTooltip" class="fas fa-info-circle menuIcon"></i>
                      <span className="pl-2">Icon</span>
                    </Col>

                    <UncontrolledTooltip
                    placement="top"
                    target="iconTooltip"
                  >
                    Your Menu Icon
                  </UncontrolledTooltip>

                    <Col md="10" lg="6">
                      <Input
                        type="text"
                        name="icon"
                        id="icon"
                        placeholder="Icon"
                        required
                        // onChange={(e)=>setIcon(e.target.value)}
                      />

                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                    <i id="typeTooltip" class="fas fa-info-circle menuIcon"></i>
                      <span className="pl-2">Type</span>
                    </Col>
                    <UncontrolledTooltip
                    placement="top"
                    target="typeTooltip"
                  >
                    Your Menu Type
                  </UncontrolledTooltip>
                    <Col md="10" lg="6">
                    <Select options={menuTypeName}
                           value={{ label: type, value: type }}
                           onChange={opt => selectMenuTypeName(opt.label, opt.value)}
                           name="type"
                           id="type"
                           />

                    </Col>
                  </FormGroup>

                  {
                    type == "item" &&
                    <FormGroup row>

                    <Col md="2">
                    <i id="urlTooltip" class="fas fa-info-circle menuIcon"></i>
                      <span className="pl-2">Target Url</span>
                    </Col>
                    <UncontrolledTooltip
                    placement="top"
                    target="urlTooltip"
                  >
                    Your Menu Url
                  </UncontrolledTooltip>
                    <Col md="10" lg="6">
                      <Input
                        type="text"
                        name="navLink"
                        id="navLink"
                        placeholder="Nav Link"
                        onChange={(e)=>setNavLink(e.target.value)}
                        required
                      />

                    </Col>
                  </FormGroup>
                  }


                  {
                    type == "item" &&
                    <FormGroup row>
                    <Col md="2">
                    <i id="parentIdTooltip" class="fas fa-info-circle menuIcon"></i>
                      <span className="pl-2">Parent</span>
                    </Col>
                    <UncontrolledTooltip
                    placement="top"
                    target="parentIdTooltip"
                  >
                    Parent Menu's Title
                  </UncontrolledTooltip>

                    <Col md="10" lg="6">
                    <Select options={parentMenutitles}
                           value={{ label: parentTitle, value: parentValue }}
                           onChange={opt => selectparentMenutitles(opt.label,opt.value)}
                           name="parentId"
                           id="parentId"
                           required
                           />
                    </Col>
                  </FormGroup>
                  }

                  <FormGroup row>
                    <Col md="2">
                    <i id="orderTooltip" class="fas fa-info-circle menuIcon"></i>
                      <span className="pl-2">Display Order</span>
                    </Col>
                    <UncontrolledTooltip
                    placement="top"
                    target="orderTooltip"
                  >
                    Order
                  </UncontrolledTooltip>
                    <Col md="10" lg="6">
                    <Input
                        type="number"
                        name="displayOrder"
                        value={displayOrder}
                        id="displayOrder"
                        placeholder="Order"
                        onChange={(e)=> handleDisplayOrder(e)}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup style={{display: 'flex',justifyContent: 'space-between'}}>
                        {/* <Button color="danger" className="mr-1 mt-3" onClick={()=>setModalOpen(false)}>Close</Button> */}
                      
                      <CustomButtonRipple
                        type={"submit"}
                        className={"mr-1 mt-3 badge-primary"}
                        name={"Submit"}
                        permission={6}
                      />

                  </FormGroup>

              </Form>
              </CardBody>
              </Card>
    </div>
  )
}

const mapStateToProps = state => ({
  parentMenuItems: state.parentMenuItemReducer.parentMenus
})

export default connect(mapStateToProps)(Menu);
