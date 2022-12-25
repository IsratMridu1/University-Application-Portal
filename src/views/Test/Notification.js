
import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { Button, ButtonGroup, Card, CardBody, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Row, Table, Form, FormGroup } from 'reactstrap';
import post from '../../helpers/post';

const Notification = () => {

    const {addToast} = useToasts();
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');

    const onUserUpdate = (e) => {
        setUser(e.target.value);
    }

    const onMessageUpdate = (e) => {
        setMessage(e.target.value);
    }

    const submitFormData = (event) => {
        event.preventDefault();

        const subData = new FormData(event.target);

        post(`Notification/Create`,subData)
        .then(res => {
            if(res?.status ==200 && res?.data?.isSuccess ==true){
                addToast(res?.data?.message,{
                    appearance: 'success',
                    autoDismiss: true
                })
            }
            else{
                addToast(res?.data?.message,{
                    appearance: 'error',
                    autoDismiss: true
                })
            }
        })
    }
    return (
        <div className='mx-auto'>
           <Card>

            <CardBody>

            <div className='mt-5'>
                <Form onSubmit={submitFormData}>

                <FormGroup row className="has-icon-left position-relative">
            <Col md="2">
              <span>
                Name  <span className="text-danger">*</span>{" "}
              </span>
            </Col>
            <Col md="6">

             <Input
                    type='text'
                    placeholder='Enter Name'
                    required
                    onChange={onUserUpdate}
                    name='title'
                    id='title'
                    />
           
 
            </Col>
          </FormGroup>

          <FormGroup row className="has-icon-left position-relative">
            <Col md="2">
              <span>
                Description  <span className="text-danger">*</span>{" "}
              </span>
            </Col>
            <Col md="6">

            
            <Input
                    type='textarea'
                    rows={6}
                    placeholder='Enter Description'
                    required
                    onChange={onMessageUpdate}
                    name='description'
                    id='description'
                    /
                    >
 
            </Col>
          </FormGroup>

          <FormGroup row className="has-icon-left position-relative">
            <Col md="8">
              <div className='d-flex justify-content-end'>
              <Button color='primary' type='submit'>
                        Submit
                    </Button>

              </div>
            </Col>
         
          </FormGroup>

                    

                   

                   
                </Form>

            </div>
            </CardBody>

           </Card>

            
        </div>
    );
};

export default Notification;