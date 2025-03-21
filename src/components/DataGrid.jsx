import { AgGridReact } from "ag-grid-react";
import PropTypes from "prop-types";

const DataGrid = ({ rowData, colDefs }) => {
  const CustomTooltip = (props) => (
    <div className="bg-gray-900 text-white text-xs p-2 rounded shadow-xl max-w-xs transition-opacity duration-150">
      {props.value}
    </div>
  );

  CustomTooltip.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };

  const defaultColDef = {
    sortable: true,
    resizable: true,
    filter: false,
  };

  return (
    <div>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        rowHeight={55}
        animateRows={true}
        pagination={true}
        paginationPageSize={10}
        paginationAutoPageSize={false}
        paginationPageSizeSelector={[10, 25, 50, 100]}
        domLayout="autoHeight"
        components={{ customTooltip: CustomTooltip }}
      />
    </div>
  );
};

DataGrid.propTypes = {
  rowData: PropTypes.array.isRequired,
  colDefs: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  defaultSortCol: PropTypes.string,
};

export default DataGrid;
