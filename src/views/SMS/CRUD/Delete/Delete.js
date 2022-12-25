import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, CardBody, FormGroup, Input } from 'reactstrap';
import get from '../../../../helpers/get';
import post from '../../../../helpers/post';
import put from '../../../../helpers/put';

const Put = () => {
    const {id} = useParams();
    const [info, setinfo] = useState({});
    const url = `UniversityType/Get/${id}`; 
    const [userName, setUserName] = useState('');
   useEffect(()=>{
    get(url).then(res => {
        setinfo(res);
    })
    .catch()

   },[url])
    const urlInfo = `UniversityType/Delete/${id}`;

    const handleDelete = (e) =>{
        e.preventDefault();
        // const subData = new FormData(e.target);
        // post(urlInfo,subData).then(res => {
        //    
        // })
      Axios.delete(`https://192.168.0.123:45467/UniversityType/Delete/${id}`)
      .then()
      .catch()
    }
  

    return (
        <div>
            <Card>
        <CardBody>
          <form onSubmit={handleDelete}>
            <FormGroup row className="has-icon-left position-relative">
              <Input type="number" name="id" id="id" value={info?.id}  />
            </FormGroup>
            <FormGroup row className="has-icon-left position-relative">
              <Input type="text" name="name" id="name" value={info?.name}  />
            </FormGroup>
       
            <FormGroup
              className="has-icon-left position-relative"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button.Ripple type="submit" className="mr-1 mt-3 badge-primary">
                Delete
              </Button.Ripple>
            </FormGroup>
          </form>
        </CardBody>
      </Card>
            
        </div>
    );
};

export default Put;