import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css"; // Import the CSS file

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({
    full_name: "",
    email: "",
    prn_no: "",
    roll_no: "",
  });
  const [errors, setErrors] = useState({}); // For storing validation errors

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/student/all");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!student.full_name) newErrors.full_name = "Full Name is required";
    if (!student.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(student.email))
      newErrors.email = "Email is not valid";
    if (!student.prn_no) newErrors.prn_no = "PRN is required";
    else if (student.prn_no <= 0)
      newErrors.prn_no = "PRN should be a positive number";
    if (!student.roll_no) newErrors.roll_no = "Roll Number is required";
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Exit the function if there are validation errors
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/student/saveStudent",
        student
      );
      if (response.status === 200) {
        fetchStudents(); // Refresh the list after saving
        setStudent({
          full_name: "",
          email: "",
          prn_no: "",
          roll_no: "",
        }); // Reset form
        setErrors({}); // Clear errors
        alert("Student saved successfully");
      } else if (response.status === 400) {
        // Handle validation error or email already exists
        const { data } = response;
        if (data.email) {
          alert(data.email); // Display the email already exists error
        } else {
          console.error("Error saving student:", data);
          alert("Error saving student: " + JSON.stringify(data)); // Display other errors
        }
      } else {
        console.error("Unexpected response status:", response.status);
        alert("Unexpected error occurred");
      }
    } catch (error) {
      console.error("Error saving student:", error);
      alert("Error saving student: " + error.message); // Display error to the user
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="form-container max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg">
        <div className="mb-4">
          <input
            type="text"
            name="full_name"
            value={student.full_name}
            onChange={handleChange}
            placeholder="Full Name"
            className={`input-field block w-full px-4 py-2 border ${
              errors.full_name ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:border-blue-500`}
          />
          {errors.full_name && (
            <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            placeholder="Email"
            className={`input-field block w-full px-4 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:border-blue-500`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="number"
            name="prn_no"
            value={student.prn_no}
            onChange={handleChange}
            placeholder="PRN"
            className={`input-field block w-full px-4 py-2 border ${
              errors.prn_no ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:border-blue-500`}
          />
          {errors.prn_no && (
            <p className="text-red-500 text-sm mt-1">{errors.prn_no}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="roll_no"
            value={student.roll_no}
            onChange={handleChange}
            placeholder="Roll Number"
            className={`input-field block w-full px-4 py-2 border ${
              errors.roll_no ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:border-blue-500`}
          />
          {errors.roll_no && (
            <p className="text-red-500 text-sm mt-1">{errors.roll_no}</p>
          )}
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
        >
          Save Student
        </button>
      </div>

      <ul className="list-disc pl-5 mt-6">
        {students.map((s) => (
          <li key={s.email} className="mb-2">
            {s.full_name} - {s.email} - {s.prn_no} - {s.roll_no}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentPage;
