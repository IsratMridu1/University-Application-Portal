import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import UappImage from '../../../../assets/img/UappLogo.png'

const SessionExpired = () => {

    const history = useHistory();

    const redirectToLoginPage = () => {
        history.push('/');
    }

    useEffect(()=>{
        localStorage.clear();
    },[])

    return (
        <div className='session-out-bg'>
        <div className='w-75 mx-auto'>


            <div className='d-flex justify-content-between position-session-page'>
                <div>
                    <h1 style={{color: '#1e98b0', fontSize: '50px'}}>Session Expired</h1>
                    <p style={{color: '#1e98b0', fontSize: '18px', fontWeight: '500', lineHeight: '20px'}}>Your Session Validity is Expired. <br/> To Continue, Please Login Again.</p>

                    <Button.Ripple color='primary' className='fw-bold' onClick={redirectToLoginPage}>

                        Take me to login
                    </Button.Ripple>

                </div>

               

                <div>
                    <img src={UappImage} style={{height: '100px'}}/>



                </div>

            </div>

            </div>
            
        </div>
    );
};

export default SessionExpired;