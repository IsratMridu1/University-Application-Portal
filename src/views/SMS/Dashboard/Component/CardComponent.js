import React from 'react';
import { Link } from 'react-router-dom';

const CardComponent = (props) => {

    const {style, icon, title, link, count} = props
    return (
        <Link to={link} style={{textDecoration: 'none'}}>
                <div className={`${style} uapp-card`}>
                  <div className='card-body'>
                  <p>  <span> {icon} </span> {count}</p>
                    <h5> {title} </h5>
                  </div>
                </div>
        </Link>
    );
};

export default CardComponent;