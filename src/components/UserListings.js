import React from 'react';
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
  Card,
  CardBody,
  CardText,
  /*   CardTitle, */
  CardHeader,
} from 'reactstrap';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import OffersUiAccept from '../utils/OffersUiAccept';

import Typography from './Typography';

class UserListings extends React.Component {
  state = {
    modal: false,
    modalData: {},
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  setModalData = data => {
    this.setState({
      modalData: data,
    });
  };

  render() {
    const { headers, RequestData, loggedInHanndle, ...restProps } = this.props;
    dayjs.extend(relativeTime);
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
          {RequestData.map(
            (
              {
                offerCount,
                car,
                type,
                make,
                createdAt,
                offerAccepted,
                ...rest
              },
              index,
            ) => (
              <tr key={index}>
                <td className="align-middle text-center">{car}</td>
                <td className="align-middle text-center">{make}</td>
                <td className="align-middle text-center">{type}</td>
                <td className="align-middle text-center">{offerCount}</td>
                <td className="align-middle text-center">
                  {dayjs(createdAt).fromNow(true)}
                </td>
                <td className="align-middle text-center">
                  {offerAccepted && (
                    <h7 className="text-money">Offer Accepted</h7>
                  )}
                  {!offerAccepted && (
                    <h7 className="text-secondary">Request Listed</h7>
                  )}
                </td>

                <td className="align-middle text-center">
                  <Button
                    color="primary"
                    onClick={() => {
                      this.toggle();
                      this.setModalData(RequestData[index]);
                    }}
                  >
                    Show Details
                  </Button>
                </td>
              </tr>
            ),
          )}
          <Modal
            size="xl"
            isOpen={this.state.modal}
            toggle={() => this.toggle()}
          >
            <ModalHeader toggle={() => this.toggle()}>
              {this.state.modalData.userHandle} Request
            </ModalHeader>
            <ModalBody>
              <Container fluid>
                <Card>
                  <CardBody>
                    <Row>
                      <Col sm="3">
                        <CardText className="text-secondary">
                          Automobile Name :
                        </CardText>
                      </Col>
                      <Col sm="9">
                        <CardText className="text-dark">
                          {this.state.modalData.car}
                        </CardText>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col sm="3">
                        <CardText className="text-secondary">
                          Automobile Maker :
                        </CardText>
                      </Col>
                      <Col sm="9">
                        <CardText className="text-dark">
                          {this.state.modalData.make}
                        </CardText>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col sm="3">
                        <CardText className="text-secondary">
                          Jop/Issue description :
                        </CardText>
                      </Col>
                      <Col sm="9">
                        <CardText className="text-dark">
                          {this.state.modalData.description}
                        </CardText>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col sm="3">
                        <CardText className="text-secondary">
                          Jop Type :
                        </CardText>
                      </Col>
                      <Col sm="9">
                        <CardText className="text-dark">
                          {this.state.modalData.type}
                        </CardText>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                {/* <Card>
                  <CardBody>
                    <Row>
                      <Col>
                        <Label className="text-secondary">
                          Automobile Name :
                        </Label>
                        <br />
                        {this.state.modalData.car}
                        <br />
                        <Label>
                          Automobile Maker : {this.state.modalData.make}
                        </Label>
                        <br />
                        <Label>
                          Jop/Issue description :{' '}
                          {this.state.modalData.description}
                        </Label>
                        <br />
                        <Label>Jop Type : {this.state.modalData.type}</Label>
                        <br />
                      </Col>

                      <Col>
                        <Label>Image of the Issue/Cause : </Label>
                      </Col>
                    </Row>
                  </CardBody>
                </Card> */}
                <br />
                <Row>
                  <Col>
                    <Card>
                      <CardHeader>Offers</CardHeader>
                      <CardBody>
                        {console.log(this.state.modalData)}
                        <OffersUiAccept
                          hasAccepted={this.state.modalData.offerAccepted}
                          requestId={this.state.modalData.requestId}
                        />
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.toggle()}>
                Do Something
              </Button>
              <Button color="secondary" onClick={() => this.toggle()}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </tbody>
      </Table>
    );
  }
}
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

UserListings.defaultProps = {
  headers: [],
  RequestData: [],
};

export default UserListings;
