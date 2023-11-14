import React, { useRef, useState } from "react";
import { Table } from "antd";
import LoadingComponents from "./LoadingComponents";
import { DownloadTableExcel } from "react-export-table-to-excel";
import LoadingTableComponent from "./LoadingTableComponent";

const TabelComponents = (props) => {
  const {
    selectionType = "checkbox",
    dataTable = [],
    columns = [],
    products = [],
    isLoading = false,
    handleDeleteManyProduct,
    text,
    filename,
    sheet,
  } = props;
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
  console.log("dataTable", dataTable);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys);
      console.log(`selectedRowKeys: ${selectedRowKeys}`);
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === 'Disabled User',
    //   name: record.name,
    // }),
  };

  const hanleDeleteAll = () => {
    handleDeleteManyProduct(rowSelectedKeys);
  };

  const tableRef = useRef(null);
  const tableRefAll = useRef(null);

  console.log("tableRef.current", tableRef.current);
  console.log("dataTable", dataTable);

  // const newColumns = columns.pop()

  return (
    <>
      {/* <Divider /> */}
      {rowSelectedKeys.length > 0 && (
        <div style={{ cursor: "pointer" }} onClick={hanleDeleteAll}>
          Xoá tất cả
        </div>
      )}

      {/* <DownloadTableExcel
        filename={filename}
        sheet={sheet}
        currentTableRef={tableRef.current}
      >
        <button> Export Excel 1 </button>
      </DownloadTableExcel>

      <DownloadTableExcel
        filename={filename}
        sheet={sheet}
        currentTableRef={tableRefAll.current}
      >
        <button> Export Excel All </button>
      </DownloadTableExcel> */}

      <Table
        // style={{display: 'none'}}
        ref={tableRef}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataTable}
        {...props}
      />
      {!isLoading && dataTable.length === 0 && (
        <h3
          style={{
            textAlign: "center",
            marginTop: "50px",
            textTransform: "uppercase",
          }}
        >
          Không có {text}
        </h3>
      )}
      <LoadingTableComponent isLoading={isLoading}></LoadingTableComponent>
      {/* <Table
        style={{display: 'none'}}
        ref={tableRefAll}
        // rowKey="id"
        pagination={false}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={newColumns}
        dataSource={dataTable}
        {...props}
      /> */}
    </>
  );
};

export default TabelComponents;
