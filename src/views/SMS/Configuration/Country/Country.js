import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, ButtonGroup, Card, CardBody, CardHeader, Col, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Table, Form } from 'reactstrap';
import get from '../../../../helpers/get';
import post from '../../../../helpers/post';
import { useToasts } from "react-toast-notifications";


const Country = () => {

    const history = useHistory();
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [countryList, setCountryList] = useState([]);

    const {addToast} = useToasts();

    useEffect(()=>{
        get('Country/Index')
        .then(res => {
           
            setCountryList(res);
        })
    },[])

    // on Close Modal
   const closeModal = () => {
    setModalOpen(false);
 
  }


    const backToDashboard = () => {
        history.push('/');
    }

    const AddModalOpen= () => {
  
      
      setModalOpen(true);

    }

    const handleAddCountry  = (e) => {
        e.preventDefault();
        const subdata = new FormData(e.target);

        post('Country/Create',subdata)
        .then(res => {
            
            addToast(res?.data?.message,{
                appearance: 'success',
                autoDismiss: true
            })
            get('Country/Index')
            .then(res => {
               
                setCountryList(res);
            })
            setModalOpen(false);

        })


    }

    const handleUpdateCountry = () => {
        setModalOpen(true);
    }
    

    return (
        <div>

             <Card className="uapp-card-bg">
              <CardHeader className="page-header">
                <h3 className="text-white">Country List</h3>
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
       
            <Button className="btn btn-uapp-add" onClick={()=>AddModalOpen('add')} > <i className="fas fa-plus"></i>  Add New Country</Button>
                  <div> <b> Total <span className="badge badge-primary">{countryList.length} </span> Countries  Found </b></div>
            </CardHeader>
             <CardBody>

             <div>

<Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal">
  <ModalHeader>Add Country </ModalHeader>
  <ModalBody>
    <Form onSubmit={handleAddCountry} >
     
      <FormGroup row className="has-icon-left position-relative">
        <Col md="4">
          <span>Country Name</span>
        </Col>
        <Col md="8">

           


          <Input
            type="text"
            name="name"
            id="name"
           
          
            placeholder="Enter Country Name"
          />

        </Col>
      </FormGroup>

      <FormGroup row className="has-icon-left position-relative">
        <Col md="4">
          <span>Country Code</span>
        </Col>
        <Col md="8">

           


          <Input
            type="text"
            name="code"
            id="code"
           
          
            placeholder="Enter Country Code"
          />

        </Col>
      </FormGroup>
     

      <FormGroup className="has-icon-left position-relative" style={{ display: 'flex', justifyContent: 'space-between' }}>

        <Button color="danger" className="mr-1 mt-3" onClick={closeModal}>Close</Button>

   
          <Button.Ripple
            color="primary"
            type="submit"
            className="mr-1 mt-3"
           
          >
            Submit
          </Button.Ripple>

      

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
                <th> Code</th>
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
                  <td>{list?.code}</td>
                  <td>
                  <ButtonGroup variant="text">

                            {/* <Button  color="danger" onClick={()=>handleDelete(dept?.id)}   className="mr-2 btn-sm"><i className="fas fa-trash-alt"></i></Button> */}
                          
                         <Button className="btn-sm mx-2"  color="danger"><i className="fas fa-trash-alt"></i></Button>
                       
                      
                         <Button color="warning" onClick={()=> handleUpdateCountry(list?.id)}    className=" btn-sm"> <i className="fas fa-edit"></i> </Button>
                       
                          
                          </ButtonGroup>

                  {/* modal for delete */}
                  <Modal isOpen={deleteModal}  className="uapp-modal">

                      <ModalBody>
                        <p>Are You Sure to Delete this {localStorage.getItem('depName')} ? Once Deleted it can't be Undone!</p>
                      </ModalBody>

                      <ModalFooter>
                        <Button color="danger" >YES</Button>
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
    );
};

export default Country;