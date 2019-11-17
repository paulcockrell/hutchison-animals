import React from 'react';
import Pagination from 'bulma-pagination-react';

const RECORDS_PER_PAGE = 10;

const Pager = ({ records, currentPage, onChange, perPage = RECORDS_PER_PAGE }) => {
  const pages = Math.ceil(records.length / perPage);

  return (
    <Pagination
      pages={pages}
      currentPage={currentPage}
      onChange={page => onChange(page)}
    />
  )
}

export default Pager;
