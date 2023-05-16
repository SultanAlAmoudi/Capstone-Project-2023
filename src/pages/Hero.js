import React from 'react';
import {
  Container,
  Row,
  Col,
  CardTitle,
  Card,
  CardBody,
  CardText,
  Button,
} from 'reactstrap';
import landingIMG from 'assets/img/Landing.jpg';
import Page from '../components/Page';
import Typography from '../components/Typography';
import { withRouter } from 'react-router';

const Hero = ({ history }) => {
  const handleLogin = event => {
    event.preventDefault();
    history.push('/login');
  };
  return (
    <section className="section position-relative">
      <Page title="Home Page">
        <Container>
          <Card>
            <CardBody>
              <Row className="align-items-center">
                <Col lg={6}>
                  <div className="pr-lg-5">
                    <CardTitle className="text-uppercase text-primary font-weight-medium f-14 mb-4">
                      Welcome to Car Lancer
                    </CardTitle>
                    <CardText>
                      <Typography
                        tag="h1"
                        className="mb-4 font-weight-normal line-height-1_4"
                      >
                        Fix your cars from the comfort of your home
                      </Typography>
                      <Typography className="text-muted mb-4 pb-2">
                        We and our Freelancers will provide you all the services
                        your car needs, from the comfort of staying at your home
                      </Typography>
                      <Button
                        color="primary"
                        onClick={e => {
                          handleLogin(e);
                        }}
                      >
                        Get Started
                      </Button>
                    </CardText>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mt-5 mt-lg-0">
                    <img
                      src={landingIMG}
                      alt=""
                      className="img-fluid mx-auto d-block"
                    />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </Page>
    </section>
  );
};
export default withRouter(Hero);
