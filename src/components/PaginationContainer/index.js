import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import { Container } from './styles';

function PaginationContainer({ activePage, paginate, handlePageChange }) {
  return (
    <Container>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={paginate.perPage}
        totalItemsCount={Number(paginate.total)}
        pageRangeDisplayed={5}
        itemClass="page-item"
        linkClass="page-link"
        onChange={handlePageChange}
      />
    </Container>
  );
}

PaginationContainer.propTypes = {
  activePage: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  paginate: PropTypes.shape({
    total: PropTypes.string,
    perPage: PropTypes.number,
  }).isRequired,
};

export default PaginationContainer;
