import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  ButtonGroup,
  Button,
  Input,
  Col,
  Row,
  Table,
  Dropdown,
  Form,
  FormGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Select from "react-select";
import Pagination from "../../SMS/Pagination/Pagination.jsx";
import { useHistory, useLocation } from "react-router";

import get from "../../../helpers/get.js";
import { rootUrl } from "../../../constants/constants.js";
import { StoreUniversityStateData } from "../../../redux/actions/SMS/UniversityAction/UniversityStateAction.js";
import { Link } from "react-router-dom";
import remove from "../../../helpers/remove.js";
import { StoreUniversityListData } from "../../../redux/actions/SMS/UniversityAction/UniversityListAction";

import ReactTableConvertToXl from "../ReactTableConvertToXl/ReactTableConvertToXl";
import * as XLSX from "xlsx/xlsx.mjs";
import ReactToPrint from "react-to-print";
import ButtonForFunction from "../Components/ButtonForFunction.js";
import LinkSpanButton from "../Components/LinkSpanButton.js";
import SpanButton from "../Components/SpanButton.js";
import LinkButton from "../Components/LinkButton.js";
import { userTypes } from "../../../constants/userTypeConstant.js";
import { Axios } from "axios";
import Loader from "../Search/Loader/Loader.js";
import { useToasts } from "react-toast-notifications";

