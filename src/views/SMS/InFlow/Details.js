import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import get from '../../../helpers/get';
import { Card, CardBody, CardHeader, CardTitle,  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col, Row, InputGroup, Table, TabContent, TabPane, Nav,NavLink, NavItem, UncontrolledTooltip, ButtonGroup, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

const Details = () => {

    const {id} = useParams();
    const history = useHistory();
    const [info,setInfo] = useState({});

    useEffect(()=>{

        get(`BonusTransaction/Details/${id}`)
        .then(res => {
            
            setInfo(res);
        })

    },[])

    const backToDashboard = () => {
        history.push(`/inFlowTransaction`);
    }

    const editInfo = () => {
        history.push(`/inFlow/Update/${id}`)
    }

    return (
        <div>
            <Card className="uapp-card-bg">
              <CardHeader className="page-header">
                <h3 className="text-white">Inflow Transaction Details</h3>
                <div className="page-header-back-to-home">
                  <span className="text-white" onClick={backToDashboard}>
                    {" "}
                    <i className="fas fa-arrow-circle-left"></i> Back to Inflow Transaction List
                  </span>
                </div>
              </CardHeader>
            </Card>

            <div className='row'>

                <div className='col-md-8'>

                  <Card>

                    <CardBody>

                    <div className='d-flex justify-content-between'>

                    <div>
                    <div className="hedding-titel2">
                    <h5> <b>Details Of: {info?.consultant}</b> </h5>
                    <div className="bg-h"></div>
                  </div>
                  <Table className="table-bordered mt-4" >
                    <tbody>
                      <tr>
                        <td>
                          <b>Transaction Code:</b>
                        </td>

                        <td>
                          {info?.transactionCode}
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <b>Transaction Date:</b>
                        </td>

                        <td>
                          {info?.transactionDate}
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <b>Transaction Type:</b>
                        </td>

                        <td>
                          {info?.transactionType}
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <b>Transaction Note:</b>
                        </td>

                        <td>
                          {info?.transactionNote}
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <b>Reference:</b>
                        </td>

                        <td>
                          {info?.reference}
                        </td>
                      </tr>
                      </tbody>
                    </Table>

                    </div>

                    <div>
                        <Button color='warning' onClick={editInfo}>
                            Edit
                        </Button>
                    </div>

                    </div>

                    </CardBody>

                  </Card>
                    

                </div>

            </div>
            
        </div>
    );
};

export default Details;