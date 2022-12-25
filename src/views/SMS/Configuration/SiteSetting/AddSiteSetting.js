import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  Table,
  UncontrolledTooltip,
} from "reactstrap";
import post from "../../../../helpers/post";
import FavIconFile from "./FavIconFile";
import LogoFile from "./LogoFile";

const AddSiteSetting = () => {
  const [connectionString, setConnectionString] = useState("");
  const [siteShortName, setSiteShortName] = useState("");
  const [siteFullName, setSightFullName] = useState("");
  const [emailBlock, setEmailBlock] = useState(false);
  const [notificationBlock, setNotificationBlock] = useState(false);
  const [backupPath, setBackupPath] = useState("");
  const history = useHistory();

  const result = useSelector(
    (state) => state.SightSettingLogoDataReducer.sightSettinglogoImage
  );
  const result1 = useSelector(
    (state) => state.SightSettingCoverIconReducer.sightSettingCoverImage
  );


  const handleSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    subData.append("uappLogoFile", result[0]?.originFileObj);
    subData.append("uappfaviconFile", result1[0]?.originFileObj);

    for (const val of subData.values()) {
   
    }

    // const siteSettingInfo = {
    //     uappLogoFile: result[0]?.originFileObj,
    //     uappLogoUrl: '',

    //     uappfaviconFile: result1[0]?.originFileObj,
    //     uappfaviconUrl:'',
    //     connectionStrings: connectionString,
    //     siteShortName,
    //     siteFullName,
    //     emailBlock,
    //     notificationBlock,
    //     backupPath

    // }
  

    post(`SiteSetting/Create`, subData).then((res) => {
    
      alert(res);
      history.push("/siteSetting");
    });
  };

  const backToDashboard = () => {
    history.push("/");
  };
  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Add Site Setting</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToDashboard} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          <Form className="mt-5" onSubmit={handleSubmit}>
            <FormGroup row>
              <Col md="2">
                <i id="logoTooltip" className="fas fa-info-circle menuIcon"></i>
                <span className="ms-2">Uapp Logo File</span>
              </Col>
              <UncontrolledTooltip placement="top" target="logoTooltip">
                Your Logo File
              </UncontrolledTooltip>
              <Col md="6">
                <LogoFile />
              </Col>
            </FormGroup>
            <FormGroup>
              <input
                type="hidden"
                value=""
                name="uappLogoUrl"
                id="uappLogoUrl"
              />
            </FormGroup>
            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <i id="faviconTooltip" className="fas fa-info-circle menuIcon"></i>
                <span className="ms-2">Uapp Favicon File</span>
              </Col>
              <UncontrolledTooltip placement="top" target="faviconTooltip">
                Your Favicon File
              </UncontrolledTooltip>
              <Col md="6">
                <FavIconFile />
              </Col>
            </FormGroup>
            <FormGroup>
              <input
                type="hidden"
                value=""
                name="uappfaviconUrl"
                id="uappfaviconUrl"
              />
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <i
                  id="connectionStringsTooltip"
                  className="fas fa-info-circle menuIcon"
                ></i>
                <span className="ms-2">Connection Strings</span>
              </Col>
              <UncontrolledTooltip
                placement="top"
                target="connectionStringsTooltip"
              >
                Connection String is the Informatin of Database Server
              </UncontrolledTooltip>
              <Col md="6">
                <Input
                  type="text"
                  name="connectionStrings"
                  id="connectionStrings"
                  placeholder="Enter Connection Strings"
                  required
                  onChange={(e) => setConnectionString(e.target.value)}
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <i
                  id="siteShortNameTooltip"
                  className="fas fa-info-circle menuIcon"
                ></i>
                <span className="ms-2">Site Short Name</span>
              </Col>
              <UncontrolledTooltip
                placement="top"
                target="siteShortNameTooltip"
              >
                Your Site Short Name
              </UncontrolledTooltip>
              <Col md="6">
                <Input
                  type="text"
                  name="siteShortName"
                  id="siteShortName"
                  placeholder="Enter Site Short Name"
                  required
                  onChange={(e) => setSiteShortName(e.target.value)}
                />
                {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <i
                  id="siteFullNameTooltip"
                  className="fas fa-info-circle menuIcon"
                ></i>
                <span className="ms-1">Site Full Name</span>
              </Col>
              <UncontrolledTooltip placement="top" target="siteFullNameTooltip">
                Your Site Full Name
              </UncontrolledTooltip>
              <Col md="6">
                <Input
                  type="text"
                  name="siteFullName"
                  id="siteFullName"
                  placeholder="Enter Site Full Name"
                  required
                  onChange={(e) => setSightFullName(e.target.value)}
                />
                {/* <div className="form-control-position">
                                        <User size={15} />
                                    </div> */}
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <i
                  id="emailBlockTooltip"
                  className="fas fa-info-circle menuIcon"
                ></i>
                <span className="ms-2">Email Block</span>
              </Col>
              <UncontrolledTooltip placement="top" target="emailBlockTooltip">
                Email Block is for Enabling and Disabling Email Sending and
                Receiving
              </UncontrolledTooltip>
              <Col md="6" className="ms-3">
                <Input
                  type="checkbox"
                  onChange={(e) => setEmailBlock(e.target.checked)}
                />
              </Col>
            </FormGroup>
            <input
              type="hidden"
              name="emailBlock"
              id="emailBlock"
              value={emailBlock}
            />

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <i
                  id="notificationBlockTooltip"
                  className="fas fa-info-circle menuIcon"
                ></i>
                <span className="ms-2">Notification Block</span>
              </Col>
              <UncontrolledTooltip
                placement="top"
                target="notificationBlockTooltip"
              >
                Enable or Disable Real Time Notification
              </UncontrolledTooltip>
              <Col md="6" className="ms-3">
                <Input
                  type="checkbox"
                  onChange={(e) => setNotificationBlock(e.target.checked)}
                />
              </Col>
            </FormGroup>

            <input
              type="hidden"
              name="notificationBlock"
              id="notificationBlock"
              value={notificationBlock}
            />

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <i
                  id="backupPathTooltip"
                  className="fas fa-info-circle menuIcon"
                ></i>
                <span className="ms-2">Backup Path</span>
              </Col>
              <UncontrolledTooltip placement="top" target="backupPathTooltip">
                Path to Save Files as Backup
              </UncontrolledTooltip>
              <Col md="6">
                <Input
                  type="text"
                  name="backupPath"
                  id="backupPath"
                  placeholder="Enter Backup  Path"
                  required
                  onChange={(e) => setBackupPath(e.target.value)}
                />
              </Col>
            </FormGroup>

            <FormGroup
              className="has-icon-left position-relative"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button.Ripple type="submit" className="mr-1 mt-3 badge-primary">
                Submit
              </Button.Ripple>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddSiteSetting;
