import React from "react";

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className="flex gap-2">
    <div className="lg:text-subhead1-sb lg:min-w-[56px] flex justify-between text-m-subhead1-sb min-w-[50px]">
      {label?.split("").map((char, i) => (
        <div key={i}>{char}</div>
      ))}
    </div>
    <div className="text-center text-m-subhead1-sb">|</div>
    <div className="lg:text-body1-r text-m-body2-r">{value}</div>
  </div>
);

export default InfoRow;
