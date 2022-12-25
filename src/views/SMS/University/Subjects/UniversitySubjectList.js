import React, { useEffect, useState, Component, useRef } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    ButtonGroup,
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    Button,
  
    Input,
    FormGroup,
    Col,
    Row,
    Table,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
  } from "reactstrap";

  // import { permissionList } from '../../../../constants/AuthorizationConstant';
  import { permissionList } from '../../../../constants/AuthorizationConstant';
  import ReactTableToXl from './ReactTableToXl.js';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import * as XLSX from 'xlsx/xlsx.mjs';
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ReactToPrint from 'react-to-print';

import Select from "react-select";
import { useHistory, useLocation, useParams } from "react-router";
import { Link } from 'react-router-dom';
import get from '../../../../helpers/get';
import { useToasts } from 'react-toast-notifications';
import remove from '../../../../helpers/remove';
import Pagination from "../../../SMS/Pagination/Pagination.jsx";
import { connect, useDispatch } from 'react-redux';
// import { StoreUniversityCampusListData } from '../../../redux/actions/SMS/UniversityAction/UniversityCampusListAction';
import { StoreUniversityCampusListData } from '../../../../redux/actions/SMS/UniversityAction/UniversityCampusListAction';
// import { StoreUniversityListData } from '../../../redux/actions/SMS/UniversityAction/UniversityListAction';
import { StoreUniversityListData } from '../../../../redux/actions/SMS/UniversityAction/UniversityListAction';
import ButtonForFunction from '../../Components/ButtonForFunction';
import LinkButton from '../../Components/LinkButton';
import { userTypes } from '../../../../constants/userTypeConstant';


