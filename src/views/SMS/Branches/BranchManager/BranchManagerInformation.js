import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Form,
  Input,
} from "reactstrap";
import get from "../../../../helpers/get";
import put from "../../../../helpers/put";
import ManagerImage from "../BranchManager/BranchManagerImage";
import { useToasts } from "react-toast-notifications";
import { Image } from 'antd';
import "antd/dist/antd.css";
import { rootUrl } from "../../../../constants/constants";
import { Upload, Modal } from 'antd';
import * as Icon from 'react-feather';
import Select from "react-select";

const BranchManagerInformation = () => {
  const { branchId, managerId } = useParams();
  const history = useHistory();
  const { addToast } = useToasts();
  const [branchManagerInfo, setBranchManagerInfo] = useState({});

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [FileList, setFileList] = useState([]);

  const [title,setTitle] = useState([]);
  const [titleLabel,setTitleLabel] = useState('Select');
  const [titleValue,setTitleValue] = useState(0);

  // const managerImageData = useSelector(
  //   (state) => state?.ManagerImageReducer?.managerImage
  // );

  useEffect(() => {
    get(`BranchManager/Get/${managerId}`).then((res) => {
      
      setBranchManagerInfo(res);
      setTitleLabel(res?.nameTittle?.name);
      setTitleValue(res?.nameTittle?.id);
    });

    get('NameTittle/GetAll')
    .then(res => {
    
      setTitle(res);
    })
  }, [managerId]);


  const nameTitle = title?.map((singleTitle) => ({
    label: singleTitle.name,
    value: singleTitle.id,
  }));


           // select  Title
const selectTitle = (label, value) => {


setTitleLabel(label);
setTitleValue(value);



}

   //  Manager Image COde Start


    
   function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  
 
 
  const  handleCancel = () => {
      setPreviewVisible(false);
  };

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    // this.setState({
    //   previewImage: file.url || file.preview,
    //   previewVisible: true,
    //   previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    // });

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name ||  file.url.substring(file.url.lastIndexOf('/') + 1) );





  };

 const handleChange = ({ fileList }) => {
     setFileList(fileList);
    
    
 };



    // manager Image code end

  const backToBranchList = () => {
    history.push("/branchList");
  };

  sessionStorage.setItem("BranchManagerId", branchManagerInfo?.id);

  const handleUpdateManagerInformation = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    subData.append("managerImage", FileList[0]?.originFileObj);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    for (let val of subData.values()) {
   
    }
    put(`BranchManager/Update`, subData, config).then((res) => {
    
      if(res?.status == 200 && res?.data?.isSuccess == true){
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true
        });
        history.push(`/branchProfile/${branchManagerInfo?.branchId}`);
      }
      else{
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true
        });
      }
     
    });
  };

  return (
    <div>
        <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Update Branch Manager Information</h3>
          <div className="page-header-back-to-home">
            <span onClick={backToBranchList} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Branch List
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardBody>
          <Form className="mt-5" onSubmit={handleUpdateManagerInformation}>
            <input
              type="hidden"
              name="id"
              id="id"
              value={branchManagerInfo?.id}
            />
            <input
              type="hidden"
              name="email"
              id="email"
              value={branchManagerInfo?.email}
            />
          
            <input
              type="hidden"
              name="branchId"
              id="branchId"
              value={branchManagerInfo?.branchId}
            />

<FormGroup row className="has-icon-left position-relative">
                  <Col md="2">
                    <span>
                      Title <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>
                  <Col md="4">
                  <Select
                      options={nameTitle}
                      value={{ label: titleLabel, value: titleValue }}
                      onChange={(opt) => selectTitle(opt.label, opt.value)}
                      name="nameTittleId"
                      id="nameTittleId"
                      required

                    />
                   
                 
                  </Col>
                </FormGroup>


            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  First Name <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="4">
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter branch name"
                  required
                  defaultValue={branchManagerInfo?.firstName}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Last Name <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="4">
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter branch name"
                  required
                  defaultValue={branchManagerInfo?.lastName}
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Phone Number <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="4">
                <Input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  defaultValue={branchManagerInfo?.phoneNumber}
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                  Manager Image <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="4">
              <div className='d-flex'>

                {
                  (branchManagerInfo?.managerImageMedia) !== null ?
                <div className='me-2'>
                  <Image
                  width={104} height={104}
                  src={rootUrl+branchManagerInfo?.managerImageMedia?.fileUrl}
                />
                </div>
                : 
                null
                }

                <div className='ml-2'>
                <Upload
         
         listType="picture-card"
         multiple={false}
         fileList={FileList}
         onPreview={handlePreview}
         onChange={handleChange}
         beforeUpload={(file)=>{

         
             
           
             return false;
         }}
       >
          {FileList.length < 1 ?  <div className='text-danger' style={{ marginTop: 8 }}><Icon.Upload/></div>: ''}
       </Upload>
       <Modal
         visible={previewVisible}
         title={previewTitle}
         footer={null}
         onCancel={handleCancel}
       >
         <img alt="example" style={{ width: '100%' }} src={previewImage} />
       </Modal>
                </div>

                </div>
              </Col>
            </FormGroup>

            <FormGroup
              row
              className="has-icon-left position-relative"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Col md="6">
                <div className="d-flex justify-content-end">
                <Button.Ripple type="submit" className="mr-1 mt-3 badge-primary">
                Submit
              </Button.Ripple>
                </div>
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default BranchManagerInformation;
