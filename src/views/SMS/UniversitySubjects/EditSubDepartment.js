import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input} from 'reactstrap';
import get from '../../../helpers/get';

import put from '../../../helpers/put';
import { useToasts } from "react-toast-notifications";
import CustomButtonRipple from '../Components/CustomButtonRipple';
import { permissionList } from '../../../constants/AuthorizationConstant';

const EditSubDepartment = () => {
    const {id} = useParams();
    const history = useHistory();
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [departmentList, setdepartmentList]= useState([]);
    const [departmentLabel, setdepartmentLabel] = useState('');
    const [departmentValue, setdepartmentValue] = useState(0);
    const [dept, setDept] = useState({});
    const {addToast} = useToasts();
    const permissions = JSON.parse(localStorage.getItem("permissions"));
   
    const [uid,setUid] = useState();

    useEffect(()=>{
        get(`Department/Index`).then((action)=>{
          setdepartmentList(action);          
        })
      },[])


      useEffect(()=>{
        get(`SubDepartment/Get/${id}`)
        .then(res => {
            setName(res?.name);
            setDescription(res?.description);
            setUid(res?.id);
            setDept(res);
            setdepartmentLabel(res?.departmentinfo?.name);
            setdepartmentValue(res?.departmentinfo?.id);

        })



    },[id])

   

 

      const departmentName = departmentList?.map(depart => ({label: depart.name, value: depart.id}))

     
     

    const backToDashboard = () =>{
        history.push('/subDepartment');

    }

    const selectDepartmentName = (label, value) => {
        setdepartmentLabel(label);
        setdepartmentValue(value);
     
      }

      const handleSubmit = (e) => {
          e.preventDefault();
          const subData = new FormData(e.target);

          put('SubDepartment/Update',subData)
          .then(res => {
          if (res.status === 200 && res.data.isSuccess === true) {
            addToast(res?.data?.message, {
                appearance: 'success',
                autoDismiss: true,
              })
              history.push('/subDepartment');
            }
            // else{
            //   addToast(res?.data?.message, {
            //     appearance: 'error',
            //     autoDismiss: true,
            //   })
            // }
          })

      }

    

    return (
        <div>
              <Card className="uapp-card-bg">
              <CardHeader className="page-header">             
                 <h3 className="text-white">Update Sub Department </h3>
                  <div className="page-header-back-to-home">
                     <span onClick={backToDashboard} className="text-white"> <i className="fas fa-arrow-circle-left"></i> Back to Sub Department List</span>
                  </div>             
              </CardHeader>      
            </Card>

            <Card>
            <CardHeader>
       
           
            </CardHeader>
             <CardBody>

             <div>


             <Form onSubmit={handleSubmit}>

            <Input
 
            type='hidden'
            name='id'
            id='id'
            value={uid}

            />

          



      <FormGroup row className="has-icon-left position-relative">
        <Col md="2">
          <span> Name</span>
        </Col>
        <Col md="6">
          <Input
            type="text"
            name="name"
            id="name"
            defaultValue={name}
          
           
          />

        </Col>
      </FormGroup>

      <FormGroup row className="has-icon-left position-relative">
        <Col md="2">
          <span>Department</span>
        </Col>
        <Col md="6">
        <Select
              options={departmentName}
               value={{ label: departmentLabel, value: departmentValue }}
               onChange={opt => selectDepartmentName(opt.label, opt.value)}
               name="departmentId"
               id="departmentId"
             
               />               
        </Col>
      </FormGroup>

      <FormGroup row className="has-icon-left position-relative">
             <Col md="2">
             <span>Description</span>
                 </Col>
                      <Col md="6">
                        <Input
                               type="textarea"
                                name="description"
                                id="description"
                                  rows="3"
                                  defaultValue={description}
                     
                               
                                 />             
                        </Col>
        </FormGroup>

      <FormGroup row className="has-icon-left position-relative" style={{ display: 'flex', justifyContent: 'end' }}>     

          <Col md="5">
         {
            permissions?.includes(permissionList?.Update_sub_department) ?
           <CustomButtonRipple
           color={"primary"}
           type={"submit"}
           className={"mr-1 mt-3"}
           name={"Submit"}
           permission={6}
         />
         :
         null
         }
          </Col>
          
      </FormGroup>
    </Form>
<div>

</div>
</div>




         </CardBody>
      </Card>
            
        </div>
    );
};

export default EditSubDepartment;