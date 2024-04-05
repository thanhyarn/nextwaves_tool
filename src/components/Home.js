import React, { useState } from "react";

import { Table } from "antd";
import Uploader from "./Uploader";

function Home() {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("listData")) || []
  );
  const columns = [
    {
      title: "Index",
      dataIndex: "index",
      render: (_, record, index) => index + 1,
    },
    {
      title: "EPC",
      dataIndex: "epc",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
  ];
  const tableData = data.map((item, index) => ({
    key: item.id,
    index: index + 1,
    epc: item.epc,
    name: item.name,
  }));
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <>
      <Uploader setData={setData} />
      <Table columns={columns} dataSource={tableData} onChange={onChange} />
    </>
  );
}

export default Home;
