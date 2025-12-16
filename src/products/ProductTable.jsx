import { useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { filteredProductsState } from "../recoil/selectors/productSelectors";
import { productsState, pageState } from "../recoil/atoms/productAtoms";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const ProductTable = ({ setEditProduct }) => {
  const filteredProducts = useRecoilValue(filteredProductsState);
  const [products, setProducts] = useRecoilState(productsState);
  const [page, setPage] = useRecoilState(pageState);

  const perPage = 5;
  const totalPages = Math.ceil(filteredProducts.length / perPage);

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredProducts.slice(start, start + perPage);
  }, [filteredProducts, page]);

  const deleteProduct = (id) =>
    setProducts(products.filter((p) => p.id !== id));

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-gray-500 dark:text-gray-300">
              <th className="py-2">Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((p) => (
              <tr
                key={p.id}
                className="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="py-2">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="text-gray-900 dark:text-white">{p.name}</td>
                <td className="text-gray-900 dark:text-white">{p.category}</td>
                <td className="text-gray-900 dark:text-white">₹{p.price}</td>
                <td className="space-x-2 flex items-center gap-3">
                  <button
                    className="text-indigo-600 mt-4 dark:text-indigo-400 hover:text-indigo-800"
                    onClick={() => setEditProduct(p)}
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    className="text-red-500 mt-4 dark:text-red-400 hover:text-red-700"
                    onClick={() => deleteProduct(p.id)}
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center gap-3 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded  disabled:opacity-50 dark:border-gray-600 dark:text-white"
        >
          Prev
        </button>
        <span className="text-sm text-gray-500 dark:text-gray-300">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50 dark:border-gray-600 dark:text-white"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ProductTable;