const UniversityList = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [universityList, setUniversityList] = useState([]);
  const [entity, setEntity] = useState(0);
  const [callApi, setCallApi] = useState(false);
  const [serialNum, setSerialNum] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [orderLabel, setOrderLabel] = useState("Select order by");
  const [orderValue, setOrderValue] = useState(0);
  const [searchStr, setSearchStr] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [stateList, setstateList] = useState([0]);
  // const univerSityCountries = props.univerSityCountryList[0];
  const [univerSityCountries, setUniverSityCountries] = useState([]);
  // const universityTypes = props.univerSityTypeList[0];
  const [universityTypes, setUniversityTypes] = useState([]);
  const [providerList, setProviderList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [ulist, setUList] = useState([]);

  // const universityStates = props.univerSityStateList[0];
  const [universityStates, setUniversityStates] = useState([]);

  const univerSList = props.univerSityDropDownList[0];

  const [stateByCountry, setStateByCountry] = useState(0);

  const [uniTypeLabel, setUniTypeLabel] = useState("University Type");
  const [uniTypeValue, setUniTypeValue] = useState(0);
  const [uniCountryLabel, setUniCountryLabel] = useState("University Country");
  const [uniCountryValue, setUniCountryValue] = useState(0);
  const [uniStateLabel, setUniStateLabel] = useState("University State");
  const [unistateValue, setUniStateValue] = useState(0);
  const [providerLabel, setProviderLabel] = useState("Provider");
  const [providerValue, setProviderValue] = useState(0);
  const [loading,setLoading] = useState(true);

  // for hide/unhide table column
  const [checkLogo, setCheckLogo] = useState(true);
  const [checkSlNo, setCheckSlNo] = useState(true);
  const [checkName, setCheckName] = useState(true);
  const [checkType, setCheckType] = useState(true);
  const [checkCountry, setCheckCountry] = useState(true);
  const [checkCampus, setCheckCampus] = useState(true);
  const [checkAppli, setCheckAppli] = useState(true);
  const [checkProg, setCheckProg] = useState(true);
  const [checkAction, setCheckAction] = useState(true);
  const [delData,setDelData] = useState({});
  const {addToast} = useToasts();
  const [success,setSuccess] = useState(false);

  const [buttonStatus,setButtonStatus] = useState(false);

  const providerData = useSelector(
    (state) => state?.universityProviderDataReducer?.universityProviders
  );
  const providerDataResult = providerData?.models;
  // console.log(providerDataResult);
  const userType = localStorage.getItem("userType");
  const referenceId = localStorage.getItem("referenceId");
  useEffect(() => {
    // get("University/GetAll").then((res) => {
    //   // setUList(res);
    //   dispatch(StoreUniversityListData(res));
    // });
    get(`ProviderDD/Index`).then((res) => {
      setProviderList(res);
    });

    get(`UniversityCountryDD/Index`).then((res) => {
      setUniverSityCountries(res);
    });

    get(`UniversityTypeDD/Index`).then((res) => {
      setUniversityTypes(res);
    });

    // get(`ProviderHelper/GetProviderId/${userType}/${referenceId}`).then(res=>{
    //   console.log("providerHelper",typeof(res));
    //   if(res !== 0){
    //     setProviderValue(res);
    //   }
    // })
  }, []);

  console.log(location);

  useEffect(() => {
    const uCountryId = 0;
    const uStateId = 0;
    const uTypeId =
      uniTypeValue !== 0
        ? uniTypeValue
        : typeof location.universityType !== undefined ||
          location.universityType !== null
        ? location.universityType
        : 0;
    const providerId =
      providerValue !== 0
        ? providerValue
        : typeof location.providervalue !== undefined ||
          location.providervalue !== null
        ? location.providervalue
        : 0;

    const countryId =
      uniCountryValue !== 0
        ? uniCountryValue
        : typeof location?.universityCountry !== undefined ||
          location?.universityCountry !== null
        ? location?.universityCountry
        : 0;

    if (uTypeId !== 0) {
      var unitype = universityTypes?.find((s) => s.id === uTypeId);

      if (unitype === undefined) {
        setUniTypeLabel("University Type");
      } else {
        setUniTypeLabel(unitype?.name);
        setUniTypeValue(uTypeId);
      }
    }

    if (countryId !== 0) {
      var country = univerSityCountries?.find((s) => s.id === countryId);

      if (country === undefined) {
        setUniCountryLabel("University Country");
      } else {
        setUniCountryLabel(country?.name);
        setUniCountryValue(countryId);
        searchStateByCountry(countryId);
      }
    }

    // if(location?.universityCountry != undefined){
    //   setUniCountryValue(location?.universityCountry);
    // }
    // else{
    //   setUniCountryValue(0);
    // }

    // if(location?.name != undefined){
    //   setUniCountryLabel(location?.name);
    // }
    // else{
    //   setUniCountryLabel('Country');
    // }

    if (providerId !== 0) {
      var providertype = providerDataResult?.find((p) => p.id === providerId);

      console.log(providertype);

      if (providertype === undefined) {
        //  setProviderLabel('Provider');
      } else {
        setProviderLabel(providertype?.name);
        setProviderValue(providerId);
      }
    }

    // get(`ProviderHelper/GetProviderId/${userType}/${referenceId}`).then(res=>{
    //   console.log("providerHelper",typeof(res));
    //     setProviderValue(res != 0 ? res : 0);
    //     if(res != 0){
    //       localStorage.setItem("providerValue", res);
    //     }
    // })

    get(
      `University/Index?page=${currentPage}&pagesize=${dataPerPage}&providerId=${
        providerId ? providerId : providerValue
      }&universityCountryId=${
        countryId ? countryId : uniCountryValue
      }&universityStateId=${
        uStateId ? uStateId : unistateValue
      }&universityTypeId=${
        uTypeId ? uTypeId : uniTypeValue
      }&search=${searchStr}&orderId=${orderValue}`
    ).then((action) => {
      setUniversityList(action?.models);
      console.log("aaaaaactionvalhalla", action?.models);

      setLoading(false);
      setEntity(action?.totalEntity);
      setSerialNum(action?.firstSerialNumber);
      setLoading(false);
    });
  }, [
    currentPage,
    dataPerPage,
    location.providervalue,
    location.universityType,
    searchStr,
    uniCountryValue,
    uniTypeValue,
    unistateValue,
    universityTypes,
    orderValue,
    providerValue,
    referenceId,
    userType,
    entity,
    location.name,
    location.universityCountry,
    success,
    // serialNum
  ]);

  const searchStateByCountry = (countryValue) => {
    get(`UniversityStateDD/Index/${countryValue}`).then((res) => {
      console.log("statebyCountry", res);
      // dispatch(StoreUniversityStateData(res));
      setUniversityStates(res);
    });
  };

  // search handler
  const handleSearch = () => {
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

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

  const selectDataSize = (value) => {
    setLoading(true);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

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

  // add university handler
  const handleAddUniversity = () => {
    // localStorage.removeItem('editUniId');
    // localStorage.removeItem('editMethod');
    // localStorage.removeItem("id");
    history.push("/addUniversity");
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // redirect to dashboard
  const backToDashboard = () => {
    if (location?.universityCountry != undefined) {
      history.push("/UniversityCountry");
    } else if (location.universityType != undefined) {
      history.push("/UniversityTypes");
    } else if (location.providervalue != undefined) {
      history.push("/providerList");
    } else {
      history.push("/");
    }
  };

  const universityCountryName = univerSityCountries?.map((uniCountry) => ({
    label: uniCountry.name,
    value: uniCountry.id,
  }));
  const universityStateName = universityStates?.map((uniState) => ({
    label: uniState.name,
    value: uniState.id,
  }));
  const universityTypeName = universityTypes?.map((uniType) => ({
    label: uniType.name,
    value: uniType.id,
  }));
  // select University Type

  const providerlist = providerList?.map((prov) => ({
    label: prov.name,
    value: prov.id,
  }));
  // console.log(providerlist);

  const selectUniType = (label, value) => {
    setUniTypeLabel(label);
    setUniTypeValue(value);
    handleSearch();
  };

  // select University Country
  const selectUniCountry = (label, value) => {
    setUniCountryLabel(label);
    setUniCountryValue(value);
    setUniStateLabel("University State");
    setUniStateValue(0);
    searchStateByCountry(value);

    handleSearch();

    // Axios.get(`${rootUrl}/UniversityState/GetByCountry/${value}`)
    //   .then(res => {
    //     if (res.data.result[0]) {
    //       setUniStateLabel(res.data.result[0].name)
    //       setUniStateValue(res.data.result[0].id)

    //     } else {
    //       setUniStateLabel('No State Found')
    //       setUniStateValue(0)
    //     }

    //   })
  };

  // console.log(uniCountryValue);

  // select University State
  const selectUniState = (label, value) => {
    setUniStateLabel(label);
    setUniStateValue(value);
    handleSearch();
  };

  const selectProviderState = (label, value) => {
    setProviderLabel(label);
    setProviderValue(value);
    handleSearch();
  };

  const searchValue = (e) => {
    setSearchStr(e.target.value);
    handleSearch();
  };

  // on clear
  const handleClearSearch = () => {
    setUniStateLabel("University State");
    setUniStateValue(0);
    setUniversityStates([]);
    setUniTypeLabel("University Type");
    setUniTypeValue(0);
    setUniCountryLabel("University Country");
    setUniCountryValue(0);
    setSearchStr("");
    setProviderLabel("Provider");
    setProviderValue(0);
    setCallApi((prev) => !prev);
  };

  // on enter press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      setCallApi((prev) => !prev);
    }
  };

  // redirect to campus list
  const redirectToCampusList = (id) => {
    localStorage.setItem("universityId", id);
    history.push({
      pathname: `/campusList/${id}`,
      id,
    });
  };

  // deleteing university

  const handleDeleteUniversity = () => {
    setButtonStatus(true);
    remove(`University/Delete/${delData?.id}`).then((res) => {
      setButtonStatus(false);
      addToast(res,{
        appearance: 'error',
        autoDismiss: true
      })
      setSuccess(!success);
      setDeleteModal(false);
    });
  };

  const toggleDanger = (id) => {
    
    setDelData(id);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  // deleting university end

  const handleEdit = (data) => {
    console.log("editData", data);
    // localStorage.removeItem("id");
    // localStorage.setItem("id", data?.id);
    // localStorage.setItem('editMethod','put');

    history.push(`/addUniversity/${data?.id}`);
  };

  const handleExportXLSX = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(universityList);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, "MyExcel.xlsx");
  };

  const componentRef = useRef();

  const handleRedirectToSubList = (id) => {
    localStorage.setItem("uniIdForSubList", id);
    history.push("/subjectList");
  };

  const redirectToApplications = (universityId, universityName) => {
    history.push({
      pathname: "/applications",
      universityIdFromUniList: universityId,
      universityName: universityName,
    });
  };

  const redirectToUniprofile = (uniId) => {
    history.push(`/universityDetails/${uniId}`);
  };

 

  // for hide/unhide column

  const handleCheckedLogo = (e) => {
    setCheckLogo(e.target.checked);
  };
  const handleCheckedSLNO = (e) => {
    setCheckSlNo(e.target.checked);
  };
  const handleCheckedName = (e) => {
    setCheckName(e.target.checked);
  };

  const handleCheckedType = (e) => {
    setCheckType(e.target.checked);
  };

  const handleCheckedCountry = (e) => {
    setCheckCountry(e.target.checked);
  };

  const handleCheckedCampus = (e) => {
    setCheckCampus(e.target.checked);
  };

  const handleCheckedAppli = (e) => {
    setCheckAppli(e.target.checked);
  };
  const handleCheckedProg = (e) => {
    setCheckProg(e.target.checked);
  };
  const handleCheckedAction = (e) => {
    setCheckAction(e.target.checked);
  };

  return (
    <div>
      {
        loading?
        <Loader/>
        :
        <div>
          <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">University List</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToDashboard} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i>{" "}
              {location?.universityCountry != undefined
                ? "Back to University Countries"
                : location.universityType != undefined
                ? "Back to University Types"
                : location.providervalue != undefined
                ? "Back to Provider List"
                : "Back to Dashboard"}
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card className="uapp-employee-search">
        <CardBody className="search-card-body">
          <Row>
            <Col lg="2" md="3" sm="6" xs="6">
              <Select
                options={universityTypeName}
                value={{ label: uniTypeLabel, value: uniTypeValue }}
                onChange={(opt) => selectUniType(opt.label, opt.value)}
                name="UniversityTypeId"
                id="UniversityTypeId"
              />
            </Col>

            <Col lg="2" md="3" sm="6" xs="6">
              <Select
                options={universityCountryName}
                value={{ label: uniCountryLabel, value: uniCountryValue }}
                onChange={(opt) => selectUniCountry(opt.label, opt.value)}
                name="UniversityCountryId"
                id="UniversityCountryId"
              />
            </Col>

            <Col lg="2" md="3" sm="6" xs="6">
              <Select
                options={universityStateName}
                value={{ label: uniStateLabel, value: unistateValue }}
                onChange={(opt) => selectUniState(opt.label, opt.value)}
                name="UniversityStateId"
                id="UniversityStateId"
              />
            </Col>
            {!(
              userType == userTypes?.Provider ||
              userType == userTypes?.ProviderAdmin ||
              userType == userTypes?.AdmissionManager
            ) ? (
              <Col lg="2" md="3" sm="6" xs="6">
                <Select
                  options={providerlist}
                  value={{ label: providerLabel, value: providerValue }}
                  onChange={(opt) => selectProviderState(opt.label, opt.value)}
                  name="providerId"
                  id="providerId"
                />
              </Col>
            ) : null}

            <Col lg="4" md="4" sm="6" xs="6">
              <Input
                style={{ height: "2.7rem" }}
                type="text"
                name="search"
                value={searchStr}
                id="search"
                placeholder="Name ,Short Name"
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

      {/* this portion is saved in text-file in desktop */}
      <Card className="uapp-employee-search">
        <CardBody>
          <Row className="mb-3">
            <Col lg="5" md="5" sm="4" xs="4">
              <ButtonForFunction
                func={handleAddUniversity}
                className={"btn btn-uapp-add "}
                icon={<i className="fas fa-plus"></i>}
                name={" Add New University"}
                permission={6}
              />
            </Col>

            <Col lg="7" md="7" sm="8" xs="8">
              <div className="d-md-flex justify-content-end">
                {/* <Col lg="2">
                    
                    <div className='ml-2'>
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
                          <ReactTableConvertToXl
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
                          <p className="">Logo</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedLogo(e);
                              }}
                              defaultChecked={checkLogo}
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
                          <p className="">Type</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedType(e);
                              }}
                              defaultChecked={checkType}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Country</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedCountry(e);
                              }}
                              defaultChecked={checkCountry}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Campus</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedCampus(e);
                              }}
                              defaultChecked={checkCampus}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Applications</p>
                        </Col>

                        <Col md="4" className="text-center">
                          <FormGroup check inline>
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                handleCheckedAppli(e);
                              }}
                              defaultChecked={checkAppli}
                            />
                          </FormGroup>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-between">
                        <Col md="8" className="">
                          <p className="">Programs</p>
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
            <h2 className="text-center">Loading...</h2>
          ) : (
            <div className="table-responsive" ref={componentRef}>
              <Table id="table-to-xls" className="table-sm table-bordered">
                <thead className="thead-uapp-bg">
                  <tr style={{ textAlign: "center" }}>
                    {checkSlNo ? <th>SL/NO</th> : null}

                    {checkLogo ? <th>Logo</th> : null}

                    {checkName ? <th>Name</th> : null}

                    {checkType ? <th>Type</th> : null}

                    {checkCountry ? <th>Country</th> : null}

                    {checkCampus ? <th>Campus</th> : null}

                    {checkAppli ? <th>Applications</th> : null}

                    {checkProg ? <th>Programs</th> : null}

                    {checkAction ? (
                      <th style={{ width: "8%" }} className="text-center">
                        Action
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {universityList?.map((university, i) => (
                    <tr key={university?.id} style={{ textAlign: "center" }}>
                      {checkSlNo ? <th scope="row">{serialNum + i}</th> : null}

                      {checkLogo ? (
                        <td>
                          {" "}
                          <img
                            className="Uapp-c-image"
                            src={rootUrl + university?.universityLogo?.thumbnailUrl}
                            alt="university_logo"
                          />{" "}
                        </td>
                      ) : null}

                      {checkName ? (
                        <td>
                          {university?.name} ({university?.shortName})
                        </td>
                      ) : null}

                      {checkType ? (
                        <td>{university?.universityType?.name}</td>
                      ) : null}

                      {checkCountry ? (
                        <td>
                          {university?.universityCountry?.name} (
                          {university?.universityState?.name})
                        </td>
                      ) : null}

                      {checkCampus ? (
                        <td>
                          {/* <span onClick={()=>redirectToCampusList(university?.id)}
                          className="badge badge-secondary"
                          style={{ cursor: "pointer" }}
                        >
                          {university?.totalCampus}
                        </span> */}

                          <SpanButton
                            func={() => redirectToCampusList(university?.id)}
                            className={"badge badge-secondary"}
                            style={{ cursor: "pointer" }}
                            data={university?.totalCampus}
                            permission={6}
                          />
                        </td>
                      ) : null}

                      {checkAppli ? (
                        <td>
                          {/* <span
                          className="badge badge-primary"
                          style={{ cursor: "pointer" }}
                        >
                          {university?.totalApplication}
                        </span> */}

                          <SpanButton
                            func={() =>
                              redirectToApplications(
                                university?.id,
                                university?.name
                              )
                            }
                            className={"badge badge-primary"}
                            style={{ cursor: "pointer" }}
                            data={university?.totalApplication}
                            permission={6}
                          />
                        </td>
                      ) : null}

                      {/* <td onClick={()=>handleRedirectToSubList(university?.id)}> */}

                      {checkProg ? (
                        <td>
                          {" "}
                          <span
                            className="badge badge-secondary"
                            style={{ cursor: "pointer" }}
                          >
                            {/* <Link className="text-decoration-none" to ={{
                             pathname: '/subjectList',
                             universityId: university?.id,
                             universityName: university?.name,
                           }}> 
                          <span> {university?.totalSubject} </span>
                          </Link> */}

                            <LinkSpanButton
                              className={"text-decoration-none"}
                              url={{
                                pathname: `/universitySubjectList/${university?.id}`,
                                universityId: university?.id,
                                universityName: university?.name,
                              }}
                              data={university?.totalSubject}
                              permission={6}
                            />
                          </span>{" "}
                        </td>
                      ) : null}

                      {checkAction ? (
                        <td style={{ width: "8%" }} className="text-center">
                          <ButtonGroup variant="text">
                            {/* <LinkButton
                            url={`/universityDetails/${university?.id}`}
                            color={"primary"}
                            className={"mx-1 btn-sm"}
                            icon={<i className="fas fa-eye"></i>}
                            permission={6}
                          /> */}

                            <ButtonForFunction
                              func={() => redirectToUniprofile(university?.id)}
                              color={"primary"}
                              className={"mx-1 btn-sm"}
                              icon={<i className="fas fa-eye"></i>}
                              permission={6}
                            />

                            {/* <Link to= {`/updateUniversityInformation/${university?.id}`}> */}

                            <ButtonForFunction
                              func={() => handleEdit(university)}
                              color={"warning"}
                              className={"mx-1 btn-sm"}
                              icon={<i className="fas fa-edit"></i>}
                              permission={6}
                            />

                            {/* </Link> */}

                            <ButtonForFunction
                              func={() => toggleDanger(university)}
                              color={"danger"}
                              className={"mx-1 btn-sm"}
                              icon={<i className="fas fa-trash-alt"></i>}
                              permission={6}
                            />
                          </ButtonGroup>

                          {/* modal for delete */}
                          <Modal
                            isOpen={deleteModal}
                            toggle={closeDeleteModal}
                            className="uapp-modal"
                          >
                            <ModalBody>
                              <p>
                                Are You Sure to Delete this{" "}
                                {localStorage.getItem("depName")} ? Once Deleted
                                it can't be Undone!
                              </p>
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                color="danger"
                                onClick={handleDeleteUniversity}
                                disabled={buttonStatus}
                              >
                                YES
                              </Button>
                              <Button onClick={closeDeleteModal}>NO</Button>
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
        </CardBody>
      </Card>
        </div>
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  univerSityTypeList: state.universityTypeDataReducer.universityTypes,
  univerSityCountryList: state.universityCountryDataReducer.universityCountries,
  univerSityStateList: state.universityStateDataReducer.universityStates,
  univerSityDropDownList: state.universityListReducer.universityList,
});
export default connect(mapStateToProps)(UniversityList);
 