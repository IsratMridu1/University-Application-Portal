import React from 'react';
import { Card, CardBody, Button, Row, Col } from "reactstrap"
import errorImg from "../../../../assets/img/pages/bad.jpg"

const Error400 = () => {
    return (
        <div>
             <Row className="m-0" style={{height: '100vh'}}>
        <Col sm="12">
          <Card className="auth-card bg-transparent shadow-none rounded-0 mb-0 w-100">
            <CardBody className="text-center bg-white">
              <img
                src={errorImg}
                alt="ErrorImg"
                className="align-self-center"
                height={300}
              />
              <h1 className="font-large-2 my-1">404 - Page Not Found!</h1>
              <p className="pt-2 mb-0">
                paraphonic unassessable foramination Caulopteris worral
                Spirophyton encrimson esparcet aggerate chondrule restate
                whistler shallopy
              </p>
              <p className="pb-2">
                biosystematy area bertram plotting unstarting quarterstaff.
              </p>
              <Button.Ripple
                tag="a"
                href="/"
                color="primary"
                size="lg"
                className="mt-2"
              >
                Back to Home
              </Button.Ripple>
            </CardBody>
          </Card>
        </Col>
      </Row>
            
        </div>
    );
};

export default Error400;