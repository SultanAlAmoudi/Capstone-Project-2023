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
  Spinner,
} from 'reactstrap';
import UserListings from '../components/UserListings';
import { connect } from 'react-redux';
import { postRequest, getUserData } from '../redux/actions/dataActions';
import { withRouter } from 'react-router';
import { CarData, jobList } from '../demos/makeAndCar';
import PageSpinner from 'components/PageSpinner';
import ReactPaginate from 'react-paginate';

class MyJopListings extends React.Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      carName: '',
      maker: '',
      description: '',
      type: '',
      FirstLoad: true,
      carInput: [],
      carBool: false,
      errors: {},
      currentItems: [],
      pageCount: 0,
      itemOffset: 0,
      itemsPerPage: 6,
      loadingTimeout: true,
    };
  }

  // Invoke when user click to request another page.
  handlePageClick = event => {
    console.log(this.state.currentItems.length);
    const newOffset =
      (event.selected * this.state.itemsPerPage) %
      this.props.data.requests.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    );
    let items = this.props.data.requests;
    const endOffset = newOffset + this.state.itemsPerPage;
    console.log(`Loading items from ${this.state.itemOffset} to ${endOffset}`);
    this.setState({
      currentItems: items.slice(newOffset, endOffset),
      pageCount: Math.ceil(items.length / this.state.itemsPerPage),
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (this.state.currentItems.length == 0) {
      let items = nextProps.data.requests;
      const endOffset = this.state.itemOffset + this.state.itemsPerPage;
      console.log(
        `Loading items from ${this.state.itemOffset} to ${endOffset}`,
      );
      this.setState({
        currentItems: items.slice(this.state.itemOffset, endOffset),
        pageCount: Math.ceil(items.length / this.state.itemsPerPage),
        items: nextProps.data.Requests,
      });
    }
    if (typeof this.props.history.location.state != 'undefined')
      this.setState({
        modalOpen: this.props.history.location.state.requestModal,
      });

    setTimeout(() => {
      this.setState({
        loadingTimeout: false,
      });
    }, 1000);
  }

  componentDidMount() {
    this.props.getUserData(this.props.user.credentials.handle);
  }

  toggle = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
      carBool: false,
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleChangeMake = event => {
    const filteredCarInput = CarData.filter(
      brands => brands.brand === event.target.value,
    );
    let carList = filteredCarInput[0].models;
    this.setState({
      [event.target.name]: event.target.value,
      carBool: true,
      carInput: carList,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const newRequest = {
      car: this.state.carName,
      make: this.state.maker,
      description: this.state.description,
      type: this.state.type,
      imageUrl: this.props.user.credentials.imageUrl,
    };
    this.props.postRequest(newRequest, this.props.history);
  };

  render() {
    const {
      user: {
        credentials: { handle, imageUrl },
      },
      data: { requests, dataloading },
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <>
        {true && (
          <Page
            title=""
            breadcrumbs={[{ name: 'My Job listings', active: true }]}
          >
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
                            <br /> you can view offers and more details by
                            clicking on{' '}
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
                          {this.state.loadingTimeout ? (
                            <PageSpinner />
                          ) : Object.keys(this.state.currentItems).length ===
                            0 ? (
                            <p>You have no request at this time</p>
                          ) : (
                            <UserListings
                              headers={[
                                'Automobile',
                                'Brand',
                                'Job',
                                'Offers Recived',
                                'Time since Creation',
                                'Status',
                                '',
                              ]}
                              RequestData={this.state.currentItems}
                              loggedInHanndle={
                                this.props.user.credentials.handle
                              }
                            />
                          )}
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
                                            Automobile Brand :
                                          </CardText>
                                        </Col>
                                        <Col sm="5">
                                          <FormGroup>
                                            <Input
                                              name="maker"
                                              id="maker"
                                              type="select"
                                              placeholder="maker"
                                              invalid={
                                                errors.make ? true : false
                                              }
                                              defaultValue="Choose a Car Brand"
                                              onChange={this.handleChangeMake}
                                            >
                                              <option disabled>
                                                Choose a Car Brand
                                              </option>
                                              {CarData.map(
                                                ({ brand }, index) => (
                                                  <option
                                                    key={index}
                                                    value={brand}
                                                  >
                                                    {brand}
                                                  </option>
                                                ),
                                              )}
                                            </Input>
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
                                            Automobile Name :{' '}
                                          </CardText>
                                        </Col>
                                        <Col sm="5">
                                          <FormGroup>
                                            <Input
                                              name="carName"
                                              id="carName"
                                              type="select"
                                              placeholder="carName"
                                              invalid={
                                                errors.make ? true : false
                                              }
                                              disabled={
                                                this.state.carBool
                                                  ? ''
                                                  : 'disabled'
                                              }
                                              defaultValue="Choose a Car Brand First"
                                              onChange={this.handleChange}
                                            >
                                              <option disabled>
                                                Choose a Car Brand First
                                              </option>
                                              {this.state.carInput.map(
                                                (car, index) => (
                                                  <option
                                                    key={index}
                                                    value={car}
                                                  >
                                                    {car}
                                                  </option>
                                                ),
                                              )}
                                            </Input>
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
                                                errors.description
                                                  ? true
                                                  : false
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
                                              type="select"
                                              placeholder="type"
                                              invalid={
                                                errors.type ? true : false
                                              }
                                              defaultValue="type of job needed"
                                              onChange={this.handleChange}
                                            >
                                              <option disabled>
                                                type of job needed
                                              </option>
                                              {jobList.map((job, index) => (
                                                <option key={index} value={job}>
                                                  {job}
                                                </option>
                                              ))}
                                            </Input>
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
                                  {this.props.UI.loading && (
                                    <Spinner color="secondary" />
                                  )}
                                  {!this.props.UI.loading && (
                                    <>Submit request</>
                                  )}
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
                          <ReactPaginate
                            className="paginate"
                            nextLabel="next >"
                            onPageChange={this.handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={this.state.pageCount}
                            previousLabel="< previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                          />
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
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  data: state.data,
  UI: state.UI,
});

const mapActionsToProps = {
  postRequest,
  getUserData,
};

export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(MyJopListings),
);
