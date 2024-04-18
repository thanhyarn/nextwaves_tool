import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { Button, Space, Table } from "antd";
import ExcelJS from "exceljs";

const MergeExcel = () => {
  const [listExcel1, setListExcel1] = useState([]);
  const [listExcel2, setListExcel2] = useState([]);

  const [mergedList, setMergedList] = useState([]);
  const [onlyInList1, setOnlyInList1] = useState([]);
  const [onlyInList2, setOnlyInList2] = useState([]);
  const [notInEither, setNotInEither] = useState([]);

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
  ];

  const columnsMerge = [
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
      name: "name",
    },
  ];

  const handleMerge = (list1, list2, referenceData) => {
    // Initialize empty arrays to store merged and missing data
    const mergedList = [];
    const missingDataList = [];

    // Create a set of EPCs from referenceData for efficient lookup
    const referenceEPCSet = new Set(referenceData.map(({ epc }) => epc));

    // Iterate through referenceData
    referenceData.forEach(({ epc, name }) => {
      // Check if EPC exists in list1 or list2
      const isInList1 = list1.some((item) => item.epc === epc);
      const isInList2 = list2.some((item) => item.epc === epc);

      // If EPC is found in either list, add it to mergedList with name
      if (isInList1 || isInList2) {
        mergedList.push({ epc, name });
      } else {
        // If EPC is not found in either list, add it to missingDataList
        missingDataList.push({ epc, name });
      }
    });

    // Return the merged and missing data arrays
    return { mergedList, missingDataList };
  };

  const handleFileChangeExcel1 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = new ExcelJS.Workbook();
      workbook.xlsx.load(data).then((workbook) => {
        const worksheet = workbook.getWorksheet(1); // Lấy sheet đầu tiên
        const dataList = []; // Mảng để lưu các đối tượng { epc, count }
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber === 1) {
            // Bỏ qua header
            return;
          }
          const epc = row.getCell(2).value; // Lấy giá trị cột EPC
          //  const name = row.getCell(3).value; // Lấy giá trị cột Count
          dataList.push({ epc }); // Thêm đối tượng vào mảng
        });
        setListExcel1(dataList);
        console.log("Join to handleFile 1");
        localStorage.setItem("listExcel1", JSON.stringify(dataList));
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFileChangeExcel2 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = new ExcelJS.Workbook();
      workbook.xlsx.load(data).then((workbook) => {
        const worksheet = workbook.getWorksheet(1); // Lấy sheet đầu tiên
        const dataList = []; // Mảng để lưu các đối tượng { epc, count }
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber === 1) {
            // Bỏ qua header
            return;
          }
          const epc = row.getCell(2).value; // Lấy giá trị cột EPC
          //  const name = row.getCell(3).value; // Lấy giá trị cột Count
          dataList.push({ epc }); // Thêm đối tượng vào mảng
        });
        setListExcel2(dataList);
        console.log("Join to handleFile 2");
        localStorage.setItem("listExcel2", JSON.stringify(dataList));
      });
    };
    reader.readAsArrayBuffer(file);
  };
  return (
    <>
      <Space
        direction="vertical"
        style={{
          width: "100%",
          // display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={() =>
            handleMerge(
              listExcel1,
              listExcel2,
              JSON.parse(localStorage.getItem("listData"))
            )
          }
          type="primary"
        >
          Merge
        </Button>
        <Space
          direction="horizontal"
          style={{
            width: "90%",
            // display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Space direction="vertical">
            <label
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                border: "solid 1px #333",
                margin: "0 100px",
              }}
              htmlFor="excel-upload1"
              className="upload-button"
            >
              <Space direction="vertical">
                <div>
                  <input
                    hidden
                    id="excel-upload1"
                    className="input-field"
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChangeExcel1}
                  />
                  <MdCloudUpload color="#1475cf" size={60} />
                  <span>Select an Excel file</span>
                </div>
              </Space>
            </label>
            <Table
              style={{ border: "solid 1px #333", marginLeft: "100px" }}
              columns={columns}
              dataSource={listExcel1}
            />
          </Space>
          <Space direction="vertical">
            <label
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                border: "solid 1px #333",
                margin: "0 100px",
              }}
              htmlFor="excel-upload2"
              className="upload-button"
            >
              <Space direction="vertical">
                <div>
                  <input
                    hidden
                    id="excel-upload2"
                    className="input-field"
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChangeExcel2}
                  />
                  <MdCloudUpload color="#1475cf" size={60} />
                  <span>Select an Excel file</span>
                </div>
              </Space>
            </label>
            <Table
              style={{ border: "solid 1px #333" }}
              columns={columns}
              dataSource={listExcel2}
            />
          </Space>
        </Space>
        <h3 style={{ color: "#333" }}>Dữ liệu trùng khớp</h3>
        <Table columns={columnsMerge} dataSource={mergedList} />

        <h3 style={{ color: "#333" }}>Dữ liệu chỉ có ở Data1</h3>
        <Table columns={columnsMerge} dataSource={onlyInList1} />

        <h3 style={{ color: "#333" }}>Dữ liệu chỉ có ở Data2</h3>
        <Table columns={columnsMerge} dataSource={onlyInList2} />

        <h3 style={{ color: "#333" }}>Dữ liệu còn thiếu của cả 2</h3>
        <Table columns={columnsMerge} dataSource={notInEither} />
      </Space>
    </>
  );
};

export default MergeExcel;
