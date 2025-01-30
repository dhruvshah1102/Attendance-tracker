import React, { useState } from "react";
import SubjectCard from "./SubjectCard"; // Assuming you have a SubjectCard component

// Function to count weekdays (Mon-Fri) from startDate to today
const countWeekdays = (startDate) => {
  const start = new Date(startDate);
  const end = new Date();
  let count = 0;

  while (start <= end) {
    const dayOfWeek = start.getDay(); // Get the day of the week (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      count++; // Count only weekdays (Mon-Fri)
    }
    start.setDate(start.getDate() + 1); // Move to the next day
  }

  return count;
};

const AddSubjectForm = ({ addSubject }) => {
  const [name, setName] = useState("");
  const [notAttended, setNotAttended] = useState(""); // Classes not attended
  const [startDate, setStartDate] = useState(""); // Start date for auto calculation
  const [useAutoCalculate, setUseAutoCalculate] = useState(false); // Whether to use auto calculation
  const [manualTotalClasses, setManualTotalClasses] = useState(""); // Manually entered total classes
  const [requiredClasses, setRequiredClasses] = useState(null); // To store the calculated required classes
  const [totalClasses, setTotalClasses] = useState(null); // To store the total classes
  const [subjects, setSubjects] = useState([]); // List of added subjects

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && notAttended >= 0) {
      let totalClassesValue = 0;

      // If auto calculation is enabled, calculate the total classes based on start date
      if (useAutoCalculate) {
        if (startDate) {
          totalClassesValue = countWeekdays(startDate);
        } else {
          alert("Please provide a start date for calculation.");
          return;
        }
      } else {
        // Use the manually entered total classes
        if (manualTotalClasses && manualTotalClasses > 0) {
          totalClassesValue = manualTotalClasses;
        } else {
          alert("Please provide a valid number of total classes.");
          return;
        }
      }

      // Calculate the number of classes needed to reach 75% attendance
      const requiredToAttend = Math.ceil(totalClassesValue * 0.75); // 75% of total classes

      setTotalClasses(totalClassesValue); // Update the total classes state
      setRequiredClasses(requiredToAttend); // Update the required classes state

      const attendedClasses = totalClassesValue - notAttended; // Calculate attended classes based on total classes - not attended

      // Add the subject to the list
      setSubjects([
        ...subjects,
        { name, notAttended: parseInt(notAttended), attended: attendedClasses, total: totalClassesValue, requiredClasses: requiredToAttend },
      ]);

      // Reset form fields
      setName("");
      setNotAttended("");
      setStartDate("");
      setManualTotalClasses(""); // Reset manually entered total classes
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="add-subject-form">
        <h2>Add Subject</h2>

        <div className="input-container">
          <label className="block font-medium">Subject Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <div className="input-container">
          <label className="block font-medium">Classes Not Attended</label>
          <input
            type="number"
            value={notAttended}
            onChange={(e) => setNotAttended(e.target.value)}
            className="input-field"
            required
          />
        </div>

        {/* Total Classes Label */}
        <div className="total-classes-label">
          <label className="block font-medium">Total Classes</label>
        </div>

        {/* Section asking whether they want auto calculation */}
        <div className="radio-group">
          <div className="radio-option">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="totalClassesOption"
                value="auto"
                checked={useAutoCalculate}
                onChange={() => setUseAutoCalculate(true)}
              />
              <span>Auto Calculate (based on start date)</span>
            </label>
          </div>
          <div className="radio-option">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="totalClassesOption"
                value="manual"
                checked={!useAutoCalculate}
                onChange={() => setUseAutoCalculate(false)}
              />
              <span>Manually Enter Total Classes</span>
            </label>
          </div>
        </div>

        {/* Start Date Section (only shows if Auto Calculate is selected) */}
        {useAutoCalculate && (
          <div className="start-date-section">
            <label className="block font-medium">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input-field"
              required={useAutoCalculate}
            />
          </div>
        )}

        {/* Manual Total Classes Section (only shows if Manually Enter is selected) */}
        {!useAutoCalculate && (
          <div className="manual-classes-section">
            <label className="block font-medium">Total Classes</label>
            <input
              type="number"
              value={manualTotalClasses}
              onChange={(e) => setManualTotalClasses(e.target.value)}
              className="input-field"
              required={!useAutoCalculate}
            />
          </div>
        )}

        <button type="submit" className="add-btn">
          Add Subject
        </button>
      </form>

      {/* Subject Cards List */}
      <div className="subject-cards">
        {subjects.map((subject, index) => (
          <SubjectCard key={index} subject={subject} />
        ))}
      </div>
    </div>
  );
};

export default AddSubjectForm;
