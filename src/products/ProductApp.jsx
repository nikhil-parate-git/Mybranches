import { useState } from "react";
import { useRecoilValue } from "recoil";
import ProductForm from "./ProductForm";
import ProductFilters from "./ProductFilters";
import ProductTable from "./ProductTable";
import { themeState } from "../recoil/atoms/ThemeAtom";

const ProductApp = () => {
  const [editProduct, setEditProduct] = useState(null);
  const theme = useRecoilValue(themeState);

  const containerBg = theme === "dark" ? "bg-gray-900" : "bg-gray-100";
  const sectionBg = theme === "dark" ? "bg-gray-800" : "bg-white";

  return (
    <div className={`${containerBg} min-h-screen py-6 px-4`}>
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-3xl font-bold mb-6 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Product Management
        </h2>

        <div className={`${sectionBg} rounded-2xl shadow p-6 mb-6`}>
          <ProductForm
            editProduct={editProduct}
            setEditProduct={setEditProduct}
          />
        </div>

        <div className={`${sectionBg} rounded-2xl shadow p-6 mb-6`}>
          <ProductFilters />
        </div>

        <div className={`${sectionBg} rounded-2xl shadow p-6`}>
          <ProductTable setEditProduct={setEditProduct} />
        </div>
      </div>
    </div>
  );
};

export default ProductApp;
