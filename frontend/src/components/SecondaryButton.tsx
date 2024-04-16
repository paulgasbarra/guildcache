import React from "react";

interface SecondaryButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  type,
  onClick,
}) => {
  return (
    <button
      className="text-stone w-48 bg-stone-200 hover:bg-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-100 focus:ring-opacity-60 w-full rounded-md p-2"
      type={type || "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
