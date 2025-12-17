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

    return products.filter((product) => {
      const matchName = product.name
        .toLowerCase()
        .includes(search); 

      const matchCategory =
        category === "all" || product.category === category;

      const matchPrice = Number(product.price) <= Number(price);

      return matchName && matchCategory && matchPrice;
    });
  },
});
