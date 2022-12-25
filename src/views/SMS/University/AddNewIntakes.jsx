import { FormGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';
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
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
  } from "reactstrap";
  import { Link } from "react-router-dom";
  import Select from "react-select";
  import { useHistory, useLocation } from "react-router";
  import get from '../../../helpers/get';
  import post from '../../../helpers/post';
  import { useToasts } from "react-toast-notifications";
  import CustomButtonRipple from '../Components/CustomButtonRipple';
import ButtonForFunction from '../Components/ButtonForFunction';
import { permissionList } from '../../../constants/AuthorizationConstant';

const AddNewIntakes = () => {
    const [month, setMonth] = useState([]);
    const [year, setYear] = useState([]);
    const history = useHistory();
    const { addToast } = useToasts();

    const [monthTypeLabel, setMonthTypeLabel]= useState('Select Month');
    const [monthTypeValue, setMonthTypeValue] = useState(0);

    const [yearTypeLabel, setYearTypeLabel]= useState('Select Year');
    const [yearTypeValue, setYearTypeValue] = useState(0);

    const [montherror,setMonthError] = useState('');
    const [yearError, setYearError] = useState('');

    const permissions = JSON.parse(localStorage.getItem('permissions')); 




    useEffect(()=>{

        get('MonthDD/Index').then(res=> {
          setMonth(res);
        })
        .catch();

        get('YearDD/Index').then(res=> {
            setYear(res);
          })
          .catch();
      },[])

      const monthMenu = month.map(monthOptions =>({label:monthOptions.name, value:monthOptions.id}));
      const yearMenu = year.map(yearOptions =>({label:yearOptions.name, value:yearOptions.id}));



    const handleCancel = () =>{
        history.push("/intake");
    }

    const selectMonthType = (label, value) => {
      setMonthError('');
        setMonthTypeLabel(label);
        setMonthTypeValue(value); 
      }

      const selectYearType = (label, value) => {
        setYearError('');
        setYearTypeLabel(label);
        setYearTypeValue(value); 
      }

      const handleSubmit = (event) =>{
          event.preventDefault();
          const subData = new FormData(event.target);
        //   for (var value of subData.values()) {
        //       console.log('valueeee',value);
        //     }
        if(monthTypeValue == 0){
          setMonthError('Month is required');
        }

        else if(yearTypeValue == 0){
          setYearError('Year is required');
        }

        else{

          post(`Intake/Create`, subData).then(action => {
            addToast(action?.data?.message, {
                appearance: 'success',
                autoDismiss: true,
              })
              history.push({
                pathname: "/intake",
              });
          });
        }
      }

       // redirect to intakeList
       const backToIntakeList = () => {
        history.push("/intake");
        };

    return (
        <div>
            <Card>
                <Card className="uapp-card-bg m-3 p-2">
                    <CardHeader className="page-header">
                        <h3 className="text-white my-auto">Add Intake</h3>
                        <div className="page-header-back-to-home">
                          <span onClick={backToIntakeList} className="text-white">
                            {" "}
                            <i className="fas fa-arrow-circle-left"></i> Back to Intake List
                          </span>
                        </div>
                    </CardHeader>
                </Card>

                <Form onSubmit={handleSubmit} className='m-3'>
                    <FormGroup row>
                        <Col md="4">
                            <span>
                               <span style={{color: '#1e98b0', fontSize: '14px'}}>Intake Month</span> <span className="text-danger">*</span>{" "}
                            </span>
                        </Col>

                        <Col md="4">
                        <Select
                            options={monthMenu}
                            value={{ label: monthTypeLabel, value: monthTypeValue }}
                            onChange={(opt) => selectMonthType(opt.label, opt.value)}
                            name="monthId"
                            id="monthId"
                        />
                        {
                           <span className='text-danger'>{montherror}</span>
                        }
                        </Col>

                        <Col md="4">

                        </Col>
                    </FormGroup>

                    <FormGroup row className='mt-3'>
                        <Col md="4">
                            <span>
                               <span style={{color: '#1e98b0', fontSize: '14px'}}>Intake Year</span> <span className="text-danger">*</span>{" "}
                            </span>
                        </Col>

                        <Col md="4">
                        <Select
                            options={yearMenu}
                            value={{ label: yearTypeLabel, value: yearTypeValue }}
                            onChange={(opt) => selectYearType(opt.label, opt.value)}
                            name="yearId"
                            id="yearId"
                        />
                        {
                           <span className='text-danger'>{yearError}</span>
                        }

                        <FormGroup
                            className="has-icon-left position-relative mt-3"
                            style={{ display: "flex", justifyContent: "space-between" }}
                     >
                       {/* <Link to="/intake"> */}

                         {
                            permissions?.includes(permissionList?.Add_subject_intake)?
                           <CustomButtonRipple
                           type={"submit"}
                           className={"mr-1 mt-3 badge-primary mx-auto"}
                           name={"Submit"}
                           
                         />
                         :
                         null

                         }

                       {/* </Link> */}

                     </FormGroup>

                        </Col>

                        <Col md="4" className="d-flex justify-content-end align-items-end">
                            <div>

                                <ButtonForFunction
                                  func={handleCancel}
                                  className={'mt-md-3'}
                                  color={'danger'}
                                  name={"Cancel"}
                                  permission={6}
                                />

                            </div>
                        </Col>
                    </FormGroup>

                    
                </Form>


            </Card>
        </div>
    );
};

export default AddNewIntakes;