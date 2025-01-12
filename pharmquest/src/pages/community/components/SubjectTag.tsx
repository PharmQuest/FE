import React from "react";

interface SubjectTagProps {
  text: string;
}

const SubjectTag: React.FC<SubjectTagProps> = ({ text }) => {
  return (
    <div className="w-fit px-[6px] py-[2px] bg-primary-400 text-white text-body2-r rounded">
      {text}
    </div>
  );
};

export default SubjectTag;
