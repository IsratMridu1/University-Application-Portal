import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Col,
  Input,
  Form,
  Button
} from "reactstrap";

import { useToasts } from "react-toast-notifications";

import Checkbox from "../../components/core/checkbox/CheckboxesVuexy"
import { Check, User, Mail, Smartphone, Lock } from "react-feather"
import { useParams } from 'react-router-dom';
import get from '../../helpers/get';
import put from '../../helpers/put';

const UpdateUser = () => {

    const [user, setUser] = useState({});
    const { addToast } = useToasts();
    const {id} = useParams();

    useEffect(() => {
        get(`Practice/Get/${id}`).then(res => {
            setUser(res);
        })
    }, [id]);

    const handleUpdate = (e) => {
      e.preventDefault();
      const subData = new FormData(e.target);
      // for(let i of subData.values()){
     
      // }
      put(`Practice/Update`, subData).then(action => {
        addToast(action, {
          appearance: 'success',
          autoDismiss: true,
        })
      });
    }

  


  return (
    <div>
   <Card>
        <CardHeader>
          <CardTitle>Update User Information</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleUpdate}>
          <FormGroup row className="has-icon-left position-relative">
              <Col md="4">
                <span>Id</span>
              </Col>
              <Col md="8" lg="6">
                <Input
                  type="number"
                  name="id"
                  defaultValue={user.id}
                  id="id"
                  placeholder="Id"
                />
                <div className="form-control-position">
                  <User size={15} />
                </div>
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="4">
                <span>First Name</span>
              </Col>
              <Col md="8" lg="6">
                <Input
                  type="text"
                  name="firstName"
                  defaultValue={user.firstName}
                  id="firstName"
                  placeholder="First Name"
                />
                <div className="form-control-position">
                  <User size={15} />
                </div>
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="4">
                <span>Last Name</span>
              </Col>
              <Col md="8" lg="6">
                <Input
                  type="text"
                  name="lastName"
                  defaultValue={user.lastName}
                  id="lastName"
                  placeholder="Last Name"
                />
                <div className="form-control-position">
                  <User size={15} />
                </div>
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="4">
                <span>Email</span>
              </Col>
              <Col md="8" lg="6">
                <Input
                  type="email"
                  name="email"
                  defaultValue={user.email}
                  id="email"
                  placeholder="Email"
                />
                <div className="form-control-position">
                  <Mail size={15} />
                </div>
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="4">
                <span>Mobile</span>
              </Col>
              <Col md="8" lg="6">
                <Input
                  type="number"
                  name="phone"
                  defaultValue={user.phone}
                  id="phone"
                  placeholder="Mobile"
                />
                <div className="form-control-position">
                  <Smartphone size={15} />
                </div>
              </Col>
            </FormGroup>

            {/* <FormGroup row className="has-icon-left position-relative">
              <Col md="4">
                <span>Password</span>
              </Col>
              <Col md="8" lg="6">
                <Input
                  type="password"
                  name="password"
                  id="passwordIcons"
                  placeholder="Password"
                />
                <div className="form-control-position">
                  <Lock size={15} />
                </div>
              </Col>
            </FormGroup> */}

            <FormGroup row className="has-icon-left position-relative">
              <Col md={{ size: 8, offset: 4 }}>
                <Checkbox
                  color="primary"
                  icon={<Check className="vx-icon" size={16} />}
                  label="Remember Me"
                  defaultChecked={false}
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md={{ size: 8, offset: 4 }}>
                <Button.Ripple
                  color="primary"
                  type="submit"
                  className="mr-1 mb-1"
                  // onClick={e => e.preventDefault()}
                >
                  Submit
                </Button.Ripple>
                <Button.Ripple
                  outline
                  color="warning"
                  type="reset"
                  className="mb-1"
                >
                  Reset
                </Button.Ripple>
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default UpdateUser;