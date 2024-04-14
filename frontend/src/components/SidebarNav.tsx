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
        className={`overflow-hidden transition-all  ease-in-out ${
          selected ? "h-auto" : "h-0"
        }`}
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
// const SidebarNav = () => {
//   return (
//     <nav className="bg-gray-800 text-white h-screen w-50 p-4 float-left">
//       <ul>
//         <li>
//           <Link to="cohorts" className="block py-2 px-4 hover:bg-gray-600">
//             Cohorts
//           </Link>
//           <ul>
//             <li>
//               <Link
//                 className="block py-2 px-8 hover:bg-gray-600"
//                 to="cohorts/create"
//               >
//                 Create Cohort
//               </Link>
//             </li>
//             <li>
//               <Link
//                 className="block py-2 px-8 hover:bg-gray-600"
//                 to="cohorts/upload"
//               >
//                 Upload Cohorts CSV
//               </Link>
//             </li>
//           </ul>
//         </li>
//         <li>
//           <Link to="students" className="block py-2 px-4 hover:bg-gray-600">
//             Students
//           </Link>
//           <ul>
//             <li>
//               <Link
//                 className="block py-2 px-8 hover:bg-gray-600"
//                 to="students/create"
//               >
//                 Create Student
//               </Link>
//             </li>
//             <li>
//               <Link
//                 className="block py-2 px-8 hover:bg-gray-600"
//                 to="students/upload"
//               >
//                 Upload Students CSV
//               </Link>
//             </li>
//           </ul>
//         </li>
//         <li>
//           <Link to="instructors" className="block py-2 px-4 hover:bg-gray-600">
//             Instructors
//           </Link>
//           <ul>
//             <li>
//               <Link
//                 className="block py-2 px-8 hover:bg-gray-600"
//                 to="instructors/create"
//               >
//                 Create Instructor
//               </Link>
//             </li>
//             <li>
//               <Link
//                 className="block py-2 px-8 hover:bg-gray-600"
//                 to="instructors/upload"
//               >
//                 Upload Instructors CSV
//               </Link>
//             </li>
//           </ul>
//         </li>
//         <li>
//           <Link to="donors" className="block py-2 px-4 hover:bg-gray-600">
//             Donors
//           </Link>
//           <ul>
//             <li>
//               <Link
//                 className="block py-2 px-8 hover:bg-gray-600"
//                 to="donors/create"
//               >
//                 Create Donor
//               </Link>
//             </li>
//             <li>
//               <Link
//                 className="block py-2 px-8 hover:bg-gray-600"
//                 to="donor/upload"
//               >
//                 Upload Donors CSV
//               </Link>
//             </li>
//           </ul>
//         </li>
//         <li>
//           <Link to="employers" className="block py-2 px-4 hover:bg-gray-600">
//             Employers
//           </Link>
//           <ul>
//             <li>
//               <Link
//                 className="block py-2 px-8 hover:bg-gray-600"
//                 to="employers/create"
//               >
//                 Create Employer
//               </Link>
//             </li>
//             <li>
//               <Link
//                 className="block py-2 px-8 hover:bg-gray-600"
//                 to="employers/upload"
//               >
//                 Upload Employers CSV
//               </Link>
//             </li>
//           </ul>
//         </li>
//       </ul>
//     </nav>
//   );
// };

export default SidebarNav;
