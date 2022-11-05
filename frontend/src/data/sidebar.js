import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";

const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Service Dispatch ",
    icon: <BiImageAdd />,
    path: "/products",
  },
 
  {
    title: "User Account",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "User Profile",
        path: "/profile",
      },
      {
        title: "Edit User Profile",
        path: "/edit-profile",
      },
    ],
  },
  
  {
    title: "Report Bug",
    icon: <FaCommentAlt />,
    path: "/contact-us",
  },
];

export default menu;