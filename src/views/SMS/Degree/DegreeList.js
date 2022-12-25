import React, { useEffect, useState } from 'react';
import get from '../../../helpers/get';
import { Button, Card, CardBody, CardHeader, Col, Table, Form, FormGroup, Input, Nav, NavItem, NavLink, TabContent, TabPane, Label, Row, Modal, ModalBody, ModalFooter, ButtonGroup } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import ButtonForFunction from '../Components/ButtonForFunction';
import remove from '../../../helpers/remove';
import { useToasts } from "react-toast-notifications";
import LinkButton from '../Components/LinkButton';
import Loader from '../Search/Loader/Loader';

const DegreeList = () => {


    const [degreeList, setDegreeList] = useState([]);

    const [deleteData, setDeleteData] = useState({});

    const {addToast} = useToasts();
    const history = useHistory();
    const [deleteModal,setDeleteModal] = useState(false);
    const [serialNum, setSerialNum] = useState(1);
    const [success, setSuccess] = useState(false);
    const [loading,setLoading] = useState(true);
    const [buttonStatus,setButtonStatus] = useState(false);

    useEffect(()=>{

        get(`Degree/Index`)
        .then(res => {
            console.log('Checking Degree Data from get method', res);
            setDegreeList(res);
            setLoading(false);
        })

    },[success])


       // Delete Modal

       const toggleDanger = (data) => {

        // console.log(data);
        setDeleteData(data);
        setDeleteModal(true);
      }


         // Delete Button

         const handleDeleteData = (data) => {
            setButtonStatus(true);
            remove(`Degree/Delete/${data?.id}`)
            .then(res => {
                setButtonStatus(false);
              addToast(res,{
                appearance: 'error',
                autoDismiss: true
              })
              setDeleteData({});
              setSuccess(!success);
              setDeleteModal(false);
              
            })
      
            }


             // Go To Degree Form Page

      const handleAddDegree = () => {

        history.push('/addDegree');
      }


      // back to dashboard

    const backToDashboard = () => {

        history.push('/');
    }

    const redirectToUpdate = (degreeName, degreeEducationLevelName, degreeEducationLevelId, degreeId) =>{
        history.push(`/addDegree/${degreeName}/${degreeEducationLevelName}/${degreeEducationLevelId}/${degreeId}`);
    }

    return (
        <div>

         {
            loading?
            <Loader/>
            :
            <div>
                   <Card className="uapp-card-bg">
                    <CardHeader className="page-header">
                    <h3 className="text-white">Degree List</h3>
                    <div className="page-header-back-to-home">
                        <span className="text-white" onClick={backToDashboard}>
                        {" "}
                        <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
                        </span>
                    </div>
                    </CardHeader>
                </Card>


                <Card>

            <CardBody>

            <div className='mb-3'>

            <ButtonForFunction className ={"btn btn-uapp-add "}
                    icon ={<i className="fas fa-plus"></i>}
                    func={handleAddDegree} 
                    name={' Add New Degree'}
                                
            />

            </div>

            <div className="table-responsive mb-3">
                    <Table className="table-sm table-bordered">
                    <thead className="thead-uapp-bg">
                        <tr style={{ textAlign: "center" }}>
                        <th>SL/NO</th>
                        <th>Name</th>
                        <th>Education Level Name</th>
                        <th>Education Level Description </th>
                        <th>Education Level Value </th>
                        <th style={{ width: "8%" }} className="text-center">
                            Action
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        degreeList?.map((degree, i) => (
                        <tr key={degree?.id} style={{ textAlign: "center" }}>
                            <th scope='row'>{serialNum + i}</th>
                            <td>
                            {degree?.name}
                            </td>
                            
                            <td>
                            {degree?.educationLevel?.name}
                            </td>

                            <td>
                            {degree?.educationLevel?.description}
                            </td>

                            <td>
                            {degree?.educationLevel?.levelValue}
                            </td>


                            <td style={{ width: "8%" }} className="text-center">
                            <ButtonGroup variant="text">
                            
                                <ButtonForFunction
                                  icon={<i className="fas fa-edit"></i>}
                                  color={'warning'}
                                  className={"mx-1 btn-sm"}
                                  func={()=>redirectToUpdate(degree?.name, degree?.educationLevel?.name, degree?.educationLevel?.id, degree?.id)}
                                />

                                {/* <LinkButton
                                icon={<i className="fas fa-edit"></i>}
                                color={"warning"}
                                className={"mx-1 btn-sm"}
                                url={`/addDegree/${degree?.name}/${degree?.educationLevel?.name}/${degree?.educationLevel?.id}/${degree?.id}`}
                                /> */}
                            
                                <ButtonForFunction
                                  icon={<i className="fas fa-trash-alt"></i>}
                                  color={'danger'}
                                  className={"mx-1 btn-sm"}
                                  func={()=>toggleDanger(degree)}
                                />

                            </ButtonGroup>

                        
                            <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)} className="uapp-modal">
                            <ModalBody>
                                <p>Are You Sure to Delete this ? Once Deleted it can't be Undone!</p>
                            </ModalBody>
            
                            <ModalFooter>
                                <Button  color="danger" onClick={()=>handleDeleteData(deleteData)}
                                disabled={buttonStatus}>YES</Button>
                                <Button onClick={() => setDeleteModal(false)}>NO</Button>
                            </ModalFooter>
                        </Modal>



                            </td>
                        </tr>
                        ))
                        }
                    </tbody>
                    </Table>
                    

                </div>


            </CardBody>


            </Card>
            </div>
         }

            
        </div>
    );
};

export default DegreeList;