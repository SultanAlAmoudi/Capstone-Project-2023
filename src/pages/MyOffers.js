import React from 'react';
import Page from '../components/Page';
import { Card, CardBody, Col, Container, Row, Spinner } from 'reactstrap';
import MyOffersTable from '../components/MyOffersTable';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getUserOffers } from '../redux/actions/dataActions';
import ReactPaginate from 'react-paginate';
import PageSpinner from '../components/PageSpinner';

class Offers extends React.Component {
  state = {
    currentItems: [],
    items: [],
    pageCount: 0,
    itemOffset: 0,
    itemsPerPage: 6,
    fakeLoad: true,
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
    this.props.getUserOffers();
  }

  handleRefresh(newList) {
    let items = newList;
    const endOffset = this.state.itemOffset + this.state.itemsPerPage;
    console.log(`Loading items from ${this.state.itemOffset} to ${endOffset}`);
    this.setState({
      currentItems: items.slice(this.state.itemOffset, endOffset),
      pageCount: Math.ceil(items.length / this.state.itemsPerPage),
      items: newList,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.currentItems.length == 0) {
      let items = nextProps.data.userOffers;
      const endOffset = this.state.itemOffset + this.state.itemsPerPage;
      console.log(
        `Loading items from ${this.state.itemOffset} to ${endOffset}`,
      );
      this.setState({
        currentItems: items.slice(this.state.itemOffset, endOffset),
        pageCount: Math.ceil(items.length / this.state.itemsPerPage),
        items: nextProps.data.userOffers,
      });
    }
    setTimeout(() => {
      this.setState({
        fakeLoad: false,
      });
    }, 1000);
  }

  render() {
    const {
      data: { userOffers, dataloading },
      UI: { loading },
      history,
    } = this.props;
    return (
      <Page
        title="My Offers Page"
        breadcrumbs={[{ name: 'My Offers', active: true }]}
      >
        {console.log(this.state.currentItems)}
        <Container fluid>
          <Card>
            <CardBody>
              <Row>
                <Col>
                  {this.props.data.dataloding || this.state.fakeLoad ? (
                    <PageSpinner color="primary" />
                  ) : this.state.items.length === 0 ? (
                    <h3>You have no offers to view!</h3>
                  ) : (
                    <MyOffersTable
                      headers={[
                        'Description',
                        'Amount',
                        'Status',
                        'Created At',
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
  data: state.data,
  UI: state.UI,
});

const mapActionsToProps = {
  getUserOffers,
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Offers));
