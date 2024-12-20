import {
  FaAppleAlt,
  FaBaby,
  FaBroom,
  FaCogs,
  FaGlassMartiniAlt,
  FaRegQuestionCircle,
  FaRegSmile,
  FaTshirt,
  FaWrench,
} from "react-icons/fa";


export type CategoryNames =
  | "Clothing"
  | "Food & Groceries"
  | "Beauty ,Health & personal care"
  | "Home & Kitchen"
  | "Drinks"
  | "test category"
  | "Baby & kids products"
  | "Cleaning products "
  | "Tools";

export const categoryIcons: Record<CategoryNames, JSX.Element> = {
  Clothing: (
    <FaTshirt className="w-5 h-5 text-ysecondary group-hover:text-white" />
  ),
  "Food & Groceries": (
    <FaAppleAlt className="w-5 h-5 text-ysecondary group-hover:text-white" />
  ),
  "Beauty ,Health & personal care": (
    <FaRegSmile className="w-5 h-5 text-ysecondary group-hover:text-white" />
  ),
  "Home & Kitchen": (
    <FaCogs className="w-5 h-5 text-ysecondary group-hover:text-white" />
  ),
  Drinks: (
    <FaGlassMartiniAlt className="w-5 h-5 text-ysecondary group-hover:text-white" />
  ),
  "test category": (
    <FaRegQuestionCircle className="w-5 h-5 text-ysecondary group-hover:text-white" />
  ),
  "Baby & kids products": (
    <FaBaby className="w-5 h-5 text-ysecondary group-hover:text-white" />
  ),
  "Cleaning products ": (
    <FaBroom className="w-5 h-5 text-ysecondary group-hover:text-white" />
  ),
  Tools: (
    <FaWrench className="w-5 h-5 text-ysecondary group-hover:text-white" />
  ),
};
