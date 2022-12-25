import React, { useEffect, useState } from 'react';
import get from '../../../helpers/get';
import { Button, Card, CardBody, CardHeader, Col, Table, Form, FormGroup, Input, Nav, NavItem, NavLink, TabContent, TabPane, Label, Row, Modal, ModalBody, ModalFooter, ButtonGroup } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import ButtonForFunction from '../Components/ButtonForFunction';
import remove from '../../../helpers/remove';
import { useToasts } from "react-toast-notifications";
import LinkButton from '../Components/LinkButton';
import Loader from '../Search/Loader/Loader';

const EducationLevelList = () => {

    const history = useHistory();

    const [educationLevelData, setEducationLevelData] = useState([]);
    const [deleteData, setDeleteData] = useState({});

    const {addToast} = useToasts();
    const [deleteModal,setDeleteModal] = useState(false);
    const [serialNum, setSerialNum] = useState(1);
    const [success, setSuccess] = useState(false);
    const [loading,setLoading] = useState(true);
    const [buttonStatus,setButtonStatus] = useState(false);


    
      // Delete Modal

      const toggleDanger = (data) => {

        // console.log(data);
        setDeleteData(data);
        setDeleteModal(true);
      }

     

      // Delete Button

      const handleDeleteData = (data) => {
        setButtonStatus(true);
      remove(`EducationLevel/Delete/${data?.id}`)
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


      // Go To Education Level Form Page

      const handleAddEducationLevel = () => {

        history.push('/addEducationLevel');
      }


    useEffect(()=>{

        get('EducationLevel/Index')
        .then(res => {

            console.log('Checking Educational Level Index', res);
            setEducationLevelData(res);
            setLoading(false);
        })

    },[success])


    // back to dashboard

    const backToDashboard = () => {

        history.push('/');
    }

    const redirectToUpdate = (educationInfoName, educationInfoDescription, educationInfoLevelValue, educationInfoId) =>{
      history.push(`/addEducationLevel/${educationInfoName}/${educationInfoDescription}/${educationInfoLevelValue}/${educationInfoId}`);
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
          <h3 className="text-white">Education Level List</h3>
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
                 func={handleAddEducationLevel} 
                 name={' Add New Educational Level'}
                            
      />

      </div>

      <div className="table-responsive mb-3">
              <Table className="table-sm table-bordered">
                <thead className="thead-uapp-bg">
                  <tr style={{ textAlign: "center" }}>
                    <th>SL/NO</th>
                    <th>Name</th>
                    <th>Decription</th>
                    <th>Level Value</th>
                    <th style={{ width: "8%" }} className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                  educationLevelData?.map((educationInfo, i) => (
                    <tr key={educationInfo?.id} style={{ textAlign: "center" }}>
                      <th scope='row'>{serialNum + i}</th>
                      <td>
                        {educationInfo?.name}
                      </td>
                      
                      <td>
                        {educationInfo?.description}
                      </td>

                      <td>
                        {educationInfo?.levelValue}
                      </td>


                      <td style={{ width: "8%" }} className="text-center">
                        <ButtonGroup variant="text">
                       

                        <ButtonForFunction
                          icon={<i className="fas fa-edit"></i>}
                          color={'warning'}
                          className={"mx-1 btn-sm"}
                          func={()=>redirectToUpdate(educationInfo?.name,educationInfo?.description,educationInfo?.levelValue,educationInfo?.id)}
                          />


                            {/* <LinkButton
                             icon={<i className="fas fa-edit"></i>}
                             color={"warning"}
                             className={"mx-1 btn-sm"}
                             url={`/addEducationLevel/${educationInfo?.name}/${educationInfo?.description}/${educationInfo?.levelValue}/${educationInfo?.id}`}
                            /> */}
                      
                          <ButtonForFunction
                          icon={<i className="fas fa-trash-alt"></i>}
                          color={'danger'}
                          className={"mx-1 btn-sm"}
                          func={()=>toggleDanger(educationInfo)}
                          />

                        </ButtonGroup>

                     
                        <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)} className="uapp-modal">
                        <ModalBody>
                          <p>Are You Sure to Delete this ? Once Deleted it can't be Undone!</p>
                        </ModalBody>
        
                        <ModalFooter>
                          <Button  color="danger" onClick={()=>handleDeleteData(deleteData)} disabled={buttonStatus}>YES</Button>
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

export default EducationLevelList;