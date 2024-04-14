import React from "react";

interface SectionContainerProps {
  headerText: string;
  children: React.ReactNode;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  headerText,
  children,
}) => {
  return (
    <div className="section-container w-full">
      <div className="text-xl font-bold text-center bg-gray-800 text-white p-3 capitalize">
        {headerText}
      </div>
      {children}
    </div>
  );
};

export default SectionContainer;
