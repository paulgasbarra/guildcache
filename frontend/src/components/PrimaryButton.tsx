import React from "react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  type,
  onClick,
}) => {
  return (
    <button
      className="text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-60 w-48 rounded-md p-2"
      type={type || "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