const UniversitySubjectList = (props) => {
    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen1, setDropdownOpen1] = useState(false);
    const [subList, setSubList] = useState([]);
    const [entity, setEntity] = useState(0);
    const [loading, setLoading] = useState(false);
    const [serialNum, setSerialNum] = useState(1);
    const [success, setSuccess] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage, setDataPerPage] = useState(15);
    const [callApi, setCallApi] = useState(false);
    
    const univerSList = props.univerSityDropDownList[0];
    const camppus = props.campusDropDownList[0];

    const [uniLabel, setUniLabel] = useState("Select University");
    const [uniValue, setUniValue] = useState(0);
    const [campLabel, setCampLabel] = useState("Select Campus");
    const [campValue, setCampValue] = useState(0);
    const [campList, setCampList] = useState([]);
    const [searchStr, setSearchStr] = useState("");
    const [uniTypeId ,setUTypeId] = useState(0);
    const [ulist,setUList] = useState([]);
    const [cam, setCam] = useState([]);
    const [submitData, setSubmitData] = useState(false);
    const [providerValue, setProviderValue] = useState(0);

    const [orderLabel, setOrderLabel] = useState("Select order by");
    const [orderValue, setOrderValue] = useState(0);

    const [subId, setSubId] = useState(0);
    const [subName, setSubName] = useState("");

    // for tab
    const [activetab, setActivetab] = useState("1");

    // for hide/unhide table column
    const [checkSlNo, setCheckSlNo] = useState(true);
    const [checkName, setCheckName] = useState(true);
    const [checkUni, setCheckUni] = useState(true);
    const [checkProg, setCheckProg] = useState(true);
    const [checkDep, setCheckDep] = useState(true);
    const [checkSubDep, setCheckSubDep] = useState(true);
    const [checkAction, setCheckAction] = useState(true);

    const userType = localStorage.getItem("userType");
    const referenceId = localStorage.getItem("referenceId");

    const history = useHistory();
    const { addToast } = useToasts();
    const {id} = useParams();

    const uniIDD = id;

    // redirect to dashboard
    const backToUniversityList = () => {
      history.push("/universityList");
    };

    // add university handler
    const handleAddSubject = () => {
      localStorage.removeItem("subjectId");
      history.push(`/addUniversitySubject/${id}`);
    };

    // toggle dropdown
    const toggle = () => {
      setDropdownOpen((prev) => !prev);
    };

    // toggle1 dropdown
    const toggle1 = () => {
      setDropdownOpen1((prev) => !prev);
    };

    useEffect(()=>{
      get(`ProviderHelper/GetProviderId/${userType}/${referenceId}`).then(res=>{
        console.log("providerHelper",typeof(res));
          setProviderValue(res != 0 ? res : 0);
          // if(res != 0){
          //   localStorage.setItem("providerValue", res);
          // }
      })
    },[userType, referenceId]);

    useEffect(()=>{
      if(userType == userTypes?.ProviderAdmin){
        get(`ProviderUniversityDD/Index/${providerValue}`).then(res=> {
          setUList(res);
          dispatch(StoreUniversityListData(res));
        })
        .catch();
      }
      else{
        get("UniversityDD/Index").then(res =>{
          setUList(res);
          dispatch(StoreUniversityListData(res));
        });
      }
    },[providerValue]);

    useEffect(()=>{
        get(`UniversityCampus/GetbyUniversity/${id}`)
        .then(res =>{
        console.log("campusByUniversity",res);
        setCampList(res);
      })
    },[id]);



   
    useEffect(()=>{
      if(id){
      // if(localStorage.getItem("uniIdForSubList")){
        get(`UniversityCampus/GetbyUniversity/${id}`).then(res =>{
        // get(`UniversityCampus/GetbyUniversity/${localStorage.getItem("uniIdForSubList")}`).then(res =>{
          setCam(res);
          dispatch(StoreUniversityCampusListData(res));
        });
      }
      else{
        return;
      }
    },[]);

    useEffect(() => {

      setLoading(true);
  
        get(`Subject/TableShowPaged?page=${currentPage}&pageSize=${dataPerPage}&CampusId=${campValue}&UniversityId=${id}&search=${searchStr}&sortby=${orderValue}`).then((res) => {
          setSubList(res?.models);
          console.log("sublist",res);
          setSerialNum(res?.firstSerialNumber);
          setEntity(res?.totalEntity);        
          setLoading(false);
        });
    

    }, [success, currentPage, dataPerPage, callApi, searchStr, uniTypeId, campValue, univerSList, uniValue, id, orderValue]);

   


    // const searchCampusByUniversity = (universityValue) =>{
    //   get(`UniversityCampus/GetbyUniversity/${universityValue}`)
    //   .then(res =>{
    //   console.log("campusByUniversity",res);
    //   setCampList(res);
    // })
    // }


    // user select data per page
    const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
    const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

    const selectDataSize = (value) => {
      setLoading(true);
      setDataPerPage(value);
      setCallApi((prev) => !prev);
    };

    // user select order
  const orderArr = [
    {
      label: "Newest",
      value: 1,
    },
    {
      label: "Oldest",
      value: 2,
    },
    {
      label: "A-Z",
      value: 3,
    },
    {
      label: "Z-A",
      value: 4,
    },
  ];
  // const orderName = orderArr.map((dsn) => ({ label: dsn.label, value: dsn.value }));
  const orderName = orderArr.map((dsn) => ({
    label: dsn.label,
    value: dsn.value,
  }));

  const selectOrder = (label, value) => {
    // console.log("value", label, value);
    setLoading(true);
    setOrderLabel(label);
    setOrderValue(value);
    setCallApi((prev) => !prev);
  };

    //  change page
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
      setCallApi((prev) => !prev);
    };
    
     // search handler
     const handleSearch = () => {
       setCurrentPage(1);
       setCallApi((prev) => !prev);
     };

    // university dropdown options
    const universityOption = univerSList?.map((uni) => ({
      label: uni?.name,
      value: uni?.id,
    }));

    // campus dropdown options
    const campusOption = campList?.map((camp) => ({
      label: camp?.name,
      value: camp?.id,
    }));

    // const selectUni = (label, value) => {
    //   setUniLabel(label);
    //   setUniValue(value);
    //   setCampLabel("Select Campus");
    //   setCampValue(0);
    //   searchCampusByUniversity(value);
    //   handleSearch();
    // };

    const selectUniCampus = (label, value) => {
      setCampLabel(label);
      setCampValue(value);
      handleSearch();
    };

    const searchValue = (e) => {
      setSearchStr(e.target.value);
      handleSearch();
    };


    const handleDelete = (id) => {
      const returnValue = remove(`Subject/Delete/${id}`).then((action)=> {
        // console.log(action);
        setSuccess(!success);
        setDeleteModal(false);
         addToast(action, {
           appearance: 'error',
           autoDismiss: true,
         })

      })
    };

    const toggleDanger = (name,id) => {
      setSubName(name);
      setSubId(id);
      setDeleteModal(true)
     }

     const closeDeleteModal = () => {
      setDeleteModal(false);
      setSubName("");
      setSubId(0);
    
    }

    // on clear
  const handleClearSearch = () => {
    setUniLabel("Select University");
    setUniValue(0);
    setCampLabel("Select Campus");
    setCampValue(0);
    setCallApi((prev) => !prev);
    setSearchStr("");
    history.replace({
      universityId: null
    })
  };

   // on enter press
   const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      setCallApi((prev) => !prev);
    }
  };

  const handleExportXLSX = () => {
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(subList);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const componentRef = useRef();

  const handleView = id =>{
    // localStorage.setItem('subIdPro', id);
    localStorage.removeItem("campIdSubProfile");
    history.push({
      pathname: `/subjectProfile/${id}`,
      uniSubList: uniIDD
    });
  }

  // localStorage.removeItem("uniIdForSubList");
  const permissions = JSON.parse(localStorage.getItem('permissions'));

  const handleEdit = subId =>{
    history.push(`/addUniversitySubject/${id}/${subId}`);
  }

  // for hide/unhide column

  const handleCheckedSLNO = (e) => {
    setCheckSlNo(e.target.checked);
  };
  const handleCheckedName = (e) => {
    setCheckName(e.target.checked);
  };
  const handleCheckedUni = (e) => {
    setCheckUni(e.target.checked);
  };
  const handleCheckedProg = (e) => {
    setCheckProg(e.target.checked);
  };
  const handleCheckedDep = (e) => {
    setCheckDep(e.target.checked);
  };
  const handleCheckedSubDep = (e) => {
    setCheckSubDep(e.target.checked);
  };
  const handleCheckedAction = (e) => {
    setCheckAction(e.target.checked);
  };

    return (
        <div>
            <Card className="uapp-card-bg">
                <CardHeader className="page-header">
                  <h3 className="text-white">University Subject List</h3>
                  <div className="page-header-back-to-home">
                    <span onClick={backToUniversityList} className="text-white">
                      {" "}
                      <i className="fas fa-arrow-circle-left"></i> Back to University List
                    </span>
                  </div>
                </CardHeader>
            </Card>

            <Card className="uapp-employee-search">
        <CardBody className="search-card-body">

          <Row>
            {/* <Col lg="4" md="3" sm="6" xs="6">
              <Select
                options={universityOption}
                value={{ label: uniLabel, value: uniValue }}
                onChange={(opt) => selectUni(opt.label, opt.value)}
                name="UniversityTypeId"
                id="UniversityTypeId"
              />
            </Col> */}

            <Col lg="6" md="6" sm="6" xs="6">
              <Select
                options={campusOption}
                value={{ label: campLabel, value: campValue }}
                onChange={(opt) => selectUniCampus(opt.label, opt.value)}
                name="campusId"
                id="campusId"
              />
            </Col>

            <Col lg="6" md="6" sm="6" xs="6">
              <Input
                style={{ height: "2.7rem" }}
                type="text"
                name="search"
                value={searchStr}
                id="search"
                placeholder="Name"
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

          <Row className="">
            <Col lg="12" md="12" sm="12" xs="12">
              <div style={{ display: "flex", justifyContent: "end" }}>
                <div
                  className="mt-1 mx-1 d-flex btn-clear"
                  onClick={handleClearSearch}
                >
                  {/* <Icon.X  className='text-danger' />*/}
                  <span className="text-danger">
                    <i className="fa fa-times"></i> Clear
                  </span>
                </div>

                {/* <div className="mt-2 mx-1">
                <span className="btn btn-primary">Export</span>
              </div> */}
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>


      <Card className="uapp-employee-search">
        <CardBody>

          {/* new */}
          <Row className="mb-3">
            <Col lg="5" md="5" sm="4" xs="4">
            {
                    permissions?.includes(permissionList?.Add_subject) ?
              <ButtonForFunction
                func={handleAddSubject}
                className={"btn btn-uapp-add "}
                icon={<i className="fas fa-plus"></i>}
                name={" Add New Subject"}
                permission={6}
              />
              :
              null
              }
            </Col>

            <Col lg="7" md="7" sm="8" xs="8">
              <div className="d-md-flex justify-content-end">
                {/* <Col lg="2">
                    
                    <div className='ms-2'>
                      <ReactToPrint
                        trigger={()=><div className="uapp-print-icon">
                          <div className="text-right">
                            <span title="Print to pdf"> <i className="fas fa-print"></i> </span>
                          </div>
                        </div>}
                        content={() => componentRef.current}
                      />
                    </div>
                </Col> */}
                <div className="mr-3">
                  <div className="d-flex align-items-center">
                    <div className="mr-2">Order By :</div>
                    <div>
                      <Select
                        options={orderName}
                        value={{ label: orderLabel, value: orderValue }}
                        onChange={(opt) => selectOrder(opt.label, opt.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="mr-3">
                  <div className="d-flex align-items-center">
                    <div className="mr-2">Showing :</div>
                    <div>
                      <Select
                        options={dataSizeName}
                        value={{ label: dataPerPage, value: dataPerPage }}
                        onChange={(opt) => selectDataSize(opt.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="mr-3">
                  <Dropdown
                    className="uapp-dropdown"
                    style={{ float: "right" }}
                    isOpen={dropdownOpen}
                    toggle={toggle}
                  >
                    <DropdownToggle caret>
                      <i className="fas fa-print fs-7"></i>
                    </DropdownToggle>
                    <DropdownMenu className="bg-dd">
                      <div className="d-flex justify-content-around align-items-center mt-2">
                        <div className="text-white cursor-pointer">
                          {/* <p onClick={handleExportXLSX}>
                            <i className="fas fa-file-excel"></i>
                          </p> */}

                          {/* <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button"
                            table="table-to-xls"
                            filename="tablexls"
                            sheet="tablexls"
                            buttonText="Download as XLS"
                            /> */}

                            <ReactTableToXl
                              id="test-table-xls-button"
                              table="table-to-xls"
                              filename="tablexls"
                              sheet="tablexls"
                              icon={<i className="fas fa-file-excel"></i>}
                            />

                        </div>
                        <div className="text-white cursor-pointer">
                          <ReactToPrint
                            trigger={() => (
                              <p>
                                <i className="fas fa-file-pdf"></i>
                              </p>
                            )}
                            content={() => componentRef.current}
                          />
                        </div>
                      </div>
                    </DropdownMenu>
                  </Dropdown>
                </div>

                {/* column hide unhide starts here */}

                <div className="">
                  <Dropdown
                    className="uapp-dropdown"
                    style={{ float: "right" }}
                    isOpen={dropdownOpen1}
                    toggle={toggle1}
                  >
                    <DropdownToggle caret>
                      <i className="fas fa-bars"></i>
                    </DropdownToggle>
                    <DropdownMenu className="bg-dd-1">
                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">SL/NO</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              id=""
                              name="isAcceptHome"
                              onChange={(e) => {
                                handleCheckedSLNO(e);
                              }}
                              defaultChecked={checkSlNo}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Name</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedName(e);
                              }}
                              defaultChecked={checkName}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">University</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedUni(e);
                              }}
                              defaultChecked={checkUni}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Program Level</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedProg(e);
                              }}
                              defaultChecked={checkProg}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Department</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedDep(e);
                              }}
                              defaultChecked={checkDep}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Sub Department</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedSubDep(e);
                              }}
                              defaultChecked={checkSubDep}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Action</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedAction(e);
                              }}
                              defaultChecked={checkAction}
                            />
                          </FormGroup>
                        </Col>
                      </div>
                    </DropdownMenu>
                  </Dropdown>
                </div>

                {/* column hide unhide ends here */}
              </div>
            </Col>
          </Row>

          {loading ? (
            <div class="d-flex justify-content-center mb-5">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          ) : (
            <div className="table-responsive" ref={componentRef}>
              <Table id="table-to-xls" className="table-sm table-bordered">
                <thead className="thead-uapp-bg">
                  <tr style={{ textAlign: "center" }}>
                    {checkSlNo ? <th>SL/NO</th> : null}
                    {checkName ? <th>Name</th> : null}
                    {/* <th>Description</th>
                    <th>Duration</th> */}
                    {checkUni ? <th>University</th> : null}
                    {checkProg ? <th>Program Level</th> : null}
                    {checkDep ? <th>Department</th> : null}
                    {checkSubDep ? <th>Sub Department</th> : null}
                    {/* <th>Intakes</th> */}
                    {checkAction ? (
                      <th style={{ width: "8%" }} className="text-center">
                        Action
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {subList?.map((sub, i) => (
                    <tr key={sub.id} style={{ textAlign: "center" }}>
                      {checkSlNo ? <th scope="row">{serialNum + i}</th> : null}
                      {checkName ? <td>{sub?.name}</td> : null}
                      {/* <td>{sub?.description}</td>

                      <td>
                        {sub?.duration}
                      </td> */}

                      {checkUni ? <td>{sub?.universityName}</td> : null}

                      {checkProg ? <td>{sub?.programLevelName}</td> : null}

                      {checkDep ? <td>{sub?.departmentName}</td> : null}

                      {checkSubDep ? <td>{sub?.subDepartmentName}</td> : null}

                      {/* <td>
                          <Link className='text-decoration-none' to="/subjectIntake">
                             View
                          </Link>
                        </td> */}

                      {checkAction ? (
                        <td style={{ width: "8%" }} className="text-center">
                          <ButtonGroup variant="text">
                            {/* <Link to= "">
                          <Button onClick={()=>handleView(sub?.id)} color="primary" className="mx-1 btn-sm">
                            {" "}
                            <i className="fas fa-eye"></i>{" "}
                          </Button>
                        </Link> */}
                            {permissions?.includes(
                              permissionList?.View_subject
                            ) ? (
                              <ButtonForFunction
                                func={() => handleView(sub?.id)}
                                color={"primary"}
                                className={"mx-1 btn-sm"}
                                icon={<i className="fas fa-eye"></i>}
                                permission={6}
                              />
                            ) : null}

                            {/* <Link to={`editSubject/${sub?.id}`}>
                            <Button color="dark" className="mx-1 btn-sm">
                              {" "}
                              <i className="fas fa-edit"></i>{" "}
                            </Button>
                          </Link> */}
                            {permissions?.includes(
                              permissionList?.Update_subject
                            ) ? (
                              <LinkButton
                                url={`/addUniversitySubject/${id}/${sub.id}`}
                                color={"warning"}
                                className={"mx-1 btn-sm"}
                                icon={<i className="fas fa-edit"></i>}
                                permission={6}
                              />
                            ) : null}

                            {/* <Button onClick={() => toggleDanger(sub?.name, sub?.id)} color="danger" className="mx-1 btn-sm">
                            <i className="fas fa-trash-alt"></i>
                          </Button> */}

                            {permissions?.includes(
                              permissionList?.Delete_subject
                            ) ? (
                              <ButtonForFunction
                                func={() => toggleDanger(sub?.name, sub?.id)}
                                color={"danger"}
                                className={"mx-1 btn-sm"}
                                icon={<i className="fas fa-trash-alt"></i>}
                                permission={6}
                              />
                            ) : null}
                          </ButtonGroup>

                          <Modal
                            isOpen={deleteModal}
                            toggle={closeDeleteModal}
                            className="uapp-modal"
                          >
                            <ModalBody>
                              <p>
                                Are You Sure to Delete this <b>{subName}</b> ?
                                Once Deleted it can't be Undone!
                              </p>
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                color="danger"
                                onClick={() => handleDelete(subId)}
                              >
                                YES
                              </Button>
                              <Button
                                color="primary"
                                onClick={closeDeleteModal}
                              >
                                NO
                              </Button>
                            </ModalFooter>
                          </Modal>
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </Table>
              

            </div>
          )}

          <Pagination
            dataPerPage={dataPerPage}
            totalData={entity}
            paginate={paginate}
            currentPage={currentPage}
          />

          {/* <Row className="mb-3">
            <Col lg="6">
              
            </Col>

            <Col lg="6" md="7" sm="6" xs="8">
               <div className='d-flex justify-content-end'>
               <Button
                   onClick={handleNextTab}
                   className="btn btn-uapp-add "
                    >
                    {" "}
                     Next tab
                    {" "}
               </Button>
               </div>
             </Col>
          </Row> */}


        </CardBody>
      </Card>

      

        </div>
    );
};

const mapStateToProps = state => ({
    univerSityDropDownList: state.universityListReducer.universityList,
    campusDropDownList: state.universityCampusListReducer.universityCampusList,
  })
export default connect(mapStateToProps)(UniversitySubjectList);