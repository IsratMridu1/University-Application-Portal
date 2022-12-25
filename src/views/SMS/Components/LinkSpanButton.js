import React from 'react';
import { Link } from 'react-router-dom';

const LinkSpanButton = (props) => {
    const {style, url, className, icon, permission, name, data} = props;
    

    const datass = [1,2,3,4,6];

    return (
        <>
          {
            datass?.includes(permission) ?
            <Link style={style} className={className} to={url}>
                <span>
                   {data}
                </span>
            </Link>
            :
            null
          }
        </>
    );
};

export default LinkSpanButton;