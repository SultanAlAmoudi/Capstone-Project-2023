import React from 'react';
import Page from '../components/Page';
import {
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
  Form,
  Input,
  FormGroup,
  FormFeedback,
} from 'reactstrap';
import UserListings from '../components/UserListings';
import { MdPersonPin } from 'react-icons/md';
import { RequestData } from '../demos/Mock';
import { connect } from 'react-redux';
import { postRequest } from '../redux/actions/dataActions';
import { event } from 'react-ga';
import { withRouter } from 'react-router';

class MyJopListings extends React.Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      carName: '',
      maker: '',
      description: '',
      type: '',
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (Object.keys(nextProps.UI.errors).length === 0) {
      this.props.history.go(0);
    }
  }

  toggle = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const newRequest = {
      car: this.state.carName,
      make: this.state.maker,
      description: this.state.description,
      type: this.state.type,
    };
    this.props.postRequest(newRequest);
  };

  render() {
    const {
      user: {
        credentials: { handle, email },
        requests,
      },
      loading,
    } = this.props;
    const { errors } = this.state;
    console.log(errors);
    return (
      <Page title="" breadcrumbs={[{ name: 'My Job listings', active: true }]}>
        <Container fluid>
          <Card>
            <CardBody>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <Label tag="h2">
                        {' '}
                        {this.props.user.credentials.handle}'s Job Requests{' '}
                      </Label>
                      <p>
                        Here is a list of all the job requests made by you,
                        <br /> you can view offers and more details by clicking
                        on{' '}
                        <Button color="primary" disabled>
                          Show Details
                        </Button>{' '}
                        found on each request below.
                      </p>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <UserListings
                        headers={['ID', 'Car', 'Make', 'Jop', 'Created At', '']}
                        RequestData={this.props.user.requests}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form>
                        <Modal
                          size="xl"
                          isOpen={this.state.modalOpen}
                          toggle={() => this.toggle()}
                        >
                          <ModalHeader toggle={() => this.toggle()}>
                            New Request Form
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
                                    <Col sm="5">
                                      <FormGroup>
                                        <Input
                                          name="carName"
                                          id="carName"
                                          type="Text"
                                          placeholder="Type car name.."
                                          invalid={errors.car ? true : false}
                                          onChange={this.handleChange}
                                        />
                                        <FormFeedback>
                                          {errors.car}
                                        </FormFeedback>
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <hr />
                                  <Row>
                                    <Col sm="3">
                                      <CardText className="text-secondary">
                                        Automobile Maker :
                                      </CardText>
                                    </Col>
                                    <Col sm="5">
                                      <FormGroup>
                                        <Input
                                          name="maker"
                                          id="maker"
                                          type="Text"
                                          placeholder="Type maker name.."
                                          invalid={errors.make ? true : false}
                                          onChange={this.handleChange}
                                        ></Input>
                                        <FormFeedback>
                                          {errors.make}
                                        </FormFeedback>
                                      </FormGroup>
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
                                      <FormGroup>
                                        <Input
                                          name="description"
                                          id="description"
                                          type="textarea"
                                          placeholder="Describe your issue.."
                                          invalid={
                                            errors.description ? true : false
                                          }
                                          onChange={this.handleChange}
                                        ></Input>
                                        <FormFeedback>
                                          {errors.description}
                                        </FormFeedback>
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <hr />
                                  <Row>
                                    <Col sm="3">
                                      <CardText className="text-secondary">
                                        Jop Type :
                                      </CardText>
                                    </Col>
                                    <Col sm="5">
                                      <FormGroup>
                                        <Input
                                          name="type"
                                          id="type"
                                          type="Text"
                                          placeholder="Enter job type.."
                                          invalid={errors.type ? true : false}
                                          onChange={this.handleChange}
                                        ></Input>
                                        <FormFeedback>
                                          {errors.type}
                                        </FormFeedback>
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                </CardBody>
                              </Card>
                            </Container>
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              color="primary"
                              onClick={e => {
                                this.handleSubmit(e);
                              }}
                            >
                              Sumbit Request
                            </Button>
                            <Button
                              color="secondary"
                              onClick={e => {
                                this.toggle();
                              }}
                            >
                              Cancel
                            </Button>
                          </ModalFooter>
                        </Modal>
                      </Form>
                      <Button
                        color="link"
                        style={{ position: 'absolute', right: 0 }}
                        onClick={() => this.toggle()}
                      >
                        Create New Request
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  postRequest,
};

export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(MyJopListings),
);
