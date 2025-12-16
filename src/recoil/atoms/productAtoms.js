import { atom } from "recoil";

export const productsState = atom({
  key: "productsState",
  default: [],
});

export const searchState = atom({
  key: "searchState",
  default: "",
});

export const categoryState = atom({
  key: "categoryState",
  default: "all",
});

export const priceState = atom({
  key: "priceState",
  default: 100000,
});

export const pageState = atom({
  key: "pageState",
  default: 1,
});
