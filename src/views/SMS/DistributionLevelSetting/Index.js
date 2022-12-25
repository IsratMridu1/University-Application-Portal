import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Card, CardBody, CardHeader, CardTitle,  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col, Row, InputGroup, Table, TabContent, TabPane, Nav, NavItem, NavLink, UncontrolledTooltip, ButtonGroup } from 'reactstrap';
import get from '../../../helpers/get';
import Loader from '../Search/Loader/Loader';
import DistributionLevelSettingForm from './Form';
import DistributionLevelSettingList from './List';

const DistributionLevelSetting = () => {

    const history = useHistory();
    const [success,setSuccess] = useState(false);
    const [distributionData, setDistributionData] = useState([]);
    const [name,setName] = useState('');
    const [value,setValue] = useState('');
    const [percent,setPercent] = useState('');
    const [update,setUpdate] = useState(false);
    const [data,setData]= useState({});
    const [loading,setLoading] = useState(true);

    const backToDashboard = () => {
        history.push('/');
    }

    useEffect(()=>{

        get(`DistributionLevelSetting/Index`)
        .then(res => {
            setDistributionData(res);
            setLoading(false);
        })

    },[success])

    const toggleUpdate = (data) =>{
        setUpdate(true);
        get(`DistributionLevelSetting/Get/${data?.id}`)
        .then(res => {
            setData(res);
            setName(res?.levelName);
            setValue(res?.levelValue);
            setPercent(res?.commissionPercent);
        })
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
                <h3 className="text-white">Distribution Level Settings</h3>
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
                <div className='row'>

                <div className='col-md-5'>
                    <DistributionLevelSettingForm 
                    success={success}
                    setSuccess={setSuccess}
                    update={update}
                    setUpdate={setUpdate}
                    name={name}
                    setName={setName}
                    value={value}
                    setValue={setValue}
                    percent={percent}
                    setPercent={setPercent}
                    data={data}
                    setData={setData}
                    />

                </div>

                <div className='col-md-7'>
                    <DistributionLevelSettingList 
                    success={success}
                    setSuccess={setSuccess}
                    distributionData={distributionData}
                    
                    toggleUpdate={toggleUpdate}
                    
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

export default DistributionLevelSetting;