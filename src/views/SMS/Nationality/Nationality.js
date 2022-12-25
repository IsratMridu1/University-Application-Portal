import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, ButtonGroup, Card, CardBody, CardHeader, Col, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table, Form } from 'reactstrap';
import { useToasts } from "react-toast-notifications";
import get from '../../../helpers/get';
import post from '../../../helpers/post';
import remove from '../../../helpers/remove';
import put from '../../../helpers/put';
import Loader from '../Search/Loader/Loader';
import { Upload, Modal as AntdModal } from "antd";
import "antd/dist/antd.css";
import * as Icon from "react-feather";
import { Image } from "antd";

const Nationality = () => {

    const history = useHistory();
    const [modalOpen, setModalOpen] = useState(false);
    const [exelModalOpen, setExelModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [countryList, setCountryList] = useState([]);
    const {addToast} = useToasts();
    const [success,setSuccess] = useState(false);
    const [data,setData] = useState({});
    const [delData, setDelData] = useState({});
    const [loading,setLoading] = useState(true);
    const [buttonStatus,setButtonStatus] = useState(false);

    // file upload
    const [FileList1, setFileList1] = useState([]);
    const [uploadError, setUploadError] = useState(false);
    const [previewVisible1, setPreviewVisible1] = useState(false);
    const [previewImage1, setPreviewImage1] = useState("");
    const [previewTitle1, setPreviewTitle1] = useState("");

    const handleChange1 = ({ fileList }) => {
      setUploadError(false);
      setFileList1(fileList);
      console.log(fileList);
    };
  
    function getBase641(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    }
  
    const handleCancel1 = () => {
      setPreviewVisible1(false);
    };
  
    const handlePreview1 = async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase641(file.originFileObj);
      }
  
      setPreviewImage1(file.url || file.preview);
      setPreviewVisible1(true);
      setPreviewTitle1(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
    };


    const backToDashboard = () => {
        history.push('/');
    }

    useEffect(()=>{
        get('Nationality/Index')
        .then(res => {
            console.log(res);
            setCountryList(res);
            setLoading(false);
        })
    },[success])

    // on Close Modal
   const closeModal = () => {
    setData({});
    setModalOpen(false);
 
  }

    // on Close Modal
   const closeExelModal = () => {
    setExelModalOpen(false);
  }

  const toggleDeleteModal = (data) => {

    setDelData(data);
    console.log(data);
    setDeleteModal(true);

  }


  const deleteConfirm = () => {
    setButtonStatus(true);
    remove(`Nationality/Delete/${delData?.id}`)
    .then(res => {
      setButtonStatus(false);
        addToast(res,{
            appearance: 'error',
            autoDismiss: true
        })
        setDelData({});
        setSuccess(!success);
        setDeleteModal(false);
    })
  }
 

    const AddModalOpen= () => {
  
      
      setModalOpen(true);

    }

    const AddExelModalOpen = () => {
  
      
      setExelModalOpen(true);

    }

    const handleAddCountry  = (e) => {
        e.preventDefault();
        const subdata = new FormData(e.target);

        if(data?.id){
          setButtonStatus(true);
            put('Nationality/Update',subdata)
            .then(res => {
              setButtonStatus(false);
               if(res?.status ==200){
                console.log(res?.data?.message);
                addToast(res?.data?.message,{
                    appearance: 'success',
                    autoDismiss: true
                })
                setData({});
               setSuccess(!success);
                setModalOpen(false);
               }
    
            })
        }
        else{
          setButtonStatus(true);
            post('Nationality/Create',subdata)
        .then(res => {
          setButtonStatus(false);
            if(res?.status == 200 && res?.data?.isSuccess == true){
                console.log(res?.data?.message);
            addToast(res?.data?.message,{
                appearance: 'success',
                autoDismiss: true
            })
           setSuccess(!success);
            setModalOpen(false);
            }
            else{
              addToast(res?.data?.message, {
                appearance: "error",
                autoDismiss: true,
              });
            }

        })
        }


    }

    const handleUpdateCountry = (data) => {
        setData(data);
        setModalOpen(true);
    }

    const handleAddExelFile = (event) => {
      event.preventDefault();

      const subData = new FormData(event.target);
  
      subData.append(
        "nationalityFile",
        FileList1.length == 0 ? null : FileList1[0]?.originFileObj
      );
  
      for (var i of subData) {
        console.log(i);
      }
  
      if (FileList1.length < 1) {
        setUploadError(true);
      }
      else {
        setButtonStatus(true);
        post("Nationality/CreateFromExcel", subData).then((res) => {
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            // history.push('/addUniversityRequiredDocument');
            setSuccess(!success);
            setFileList1([]);
            setExelModalOpen(false);
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    }


    return (
        <div>
             {
              loading?
              <Loader/>
              :
              <div>
                <Card className="uapp-card-bg">
              <CardHeader className="page-header">
                <h3 className="text-white">Nationality List</h3>
                <div className="page-header-back-to-home">
                  <span onClick={backToDashboard} className="text-white">
                    {" "}
                    <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
                  </span>
                </div>
              </CardHeader>
            </Card>

            <Card>
            <CardHeader>
       
            <div>
              <Button className="btn btn-uapp-add mr-2" onClick={()=>AddModalOpen('add')} > <i className="fas fa-plus"></i>  Add New Nationality</Button>
              <Button className="btn btn-uapp-add" onClick={()=>AddExelModalOpen()} > <i className="fas fa-plus"></i>  Add New Nationality From Excel</Button>
            </div>
            
                  <div> <b> Total <span className="badge badge-primary">{countryList.length} </span> Nationalities  Found </b></div>
            </CardHeader>
             <CardBody>

             <div>

              {/* exel modal starts here */}
              <Modal isOpen={exelModalOpen} toggle={closeExelModal} className="uapp-modal">
                      <ModalHeader>Nationality </ModalHeader>
                      <ModalBody>
                        <Form onSubmit={handleAddExelFile} >

                        <FormGroup row className="has-icon-left position-relative">
                    <Col md="4">
                      <span> Upload Excel File <span className="text-danger">*</span>{" "}</span>
                    </Col>
                    <Col md="8">
                    {/* <div className="row"> */}
                      {/* <span className="mb-2">Upload Document</span> */}

                      {/* {applicationObject?.document ? (
                            <div className="col-md-3">
                              <Image
                                width={104}
                                height={104}
                                src={
                                  rootUrl + applicationObject?.document?.thumbnailUrl
                                }
                              />
                            </div>
                          ) : null} */}


                      {/* <div className="col-md-3"> */}
                        <Upload
                          accept=".xlsx, .xls"
                          listType="picture-card"
                          multiple={false}
                          fileList={FileList1}
                          onPreview={handlePreview1}
                          onChange={handleChange1}
                          beforeUpload={(file) => {
                            return false;
                          }}
                        >
                          {FileList1.length < 1 ? (
                            <div
                              className="text-danger"
                              style={{ marginTop: 8 }}
                            >
                              <Icon.Upload />
                              <br />
                              <span>Upload Here</span>
                            </div>
                          ) : (
                            ""
                          )}
                        </Upload>
                        <AntdModal
                          visible={previewVisible1}
                          title={previewTitle1}
                          footer={null}
                          onCancel={handleCancel1}
                        >
                          <img
                            alt="example"
                            style={{ width: "100%" }}
                            src={previewImage1}
                          />
                        </AntdModal>
                      {/* </div> */}
                    {/* </div> */}

                    {uploadError && (
                      <span className="text-danger">
                        Excel file is required
                      </span>
                    )}
                  </Col>
                </FormGroup>
                              
                              
                              
                              
                          <FormGroup className="has-icon-left position-relative" style={{ display: 'flex', justifyContent: 'space-between' }}>
                              
                            <Button color="danger" className="mr-1 mt-3" onClick={closeExelModal}>Close</Button>
                              
                              
                              <Button
                                color="primary"
                                type="submit"
                                className="mr-1 mt-3"
                               disabled={buttonStatus}
                              >
                                Submit
                              </Button>
                              
                              
                              
                          </FormGroup>
                              
                        </Form>
                      </ModalBody>
                              
                  </Modal>
              {/* exel modal ends here */}

<Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal">
  <ModalHeader>Nationality </ModalHeader>
  <ModalBody>
    <Form onSubmit={handleAddCountry} >
     
      <FormGroup row className="has-icon-left position-relative">
        <Col md="4">
          <span> Name <span className="text-danger">*</span>{" "}</span>
        </Col>
        <Col md="8">

           
            {
                (data?.id) ?

                <input
                type='hidden'
                name='id'
                id='id'
                value={data?.id}
                />
                :
                null
            }

          <Input
            type="text"
            name="name"
            id="name"
            defaultValue={data?.name}
            required
            placeholder="Enter Nationality"
          />

        </Col>
      </FormGroup>

     
     

      <FormGroup className="has-icon-left position-relative" style={{ display: 'flex', justifyContent: 'space-between' }}>

        <Button color="danger" className="mr-1 mt-3" onClick={closeModal}>Close</Button>

   
          <Button
            color="primary"
            type="submit"
            className="mr-1 mt-3"
           disabled={buttonStatus}
          >
            Submit
          </Button>

      

      </FormGroup>

    </Form>
  </ModalBody>

</Modal>
<div>

</div>
</div>


<div className="table-responsive">
          <Table className="table-sm table-bordered text-center" >
          <thead className="thead-uapp-bg">
              <tr style={{ textAlign: "center" }}>
                <th>SL/NO</th>
                <th> Name</th>
          
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                countryList.map((list,index) =><tr key={index}
                list ={list}
                >
                  
                  <td>{index+1}</td>
                  <td>{list?.name}</td>
              
                  <td>
                  <ButtonGroup variant="text">

                            {/* <Button  color="danger" onClick={()=>handleDelete(dept?.id)}   className="mr-2 btn-sm"><i className="fas fa-trash-alt"></i></Button> */}
                          
                      
                       
                      
                         <Button color="warning" onClick={()=> handleUpdateCountry(list)}    className=" btn-sm"> <i className="fas fa-edit"></i> </Button>

                         <Button className="btn-sm mx-2" onClick={()=>toggleDeleteModal(list)}  color="danger"><i className="fas fa-trash-alt"></i></Button>
                       
                          
                          </ButtonGroup>

                  {/* modal for delete */}
                  <Modal isOpen={deleteModal}  className="uapp-modal">

                      <ModalBody>
                        <p>Are You Sure to Delete this ? Once Deleted it can't be Undone!</p>
                      </ModalBody>

                      <ModalFooter>
                        <Button color="danger" onClick={deleteConfirm} disabled={buttonStatus} >YES</Button>
                        <Button >NO</Button>
                      </ModalFooter>

                  </Modal>


                  </td>
                    
                




                </tr>)
              }

              

            </tbody>
          </Table>
          </div>

         </CardBody>
      </Card>
              </div>
             }
            
        </div>
    );
};

export default Nationality;