import { atom } from "recoil";

export const errorState = atom({
    key: 'errorState',
    default: {
      show: false,
      message: ''
    }
});

export const successState = atom({
  key: 'successState',
  default: {
    show: false,
    message: ''
  }
});