import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Card, CardBody, CardHeader, CardTitle,  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col, Row, InputGroup, Table, TabContent, TabPane, Nav, NavItem, NavLink, UncontrolledTooltip, ButtonGroup } from 'reactstrap';
import get from '../../../../helpers/get';
import post from '../../../../helpers/post';
import put from '../../../../helpers/put';
import remove from '../../../../helpers/remove';

const ShowCommissionPriceListData = (props) => {

    const {list, toggleUpdate, toggleDanger, deleteModal, setDeleteModal, confirmDelete} = props 


    return (
        <div>

                    <div className='mb-4'>
                                <span className='branch-title-style2'>Commission Price List</span>
                            </div>

                        <Table className="table-sm table-bordered">
                    <thead className="thead-uapp-bg">
                    <tr style={{ textAlign: "center" }}>
                    
                    <th>Price Range Name</th>
                     <th>Student From</th>
                     <th>Student To</th>
                     <th>Commission</th>
                     <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list?.map((ls, i) => (
                    <tr key={i} style={{ textAlign: "center" }}>
                    
                      <td>
                        {ls?.priceRangeName}
                      </td>
                      <td>
                        {ls?.rangeFrom}
                      </td>
                      <td>
                        {ls?.rangeTo}
                      </td>
                      <td>
                        {ls?.commissionAmount}
                      </td>
                     
                     
                      <td style={{ width: "15%" }} className="text-center">
                        <ButtonGroup variant="text">
                       

                            {/* <ButtonForFunction
                            icon={<i className="fas fa-edit"></i>}
                            color={"dark"}
                            className={"mx-1 btn-sm"}
                            func={()=>handleEdit(student)}
                            /> */}

                            <Button className='mr-1 btn-sm' color='warning' onClick={()=>toggleUpdate(ls)}>
                            <i className="fas fa-edit"></i>


                            </Button>

                            <Button className='ml-1 btn-sm' color='danger' onClick={()=>toggleDanger(ls)}>
                            <i className="fas fa-trash-alt"></i>


                            </Button>


                      

                          {/* <Button onClick={() => toggleDanger(student?.name, student?.id)} color="danger" className="mx-1 btn-sm">
                            <i className="fas fa-trash-alt"></i>
                          </Button> */}
                          
                       

                          {/* <ButtonForFunction
                          icon={<i className="fas fa-trash-alt"></i>}
                          color={'danger'}
                          className={"mx-1 btn-sm"}
                          func={()=> toggleDanger(student)}

                          /> */}

                        </ButtonGroup>

                     
                        <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)} className="uapp-modal">
                        <ModalBody>
                          <p>Are You Sure to Delete this ? Once Deleted it can't be Undone!</p>
                        </ModalBody>
        
                        <ModalFooter>
                          <Button  color="danger" onClick={confirmDelete}>YES</Button>
                          <Button onClick={() => setDeleteModal(false)}>NO</Button>
                        </ModalFooter>
                     </Modal>



                      </td>
                    </tr>
                  ))}
                    
                    </tbody>
                    </Table>
                            
            
        </div>
    );
};

export default ShowCommissionPriceListData;