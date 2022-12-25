import React from "react";
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

import Select from "react-select";
import { useState } from "react";

const CommonFilter = ({
  applicationMenu,
  applicationLabel,
  setApplicationLabel,
  applicationValue,
  setApplicationValue,
  offerMenu,
  offerLabel,
  setOfferLabel,
  offerValue,
  setOfferValue,
  enrollMenu,
  enrollLabel,
  setEnrollLabel,
  enrollValue,
  setEnrollValue,
  intakeMenu,
  intakeLabel,
  setIntakeLabel,
  intakeValue,
  setIntakeValue,
  interviewMenu,
  interviewLabel,
  setInterviewLabel,
  interviewValue,
  setInterviewValue,
  elptMenu,
  elptLabel,
  setElptLabel,
  elptValue,
  setElptValue,
  financeMenu,
  financeLabel,
  setFinanceLabel,
  financeValue,
  setFinanceValue,
  commonUappIdMenu,
  commonUappIdLabel,
  setCommonUappIdLabel,
  commonUappIdValue,
  setCommonUappIdValue,
  commonUniMenu,
  commonUniLabel,
  setCommonUniLabel,
  commonUniValue,
  setCommonUniValue,
  consultantLabel,
  setConsultantLabel,
  consultantValue,
  setConsultantValue,
  commonConsultantMenu,
  commonStdMenu,
  setCommonStdValue,
  commonStdValue,
  setCommonStdLabel,
  commonStdLabel,
  commonPhoneMenu,
  setCommonPhoneValue,
  commonPhoneValue,
  setCommonPhoneLabel,
  commonPhoneLabel,
  cId,
  uId
}) => {
  // const [applicationLabel, setApplicationLabel] = useState("Status");
  // const [applicationValue, setApplicationValue] = useState(0);
  // const [offerLabel, setOfferLabel] = useState("Offer");
  // const [offerValue, setOfferValue] = useState(0);
  // const [enrollLabel, setEnrollLabel] = useState("Enrolment Status");
  // const [enrollValue, setEnrollValue] = useState(0);
  // const [intakeLabel, setIntakeLabel] = useState("Intake");
  // const [intakeValue, setIntakeValue] = useState(0);
  // const [interviewLabel, setInterviewLabel] = useState("Interview");
  // const [interviewValue, setInterviewValue] = useState(0);
  // const [elptLabel, setElptLabel] = useState("ELPT");
  // const [elptValue, setElptValue] = useState(0);
  // const [financeLabel, setFinanceLabel] = useState("SLCs");
  // const [financeValue, setFinanceValue] = useState(0);
  // const [commonUappIdLabel, setCommonUappIdLabel] = useState("UAPP ID");
  // const [commonUappIdValue, setCommonUappIdValue] = useState(0);
  // const [commonUniLabel, setCommonUniLabel] = useState("University Name");
  // const [commonUniValue, setCommonUniValue] = useState(0);
  // const [consultantLabel, setConsultantLabel] = useState("Consultant");
  // const [consultantValue, setConsultantValue] = useState(0);
  // const [commonStdLabel, setCommonStdLabel] = useState("Name");
  // const [commonStdValue, setCommonStdValue] = useState(0);
  // const [commonPhoneLabel, setCommonPhoneLabel] = useState("Phone No.");
  // const [commonPhoneValue, setCommonPhoneValue] = useState(0);


  // const applicationMenu = applicationDD.map(application =>({label: application?.name, value: application?.id}));
  // const offerMenu = offerDD.map(offer =>({label: offer?.name, value: offer?.id}));
  // const enrollMenu = enrollDD.map((enroll) => ({
  //   label: enroll?.name,
  //   value: enroll?.id,
  // }));
  // const intakeMenu = intakeDD.map((intake) => ({
  //   label: intake?.name,
  //   value: intake?.id,
  // }));
  // const interviewMenu = interviewDD.map((interview) => ({
  //   label: interview?.name,
  //   value: interview?.id,
  // }));
  // const elptMenu = elptDD.map((elpt) => ({
  //   label: elpt?.name,
  //   value: elpt?.id,
  // }));
  // const financeMenu = financeDD.map((finance) => ({
  //   label: finance?.name,
  //   value: finance?.id,
  // }));
  // const commonUappIdMenu = commonUappIdDD.map((UappId) => ({
  //   label: UappId?.name,
  //   value: UappId?.id,
  // }));
  // const commonUniMenu = commonUniDD.map((uni) => ({
  //   label: uni?.name,
  //   value: uni?.id,
  // }));
  // const commonConsultantMenu = commonConsultantDD.map((consultant) => ({
  //   label: consultant?.name,
  //   value: consultant?.id,
  // }));
  // const commonStdMenu = commonStdDD.map((student) => ({
  //   label: student?.name,
  //   value: student?.id,
  // }));
  // const commonPhoneMenu = commonPhoneDD.map((phone) => ({
  //   label: phone?.name,
  //   value: phone?.id,
  // }));

  const selectAppliDD = (label, value) => {
    setApplicationLabel(label);
    setApplicationValue(value);
    // handleSearch();
  };
  const selectOfferDD = (label, value) => {
    setOfferLabel(label);
    setOfferValue(value);
    // handleSearch();
  };
  const selectEnrollDD = (label, value) => {
    setEnrollLabel(label);
    setEnrollValue(value);
    // handleSearch();
  };
  const selectIntakeDD = (label, value) => {
    setIntakeLabel(label);
    setIntakeValue(value);
    // handleSearch();
  };
  const selectInterviewDD = (label, value) => {
    setInterviewLabel(label);
    setInterviewValue(value);
    // handleSearch();
  };
  const selectElptDD = (label, value) => {
    setElptLabel(label);
    setElptValue(value);
    // handleSearch();
  };
  const selectFinanceDD = (label, value) => {
    setFinanceLabel(label);
    setFinanceValue(value);
    // handleSearch();
  };
  const selectUappIdDD = (label, value) => {
    setCommonUappIdLabel(label);
    setCommonUappIdValue(value);
    // handleSearch();
  };
  const selectUniDD = (label, value) => {
    setCommonUniLabel(label);
    setCommonUniValue(value);
    // handleSearch();
  };
  const selectConsultantDD = (label, value) => {
    setConsultantLabel(label);
    setConsultantValue(value);
    // handleSearch();
  };
  const selectStudentDD = (label, value) => {
    setCommonStdLabel(label);
    setCommonStdValue(value);
    // handleSearch();
  };
  const selectPhoneDD = (label, value) => {
    setCommonPhoneLabel(label);
    setCommonPhoneValue(value);
    // handleSearch();
  };

  // on clear
  const handleClearSearch = () => {
    setApplicationLabel("Status");
    setApplicationValue(0);
    setOfferLabel("Offer");
    setOfferValue(0);
    setEnrollLabel("Enrolment Status");
    setEnrollValue(0);
    setIntakeLabel("Intake");
    setIntakeValue(0);
    setInterviewLabel("Interview");
    setInterviewValue(0);
    setElptLabel("ELPT");
    setElptValue(0);
    setFinanceLabel("SLCs");
    setFinanceValue(0);
    setCommonUappIdLabel("UAPP Id");
    setCommonUappIdValue(0);
    setCommonUniLabel("University Name");
    setCommonUniValue(0);
    setConsultantLabel("Consultant");
    setConsultantValue(0);
    setCommonStdLabel("Name");
    setCommonStdValue(0);
    setCommonPhoneLabel("Phone No.");
    setCommonPhoneValue(0);
  };

  return (
    <Card className="uapp-employee-search">
      <CardBody className="search-card-body">
        <Row className="gy-3">
          <Col lg="2" md="3" sm="6" xs="6" className="p-2">
            <Select
              options={commonUappIdMenu}
              value={{ label: commonUappIdLabel, value: commonUappIdValue }}
              onChange={(opt) => selectUappIdDD(opt.label, opt.value)}
              placeholder="UAPP ID"
              name="name"
              id="id"
            />
          </Col>

          <Col lg="2" md="3" sm="6" xs="6" className="p-2">
            <Select
              options={commonStdMenu}
              value={{ label: commonStdLabel, value: commonStdValue }}
              onChange={(opt) => selectStudentDD(opt.label, opt.value)}
              placeholder="Name"
              name="name"
              id="id"
            />
          </Col>

          <Col lg="2" md="3" sm="6" xs="6" className="p-2">
            <Select
              options={commonConsultantMenu}
              value={{ label: consultantLabel, value: consultantValue }}
              onChange={(opt) => selectConsultantDD(opt.label, opt.value)}
              placeholder="Consultant"
              name="name"
              id="id"
              isDisabled={cId ? true : false}
            />
          </Col>

          <Col lg="2" md="3" sm="6" xs="6" className="p-2">
            <Select
              options={applicationMenu}
              value={{ label: applicationLabel, value: applicationValue }}
              onChange={(opt) => selectAppliDD(opt.label, opt.value)}
              placeholder="Status"
              name="name"
              id="id"
            />
          </Col>

          <Col lg="2" md="3" sm="6" xs="6" className="p-2">
            <Select
              options={offerMenu}
              value={{ label: offerLabel, value: offerValue }}
              onChange={(opt) => selectOfferDD(opt.label, opt.value)}
              placeholder="Offer"
              name="name"
              id="id"
            />
          </Col>

          <Col lg="2" md="3" sm="6" xs="6" className="p-2">
            <Select
              options={enrollMenu}
              value={{ label: enrollLabel, value: enrollValue }}
              onChange={(opt) => selectEnrollDD(opt.label, opt.value)}
              placeholder="Enrolment st..."
              name="name"
              id="id"
            />
          </Col>

          <Col lg="2" md="3" sm="6" xs="6" className="p-2">
            <Select
              options={intakeMenu}
              value={{ label: intakeLabel, value: intakeValue }}
              onChange={(opt) => selectIntakeDD(opt.label, opt.value)}
              placeholder="Intake"
              name="name"
              id="id"
            />
          </Col>

          <Col lg="2" md="3" sm="6" xs="6" className="p-2">
            <Select
              options={interviewMenu}
              value={{ label: interviewLabel, value: interviewValue }}
              onChange={(opt) => selectInterviewDD(opt.label, opt.value)}
              placeholder="Interview"
              name="name"
              id="id"
            />
          </Col>

          <Col lg="2" md="3" sm="6" xs="6" className="p-2">
            <Select
              options={elptMenu}
              value={{ label: elptLabel, value: elptValue }}
              onChange={(opt) => selectElptDD(opt.label, opt.value)}
              placeholder="ELPT"
              name="name"
              id="id"
            />
          </Col>

          <Col lg="2" md="3" sm="6" xs="6" className="p-2">
            <Select
              options={financeMenu}
              value={{ label: financeLabel, value: financeValue }}
              onChange={(opt) => selectFinanceDD(opt.label, opt.value)}
              placeholder="SLCs"
              name="name"
              id="id"
            />
          </Col>

          <Col lg="2" md="3" sm="6" xs="6" className="p-2">
            <Select
              options={commonUniMenu}
              value={{ label: commonUniLabel, value: commonUniValue }}
              onChange={(opt) => selectUniDD(opt.label, opt.value)}
              placeholder="University N..."
              name="name"
              id="id"
              isDisabled={uId ? true : false}
            />
          </Col>

          <Col lg="2" md="3" sm="6" xs="6" className="p-2">
            <Select
              options={commonPhoneMenu}
              value={{ label: commonPhoneLabel, value: commonPhoneValue }}
              onChange={(opt) => selectPhoneDD(opt.label, opt.value)}
              placeholder="Phone No."
              name="name"
              id="id"
            />
          </Col>
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
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default CommonFilter;
