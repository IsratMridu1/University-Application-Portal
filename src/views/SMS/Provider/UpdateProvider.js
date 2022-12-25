import React, { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Input, Row, UncontrolledTooltip } from 'reactstrap';
import get from '../../../helpers/get';
import put from '../../../helpers/put';
import Select from 'react-select';
import ProviderLogo from './ProviderLogo';
import { useSelector } from 'react-redux';
import ButtonForFunction from '../Components/ButtonForFunction';
import { Image } from 'antd';
import { Upload, Modal } from 'antd';
import * as Icon from 'react-feather';
import { rootUrl } from '../../../constants/constants';
import { permissionList } from '../../../constants/AuthorizationConstant';


const UpdateProvider = () => {
    const {id} = useParams();
    const [providerInfo, setProviderInfo] = useState({});
    const [providerType, setProviderType] = useState([]);
    const [providerTypeLabel,setProviderTypeLabel] = useState('Select Provider type');
    const [providerTypeValue, setProviderTypeValue] = useState(0);
    const [title,setTitle] = useState('');
    const history = useHistory();
    const { addToast } = useToasts();
    const permissions = JSON.parse(localStorage.getItem("permissions"));
    const [buttonStatus,setButtonStatus] = useState(false);

    const providerLogo = useSelector((state) => state?.GeneralProviderlogoFile ?.ProviderLogoFile);
    
    const backToDashboard = () => {
        history.push('/providerList');
    } 

    // Update Provider Image Start

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [FileList, setFileList] = useState([]);

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
  
    
  
      setPreviewImage(file.url || file.preview);
      setPreviewVisible(true);
      setPreviewTitle(file.name ||  file.url.substring(file.url.lastIndexOf('/') + 1) );
  
  
  
  
  
    };
  
   const handleChange = ({ fileList }) => {
       
       setFileList(fileList);
      
      
   };
  
    
    

    //  Update Provider Image End



   useEffect(()=> {
       get(`Provider/Get/${id}`)
       .then(res => {
           console.log(res);
           setProviderInfo(res);
           setProviderTypeLabel(res?.providerType?.name);
           setProviderTypeValue(res?.providerType?.id);
        

       })
   },[])

   useEffect(()=> {
    get(`ProviderType/GetAll`)
    .then(res => {
      console.log('provider type',res);
      setProviderType(res);
    })
    .catch()

},[])

