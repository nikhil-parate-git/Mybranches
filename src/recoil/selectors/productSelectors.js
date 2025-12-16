import { selector } from "recoil";
import {
  productsState,
  searchState,
  categoryState,
  priceState,
} from "../atoms/productAtoms";

export const filteredProductsState = selector({
  key: "filteredProductsState",
  get: ({ get }) => {
    const products = get(productsState);
    const search = get(searchState).toLowerCase();
    const category = get(categoryState).toLowerCase();
    const price = get(priceState);

    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(search) &&
        (category === "all" || p.category.toLowerCase() === category) &&
        Number(p.price) <= price
    );
  },
});
