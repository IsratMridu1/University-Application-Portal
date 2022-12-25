import React from 'react';
import { Link } from 'react-router-dom';

const GetShow = (props) => {
    const {id,name} = props.item;

    const handleUpdate = (data) => {
      
    }
    return (
        <>

<tr>
        <th scope="row">{id}</th>
        <td>{name}</td>
        <td>
           <Link to={`/update/${id}`}>
           <button  className='btn btn-primary mx-2'>Update</button>
           </Link>
           <Link to={`/delete/${id}`}>
           <button className='btn btn-danger mx-2'>Delete</button>
           </Link>
        </td>
        
      </tr>
            
        </>
    );
};

export default GetShow;