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
      title: "Count",
      dataIndex: "count",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
  ];
  function compare(newData, listData) {
    // Chuyển đổi listData thành dạng Set để tối ưu cho việc tìm kiếm theo epc
    const listDataSet = new Set(listData.map((item) => item.epc));

    // Tạo 3 mảng để lưu trữ kết quả
    const matchedItems = [];
    const onlyInNewData = [];
    const onlyInListData = [];

    // Duyệt qua newData và so sánh với listDataSet
    newData.forEach((dataItem) => {
      if (listDataSet.has(dataItem.epc)) {
        // Tìm item khớp trong listData
        const matchingItem = listData.find((item) => item.epc === dataItem.epc);
        if (matchingItem) {
          matchedItems.push({ ...dataItem, name: matchingItem.name }); // Kết hợp dataItem và name từ matchingItem
        }
      } else {
        onlyInNewData.push(dataItem); // Item chỉ có trong newData
      }
    });

    // Duyệt qua listData để tìm các item không có trong newData
    listData.forEach((item) => {
      if (!newData.some((dataItem) => dataItem.epc === item.epc)) {
        onlyInListData.push(item); // Item chỉ có trong listData
      }
    });

    // Gọi các hàm để cập nhật UI hoặc logic xử lý tiếp theo
    setTableData(onlyInNewData); // Thay vì onlyInEpcValues, ta sử dụng onlyInNewData
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
        const dataList = []; // Mảng để lưu các đối tượng { epc, count }
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber === 1) {
            // Bỏ qua header
            return;
          }
          const epc = row.getCell(2).value; // Lấy giá trị cột EPC
          const count = row.getCell(3).value; // Lấy giá trị cột Count
          dataList.push({ epc, count }); // Thêm đối tượng vào mảng
        });
        compare(dataList, JSON.parse(localStorage.getItem("listData")) || []);
        // // Bạn có thể cập nhật localStorage ở đây nếu muốn
        // localStorage.setItem("listData", JSON.stringify(dataList));
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
