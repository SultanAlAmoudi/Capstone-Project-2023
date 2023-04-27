import React from 'react';
import Page from '../components/Page';
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
} from 'reactstrap';
import ListingTable from '../components/ListingTable';
import { MdPersonPin } from 'react-icons/md';
import { RequestData } from '../demos/Mock';

const PublicRequests = () => {
  return (
    <Page
      title="Public Jop Listings"
      breadcrumbs={[{ name: 'listings', active: true }]}
    >
      <Container fluid>
        <Card>
          <CardBody>
            <Row>
              <Col>
                <Form
                  className="cr-search-form"
                  onSubmit={e => e.preventDefault()}
                >
                  <Row>
                    <Col>
                      <Label> Filter Options </Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label> Jop Type </Label>
                      <Input type="select" placeholder="Jop">
                        <option>Jop Type...</option>
                        <option>...</option>
                      </Input>
                    </Col>
                    <Col>
                      <Label> Automobile </Label>
                      <Input type="select" placeholder="Automobile">
                        <option>Automobile...</option>
                        <option>...</option>
                      </Input>
                    </Col>
                    <Col>
                      <Label> Automobile Maker </Label>
                      <Input type="select" placeholder="Maker">
                        <option>Maker...</option>
                        <option>...</option>
                      </Input>
                    </Col>
                    <Col>
                      <Label> Listing Creation Date </Label>
                      <Input type="select" placeholder="Sort By...">
                        <option>Sort By...</option>
                        <option>...</option>
                      </Input>
                    </Col>
                  </Row>
                </Form>
                <br />
                <ListingTable
                  headers={[
                    <MdPersonPin size={25} />,
                    'Car',
                    'Make',
                    'Jop',
                    'Created At',
                    '',
                  ]}
                  RequestData={RequestData}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </Page>
  );
};

export default PublicRequests;
