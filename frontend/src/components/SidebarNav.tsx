import React from "react";
import { Link } from "react-router-dom";

interface NavItemProps {
  onClick: () => void;
  selected?: boolean;
  title: string;
  to: string;
}

const NavItem: React.FC<NavItemProps> = ({ onClick, selected, title, to }) => {
  return (
    <>
      <Link
        to={to}
        className={`block py-2 px-4 hover:bg-gray-600 border-slate-500 box-border ${
          selected ? "border-b-2 " : ""
        }`}
        onClick={onClick}
      >
        {title}
      </Link>
      <div
        className={`transition-[height] linear ${
          selected ? "h-20" : "h-0"
        } overflow-hidden`}
      >
        <ul>
          <li>
            <Link
              className="block py-2 px-8 hover:bg-gray-600"
              to={`${to}/create`}
            >
              Create {title.slice(0, -1)}
            </Link>
          </li>
          <li>
            <Link
              className="block py-2 px-8 hover:bg-gray-600"
              to={`${to}/upload`}
            >
              Upload {title.slice(0, -1)} CSV
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

const SidebarNav = () => {
  const [isSelected, setIsSelected] = React.useState<string>("Cohorts");

  const handleSelected = (item: string) => {
    setIsSelected(item);
  };

  const items = [
    { title: "Cohorts", to: "cohorts" },
    { title: "Students", to: "students" },
    { title: "Instructors", to: "instructors" },
    { title: "Donors", to: "donors" },
    { title: "Employers", to: "employers" },
  ];

  return (
    <nav className="bg-gray-800 text-white h-screen p-4 pt-16 float-left w-96">
      <ul>
        {items.map((item) => (
          <NavItem
            key={item.title}
            title={item.title}
            to={item.to}
            selected={isSelected === item.title}
            onClick={() => handleSelected(item.title)}
          />
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNav;
