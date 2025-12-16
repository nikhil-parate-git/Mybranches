import { atom } from "recoil";

const savedTheme = typeof window !== "undefined" ? localStorage.getItem("theme") : "light";

export const themeState = atom({
  key: "themeState",
  default: savedTheme || "light",
});
