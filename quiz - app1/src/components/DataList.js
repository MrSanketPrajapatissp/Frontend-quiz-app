import { useState, useEffect } from "react";
import { getData } from "../services/dataService";
import "./DataList.css"; // Import the CSS file

const DataList = () => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setDataList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="table-container">
      <h1>Data List</h1>
      {dataList.length === 0 ? (
        <p>No data available</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Title</th>
              <th>Department</th>
              <th>Unit</th>
              <th>Gender</th>
              <th>Ethnicity</th>
              <th>Age</th>
              <th>Date</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.title}</td>
                <td>{data.department}</td>
                <td>{data.unit}</td>
                <td>{data.gender}</td>
                <td>{data.ethnicity}</td>
                <td>{data.age}</td>
                <td>{data.date}</td>
                <td>{data.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DataList;
