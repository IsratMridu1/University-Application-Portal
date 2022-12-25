import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Card, CardBody, CardHeader, Nav, NavItem, NavLink, TabContent, TabPane,Form, Label, FormGroup, Col, Input, Button } from 'reactstrap';
import get from '../../../../helpers/get';
import { useToasts } from "react-toast-notifications";
import post from '../../../../helpers/post';
import put from '../../../../helpers/put';
import ButtonForFunction from '../../Components/ButtonForFunction';

const StudentOtherInformationForm = () => {

    const styleLabelBold = {
        // fontWeight: "bold"
      };
      const {idVal} = useParams();
     const history = useHistory();

    const [disability, setDisability] = useState(false);

    const [crime, setCrime] = useState(false);

    const [id, setId] = useState(0);

    const [activetab, setActivetab] = useState("9");

    const {addToast} = useToasts();

    const [data, setData] = useState({});
    const [buttonStatus,setButtonStatus] = useState(false);

    const handleOtherInformation = (event) => {

        event.preventDefault();

        const subData = new FormData(event.target);
          setButtonStatus(true);
        post('OtherInformation/Create', subData)
        .then(res => {
          setButtonStatus(false);
          if(res?.status == 200 && res?.data?.isSuccess == true){
            addToast(res?.data?.message,{
              appearance:'success',
              autoDismiss:true
            })
            history.push(`/studentDeclarations/${idVal}`);

          }
        })

      
      }

      const handleDisability = (event) => {
        console.log(event.target.value);
        setDisability(event.target.value);
    }



      const handleCrime = (event) => {
        console.log(event.target.value);
        setCrime(event.target.value);
    }


    return (
       <div>

        <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Other Information</h3>
          <div className="page-header-back-to-home">
            <span className="text-white" >
              {" "}
              74% Completed
            </span>
          </div>
        </CardHeader>
      </Card>

      <Card>
      <CardBody>
     

          <Form onSubmit={handleOtherInformation} className="mt-5">

               
          <input 
          type='hidden'
          name='studentId'
          id='studentId'
          value={idVal}
          />

          <FormGroup row className="has-icon-left position-relative">
          <Col md="2">
            <span>
              Have Disability? <span className="text-danger">*</span>{" "}
            </span>
          </Col>
          <Col md="6">

          
          <FormGroup check inline>
          <Input className="form-check-input" type="radio" id="isHaveDisability" onChange={handleDisability} name="isHaveDisability" value='true' checked={disability == 'true'} />
          <Label className="form-check-label" check htmlFor="isHaveDisability" style={styleLabelBold}>Yes</Label>

          </FormGroup>

          <FormGroup check inline>
          <Input className="form-check-input" type="radio" id="isHaveDisability" onChange={handleDisability} name="isHaveDisability" value='false' checked={disability == 'false'} />
          <Label className="form-check-label" check htmlFor="isHaveDisability" style={styleLabelBold}>No</Label>

          </FormGroup>



          
          </Col>
        </FormGroup>

        
        
          {

            disability === 'true' ? 

            <FormGroup row className="has-icon-left position-relative">
            <Col md="2">
            <span>
               Disability Description <span className="text-danger">*</span>{" "}
            </span>
          </Col>
          <Col md="6">
      
  
          <Input type="textarea" name='DisabilityDescription' id='DisabilityDescription' rows={4}
          
          required
          />

  
        </Col>
  
  
          </FormGroup>

          :

          null


          }
        

        


          <FormGroup row className="has-icon-left position-relative">
          <Col md="2">
            <span>
              Have Criminal Convictions? <span className="text-danger">*</span>{" "}
            </span>
          </Col>
          <Col md="6">

          
          <FormGroup check inline>
          <Input className="form-check-input" type="radio" id="isHaveCriminalConvictions" onChange={handleCrime} name="isHaveCriminalConvictions" value='true' checked={crime == 'true'} />
          <Label className="form-check-label" check htmlFor="isHaveCriminalConvictions" style={styleLabelBold}>Yes</Label>

          </FormGroup>

          <FormGroup check inline>
          <Input className="form-check-input" type="radio" id="isHaveCriminalConvictions" onChange={handleCrime} name="isHaveCriminalConvictions" value='false' checked={crime == 'false'} />
          <Label className="form-check-label" check htmlFor="isHaveCriminalConvictions" style={styleLabelBold}>No</Label>

          </FormGroup>



          
          </Col>
        </FormGroup>

      {
         crime === 'true' ?

         <FormGroup row className="has-icon-left position-relative">
         <Col md="2">
         <span>
            Criminal convictions Description <span className="text-danger">*</span>{" "}
         </span>
       </Col>
       <Col md="6">
   
 
       <Input type="textarea" name='CriminalConvictionsDescription' id='CriminalConvictionsDescription' rows={4}  required  />
 
 
     </Col>
 
 
       </FormGroup>

       :

       null


      }

     <div className='row'>

        <div className='col-md-8 d-flex justify-content-end'>
        <ButtonForFunction
        name={'Save & Next'}
        className={"mt-3 badge-primary"}
        type={'submit'}
        disable={buttonStatus}
        />

        </div>

     </div>

      </Form>
     
      </CardBody>
    </Card>
            
        </div>
    );
};

export default StudentOtherInformationForm;