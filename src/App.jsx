import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import AddSubjectForm from "./components/AddSubjectForm";
import "./App.css";  // Import custom CSS


const App = () => {
  // State to hold subjects
  const [subjects, setSubjects] = useState([]);


  
  // // Load subjects from localStorage when the component mounts
  // useEffect(() => {
  //   const storedSubjects = JSON.parse(localStorage.getItem("subjects"));
  //   if (storedSubjects) {
  //     setSubjects(storedSubjects);
  //   }
  // }, []);

  
  
  // Function to add subject
  const addSubject = (subject) => {
    const newSubjects = [...subjects, subject];
    setSubjects(newSubjects);
    // Save the updated subjects array to localStorage
    // localStorage.setItem("subjects", JSON.stringify(newSubjects));
  };

  // Function to update a subject's attendance data
  const updateSubject = (index, updatedSubject) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index] = updatedSubject;
    setSubjects(updatedSubjects);
    // Save the updated subjects array to localStorage
    // localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
  };

  return (
    
    <div className="app-container p-5">
      <header className="app-header">
        <h1>Attendance Tracker</h1>
      </header>
      <AddSubjectForm addSubject={addSubject} />
      {subjects.length === 0 ? (
        <p className="no-subjects">No subjects added yet. Please add subjects to track attendance.</p>
      ) : (
        <Dashboard subjects={subjects} updateSubject={updateSubject} />
      )}
    </div>
  );
};

export default App;