const providerMenu = providerType.map(providerOptions =>({label:providerOptions.name, value:providerOptions.id}) )
   
   const selectProviderType = (label, value) => {
    setProviderTypeLabel(label);
    setProviderTypeValue(value);
   
  }

  const handleSubmit = (e) =>{
      e.preventDefault();
      const subData = new FormData(e.target);

      subData.append('providerLogo',FileList[0]?.originFileObj);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      for(let val of subData.values()){
          console.log(val);
      }
      setButtonStatus(true);
      put(`Provider/Update`,subData,config)
      .then(res => {
        setButtonStatus(false);
        // for (const val of subData.value()){
        //   console.log(val);
        // }
       
        addToast(res?.data?.message, {
            appearance:'success',
            autoDismiss: true,
          })
          history.push('/providerList');

      })
      

  }

    return (
        <div>
        <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Update Provider Information</h3>
          <div className="page-header-back-to-home">
            <span className="text-white" onClick={backToDashboard}>
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Provider List
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
          
          <CardBody>
      <form onSubmit={handleSubmit}>


                    <input type='hidden'
                    name='id'
                    id='id'
                    value={providerInfo?.id} />

                  <FormGroup row>
                    <Col md="2">
                    <i id="nameTooltip" className="fas fa-info-circle menuIcon"></i>
                      <span className="pl-2">Name</span>
                    </Col>

                    <UncontrolledTooltip
                    placement="top"
                    target="nameTooltip"

                  >
                    Your Name
                  </UncontrolledTooltip>
                   
                    
                    
                    <Col md="10" lg="6">
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Your Name"
                        onChange={(e)=>setTitle(e.target.value)}
                        required
                        defaultValue={providerInfo?.name}
                      />

                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                   <i id="emailTooltip" className="fas fa-info-circle menuIcon"></i>
                      <span className="pl-2">Email</span>
                    </Col>

                    <UncontrolledTooltip
                    placement="top"
                    target="emailTooltip"

                  >
                    Your Email
                  </UncontrolledTooltip>
                    

                

                    <Col md="10" lg="6">
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter Your Email"
                        required
                        // onChange={(e)=>setIcon(e.target.value)}
                        defaultValue={providerInfo?.email}
                      />

                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                   <i id="numberTooltip" className="fas fa-info-circle menuIcon"></i>
                      <span className="pl-2">Phone Number</span>
                    </Col>

                    <UncontrolledTooltip
                    placement="top"
                    target="numberTooltip"

                  >
                    Your Phone Number
                  </UncontrolledTooltip>

                  

                    <Col md="10" lg="6">
                      <Input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="Enter Your Phone Number"
                        required
                        // onChange={(e)=>setIcon(e.target.value)}
                        defaultValue={providerInfo?.phoneNumber}
                      />

                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="2">
                   <i id="usernameTooltip" className="fas fa-info-circle menuIcon"></i>
                      <span className="pl-2">Username</span>
                    </Col>

                    <UncontrolledTooltip
                    placement="top"
                    target="usernameTooltip"

                  >
                    Your Username
                  </UncontrolledTooltip>
                  

                    <Col md="10" lg="6">
                      <Input
                        type="text"
                        name="userName"
                        id="userName"
                        placeholder="Enter Your Username"
                        required
                        // onChange={(e)=>setIcon(e.target.value)}
                        defaultValue={providerInfo?.username}
                      />

                    </Col>
                  </FormGroup>

                  <FormGroup row>
                  <Col md="2">
                 <i id="addressLineTooltip" className="fas fa-info-circle menuIcon"></i>
                    <span className="pl-2">Address Line </span>
                  </Col>

                  <UncontrolledTooltip
                  placement="top"
                  target="addressLineTooltip"

                >
                  Address Line
                </UncontrolledTooltip>
                

                  <Col md="10" lg="6">
                    <Input
                      type="text"
                      name="addressLine"
                      id="addressLine"
                      placeholder="Enter Address Line"
                      required
                      defaultValue={providerInfo?.addressLine}
                    />

                  </Col>
                </FormGroup>

                
                 

                  <FormGroup row>
                    <Col md="2">
                    <i id="typeTooltip" className="fas fa-info-circle menuIcon"></i>
                      <span className="pl-2">Provider Type</span>
                    </Col>
                   
                    <UncontrolledTooltip
                    placement="top"
                    target="typeTooltip"

                  >
                    Your Provider Type
                  </UncontrolledTooltip>

                    <Col md="10" lg="6">
                    <Select 
                            options = {providerMenu}
                           value={{ label: providerTypeLabel, value: providerTypeValue }}
                           onChange={opt => selectProviderType(opt.label, opt.value)}
                           name="providerTypeId"
                           id="providerTypeId"
                           required
                          
                           />

                    </Col>
                  </FormGroup>

                  <FormGroup row>
                  <Col md="2">
                  <i id="logoTooltip" className="fas fa-info-circle menuIcon"></i>
                    <span className="pl-2"> Provider Logo</span>
                  </Col>
                 
                  <UncontrolledTooltip
                  placement="top"
                  target="logoTooltip"

                >
                 Provider Logo
                </UncontrolledTooltip>

                  <Col md="10" lg="6">
                   <div className='d-flex'>
                  {
                    providerInfo?.providerLogoMedia?.thumbnailUrl !== null ?
                    <div className='mr-2'>
                    <Image
                  width={104} height={104}
                  src={rootUrl+providerInfo?.providerLogoMedia?.thumbnailUrl} />
                    </div>
                    :
                    null
                  }
                  <div className='ms-2'>
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

                <FormGroup row
                  className="has-icon-left position-relative"
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "end",
                  }}
                  >
                  
                  <Col md="5">
                   {
                    permissions?.includes(permissionList?.Update_Provider) ?
                     <ButtonForFunction 
                     type={"submit"}
                     className={"ms-lg-3 ms-sm-1 badge-primary"}
                     name={"Submit"}
                     disable={buttonStatus}
                     
                   />
                   :
                   null
                   }
                  </Col>

                </FormGroup>

                  

              </form>
              </CardBody>
              </Card>

            
        </div>
    );
};

export default UpdateProvider;