import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Card, CardBody, CardHeader, CardTitle,  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col, Row, InputGroup, Table, TabContent, TabPane, Nav, NavItem, NavLink, UncontrolledTooltip, ButtonGroup } from 'reactstrap';
import get from '../../../../helpers/get';
import post from '../../../../helpers/post';
import put from '../../../../helpers/put';
import remove from '../../../../helpers/remove';

const AddCommissionPriceInformation = (props) => {

    const {id, handleRange, handleFrom, handleTo, handleCommission, rangeName, setRangeName, from, setFrom, to, setTo,handleSubmit, commission, setCommission, data} = props;

   

 


   



    return (
        <div>

                        <div className='mb-4'>
                                <span className='branch-title-style2'>Add Commission Information</span>
                            </div>

                        <form  onSubmit={handleSubmit}> 

                        {
                            (data?.id) ? 
                            <input
                            type='hidden'
                            name='id'
                            id='id'
                            value={data?.id}
                            />
                            :
                            null
                        }

                        <input
                        type='hidden'
                        name='commissionGroupId'
                        id='commissionGroupId'
                        value={id}
                        />

                        <FormGroup row className="has-icon-left position-relative">
                        <Col md="4">
                        <span>
                        Price Range Name <span className="text-danger"></span>
                        </span>
                        </Col>
                        <Col md="8">
                        <Input
                        type='text'
                        name="priceRangeName"
                        id="priceRangeName"
                        value={rangeName}
                        onChange={handleRange}
                        
                        
                        required

                        />

                        </Col>
                        </FormGroup>

                        <FormGroup row className="has-icon-left position-relative">
                        <Col md="4">
                        <span>
                        Student Range From <span className="text-danger"></span>
                        </span>
                        </Col>
                        <Col md="8">
                        <Input
                        type='text'
                        name="rangeFrom"
                        id="rangeFrom"
                        value={from}
                        onChange={handleFrom}
                        
                        required

                        />

                        </Col>
                        </FormGroup>

                        <FormGroup row className="has-icon-left position-relative">
                        <Col md="4">
                        <span>
                        Student Range To <span className="text-danger"></span>
                        </span>
                        </Col>
                        <Col md="8">
                        <Input
                        type='text'
                        name="rangeTo"
                        id="rangeTo"
                        value={to}
                        onChange={handleTo}
                        
                        required

                        />

                        </Col>
                        </FormGroup>

                        <FormGroup row className="has-icon-left position-relative">
                        <Col md="4">
                        <span>
                        Commission Amount <span className="text-danger"></span>
                        </span>
                        </Col>
                        <Col md="8">
                        <Input
                        type='text'
                        name="commissionAmount"
                        id="commissionAmount"
                        value={commission}
                         onChange={handleCommission}
                        
                        required

                        />

                        </Col>
                        </FormGroup>

                        <div className='d-flex justify-content-end mt-3'>
                          
                            
                          <div>
                          <Button color='primary' type='submit'>
                              Submit

                            </Button>
                          </div>

                          </div>

                            


                        </form>

            
        </div>
    );
};

export default AddCommissionPriceInformation;