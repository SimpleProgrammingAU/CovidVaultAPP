import { Action } from "../interfaces";

export const toggleSelectAll = (method: boolean): Action<boolean> => {
  return {
    type: "CHECKLIST_SELECT_ALL",
    payload: method,
  };
};
