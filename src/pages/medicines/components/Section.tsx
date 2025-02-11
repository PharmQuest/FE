import React from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => (
  <div className="md:mt-[60px] mt-6">
    <h2 className="lg:text-gray-600 lg:text-display2-b text-black text-m-headline2-b mb-4">
      {title}
    </h2>
    <div className="lg:text-body1-r text-m-body2-r py-5 md:pr-5 pr-3 md:pl-8 pl-5 bg-gray-50 border border-gray-100 rounded-lg">
      {children}
    </div>
  </div>
);

export default Section;
