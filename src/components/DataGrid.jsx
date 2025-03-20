import { AgGridReact } from "ag-grid-react";
import { themeQuartz } from "ag-grid-community";
import PropTypes from "prop-types";

const DataGrid = ({ rowData, colDefs, height }) => {
  const theme = themeQuartz.withParams({
    backgroundColor: "white",
    foregroundColor: "black",
    headerTextColor: "#f0f0f0",
    headerBackgroundColor: "#00BB03",
    oddRowBackgroundColor: "rgb(0, 0, 0, 0.03)",
    headerColumnResizeHandleColor: "black",
  });

  const CustomTooltip = (props) => {
    return (
      <div className="bg-gray-900 text-white text-xs p-2 rounded shadow-xl max-w-xs transition-opacity duration-150">
        {props.value}
      </div>
    );
  };

  CustomTooltip.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };

  return (
    <div style={{ height: height }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        theme={theme}
        rowHeight={50}
        tooltipShowDelay={0}
        tooltipHideDelay={3000}
        components={{ customTooltip: CustomTooltip }}
      />
    </div>
  );
};

export default DataGrid;

DataGrid.propTypes = {
  rowData: PropTypes.array.isRequired,
  colDefs: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
};
