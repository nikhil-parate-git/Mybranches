import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { productsState, pageState } from "../recoil/atoms/productAtoms";

const ProductForm = ({ editProduct, setEditProduct }) => {
  const [products, setProducts] = useRecoilState(productsState);
  const [, setPage] = useRecoilState(pageState);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    if (editProduct) setForm(editProduct);
    else setForm({ name: "", price: "", category: "", image: "" });
  }, [editProduct]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm({ ...form, image: reader.result });
    reader.readAsDataURL(file);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category || !form.image) return;

    // Normalize category capitalization
    const normalizedForm = {
      ...form,
      category: form.category.trim().toLowerCase(),
    };

    if (editProduct) {
      setProducts(products.map((p) => (p.id === form.id ? normalizedForm : p)));
      setEditProduct(null);
    } else {
      setProducts([...products, { ...normalizedForm, id: Date.now() }]);
    }

    setPage(1);
    setForm({ name: "", price: "", category: "", image: "" });
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <input
        placeholder="Product Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border rounded-lg px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
      />
      <input
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        className="border rounded-lg px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
      />
      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="border rounded-lg px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="border rounded-lg px-4 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
      />

      {form.image && (
        <img
          src={form.image}
          alt="Preview"
          className="w-12 h-12 object-cover rounded"
        />
      )}

      <button
        type="submit"
        className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition"
      >
        {editProduct ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default ProductForm;
