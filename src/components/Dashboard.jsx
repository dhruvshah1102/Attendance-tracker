import React from "react";
import SubjectCard from "./SubjectCard";




const Dashboard = ({ subjects, updateSubject }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {subjects.map((subject, index) => (
        <SubjectCard
          key={index}
          subject={subject}
          updateSubject={(updatedSubject) => updateSubject(index, updatedSubject)}
        />
      ))}
    </div>
  );
};

export default Dashboard;
