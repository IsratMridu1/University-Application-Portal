import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardTitle,  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Col, Row, InputGroup, Table } from 'reactstrap';
import get from '../../helpers/get';
import remove from '../../helpers/remove';

const AdmissionGetData = () => {

    const [datas, setData] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(()=>{
        get(`Practice/GetAll`)
        .then(res => setData(res));
    }, [datas]);


    const handleDeleteUser = (id) => {
        const result = window.confirm('Are You Sure You Want To Delete?');
        if(result){
            remove(`Practice/Delete/${id}`).then(res => {
                alert('User Deleted Successfully');
                const restUser = allUsers.filter(user => user.id !== id);
                setAllUsers(restUser);
            });
        }
    }

    return (
        <div>
            <h1>Getting Data</h1>
            <div className="table-responsive">
          <Table className="table-bordered text-center" >
          <thead >
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              {
                datas?.map((data, i) => <tr key={data.id}>
                  <th scope="row">{i + 1}</th>
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  {/* <td className="text-center" >               
                    <span className="badge badge-pill badge-primary"> {role.countPermissions} </span>
                  </td> */}
                  <td>
                    <Button className="mx-2" onClick={() => handleDeleteUser(data.id)} color="danger"><i className="fas fa-trash-alt"></i></Button>
                    <Link to={`/updateUser/${data.id}`}>
                        <Button className="mx-2" color="warning"><i className="fas fa-edit"></i></Button>
                    </Link>
                  </td>
                </tr>)
              }

            </tbody>
          </Table>
          </div>
        </div>
    );
};

export default AdmissionGetData;