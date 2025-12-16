import { atom } from "recoil";

export const usersState = atom({
  key: "usersState",
  default: [],
});

export const currentFormState = atom({
  key: "currentFormState",
  default: {
    personal: { name: "", email: "" },
    address: { city: "", pincode: "" },
    document: null,
  },
});

export const selectedUserState = atom({
  key: "selectedUserState",
  default: null,
});
