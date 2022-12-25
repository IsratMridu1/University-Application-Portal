import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const LinkButton = (props) => {
    const {url, color, className, icon, permission, name, func,target, activeStyle} = props;

    const data = [1,2,3,4,6];

    
    return (
        <>


        <Link to={url} activeStyle ={activeStyle} target={target}>
       
            <Button color={color} className={className} onClick={func}>
               {icon} {name}
            </Button>
         
        </Link>
        
            
        </>
    );
};

export default LinkButton;