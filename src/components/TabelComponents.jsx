import React, { useRef, useState } from "react";
import { Button, Table } from "antd";
import { DownloadTableExcel } from "react-export-table-to-excel";
import LoadingTableComponent from "./LoadingTableComponent";
import { MdDownload } from "react-icons/md";

const TabelComponents = (props) => {
  const {
    selectionType = "checkbox",
    dataTable = [],
    dataTableQuan = [],
    columns = [],
    products = [],
    isLoading = false,
    handleDeleteManyProduct,
    text,
    filename,
    sheet,
  } = props;
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys);
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

  let dataTableMain = [];
  if (filename === "Products Table") {
    for (let i = 0; i < dataTable.length; i++) {
      if (dataTable[i].name?.split(" ")[0] !== "Quần") {
        dataTableMain.push(dataTable[i]);
      } else {
        dataTableMain.push(dataTableQuan[i]);
      }
    }
  } else {
    dataTableMain = dataTable;
  }

  console.log(dataTableMain);

  return (
    <>
      {/* <Divider /> */}
      {rowSelectedKeys?.length > 0 && (
        <div style={{ cursor: "pointer" }} onClick={hanleDeleteAll}>
          Xoá tất cả
        </div>
      )}

      <div style={{ marginBottom: "20px", float: "right" }}>
        <DownloadTableExcel
          filename={filename}
          sheet={sheet}
          currentTableRef={tableRef.current}
        >
          <Button style={{ marginRight: "20px" }}>
            <MdDownload style={{ marginRight: "5px" }} /> Export {text} (CSV){" "}
          </Button>
        </DownloadTableExcel>
        <DownloadTableExcel
          filename={filename}
          sheet={sheet}
          currentTableRef={tableRefAll.current}
        >
          <Button>
            <MdDownload style={{ marginRight: "5px" }} /> Export tất cả {text}{" "}
            (CSV)
          </Button>
        </DownloadTableExcel>
      </div>
      {filename === "Order Table" ? (
        <Table
          // style={{display: 'none'}}
          ref={tableRef}
          columns={columns}
          dataSource={dataTableMain}
          {...props}
        />
      ) : (
        <Table
          // style={{display: 'none'}}
          ref={tableRef}
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={dataTableMain}
          {...props}
        />
      )}

      {!isLoading && dataTableMain?.length === 0 && (
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
      <Table
        style={{ display: "none" }}
        ref={tableRefAll}
        // rowKey="id"
        pagination={false}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataTable}
        {...props}
      />
    </>
  );
};

export default TabelComponents;
