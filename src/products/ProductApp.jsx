import { useState } from "react";
import ProductForm from "./ProductForm";
import ProductFilters from "./ProductFilters";
import ProductTable from "./ProductTable";

const ProductApp = () => {
  const [editProduct, setEditProduct] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-indigo-600">
        Product Management
      </h2>

      {/* FORM */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-6">
        <ProductForm editProduct={editProduct} setEditProduct={setEditProduct} />
      </div>

      {/* FILTERS */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-6">
        <ProductFilters />
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
        <ProductTable setEditProduct={setEditProduct} />
      </div>
    </div>
  );
};

export default ProductApp;
