import React from 'react'
import { AgGridReact } from 'ag-grid-react';
import { themeQuartz } from "ag-grid-community";

const DataGrid = ({ rowData, colDefs, height }) => {

  const theme = themeQuartz.withParams({
    backgroundColor: 'white',
    foregroundColor: 'black',
    headerTextColor: '#f0f0f0',
    headerBackgroundColor: '#00BB03',
    oddRowBackgroundColor: 'rgb(0, 0, 0, 0.03)',
    headerColumnResizeHandleColor: 'black',
  });

  return (
    <div style={{ height: height }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        theme={theme}
      />
    </div>
  )
}

export default DataGrid