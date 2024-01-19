import React from 'react'
import DataTable from 'react-data-table-component';
import { useState } from 'react';

const Table = ({columns,data}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
    // console.log("Colums",data)
    // console.log("Filter Data",filteredData)
  return (
    <DataTable
    columns={columns}
    data={data}
    pagination
    paginationPerPage={itemsPerPage}
     onChangePage={(newPage) => setCurrentPage( newPage)}
    />
  )
}

export default Table