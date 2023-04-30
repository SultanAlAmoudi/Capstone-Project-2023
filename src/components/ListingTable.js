import React, { useState } from 'react';
/* import PropTypes from 'utils/propTypes'; */
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Row,
  Col,
  Container,
  Label,
  Card,
  CardBody,
  /*   CardTitle, */
  CardHeader,
  Media,
} from 'reactstrap';

import Avatar from 'components/Avatar';

import withBadge from 'hocs/withBadge';

const AvatarWithBadge = withBadge({
  position: 'bottom-right',
  color: 'danger',
})(Avatar);

const ListingTable = ({ headers, RequestData, ...restProps }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [modalData, setModalData] = useState({});

  return (
    <Table responsive hover {...restProps}>
      <thead>
        <tr className="text-capitalize align-middle text-center">
          {headers.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {RequestData.map(({ avatar, car, jop, make, DateCreate }, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              <AvatarWithBadge src={avatar} />
            </td>
            <td className="align-middle text-center">{car}</td>
            <td className="align-middle text-center">{make}</td>
            <td className="align-middle text-center">{jop}</td>
            <td className="align-middle text-center">{DateCreate}</td>
            <td className="align-middle text-center">
              <Button
                color="primary"
                onClick={() => {
                  toggle();
                  setModalData(RequestData[index]);
                }}
              >
                Show Details
              </Button>
            </td>
          </tr>
        ))}
        <Modal size="lg" isOpen={modal} toggle={() => toggle()}>
          <ModalHeader toggle={() => toggle()}>Username Request</ModalHeader>
          <ModalBody>
            <Container fluid>
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      <Label>Automobile Name : {modalData.car}</Label>
                      <br />
                      <Label>Automobile Maker : {modalData.make}</Label>
                      <br />
                      <Label>Jop/Issue description : </Label>
                      <br />
                      <Label>Jop Type : {modalData.jop}</Label>
                      <br />
                    </Col>

                    <Col>
                      <Label>Image of the Issue/Cause : </Label>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <br />
              <Row>
                <Col>
                  <Card>
                    <CardHeader>Offers</CardHeader>
                    <CardBody>
                      <Media className="m-2">
                        <Media left className="mr-2">
                          <AvatarWithBadge src={modalData.avatar} />
                        </Media>
                        <Media body>
                          <Media heading tag="h6" className="m-0">
                            The best mechannic
                          </Media>
                          <p className="text-muted m-0">
                            <small>3 hour ago</small>
                          </p>
                        </Media>
                        <Media right className="align-self-center">
                          38.00$
                        </Media>
                      </Media>
                      <Media>
                        <p className="text-dark">Describing my offer top you</p>
                      </Media>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => toggle()}>
              Do Something
            </Button>
            <Button color="secondary" onClick={() => toggle()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </tbody>
    </Table>
  );
};

/* 
ListingTable.propTypes = {
  headers: PropTypes.node,
  RequestData: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string,
      car: PropTypes.string,
      DateCreate: PropTypes.number,
      make: PropTypes.string,
    }),
  ),
}; */

ListingTable.defaultProps = {
  headers: [],
  RequestData: [],
};

export default ListingTable;
