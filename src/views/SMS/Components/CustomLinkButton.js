import React from 'react';
import { Link } from 'react-router-dom';

const CustomLinkButton = (props) => {
    const {url, color, className, icon, permission, name, func,target, activeStyle} = props;
    return (
        <>
            <Link to={url} activeStyle ={activeStyle} target={target}>
       
                <button color={color} className={className} onClick={func}>
                    {icon} {name}
                </button>
                
            </Link> 
        </>
    );
};

export default CustomLinkButton;