import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, CardHeader, ButtonGroup, CardTitle,  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col, Row, Table, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import Select from 'react-select';
import Pagination from '../../Pagination/Pagination.jsx'
import { useHistory, useLocation } from 'react-router';
import { useToasts } from "react-toast-notifications";

import { divIcon } from 'leaflet';
import get from '../../../../helpers/get.js';
import remove from '../../../../helpers/remove.js';
import { Link } from 'react-router-dom';
import LinkButton from '../../Components/LinkButton.js';
import ButtonForFunction from '../../Components/ButtonForFunction.js';

const EmployeeList = (props) => {

    const history = useHistory();
    const [employeeList, setEmployeeList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [employeeName, setEmployeeName] = useState('Select Employee Type...');
    const [employeeId, setEmployeeId] = useState(0);
    const [searchStr, setSearchStr] = useState('');
    const [dataPerPage,setDataPerPage] = useState(15);
    const [entity, setEntity] = useState(0);
    const [callApi, setCallApi] = useState(false);
    const [serialNum, setSerialNum] = useState(1);
    const [loading,setLoading] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const employeeTypeList = props.employeeTypeList[0];
    const location = useLocation();
    const { addToast } = useToasts();
    const [menuList, setMenuList] = useState([]);

    

    
      useEffect(()=>{
        if(location.id != undefined){
          localStorage.setItem('locationId', location.id);
          setEmployeeName(location.name);
        }
      },[])
 
    // const empId
    // user select data per page
    const dataSizeArr = [10,15,20,30,50,100,3000];
    const dataSizeName = dataSizeArr.map(dsn=> ({label: dsn, value: dsn}));

    const selectDataSize = value => {
        setLoading(true);
        setDataPerPage(value);
        setCallApi((prev)=> !prev);
    }

    const employeeTypeName = employeeTypeList?.map(empt => ({label: empt.name, value: empt.id}));
   

    useEffect(()=>{
        get(`MenuItem/Index`)
        .then(res => {
        
            setMenuList(res);
        })
    },[])

    // useEffect(()=>{
       
    //     const empId = localStorage.getItem('locationId');
    //     const returnValue = get(`Employee/Index?page=${currentPage}&pagesize=${dataPerPage}&employeetypeid=${empId ? empId : employeeId}&searchstring=${searchStr}`).then((action)=>{
    //         setEmployeeList(action.models);
          
    //         localStorage.removeItem('locationId');
    //         setLoading(false)
    //         setEntity(action.totalEntity);
    //         setSerialNum(action.firstSerialNumber)
    //     })
    // },[callApi]);

    const handleDeleteMenu = (menuId) => {
   
        remove(`MenuItem/Delete/${menuId}`)
        .then(res => {
        
            addToast(res, {
              appearance: res == 'Employee has been created successfully!' ? 'success': 'error',
              // autoDismiss: true,
            })
            const newMenuList = menuList.filter(em => em.id != menuId);
            setMenuList(newMenuList);
          })

    }

 
 

    const selectEmployeeType = (label,value) => {
        setEmployeeName(label);
        setEmployeeId(value);
        setCallApi((prev)=> !prev);
    }

    // search handler
    const handleSearch = () => {
        setCurrentPage(1);
        setCallApi((prev)=> !prev);
    }

    // on enter press
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          setCurrentPage(1);
          setCallApi((prev)=>!prev);
        }
      }

      //  on reset
    const handleReset = () => {
      setEmployeeName('Select Employee Type...');
      setEmployeeId(0);
      setSearchStr('');
      setCurrentPage(1);
      setCallApi((prev)=> !prev);
    }


    //  change page
    // const paginate = (pageNumber) => {
    //     setCurrentPage(pageNumber);
    //     setCallApi((prev)=> !prev);
    // };


    // add staff handler
    const handleAddStaff = () => {
        history.push("/addMenu");
    }


    // toggle dropdown
    const toggle = () => {
        setDropdownOpen((prev)=> !prev)
      }


    // employee click handler
    const handleEmpClick = (id) => {
      history.push({
        pathname: '/employeeProfile',
        id: id
      })
    }



     // redirect to dashboard
    const backToDashboard = () => {
    history.push("/")
    }

   
    return (
      <div>
        <Card className="uapp-card-bg">
              <CardHeader className="page-header">

            <h3 className="text-white">Menu List</h3>
            <div className="page-header-back-to-home" >
              <span onClick={backToDashboard} className="text-white"> <i className="fas fa-arrow-circle-left"></i> Back to Dashboard</span>
                  </div>
              
              </CardHeader>
            </Card>

       

            <Card>

                <CardBody>
    
                <Row className="mb-3">
                
                  <Col lg="6" md="5" sm="6" xs="4">

                    <ButtonForFunction
                     func={handleAddStaff}
                     className={"btn btn-uapp-add "}
                     icon={<i className="fas fa-plus"></i>}
                     name={" Add Menu"}
                     permission={6}
                    />

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
                        <th>Icon</th>
                        <th>Type</th>
                        <th>Display Order</th>
                       
                        <th className="text-center">Action</th>
                     
                    </tr>
                    </thead>
                    <tbody>

                  {
                      menuList?.map((men,i) => <tr key={men.id} style={{ textAlign: "center" }}>
                        <th scope="row">{serialNum+i}</th>
                        <td>{men.title}</td>
                        <td>{men.icon}</td>
                        <td>{men.type}</td>
                        <td>{men.displayOrder}</td>
                        
                        <td className="text-center">
                          <ButtonGroup variant="text">
                            {/* <Button  color="danger" onClick={()=>handleDeleteMenu(men.id)}  className="mr-2 btn-sm"><i className="fas fa-trash-alt"></i></Button> */}

                            <ButtonForFunction
                                color={"danger"}
                                func={()=>handleDeleteMenu(men.id)}
                                className={"mr-2 btn-sm"}
                                icon={<i className="fas fa-trash-alt"></i>}
                                permission={6}
                            />

                          {/* <Link to={`/employeeGeneralInfo/`}>
                           <Button color="warning"  className=" btn-sm"> <i className="fas fa-edit"></i> </Button>
                              </Link> */}

                             <LinkButton
                               url ={'/employeeGeneralInfo/'}
                               color={"warning"}
                               className={" btn-sm"}
                               icon={<i className="fas fa-edit"></i>}
                               >
                             </LinkButton>

                          </ButtonGroup>
                        </td>
                        
                      </tr>)

                  }
              

                   </tbody>
                  </Table>
                </div>
                }

                  {/* <Pagination dataPerPage={dataPerPage} totalData={entity} paginate={paginate} currentPage={currentPage} /> */}

                </CardBody>
            </Card>
        </div>
    )
}

const mapStateToProps = state => ({
  employeeTypeList: state.employeeTypeDataReducer.employeeType
})
export default connect(mapStateToProps)(EmployeeList);

