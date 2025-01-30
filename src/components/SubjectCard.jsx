import React from "react";

const SubjectCard = ({ subject }) => {
  const attendancePercentage = ((subject.attended / subject.total) * 100).toFixed(2);

  // Calculate the required number of classes to attend (75% of total)
  const requiredClasses = Math.ceil(subject.total * 0.75);

  // Calculate how many more classes need to be attended
  const remainingClasses = requiredClasses - subject.attended;

   // Calculate how many consecutive classes can be missed while still maintaining 75% attendance
   const maxMissableClasses = subject.attended - requiredClasses;


  return (
    <div className="card">
      <div className="card-header">{subject.name}</div>
      <div className="attendance-status">
        <span>
          Attendance: {subject.attended}/{subject.total}
        </span>
        <div>
          Attendance Percentage:{" "}
          <span className={attendancePercentage < 75 ? "low" : "high"}>
            {attendancePercentage}%
          </span>
        </div>

        {/* Display how many more classes are needed to reach 75% only if percentage is below 75 */}
        {attendancePercentage < 75 && (
          <div>
            Classes Needed for 75%: {remainingClasses > 0 ? remainingClasses : 0}
          </div>   
        )}

         {/* Display how many consecutive classes can be missed if percentage is above 75 */}
         {attendancePercentage >= 75 && maxMissableClasses > 0 && (
          <div>
            Consecutive Classes You Can Miss Without Dropping Below 75%:{" "}
            {maxMissableClasses}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectCard;
