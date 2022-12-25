import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'reactstrap';
import { rootUrl } from '../../../../constants/constants';
import get from '../../../../helpers/get';
import { Image } from 'antd';
import "antd/dist/antd.css";
import LinkButton from '../../Components/LinkButton';
const Manager = (props) => {

    const [branchManager, setBranchManager] = useState({});
    const {id, success,setSuccess} = props;
   

    useEffect(()=>{
        get(`BranchManager/GetbyBranch/${id}`).then((res) => {
           
            console.log('ManagerInfo',res);
            setBranchManager(res);
          });

    },[])


    return (
        <div>
                {branchManager?.nameTittleId && (
              <Card>
                <div className=' pl-3 mt-2'> <span className='branch-title-style'>Branch Manager</span></div>
                <div className="uapp-circle-image margin-top-minus mt-3">
                  <img className="p-1" src={rootUrl+branchManager?.managerImageMedia?.thumbnailUrl} alt="provider_image" />
                </div>
                <h5 className="pt-2 h3 text-center mb-4">
                  {" "}
                  <span className='pr-1'>{branchManager?.nameTittle?.name}</span>
                  <span className="pr-1">{branchManager?.firstName}</span>
                  <span className=" pl-1">{branchManager?.lastName}</span>
                </h5>

                <div className="container text-center mb-4">
              
                  <LinkButton
                  name={'Edit'}
                  url={`/updateBranchManagerInformation/${id}/${branchManager?.id}`}
                  className={"btn btn-primary px-lg-5 px-md-3 px-sm-1 py-2"}
                  
                  />
                </div>

                <div>
                  <ul className="uapp-ul text-center pb-3">
                    <h5 className="py-b">
                      <span>{branchManager?.tittle}</span>{" "}
                    </h5>

                    <h5 className="py-b">
                      {" "}
                      <span>{branchManager?.email}</span>{" "}
                    </h5>
                    <h5 className="">
                      {" "}
                      <span>{branchManager?.phoneNumber}</span>{" "}
                    </h5>
                  </ul>
                </div>
              </Card>
            )}

            {!branchManager.nameTittleId && (
              <Card>
                <div className="container py-3">
                  <Link to={`/addBranchManager/${id}`}>
                    
                    <Button className="btn btn-uapp-add "
                    // onClick={localStorage.removeItem('branchManagerId')}
                    >
                      {" "}
                      <i class="fas fa-plus"></i> Add Branch Manager{" "}
                    </Button>
                  </Link>
                </div>
              </Card>
            )}
            
        </div>
    );
};

export default Manager;