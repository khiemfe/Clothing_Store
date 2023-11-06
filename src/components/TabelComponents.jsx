import React, { useRef, useState } from "react";
import { Table } from "antd";
import LoadingComponents from "./LoadingComponents";
import { DownloadTableExcel } from "react-export-table-to-excel";

const TabelComponents = (props) => {
  const {
    selectionType = "checkbox",
    dataTable = [],
    columns = [],
    products = [],
    isLoading = false,
    handleDeleteManyProduct,
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

  console.log('tableRef.current', tableRef.current)
  console.log('dataTable', dataTable)

  // const newColumns = columns.pop()

  return (
    <>
      {/* <Divider /> */}
      <div className="loading">
        <LoadingComponents isLoading={isLoading}></LoadingComponents>
      </div>
      {rowSelectedKeys.length > 0 && (
        <div style={{ cursor: "pointer" }} onClick={hanleDeleteAll}>
          Xoá tất cả
        </div>
      )}
      <DownloadTableExcel
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
      </DownloadTableExcel>

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
