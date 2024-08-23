import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [emp_ID, setEmpID] = useState("");
  const [emp_Name, setEmpName] = useState("");
  const [emp_Salary, setEmpSalary] = useState("");
  const [emp_Department, setEmpDepartment] = useState("");

  const API_URL = "http://localhost:8086/add";
  const username = "aman";
  const password = "aman";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employee = { emp_ID, emp_Name, emp_Salary, emp_Department };

    try {
      const response = await axios.post(API_URL, employee, {
        auth: {
          username: username,
          password: password,
        },
      });
      console.log("Employee saved:", response.data);
      alert("Employee added successfully!");
    } catch (error) {
      console.error("There was an error saving the employee!", error);
      alert("Failed to add employee. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Employee ID:
        <input
          type="number"
          value={emp_ID}
          onChange={(e) => setEmpID(e.target.value)}
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          value={emp_Name}
          onChange={(e) => setEmpName(e.target.value)}
        />
      </label>
      <label>
        Salary:
        <input
          type="number"
          value={emp_Salary}
          onChange={(e) => setEmpSalary(e.target.value)}
        />
      </label>
      <label>
        Department:
        <input
          type="text"
          value={emp_Department}
          onChange={(e) => setEmpDepartment(e.target.value)}
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
