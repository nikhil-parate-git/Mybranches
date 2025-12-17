import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { productsState, pageState } from "../recoil/atoms/productAtoms";
import { themeState } from "../recoil/atoms/ThemeAtom";
import * as Yup from "yup";

const productSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Minimum 2 characters")
    .required("Product Name is required"),

  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),

  category: Yup.string().required("Category is required"),

  image: Yup.string().required("Image is required"),
});

const ProductForm = ({ editProduct, setEditProduct }) => {
  const [, setProducts] = useRecoilState(productsState);
  const [, setPage] = useRecoilState(pageState);
  const theme = useRecoilValue(themeState);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editProduct) {
      setForm(editProduct);
    } else {
      setForm({ name: "", price: "", category: "", image: "" });
    }
  }, [editProduct]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () =>
      setForm((prev) => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await productSchema.validate(form, { abortEarly: false });
      setErrors({});

      const normalizedForm = {
        ...form,
        category: form.category.trim().toLowerCase(),
      };

      setProducts((prev) => {
        if (editProduct) {
          return prev.map((p) =>
            p.id === editProduct.id
              ? { ...normalizedForm, id: editProduct.id }
              : p
          );
        }
        return [...prev, { ...normalizedForm, id: Date.now() }];
      });

      setForm({ name: "", price: "", category: "", image: "" });
      setEditProduct(null);
      setPage(1);
    } catch (err) {
      const fieldErrors = {};
      err.inner.forEach((e) => {
        fieldErrors[e.path] = e.message;
      });
      setErrors(fieldErrors);
    }
  };

  const inputBg = theme === "dark" ? "bg-gray-700" : "bg-gray-50";
  const inputText = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const borderColor = theme === "dark" ? "border-gray-600" : "border-gray-300";
  const errorText = "text-red-500 text-sm mt-1";

  return (
    <form
      onSubmit={submit}
      className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4"
    >
      <div>
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, name: e.target.value }))
          }
          className={`border ${borderColor} px-3 py-2 rounded w-full ${inputBg} ${inputText}`}
        />
        {errors.name && <p className={errorText}>{errors.name}</p>}
      </div>

      <div>
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, price: e.target.value }))
          }
          className={`border ${borderColor} px-3 py-2 rounded w-full ${inputBg} ${inputText}`}
        />
        {errors.price && <p className={errorText}>{errors.price}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, category: e.target.value }))
          }
          className={`border ${borderColor} px-3 py-2 rounded w-full ${inputBg} ${inputText}`}
        />
        {errors.category && <p className={errorText}>{errors.category}</p>}
      </div>

      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {errors.image && <p className={errorText}>{errors.image}</p>}
      </div>

      {form.image && (
        <img src={form.image} className="w-12 h-12 rounded object-cover" />
      )}

      <button className="bg-emerald-500 text-white rounded px-4 py-2">
        {editProduct ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default ProductForm;
