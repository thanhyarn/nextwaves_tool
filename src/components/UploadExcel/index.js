import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md"; // Import Icon
import ExcelJS from "exceljs";
import { Table } from "antd";
import "./style.css";

const UploadExcel = () => {
  const [tableData, setTableData] = useState([]); // Initial empty state for tables
  const [matchedItemsData, setMatchedItemsData] = useState([]); // State for matched items
  const [onlyInListDataData, setOnlyInListDataData] = useState([]); // State for items only in listData
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
  function compare(epcValues, listData) {
    // Chuyển đổi listData thành dạng Set (optimized for id lookup)
    const listDataSet = new Set(listData.map((item) => item.epc));

    // Tạo 3 mảng để lưu trữ kết quả
    const matchedItems = [];
    const onlyInListData = [];
    const onlyInEpcValues = [];

    // Duyệt qua epcValues và so sánh với listDataSet
    epcValues.forEach((epcValue) => {
      if (listDataSet.has(epcValue)) {
        // Tìm kiếm item khớp trong listData
        const matchingItem = listData.find((item) => item.epc === epcValue);
        if (matchingItem) {
          // Item trùng khớp, thêm cả id và name
          matchedItems.push({ epc: epcValue, name: matchingItem.name });
        }
      } else {
        // Item chỉ có trong epcValues
        onlyInEpcValues.push({ epc: epcValue, name: "..." }); // Replace "..." with a default value for name if needed
      }
    });

    // Duyệt qua listData và so sánh với epcValues (unchanged)
    listData.forEach((item) => {
      if (!epcValues.includes(item.epc)) {
        // Item chỉ có trong listData
        onlyInListData.push(item);
      }
    });
    setTableData(onlyInEpcValues);
    setMatchedItemsData(matchedItems);
    setOnlyInListDataData(onlyInListData);
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = new ExcelJS.Workbook();
      workbook.xlsx.load(data).then((workbook) => {
        const worksheet = workbook.getWorksheet(1); // Lấy sheet đầu tiên
        const epcValues = [];
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber === 1) {
            // Bỏ qua header
            return;
          }
          const epc = row.getCell(2).value; // Lấy giá trị cột EPC
          epcValues.push(epc);
        });
        compare(epcValues, JSON.parse(localStorage.getItem("listData")) || []);
      });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <label htmlFor="excel-upload" className="upload-button">
        <input
          hidden
          id="excel-upload"
          className="input-field"
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
        />
        <MdCloudUpload color="#1475cf" size={60} />
        <span>Select an Excel file</span>
      </label>
      <h3 style={{ color: "#333" }}>Dữ liệu đọc được</h3>
      <Table columns={columns} dataSource={matchedItemsData} />
      <h3 style={{ color: "#333" }}>Dữ liệu còn thiếu</h3>
      <Table columns={columns} dataSource={onlyInListDataData} />
      <h3 style={{ color: "#333" }}>Dữ liệu không có trong database</h3>
      {tableData.map((item) => {
        return <h5 style={{ color: "#333" }}>{item.epc}</h5>;
      })}{" "}
    </>
  );
};

export default UploadExcel;
