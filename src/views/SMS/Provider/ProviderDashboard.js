import React from 'react';
import { useParams } from 'react-router-dom';

const ProviderDashboard = () => {

    const {id} = useParams();

    return (
        <div className='mt-5 text-center'>
            <h1>{id}</h1>

            
        </div>
    );
};

export default ProviderDashboard;