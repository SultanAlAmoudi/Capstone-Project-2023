import React, { useEffect, useState } from 'react';
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
import MyOffersTable from '../components/MyOffersTable';
import { MdPersonPin } from 'react-icons/md';
import { RequestData } from '../demos/Mock';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getUserOffers } from '../redux/actions/dataActions';
import ReactPaginate from 'react-paginate';

class Offers extends React.Component {
  state = {
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
  }

  render() {
    const {
      data: { userOffers, dataloading },
      UI: { loading },
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
                  {this.props.data.dataloding ? (
                    <Spinner color="primary" className="paginate"></Spinner>
                  ) : this.state.items.length === 0 ? (
                    <MyOffersTable
                      headers={[
                        'Description',
                        'Amount',
                        'Status',
                        'Created At',
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
