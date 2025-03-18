import React from 'react'
import { AgGridReact } from 'ag-grid-react';

const DataGrid = ({ rowData, colDefs }) => {
  return (
    <div style={{ height: 500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
      />
    </div>
  )
}

export default DataGrid