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
  Spinner,
} from 'reactstrap';
import ListingTable from '../components/ListingTable';
import { MdPersonPin } from 'react-icons/md';
import { withRouter } from 'react-router';
import { CarData, jobList } from '../demos/makeAndCar';
import { connect } from 'react-redux';
import { getRequests } from '../redux/actions/dataActions';
import ReactPaginate from 'react-paginate';

class PublicRequests extends React.Component {
  state = {
    filterCar: '',
    filterMake: '',
    filterType: '',
    carInput: [],
    carBool: false,
    filteredRequestList: [],
    currentItems: [],
    items: [],
    pageCount: 0,
    itemOffset: 0,
    itemsPerPage: 6,
  };

  // Invoke when user click to request another page.
  handlePageClick = event => {
    console.log(this.state.currentItems.length);
    const newOffset =
      (event.selected * this.state.itemsPerPage) % this.state.items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    );
    let items = this.state.items;
    const endOffset = newOffset + this.state.itemsPerPage;
    console.log(`Loading items from ${this.state.itemOffset} to ${endOffset}`);
    this.setState({
      currentItems: items.slice(newOffset, endOffset),
      pageCount: Math.ceil(items.length / this.state.itemsPerPage),
    });
  };

  componentDidMount() {
    this.props.getRequests();
  }

  handleRefresh(newList) {
    let items = newList.filter(
      request =>
        request.offerAccepted != true &&
        request.userHandle != this.props.user.credentials.handle,
    );
    const endOffset = this.state.itemOffset + this.state.itemsPerPage;
    console.log(`Loading items from ${this.state.itemOffset} to ${endOffset}`);
    this.setState({
      currentItems: items.slice(this.state.itemOffset, endOffset),
      pageCount: Math.ceil(items.length / this.state.itemsPerPage),
      items: newList.filter(
        request =>
          request.offerAccepted != true &&
          request.userHandle != this.props.user.credentials.handle,
      ),
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.currentItems.length == 0) {
      let items = nextProps.data.publicRequests.filter(
        request =>
          request.offerAccepted != true &&
          request.userHandle != this.props.user.credentials.handle,
      );
      const endOffset = this.state.itemOffset + this.state.itemsPerPage;
      console.log(
        `Loading items from ${this.state.itemOffset} to ${endOffset}`,
      );
      this.setState({
        currentItems: items.slice(this.state.itemOffset, endOffset),
        pageCount: Math.ceil(items.length / this.state.itemsPerPage),
        items: nextProps.data.publicRequests.filter(
          request =>
            request.offerAccepted != true &&
            request.userHandle != this.props.user.credentials.handle,
        ),
      });
    }
  }

  handleChangeMake = event => {
    if (event.target.value !== '') {
      const filteredCarInput = CarData.filter(
        brands => brands.brand === event.target.value,
      );
      let carList = filteredCarInput[0].models;
      this.setState({
        carBool: true,
        carInput: carList,
      });
    } else {
      this.setState({
        carBool: false,
      });
    }
  };

  filterBySearch = event => {
    let filterMake = this.state.filterMake;
    if (event.target.name === 'filterMake') {
      filterMake = event.target.value;
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
    let filterCar = this.state.filterCar;
    if (event.target.name === 'filterCar') {
      filterCar = event.target.value;
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
    let filterType = this.state.filterType;
    if (event.target.name === 'filterType') {
      filterType = event.target.value;
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
    // Create copy of item list
    var updatedList = [
      ...this.props.data.publicRequests.filter(
        request =>
          request.offerAccepted != true &&
          request.userHandle != this.props.user.credentials.handle,
      ),
    ];
    // Include all elements which includes the search query
    updatedList = updatedList.filter(request => {
      if (filterCar === '' || filterMake === '') {
        return (
          request.make.toLowerCase().startsWith(filterMake.toLowerCase()) &&
          request.type.toLowerCase().includes(filterType.toLowerCase())
        );
      } else {
        return (
          request.make.toLowerCase().includes(filterMake.toLowerCase()) &&
          request.car.toLowerCase().includes(filterCar.toLowerCase()) &&
          request.type.toLowerCase().includes(filterType.toLowerCase())
        );
      }
    });
    if (updatedList.length === 0) {
      this.setState({
        items: ['Empty'],
      });
    } else {
      this.handleRefresh(
        updatedList.filter(request => request.offerAccepted != true),
      );
      this.setState({
        items: updatedList.filter(
          request =>
            request.offerAccepted != true &&
            request.userHandle != this.props.user.credentials.handle,
        ),
      });
    }
    // Trigger render with updated values
  };

  render() {
    const {
      user: {
        credentials: { handle },
      },
      data: { publicRequests, dataloading },
      UI: { loading },
    } = this.props;
    return (
      <Page
        title="Public Job Listings"
        breadcrumbs={[{ name: 'Job Listings', active: true }]}
      >
        {console.log(this.state.currentItems)}
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
                        <Label> Automobile Maker: </Label>
                        <Input
                          name="filterMake"
                          id="filterMake"
                          type="select"
                          placeholder="filterMake"
                          defaultValue="Choose a Car Brand"
                          onChange={e => {
                            this.handleChangeMake(e);
                            this.filterBySearch(e);
                          }}
                        >
                          <option disabled>Choose a Car Brand</option>
                          <option value="">Show All</option>
                          {CarData.map(({ brand }, index) => (
                            <option key={index} value={brand}>
                              {brand}
                            </option>
                          ))}
                        </Input>
                      </Col>
                      <Col>
                        <Label> Automobile Name: </Label>
                        <Input
                          name="filterCar"
                          id="filterCar"
                          type="select"
                          placeholder="filterCar"
                          disabled={this.state.carBool ? '' : 'disabled'}
                          defaultValue="Choose a Car Brand First"
                          onChange={this.filterBySearch}
                        >
                          <option disabled>Choose a Car Brand First</option>
                          <option value="">Show All</option>
                          {this.state.carBool &&
                            this.state.carInput.map((car, index) => (
                              <option key={index} value={car}>
                                {car}
                              </option>
                            ))}
                        </Input>
                      </Col>
                      <Col>
                        <Label> Job Type: </Label>
                        <Input
                          name="filterType"
                          id="filterType"
                          type="select"
                          placeholder="filterType"
                          defaultValue="type of job needed"
                          onChange={this.filterBySearch}
                        >
                          <option disabled>Type of Job Needed</option>
                          <option value="">Show All</option>
                          {jobList.map((job, index) => (
                            <option key={index} value={job}>
                              {job}
                            </option>
                          ))}
                        </Input>
                      </Col>
                    </Row>
                  </Form>
                  <br />
                  {this.props.data.dataloding ? (
                    <Spinner color="primary" className="paginate"></Spinner>
                  ) : this.state.items.length === 0 ? (
                    <ListingTable
                      headers={[
                        <MdPersonPin size={25} />,
                        'Car',
                        'Make',
                        'Jop',
                        'Created At',
                        '',
                      ]}
                      RequestData={this.state.currentItems}
                    />
                  ) : this.state.items[0] === 'Empty' ? (
                    <h3>
                      {' '}
                      Sorry, There are no job requests matching your filter
                      options!
                    </h3>
                  ) : (
                    <ListingTable
                      headers={[
                        <MdPersonPin size={25} />,
                        'Car',
                        'Make',
                        'Jop',
                        'Created At',
                        '',
                      ]}
                      RequestData={this.state.currentItems}
                    />
                  )}
                  {!(this.state.items[0] === 'Empty') ? (
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
                  ) : (
                    <></>
                  )}
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
  data: state.data,
  UI: state.UI,
});

const mapActionsToProps = {
  getRequests,
};

export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(PublicRequests),
);
