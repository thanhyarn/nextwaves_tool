import React from "react";
import { MdCloudUpload } from "react-icons/md"; // Import Icon
import "./style.css";

const Uploader = ({ setData }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result); // Đọc dữ liệu từ tệp JSON
          console.log(jsonData);
          setData(jsonData); // Truyền dữ liệu về Home
          localStorage.setItem("listData", JSON.stringify(jsonData));
        } catch (error) {
          console.error("Error parsing JSON file:", error);
        }
      };
      reader.readAsText(file);
    } else {
      // Handle invalid file type here if needed
    }
  };

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

  return (
    <>
      <label htmlFor="json-upload" className="upload-button">
        <input
          type="file"
          accept=".json"
          id="json-upload"
          className="input-field"
          hidden
          onChange={handleFileChange}
        />
        <MdCloudUpload color="#1475cf" size={60} />
        <span>Select a JSON file</span>
      </label>

   
    </>
  );
};

export default Uploader;
