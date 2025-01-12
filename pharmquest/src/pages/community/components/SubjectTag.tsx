import React from "react";

interface SubjectTagProps {
  text: string;
}

const SubjectTag: React.FC<SubjectTagProps> = ({ text }) => {
  return (
    <div className="w-16 px-[6px] py-[2px] bg-primary-400 text-white text-body2-r rounded text-center">
      {text}
    </div>
  );
};

export default SubjectTag;
