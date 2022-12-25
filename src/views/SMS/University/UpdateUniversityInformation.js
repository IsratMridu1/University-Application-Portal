import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, FormGroup, Nav, NavItem, NavLink, TabContent, TabPane, Form, Input, Button } from 'reactstrap';
import get from '../../../helpers/get';
import Select from "react-select";
import PicturesWall from "./UniversityLogo";
import CoverPicturesWall from "./UniversityCover";
import { connect } from 'react-redux';

const UpdateUniversityInformation = (props) => {
    const id = useParams();
    const history = useHistory();

    const univerSityCountries = props.univerSityCountryList[0];
    const universityTypes = props.univerSityTypeList[0];
    const universityStates = props.univerSityStateList[0];


    const [activetab, setActivetab] = useState("1");
    const [description, setDescription] = useState("");
    const [uniData, setUniData] = useState({});
    const [submitData, setSubmitData] = useState(false);
    const [uniTypeLabel, setUniTypeLabel] = useState("Select University Type...");
    const [uniTypeValue, setUniTypeValue] = useState(0);
    const [uniCountryLabel, setUniCountryLabel] = useState(
        "Select University Country..."
      );
      const [uniCountryValue, setUniCountryValue] = useState(0);
      const [uniStateLabel, setUniStateLabel] = useState(
        "Select University State..."
      );
      const [unistateValue, setUniStateValue] = useState(0);

      const [provider,setProvider] = useState([]);

    useEffect(()=>{
        get(`University/Get/${id?.id}`)
        .then(res => {
            console.log(res);
            setUniData(res);

        })

        get('Provider/Index').then(res=> {

          
      
            setProvider(res?.models);
            setProviderTypeLabel(res?.models[0]?.name);
          
          })
          .catch();

    },[])

    const backToDashboard = () => {
          history.push('/');
    }

      // tab toggle
  const toggle = (tab) => {
    setActivetab(tab);
    if (tab == "2") {
      history.push("/addUniversityCampus");
    }
    if (tab == "3") {
      history.push("/addUniversityFinancial");
    }
    if (tab == "4") {
      history.push("/addUniversityFeatures");
    }
    if (tab == "5") {
      history.push("/addUniversityGallery");
    }
  };

//   submit update form

const handleSubmit  = () => {


}


const [providerTypeLabel, setProviderTypeLabel]= useState('Select Provider Type...');
const [providerTypeValue, setProviderTypeValue] = useState(0);


  
  const selectProviderType = (label, value) => {
    setProviderTypeLabel(label);
    setProviderTypeValue(value);
   
  }


 // select University Type
 const selectUniType = (label, value) => {
    setUniTypeLabel(label);
    setUniTypeValue(value);
  };

  // select University Country
  const selectUniCountry = (label, value) => {
    setUniCountryLabel(label);
    setUniCountryValue(value);
  }

  const providerMenu = provider.map(providerOptions =>({label:providerOptions.name, value:providerOptions.id}) )
    // select University State
    const selectUniState = (label, value) => {
        setUniStateLabel(label);
        setUniStateValue(value);
      };

      const universityTypeName = universityTypes?.map((uniType) => ({
        label: uniType.name,
        value: uniType.id,
      }));
      const universityCountryName = univerSityCountries?.map((uniCountry) => ({
        label: uniCountry.name,
        value: uniCountry.id,
      }));
      const universityStateName = universityStates?.map((uniState) => ({
        label: uniState.name,
        value: uniState.id,
      }));


    return (
        <div>
            <Card>
        <CardHeader className="page-header">
          <h3>Update University Information</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToDashboard}>
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          <Nav tabs>
            <NavItem>
              <NavLink active={activetab === "1"} onClick={() => toggle("1")}>
                University Information
              </NavLink>
            </NavItem>
            <NavItem>
              {submitData ? (
                <NavLink active={activetab === "2"} onClick={() => toggle("2")}>
                  Campus Information
                </NavLink>
              ) : (
                <NavLink disabled active={activetab === "2"}>
                  Campus Information
                </NavLink>
              )}
            </NavItem>

            {/* {
                                    submitData ?
                                    <NavLink
                                    active={activetab === '3'}
                                    onClick={() =>toggle('3')}
                                    >
    
                                    Financial Information
                                    </NavLink> :
                                     <NavLink disabled
                                     active={activetab === '3'}
                                     >
     
                                     Financial Information
                                     </NavLink>

                                } */}

            <NavItem>
              <NavLink disabled active={activetab === "3"}>
                Financial Information
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink disabled active={activetab === "4"}>
                Features
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink disabled active={activetab === "5"}>
                University Gallery
              </NavLink>
            </NavItem>

          </Nav>

          <TabContent activeTab={activetab}>
            <TabPane tabId="1">
              <Form  onSubmit={handleSubmit} className="mt-5">

               <input
               type='hidden'
               name='id'
               id='id'
               value={uniData?.id}
               
               />

              <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Provider <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={providerMenu}
                      value={{ label: providerTypeLabel, value: providerTypeValue }}
                      onChange={(opt) => selectProviderType(opt.label, opt.value)}
                      name="providerId"
                      id="providerId"
                    />

                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>


                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      University Name <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="Name"
                      id="Name"
                      placeholder="Enter University Name"
                      required
                      defaultValue={uniData?.name}
                    />
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      University Short Name{" "}
                      <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="ShortName"
                      id="ShortName"
                      placeholder="Enter University Short Name"
                      required
                      defaultValue={uniData?.shortName}
                    />
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      University Type <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={universityTypeName}
                      value={{ label: uniTypeLabel, value: uniTypeValue }}
                      onChange={(opt) => selectUniType(opt.label, opt.value)}
                      name="UniversityTypeId"
                      id="UniversityTypeId"
                    />

                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      University Country <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={universityCountryName}
                      value={{ label: uniCountryLabel, value: uniCountryValue }}
                      onChange={(opt) => selectUniCountry(opt.label, opt.value)}
                      name="UniversityCountryId"
                      id="UniversityCountryId"
                    />

                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      University State <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Select
                      options={universityStateName}
                      value={{ label: uniStateLabel, value: unistateValue }}
                      onChange={(opt) => selectUniState(opt.label, opt.value)}
                      name="UniversityStateId"
                      id="UniversityStateId"
                    />

                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      University City <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="UniversityCity"
                      id="UniversityCity"
                      placeholder="Enter University City Name"
                      required
                    />
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Global Rank </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="number"
                      name="GlobalRankNumber"
                      id="GlobalRankNumber"
                      placeholder="Enter University Global Rank"
                      required
                    />
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Foundation Year </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="text"
                      name="FoundationYear"
                      id="FoundationYear"
                      placeholder="Enter University Foundation Year"
                      required
                    />
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>University Description</span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="textarea"
                      name="Description"
                      id="Description"
                      rows="3"
                      value={description}
                      placeholder="Description"
                      onChange={(e) => setDescription(e.target.value)}
                    />

                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>Part Time Work Information </span>
                  </Col>
                  <Col md="6">
                    <Input
                      type="textarea"
                      name="PartTimeWorkInformation"
                      id="PartTimeWorkInformation"
                      rows="3"
                      placeholder="Enter Part Time Work Information"
                      required
                    />
                    {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      University Logo <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                  <PicturesWall/>

                 
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      University Cover Photo{" "}
                      <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="6">
                    
                    <CoverPicturesWall/>
                  
                  </Col>
                </FormGroup>

              



                <FormGroup
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "space-between" }}
                ></FormGroup>
                <FormGroup
                  className="has-icon-left position-relative"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button.Ripple
                    type="submit"
                    className="mr-1 mt-3 badge-primary"
                  >
                    Submit
                  </Button.Ripple>
                </FormGroup>
              </Form>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
            
        </div>
    );
};

const mapStateToProps = (state) => ({
    univerSityTypeList: state.universityTypeDataReducer.universityTypes,
    univerSityCountryList: state.universityCountryDataReducer.universityCountries,
    univerSityStateList: state.universityStateDataReducer.universityStates,
  });


export default connect(mapStateToProps)(UpdateUniversityInformation);