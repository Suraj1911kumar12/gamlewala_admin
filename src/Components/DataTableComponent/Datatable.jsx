import React from "react";
// import { Table } from 'antd';
import { Table } from "ant-table-extensions";

const Datatable = (props) => {
  // const tableData = {...props.table}

  return (
    <React.Fragment>
      {
        <Table
          columns={props.columns}
          dataSource={props.data}
          pagination={{ defaultPageSize: 5 }}
          exportable
          searchable
        />
      }
    </React.Fragment>
  );
};

export default Datatable;
