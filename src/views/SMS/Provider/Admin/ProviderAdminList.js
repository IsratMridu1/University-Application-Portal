import React, { useEffect, useState } from 'react'

import { Card, CardBody, CardHeader, ButtonGroup, Button,  Input, Col, Row, Table, Modal, ModalBody, ModalFooter } from 'reactstrap';
import Select from 'react-select';
import { Link, useHistory } from 'react-router-dom';
import * as Icon from 'react-feather';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import get from '../../../../helpers/get';
import remove from '../../../../helpers/remove';
import { permissionList } from '../../../../constants/AuthorizationConstant';

const ProviderAdminList = () => {


    const history = useHistory();


   
    const [providerList, setProviderList] = useState([]);
    const [searchStr, setSearchStr] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [providerLabel, setProviderLabel] = useState('Select provider type ');
    const [providerValue, setProviderValue] = useState(0);
    const [callApi, setCallApi] = useState(false);
    const [serialNum, setSerialNum] = useState(0);
    const [entity, setEntity] = useState(0);
    const [loading, setLoading] = useState(false);


    const {addToast} = useToasts();
    const [providerType, setProviderType] = useState([]);
    const [adminData, setAdminData] = useState([]);

    const permissions = JSON.parse(localStorage.getItem("permissions"));


 

    const [deleteModal, setDeleteModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{

        get('ProviderAdmin/GetAll')
        .then(res => {
            console.log('Admin Data', res);
            setAdminData(res);
        })

    },[])

      // redirect to dashboard
      const backToDashboard = () => {
        history.push("/")
      }

      const toggleDeleteProvider = () => {
      
        setDeleteModal(true);
      
      };


      const closeDeleteModal = () => {
        setDeleteModal(false);
      };

      const deleteProvider  = (id) =>{
        remove(`Provider/Delete/${id}`)
        .then(res => {
        
          
          addToast(res, {
            appearance:  'error',
            autoDismiss: true,
          })
          setDeleteModal(false);
          const newData = providerList.filter(data => data.id != id );
          setProviderList(newData);
        })
  
      }


          // search handler
    const handleSearch = () => {
        setCurrentPage(1);
        setCallApi((prev) => !prev);
      }
    

      const searchValue = (e) => {
        setSearchStr(e.target.value);
        handleSearch();
        
      }
    
      // on clear
      const handleClearSearch = () => {
        
        
        setSearchStr('');
        setProviderLabel('Select Provider');
        setProviderValue(0);
        setCallApi(prev => !prev);
      }
    
      // on enter press
      const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          setCurrentPage(1);
          setCallApi((prev) => !prev);
        }
      }
  
      

    return (
        <div>

        <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Provider Admin List</h3>
          <div className="page-header-back-to-home">
            <span className="text-white" onClick={backToDashboard}>
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
            </span>
          </div>
        </CardHeader>
      </Card>


      <Card className="uapp-employee-search">
        <CardBody>

          <Row>

          

            
            <Col lg="6" md="6" sm="12" xs="12">
            <Input
              style={{ height: "2.7rem" }}
              type="text"
              name="searchstring"
              value={searchStr}
              id="searchstring"
              placeholder="Name, Short Name"
              onChange={searchValue}
              onKeyDown={handleKeyDown}
            />
            </Col>
          

           

            {/* <Col lg="3" md="3" sm="6" xs="6">
              <div className="uapp-Search-div">
                <span>Reset</span>
            
              </div>
            </Col> */}
          </Row>

          <Row className='mt-4'>
         
          <Col lg="12" md="12" sm="12" xs="12">
              <div style={{display: 'flex', justifyContent: "end"}}>

            

              <div className="mt-2 mx-1 d-flex hovv  " style={{cursor: 'pointer'}} onClick={handleClearSearch}>
                <Icon.X  className='text-danger' /><h5  className="text-danger">Clear</h5>
              </div>

              {/* <div className="mt-2 mx-1">
                <span className="btn btn-primary">Export</span>
              </div> */}


              </div>
              
            </Col>
          </Row>
        </CardBody>
      </Card>


      <Card className='uapp-employee-search'>
      <CardBody>

   <Row className="mb-3">

     <Col lg="6" md="5" sm="6" xs="4">
    { 
        permissions?.includes(permissionList?.Add_Provider_Admin) ?
       <Link to ='/adminProviderForm'>
       <Button  className="btn btn-uapp-add "> <i className="fas fa-plus"></i>  Add New Provider Admin </Button>
       </Link>
       :
       null
    }
     </Col>



  
   </Row>



   {
     loading ?
       <h2 className="text-center">Loading...</h2>
       :
       <div className="table-responsive">
         <Table className="table-sm table-bordered" >
           <thead className="thead-uapp-bg">
             <tr style={{ textAlign: "center" }}>
               <th>SL/NO</th>
                                
               <th>Title</th>                    
               <th>Name</th>                    
               <th>Phone Number</th>
               <th>Email</th>
               <th>Password</th>


               <th  className="text-center">Action</th>
             </tr>
           </thead>
           <tbody>

             {
               adminData?.map((prov, i) => <tr key={prov.id} style={{ textAlign: "center" }}>
                 <td>{serialNum + i}</td>
               
                 <td></td>
                 <td></td>
                 <td></td>
               <Link style={{textDecoration: 'none' }} >
               <td className='hovv  badge-primary'></td>
               </Link>
                
                 <td style={{width: '8%'}} className="text-center">
                   <ButtonGroup variant="text">

                    <Link>
                    <Button color="primary" className="mx-1 btn-sm"> <i className="fas fa-eye"></i> </Button>
                    </Link>
                     <Link>
                     <Button color="dark" className="mx-1 btn-sm"> <i className="fas fa-edit"></i> </Button>
                     </Link>

                     <Button color="danger" onClick={toggleDeleteProvider} className="mx-1 btn-sm"><i class="fas fa-trash-alt"></i></Button>
                   </ButtonGroup>
                   <Modal
                       isOpen={deleteModal}
                       toggle={closeDeleteModal}
                       className="uapp-modal"
                     >
                       <ModalBody>
                         <p>
                           Are You Sure to Delete this ? Once Deleted it
                           can't be Undone!
                         </p>
                       </ModalBody>

                       <ModalFooter>
                         <Button
                           color="danger"
                           onClick={() => deleteProvider(prov?.id)}
                         >
                           YES
                         </Button>
                         <Button onClick={closeDeleteModal}>NO</Button>
                       </ModalFooter>
                     </Modal>
                 </td>
               </tr>)

             }


           </tbody>
         </Table>
       </div>
   }


  

 </CardBody>
</Card>


            
        </div>
    );
};

export default ProviderAdminList;