import React from 'react';
import Page from '../components/Page';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';

const CreatePublicJop = () => {
  return (
    <Page
      title="Create New Jop"
      breadcrumbs={[{ name: 'Jop Form', active: true }]}
    >
      <Container fluid>
        <Card>
          <CardBody>
            <Row>
              <Col></Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </Page>
  );
};

export default CreatePublicJop;
