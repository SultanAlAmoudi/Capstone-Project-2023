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
  Label,
  Card,
  CardBody,
  CardText,
  /*   CardTitle, */
  CardHeader,
  Form,
  FormGroup,
  Input,
  FormFeedback,
  Spinner,
} from 'reactstrap';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import CurrencyInput from 'react-currency-input-field';

import Avatar from 'components/Avatar';
import OffersUi from '../utils/OffersUi';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { makeOffer } from '../redux/actions/dataActions';
import Typography from './Typography';

class ListingTable extends React.Component {
  state = {
    modal: false,
    offerModal: false,
    modalData: {},
    offerDescription: '',
    offerAmount: '',
    makeOfferNumber: 0,
    errors: {},
    loadingTimeout: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (typeof this.props.history.location.state != 'undefined')
      this.setState({
        offerModal: this.props.history.location.state.offerModal,
      });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const newOffer = {
      offerDescription: this.state.offerDescription,
      offerAmount: this.state.offerAmount,
    };
    this.props.makeOffer(
      newOffer,
      this.state.modalData.requestId,
      this.props.history,
    );
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  toggleOffer = () => {
    this.setState({
      offerModal: !this.state.offerModal,
      offerDescription: '',
      offerAmount: '',
      errors: {},
    });
  };

  setModalData = data => {
    this.setState({
      modalData: data,
    });
  };

  render() {
    const {
      headers,
      RequestData,
      loggedInHanndle,
      UI: { loading },
      staticContext,
      makeOffer,
      history,
      data: { dataloading },
      ...restProps
    } = this.props;
    const { errors } = this.state;
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
            ({ userHandle, userImage, car, type, make, createdAt }, index) => (
              <tr key={index}>
                <td className="align-middle text-center">
                  {<Avatar src={userImage} userHandle={userHandle} />}
                </td>
                <td className="align-middle text-center">{car}</td>
                <td className="align-middle text-center">{make}</td>
                <td className="align-middle text-center">{type}</td>
                <td className="align-middle text-center">
                  {dayjs(createdAt).fromNow(true)}
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
              {this.state.modalData.userHandle}'s Request
            </ModalHeader>
            <ModalBody>
              <Container fluid>
                <Card>
                  <CardBody>
                    <Row>
                      <Col sm="4">
                        <CardText className="text-secondary">
                          Automobile Name :
                        </CardText>
                      </Col>
                      <Col sm="8">
                        <CardText className="text-dark">
                          {this.state.modalData.car}
                        </CardText>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col sm="4">
                        <CardText className="text-secondary">
                          Automobile Maker :
                        </CardText>
                      </Col>
                      <Col sm="8">
                        <CardText className="text-dark">
                          {this.state.modalData.make}
                        </CardText>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col sm="4">
                        <CardText className="text-secondary">
                          Jop/Issue description :
                        </CardText>
                      </Col>
                      <Col sm="8">
                        <CardText className="text-dark">
                          {this.state.modalData.description}
                        </CardText>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col sm="4">
                        <CardText className="text-secondary">
                          Jop Type :
                        </CardText>
                      </Col>
                      <Col sm="8">
                        <CardText className="text-dark">
                          {this.state.modalData.type}
                        </CardText>
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
                        {!this.state.loadingTimeout ? (
                          <OffersUi
                            requestId={this.state.modalData.requestId}
                          />
                        ) : (
                          <Spinner type="grow"></Spinner>
                        )}
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.toggleOffer()}>
                Make an Offer
              </Button>
              <Button color="secondary" onClick={() => this.toggle()}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <Modal
            size="lg"
            isOpen={this.state.offerModal}
            toggle={() => this.toggleOffer()}
          >
            <ModalHeader toggle={() => this.toggleOffer()}>
              Offer Form
            </ModalHeader>
            <ModalBody>
              <Container fluid>
                <Card>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col sm="8">
                          <FormGroup>
                            <Label>Offer Description:</Label>
                          </FormGroup>
                        </Col>
                        <Col sm="3">
                          <FormGroup>
                            <Label>Offer Amount:</Label>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="8">
                          <FormGroup>
                            <Input
                              name="offerDescription"
                              id="offerDescription"
                              type="textarea"
                              invalid={errors.offerDescription ? true : false}
                              placeholder="Type what you will do to help the customer"
                              onChange={this.handleChange}
                            ></Input>
                            <FormFeedback>
                              {errors.offerDescription}
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col sm="3">
                          <FormGroup>
                            <CurrencyInput
                              allowNegativeValue={false}
                              intlConfig={{ locale: 'en-US', currency: 'SAR' }}
                              id="offerAmount"
                              name="offerAmount"
                              decimalsLimit={2}
                              onChange={this.handleChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Typography className="text-danger">
                            {errors.offerAmount}
                          </Typography>
                          <Typography className="text-danger">
                            {errors.error}
                          </Typography>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </Container>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={e => this.handleSubmit(e)}>
                {this.props.UI.loading && <Spinner color="secondary" />}
                {!this.props.UI.loading && <>Make Offer</>}
              </Button>
              <Button color="secondary" onClick={() => this.toggleOffer()}>
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

ListingTable.defaultProps = {
  headers: [],
  RequestData: [],
};

const mapStateToProps = state => ({
  data: state.data,
  UI: state.UI,
});

const mapActionsToProps = {
  makeOffer,
};

export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(ListingTable),
);
