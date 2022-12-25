import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Card, CardBody, CardHeader, CardTitle,  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col, Row, InputGroup, Table, TabContent, TabPane, Nav, NavItem, NavLink, UncontrolledTooltip, ButtonGroup } from 'reactstrap';
import get from '../../../../helpers/get';
import post from '../../../../helpers/post';
import put from '../../../../helpers/put';
import remove from '../../../../helpers/remove';
import Loader from '../../Search/Loader/Loader';
import AddCommissionPriceInformation from './AddCommissionPriceInformation';
import ShowCommissionPriceListData from './ShowCommissionPriceListData';


const CommissionPriceList = () => {

    const {id} = useParams();
    const history = useHistory();
    const [rangeName,setRangeName] = useState('');
    const [from,setFrom] = useState('');
    const [to,setTo] = useState('');
    const [commission,setCommission] = useState('');
    const [success,setSuccess] = useState(false);
    const [list,setList] = useState([]);
    const [data,setData] = useState({});
    const [delData,setDelData] = useState({});
    const [deleteModal,setDeleteModal] = useState(false);
    const [loading,setLoading] = useState(true);

    const {addToast} = useToasts();

    useEffect(()=>{

        get(`GroupPriceRange/Index/${id}`)
        .then(res=> {
           
            setList(res);
            setLoading(false);
        })

    },[success])

    const backToDashboard = () => {
        history.push("/commissionGroupList")
    }

    const handleRange = (e) => {
        setRangeName(e.target.value);
    }
    const handleFrom = (e) => {
        setFrom(e.target.value);
    }
    const handleTo = (e) => {
        setTo(e.target.value);
    }
    const handleCommission = (e) => {
        setCommission(e.target.value);
    }

    const toggleDanger = (data) => {
        setDelData(data);
        setDeleteModal(true);
    }

    const confirmDelete = () => {
        remove(`GroupPriceRange/Delete/${delData?.id}`)
        .then(res =>{
            addToast(res,{
                appearance:'error',
                autoDismiss: true
            })
            setDelData({});
            setRangeName('');
            setFrom('');
            setTo('');
            setCommission('');
            setSuccess(!success);
            setSuccess(!success);
            setDeleteModal(false);
        })
    }

    const toggleUpdate = (data) => {
        
        setData(data);
        setRangeName(data?.priceRangeName);
        setFrom(data?.rangeFrom);
        setTo(data?.rangeTo);
        setCommission(data?.commissionAmount);

    }

    // (data);

 
   

    const handleSubmit = (event) =>{

        event.preventDefault();

        const subData = new FormData(event.target);

        if(data.id){

            put(`GroupPriceRange/Update`,subData)
            .then(res=> {
                if(res?.status ==200){
                    addToast(res?.data?.message,{
                        appearance:'success',
                        autoDismiss: true
                    })
                    setRangeName('');
                    setFrom('');
                    setTo('');
                    setCommission('');
                    setData({});
                    setSuccess(!success);
                }
            })

        }

        else{

            post(`GroupPriceRange/Create`,subData)
        .then(res => {
            if(res?.status ==200){
                addToast(res?.data?.message,{
                    appearance: 'success',
                    autoDismiss: true
                })
                setRangeName('');
                setFrom('');
                setTo('');
                setCommission('');
                setSuccess(!success);
                
            }
        })
        }
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
                <h3 className="text-white">Commission Price List</h3>
                <div className="page-header-back-to-home">
                  <span className="text-white" onClick={backToDashboard}>
                    {" "}
                    <i className="fas fa-arrow-circle-left"></i> Back to Commission Groups
                  </span>
                </div>
              </CardHeader>
            </Card>

            <Card>

                <CardBody>

                    <div className='row'>

                        <div className='col-md-5'>
                            <AddCommissionPriceInformation
                            id={id}
                            handleRange={handleRange}
                            handleFrom={handleFrom}
                            handleTo={handleTo}
                            handleCommission={handleCommission}
                            rangeName={rangeName}
                            setRangeName={setRangeName}
                            from={from}
                            setFrom={setFrom}
                            to={to}
                            setTo={setTo}
                            handleSubmit={handleSubmit}
                            commission={commission}
                            setCommission={setCommission}
                            data={data}
                           

                            />
                            
                      

                        </div>


                        <div className='col-md-7'>

                         <ShowCommissionPriceListData
                         list={list}
                         toggleUpdate={toggleUpdate}
                         toggleDanger={toggleDanger}
                         deleteModal={deleteModal}
                         setDeleteModal={setDeleteModal}
                         confirmDelete={confirmDelete}

                         />

                        </div>

                    </div>


                </CardBody>

            </Card>
            </div>
          }
            
        </div>
    );
};

export default CommissionPriceList;